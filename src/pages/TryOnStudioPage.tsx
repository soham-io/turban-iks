import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  RotateCcw,
  Share2,
  Sliders,
  Upload,
  X,
} from 'lucide-react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { museumApi } from '../services/museumApi';
import {
  TRY_ON_OPTIONS,
  drawTurbanOnCanvas,
  type TurbanPlacement,
} from '../utils/turbanRenderer';
import type { TryOnPresetId } from '../types/museum';

type StudioMode = 'consent' | 'camera' | 'photo';

interface ManualOffset {
  xOffsetPct: number; // -25 to +25 % of canvas width
  yOffsetPct: number; // -25 to +25 % of canvas height
  scale: number; // 0.6 to 1.6
  rotationDeg: number; // -25 to +25
}

const DEFAULT_OFFSET: ManualOffset = {
  xOffsetPct: 0,
  yOffsetPct: 0,
  scale: 1,
  rotationDeg: 0,
};

export function TryOnStudioPage() {
  const [searchParams] = useSearchParams();
  const initialTurbanParam = searchParams.get('turban');

  const [selectedIdx, setSelectedIdx] = useState<number>(() => {
    if (!initialTurbanParam) return 0;
    const found = TRY_ON_OPTIONS.findIndex(
      (opt) => opt.turbanId === initialTurbanParam || opt.id === initialTurbanParam
    );
    return found >= 0 ? found : 0;
  });

  // Resolve non-preset turban IDs via backend API so any turban links smoothly to its matching silhouette
  useEffect(() => {
    if (!initialTurbanParam) return;
    const direct = TRY_ON_OPTIONS.findIndex(
      (opt) => opt.turbanId === initialTurbanParam || opt.id === initialTurbanParam
    );
    if (direct >= 0) {
      setSelectedIdx(direct);
      return;
    }
    museumApi
      .getTurbanById(initialTurbanParam)
      .then(({ turban }) => {
        const idx = TRY_ON_OPTIONS.findIndex((opt) => opt.id === turban.tryOnPresetId);
        if (idx >= 0) setSelectedIdx(idx);
      })
      .catch(() => undefined);
  }, [initialTurbanParam]);

  const activeOption = TRY_ON_OPTIONS[selectedIdx] || TRY_ON_OPTIONS[0];

  const [mode, setMode] = useState<StudioMode>('consent');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [trackingState, setTrackingState] = useState<'loading' | 'tracking' | 'manual'>('loading');
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [manualOffset, setManualOffset] = useState<ManualOffset>(DEFAULT_OFFSET);
  const [capturedDataUrl, setCapturedDataUrl] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const uploadedImgRef = useRef<HTMLImageElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const smoothedPlacementRef = useRef<TurbanPlacement | null>(null);
  const lastVideoTimeRef = useRef<number>(-1);
  const draggingRef = useRef<{ active: boolean; startX: number; startY: number; initX: number; initY: number }>({
    active: false,
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
  });

  // Keep latest state accessible inside rAF loop
  const stateRef = useRef({
    presetId: activeOption.id as TryOnPresetId,
    facingMode,
    manualOffset,
    mode,
  });
  useEffect(() => {
    stateRef.current = {
      presetId: activeOption.id,
      facingMode,
      manualOffset,
      mode,
    };
  }, [activeOption.id, facingMode, manualOffset, mode]);

  const stopCamera = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  // Initialize MediaPipe FaceLandmarker cleanly with fallback to manual positioning
  const initFaceLandmarker = useCallback(async () => {
    if (landmarkerRef.current) return landmarkerRef.current;
    try {
      setTrackingState('loading');
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
      );
      const landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numFaces: 1,
      });
      landmarkerRef.current = landmarker;
      setTrackingState('tracking');
      return landmarker;
    } catch {
      // Fallback gracefully if WASM/model CDN is unreachable
      setTrackingState('manual');
      return null;
    }
  }, []);

  const startCamera = useCallback(
    async (requestedFacing: 'user' | 'environment') => {
      stopCamera();
      setCameraError(null);
      setMode('camera');
      smoothedPlacementRef.current = null;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError(
          'Browser camera access is unavailable in this environment. You can upload a portrait photo instead to try on every turban.'
        );
        setTrackingState('manual');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: requestedFacing,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        await initFaceLandmarker();
      } catch (err) {
        const msg =
          err instanceof Error && err.name === 'NotAllowedError'
            ? 'Camera permission was declined. Enable camera permissions in your browser or upload a portrait below.'
            : 'No active camera device was detected. Upload a portrait photo to preview how each turban fits.';
        setCameraError(msg);
        setTrackingState('manual');
      }
    },
    [initFaceLandmarker, stopCamera]
  );

  useEffect(() => {
    return () => {
      stopCamera();
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }
    };
  }, [stopCamera]);

  // Continuous Canvas render loop for Camera & Photo modes
  useEffect(() => {
    if (mode === 'consent') return;

    const renderFrame = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const { presetId, facingMode: currentFacing, manualOffset: offset, mode: currentMode } =
        stateRef.current;

      if (canvas && ctx) {
        if (currentMode === 'camera' && videoRef.current && videoRef.current.readyState >= 2) {
          const video = videoRef.current;
          const vw = video.videoWidth || 1280;
          const vh = video.videoHeight || 720;
          if (canvas.width !== vw || canvas.height !== vh) {
            canvas.width = vw;
            canvas.height = vh;
          }

          ctx.save();
          if (currentFacing === 'user') {
            ctx.translate(vw, 0);
            ctx.scale(-1, 1);
          }
          ctx.drawImage(video, 0, 0, vw, vh);
          ctx.restore();

          // Face landmark detection
          let targetPlacement: TurbanPlacement = {
            centerX: vw * 0.5,
            centerY: vh * 0.34,
            width: Math.min(vw, vh) * 0.42,
            rotationRad: 0,
          };

          const landmarker = landmarkerRef.current;
          if (landmarker && video.currentTime !== lastVideoTimeRef.current) {
            lastVideoTimeRef.current = video.currentTime;
            try {
              const result = landmarker.detectForVideo(video, performance.now());
              const landmarks = result.faceLandmarks?.[0];
              if (landmarks && landmarks.length > 454) {
                const mirrorX = (nx: number) => (currentFacing === 'user' ? 1 - nx : nx);

                const forehead = landmarks[10];
                const leftTemple = landmarks[234];
                const rightTemple = landmarks[454];
                const leftEye = landmarks[33];
                const rightEye = landmarks[263];

                const fx = mirrorX(forehead.x) * vw;
                const fy = forehead.y * vh;
                const lx = mirrorX(leftTemple.x) * vw;
                const ly = leftTemple.y * vh;
                const rx = mirrorX(rightTemple.x) * vw;
                const ry = rightTemple.y * vh;

                const lex = mirrorX(leftEye.x) * vw;
                const ley = leftEye.y * vh;
                const rex = mirrorX(rightEye.x) * vw;
                const rey = rightEye.y * vh;

                const faceWidth = Math.hypot(rx - lx, ry - ly);
                // Compute head roll angle consistently regardless of mirror direction
                const dx = currentFacing === 'user' ? lex - rex : rex - lex;
                const dy = currentFacing === 'user' ? ley - rey : rey - ley;
                const rollRad = Math.atan2(dy, dx);

                targetPlacement = {
                  centerX: fx,
                  centerY: fy + faceWidth * 0.04,
                  width: faceWidth * 1.48,
                  rotationRad: rollRad,
                };
              }
            } catch {
              // Keep last smoothed placement if single frame detection fails
            }
          }

          // Exponential moving average smoothing for stable head tracking
          const prev = smoothedPlacementRef.current;
          const alpha = 0.32;
          const smoothed: TurbanPlacement = prev
            ? {
                centerX: prev.centerX + (targetPlacement.centerX - prev.centerX) * alpha,
                centerY: prev.centerY + (targetPlacement.centerY - prev.centerY) * alpha,
                width: prev.width + (targetPlacement.width - prev.width) * alpha,
                rotationRad:
                  prev.rotationRad + (targetPlacement.rotationRad - prev.rotationRad) * alpha,
              }
            : targetPlacement;
          smoothedPlacementRef.current = smoothed;

          // Apply manual fine-tuning adjustments
          const finalPlacement: TurbanPlacement = {
            centerX: smoothed.centerX + (offset.xOffsetPct / 100) * vw,
            centerY: smoothed.centerY + (offset.yOffsetPct / 100) * vh,
            width: smoothed.width * offset.scale,
            rotationRad: smoothed.rotationRad + (offset.rotationDeg * Math.PI) / 180,
          };

          drawTurbanOnCanvas(ctx, presetId, finalPlacement);
        } else if (currentMode === 'photo' && uploadedImgRef.current) {
          const img = uploadedImgRef.current;
          const cw = canvas.width;
          const ch = canvas.height;
          ctx.clearRect(0, 0, cw, ch);

          // Cover-fit uploaded portrait inside canvas
          const scale = Math.max(cw / img.width, ch / img.height);
          const dw = img.width * scale;
          const dh = img.height * scale;
          const dx = (cw - dw) / 2;
          const dy = (ch - dh) / 2;
          ctx.drawImage(img, dx, dy, dw, dh);

          const baseWidth = Math.min(cw, ch) * 0.44;
          drawTurbanOnCanvas(ctx, presetId, {
            centerX: cw * 0.5 + (offset.xOffsetPct / 100) * cw,
            centerY: ch * 0.32 + (offset.yOffsetPct / 100) * ch,
            width: baseWidth * offset.scale,
            rotationRad: (offset.rotationDeg * Math.PI) / 180,
          });
        }
      }

      animFrameRef.current = requestAnimationFrame(renderFrame);
    };

    animFrameRef.current = requestAnimationFrame(renderFrame);
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [mode]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();
    setCameraError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        uploadedImgRef.current = img;
        if (canvasRef.current) {
          canvasRef.current.width = 960;
          canvasRef.current.height = 720;
        }
        setManualOffset(DEFAULT_OFFSET);
        setTrackingState('manual');
        setMode('photo');
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFlipCamera = () => {
    const next = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(next);
    startCamera(next);
  };

  const handleCapture = () => {
    if (!canvasRef.current) return;
    setCapturedDataUrl(canvasRef.current.toDataURL('image/png'));
    setShareFeedback(null);
  };

  const handleDownload = () => {
    if (!capturedDataUrl) return;
    const link = document.createElement('a');
    link.href = capturedDataUrl;
    link.download = `pagdi-${activeOption.id}.png`;
    link.click();
  };

  const handleShare = async () => {
    if (!capturedDataUrl) return;
    try {
      const blob = await (await fetch(capturedDataUrl)).blob();
      const file = new File([blob], `pagdi-${activeOption.id}.png`, { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `Wearing the ${activeOption.name}`,
          text: `Exploring ${activeOption.region} heritage at PAGDI — The Turban Museum of India.`,
          files: [file],
        });
        setShareFeedback('Shared successfully.');
        return;
      }
      handleDownload();
      setShareFeedback('Image downloaded so you can share it anywhere.');
    } catch {
      handleDownload();
      setShareFeedback('Image downloaded to your device.');
    }
  };

  // Drag-to-adjust turban placement directly on canvas
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode === 'consent') return;
    draggingRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      initX: manualOffset.xOffsetPct,
      initY: manualOffset.yOffsetPct,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current.active || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dxPct = ((e.clientX - draggingRef.current.startX) / rect.width) * 100;
    const dyPct = ((e.clientY - draggingRef.current.startY) / rect.height) * 100;
    setManualOffset((prev) => ({
      ...prev,
      xOffsetPct: Math.max(-35, Math.min(35, Math.round((draggingRef.current.initX + dxPct) * 10) / 10)),
      yOffsetPct: Math.max(-35, Math.min(35, Math.round((draggingRef.current.initY + dyPct) * 10) / 10)),
    }));
  };

  const onPointerUp = () => {
    draggingRef.current.active = false;
  };

  return (
    <div className="pt-16 min-h-screen bg-[#14110F] text-[#F6F1E7] flex flex-col">
      {/* Studio Top Bar */}
      <div className="px-4 sm:px-6 py-3 bg-[#1B1B1B] border-b border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/museum"
            aria-label="Close Try-On Studio"
            className="p-2 border border-white/15 hover:border-[#DCC9A6] text-[#F6F1E7]/85 hover:text-[#F6F1E7] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#DCC9A6] truncate">
              Virtual Try-On Studio · {activeOption.region}
            </p>
            <h1 className="font-editorial text-lg sm:text-xl text-[#F6F1E7] truncate">
              {activeOption.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {mode === 'camera' && !cameraError && (
            <button
              type="button"
              onClick={handleFlipCamera}
              aria-label="Flip camera"
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/15 text-xs hover:border-[#DCC9A6] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Flip</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowAdjustments((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 border text-xs transition-colors ${
              showAdjustments
                ? 'border-[#DCC9A6] bg-[#DCC9A6]/15 text-[#DCC9A6]'
                : 'border-white/15 text-[#F6F1E7]/80 hover:border-[#DCC9A6]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fit &amp; Align</span>
          </button>
          <button
            type="button"
            onClick={() => setManualOffset(DEFAULT_OFFSET)}
            aria-label="Reset turban alignment"
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/15 text-xs text-[#F6F1E7]/80 hover:border-[#DCC9A6] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main Camera / Studio Stage */}
      <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">
        {mode === 'consent' ? (
          <div className="max-w-xl mx-auto px-6 py-12 text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#DCC9A6]">
              Cultural Appreciation Experience
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F6F1E7]">
              Step inside the Virtual Turban Studio
            </h2>
            <p className="text-sm sm:text-base text-[#F6F1E7]/75 leading-relaxed">
              Camera access is used strictly inside your browser to detect head position and fit
              four distinct regional turban silhouettes onto your portrait. No video leaves your
              device.
            </p>
            <p className="text-xs text-[#DCC9A6]/85 italic font-editorial">
              Note: Sacred traditions such as the Punjabi Dastar are presented with reverence to
              build cultural understanding and appreciation.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => startCamera(facingMode)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#F6F1E7] text-[#1B1B1B] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#DCC9A6] transition-colors"
              >
                <Camera className="w-4 h-4" />
                Enable Camera
              </button>

              <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-white/30 text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.14em] hover:border-[#DCC9A6] cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Portrait Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex-1 flex items-center justify-center bg-[#0D0B0A]">
            <video ref={videoRef} playsInline muted className="hidden" />

            {cameraError ? (
              <div className="max-w-md mx-auto p-8 text-center space-y-5 border border-white/15 bg-[#1B1B1B]">
                <p className="font-editorial text-2xl text-[#F6F1E7]">Camera Unavailable</p>
                <p className="text-sm text-[#F6F1E7]/75 leading-relaxed">{cameraError}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => startCamera(facingMode)}
                    className="px-5 py-2.5 bg-[#F6F1E7] text-[#1B1B1B] text-xs font-semibold uppercase tracking-[0.12em]"
                  >
                    Retry Camera
                  </button>
                  <label className="px-5 py-2.5 border border-white/25 text-xs font-semibold uppercase tracking-[0.12em] cursor-pointer">
                    <span>Upload Photo Instead</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="max-h-[65vh] sm:max-h-[70vh] w-auto max-w-full object-contain touch-none cursor-grab active:cursor-grabbing"
              />
            )}

            {/* Subtle alignment guidance note */}
            {!cameraError && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-black/60 backdrop-blur-sm border border-white/10 text-[11px] text-[#F6F1E7]/80 whitespace-nowrap">
                {trackingState === 'tracking'
                  ? 'Face tracking active · Drag turban anytime to refine fit'
                  : trackingState === 'loading'
                  ? 'Calibrating facial landmark tracking...'
                  : 'Manual fit active · Drag on portrait or open Fit & Align'}
              </div>
            )}

            {/* Side Manual Adjustment Drawer */}
            {showAdjustments && (
              <div className="absolute top-12 right-4 z-20 w-64 bg-[#1B1B1B]/95 backdrop-blur-md border border-white/15 p-4 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-[0.12em] text-[#DCC9A6] font-semibold">
                    Fine-Tune Fit
                  </span>
                  <button
                    type="button"
                    onClick={() => setManualOffset(DEFAULT_OFFSET)}
                    className="text-[11px] underline text-[#F6F1E7]/70 hover:text-[#F6F1E7]"
                  >
                    Reset
                  </button>
                </div>

                <label className="block space-y-1">
                  <span className="flex justify-between text-[#F6F1E7]/80">
                    <span>Vertical Height</span>
                    <span className="font-mono tabular-nums">{manualOffset.yOffsetPct}%</span>
                  </span>
                  <input
                    type="range"
                    min={-25}
                    max={25}
                    step={0.5}
                    value={manualOffset.yOffsetPct}
                    onChange={(e) =>
                      setManualOffset((p) => ({ ...p, yOffsetPct: Number(e.target.value) }))
                    }
                    className="w-full accent-[#B75E40]"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="flex justify-between text-[#F6F1E7]/80">
                    <span>Size Scale</span>
                    <span className="font-mono tabular-nums">
                      {Math.round(manualOffset.scale * 100)}%
                    </span>
                  </span>
                  <input
                    type="range"
                    min={0.65}
                    max={1.55}
                    step={0.02}
                    value={manualOffset.scale}
                    onChange={(e) =>
                      setManualOffset((p) => ({ ...p, scale: Number(e.target.value) }))
                    }
                    className="w-full accent-[#B75E40]"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="flex justify-between text-[#F6F1E7]/80">
                    <span>Head Tilt</span>
                    <span className="font-mono tabular-nums">{manualOffset.rotationDeg}°</span>
                  </span>
                  <input
                    type="range"
                    min={-25}
                    max={25}
                    step={1}
                    value={manualOffset.rotationDeg}
                    onChange={(e) =>
                      setManualOffset((p) => ({ ...p, rotationDeg: Number(e.target.value) }))
                    }
                    className="w-full accent-[#B75E40]"
                  />
                </label>

                <label className="block pt-2 border-t border-white/10 text-center cursor-pointer text-[#DCC9A6] hover:underline">
                  <span>Switch to Uploaded Portrait</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="sr-only"
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Museum Filter Carousel & Capture Controls */}
      <div className="bg-[#1B1B1B] border-t border-white/10 px-4 sm:px-6 py-4 space-y-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label="Previous turban"
            onClick={() =>
              setSelectedIdx((i) => (i - 1 + TRY_ON_OPTIONS.length) % TRY_ON_OPTIONS.length)
            }
            className="p-2.5 border border-white/15 hover:border-[#DCC9A6] transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 4 Distinct Silhouette Carousel */}
          <div className="flex items-center gap-3 overflow-x-auto py-1">
            {TRY_ON_OPTIONS.map((opt, idx) => {
              const active = idx === selectedIdx;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`flex items-center gap-3 px-3 py-2 border text-left transition-colors shrink-0 ${
                    active
                      ? 'border-[#DCC9A6] bg-[#641F2B]/55 text-[#F6F1E7]'
                      : 'border-white/12 bg-white/5 text-[#F6F1E7]/70 hover:border-white/30'
                  }`}
                >
                  <img
                    src={opt.thumbnail}
                    alt={opt.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-cover object-top shrink-0 border border-white/15"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold whitespace-nowrap">{opt.name}</div>
                    <div className="text-[11px] text-[#DCC9A6] whitespace-nowrap">
                      {opt.region}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next turban"
            onClick={() => setSelectedIdx((i) => (i + 1) % TRY_ON_OPTIONS.length)}
            className="p-2.5 border border-white/15 hover:border-[#DCC9A6] transition-colors shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Capture Action Row */}
        {mode !== 'consent' && !cameraError && (
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-1">
            <p className="text-xs text-[#F6F1E7]/65 max-w-md">{activeOption.culturalNote}</p>

            <button
              type="button"
              onClick={handleCapture}
              className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#F6F1E7] text-[#1B1B1B] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#DCC9A6] transition-colors whitespace-nowrap shrink-0"
            >
              <Camera className="w-4 h-4" />
              Take Photo
            </button>
          </div>
        )}
      </div>

      {/* Captured Photo Preview & Share Modal */}
      {capturedDataUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Captured Turban Portrait"
        >
          <div className="bg-[#F6F1E7] text-[#1B1B1B] max-w-xl w-full border border-[#1B1B1B]/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1B1B1B]/12 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#641F2B] font-semibold">
                  PAGDI Portrait Capture
                </p>
                <h3 className="font-editorial text-xl">{activeOption.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setCapturedDataUrl(null)}
                aria-label="Close preview"
                className="p-2 hover:bg-[#EBE3D3]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#111111] flex items-center justify-center max-h-[58vh] overflow-hidden">
              <img
                src={capturedDataUrl}
                alt={`Captured portrait wearing ${activeOption.name}`}
                className="max-h-[58vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 space-y-4">
              {shareFeedback && (
                <p className="text-xs text-[#641F2B] font-medium">{shareFeedback}</p>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCapturedDataUrl(null)}
                  className="px-5 py-2.5 border border-[#1B1B1B]/25 text-xs font-semibold uppercase tracking-[0.12em]"
                >
                  Retake
                </button>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#641F2B] text-[#641F2B] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#641F2B]/5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#641F2B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#4E1620]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Save Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
