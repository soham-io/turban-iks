import { useEffect, useState } from 'react';

const VIDEO_SOURCE = '/videos/documentary.mp4';

type VideoStatus = 'checking' | 'ready' | 'missing' | 'lfs-pointer' | 'invalid' | 'error';

export function ShortFilmPlayer() {
  const [videoStatus, setVideoStatus] = useState<VideoStatus>('checking');
  const [playbackFailed, setPlaybackFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function checkVideo() {
      try {
        const response = await fetch(VIDEO_SOURCE, {
          headers: { Range: 'bytes=0-127' },
          signal: controller.signal,
        });
        if (!active) return;

        const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
        if (response.status === 404 || contentType.includes('text/html')) {
          setVideoStatus('missing');
          return;
        }
        if (!response.ok) {
          setVideoStatus('error');
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) {
          setVideoStatus('error');
          return;
        }

        const { value = new Uint8Array() } = await reader.read();
        void reader.cancel();
        if (!active) return;

        const prefix = new TextDecoder().decode(value);
        if (prefix.startsWith('version https://git-lfs.github.com/spec/v1')) {
          setVideoStatus('lfs-pointer');
          return;
        }

        const isMp4 =
          contentType.startsWith('video/mp4') &&
          value.length >= 8 &&
          new TextDecoder().decode(value.subarray(4, 8)) === 'ftyp';
        setVideoStatus(isMp4 ? 'ready' : 'invalid');
      } catch {
        if (active && !controller.signal.aborted) {
          setVideoStatus('error');
        }
      }
    }

    void checkVideo();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const message =
    videoStatus === 'checking'
      ? 'Checking for the documentary video…'
      : videoStatus === 'missing'
        ? 'Documentary video not found. Add your file at public/videos/documentary.mp4, then refresh this page.'
        : videoStatus === 'lfs-pointer'
          ? 'Vercel is serving a Git LFS pointer instead of the video. Enable Git LFS in the Vercel project settings, then redeploy.'
          : videoStatus === 'invalid'
            ? 'The video path returned content that is not a valid MP4 file. Check that the deployed file is the actual video, not a Git LFS pointer.'
            : 'The documentary video could not be loaded. Check the video file and network connection, then refresh this page.';

  const playbackErrorMessage = playbackFailed
    ? 'The browser could not play this video. Check that it is encoded as MP4 with H.264 video and AAC audio.'
    : message;

  return (
    <div
      className="relative overflow-hidden border border-[#DCC9A6]/20 bg-[#111111] text-[#F6F1E7]"
    >
      {videoStatus === 'ready' && !playbackFailed ? (
        <video
          src={VIDEO_SOURCE}
          className="block h-auto max-h-[80vh] w-full bg-[#0D0D0D]"
          controls
          playsInline
          preload="metadata"
          onError={() => setPlaybackFailed(true)}
        />
      ) : (
        <div
          className="flex min-h-40 items-center justify-center px-6 py-10 text-center text-sm text-[#F6F1E7]/75"
          role="status"
          aria-live="polite"
        >
          {playbackErrorMessage}
        </div>
      )}
    </div>
  );
}
