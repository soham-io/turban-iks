import { useEffect, useState } from 'react';

const VIDEO_SOURCE = '/videos/documentary.mp4';

type VideoStatus = 'checking' | 'ready' | 'missing' | 'error';

export function ShortFilmPlayer() {
  const [videoStatus, setVideoStatus] = useState<VideoStatus>('checking');
  const [playbackFailed, setPlaybackFailed] = useState(false);

  useEffect(() => {
    let active = true;

    fetch(VIDEO_SOURCE, { method: 'HEAD' })
      .then((response) => {
        if (!active) return;
        const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
        if (response.status === 404 || contentType.includes('text/html')) {
          setVideoStatus('missing');
        } else if (response.ok && contentType.startsWith('video/mp4')) {
          setVideoStatus('ready');
        } else {
          setVideoStatus('error');
        }
      })
      .catch(() => {
        if (active) setVideoStatus('error');
      });

    return () => {
      active = false;
    };
  }, []);

  const message =
    videoStatus === 'checking'
      ? 'Checking for the documentary video…'
      : videoStatus === 'missing'
        ? 'Documentary video not found. Add your file at public/videos/documentary.mp4, then refresh this page.'
        : 'The documentary video could not be loaded. Check that public/videos/documentary.mp4 is a valid MP4 file, then refresh this page.';

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
          {videoStatus === 'ready' && playbackFailed
            ? 'The documentary video could not be played. Check that public/videos/documentary.mp4 is a valid MP4 file, then refresh this page.'
            : message}
        </div>
      )}
    </div>
  );
}
