import React, { useState, useRef } from 'react';

const CustomVideoPlayer = ({ videoId, isLive }) => {
  const [playerVisible, setPlayerVisible] = useState(isLive);
  const [videoPlaying, setVideoPlaying] = useState(isLive);
  const iframeRef = useRef(null);

  const handlePlay = () => {
    setPlayerVisible(true);
    setVideoPlaying(true);
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } catch (e) {
        console.log('Could not send play command to YouTube iframe');
      }
    }
  };

  const handlePause = () => {
    setVideoPlaying(false);
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } catch (e) {
        console.log('Could not send pause command to YouTube iframe');
      }
    }
  };

  const handleStop = () => {
    setVideoPlaying(false);
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      } catch (e) {
        console.log('Could not send stop command to YouTube iframe');
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="bg-black h-64 rounded-lg flex items-center justify-center overflow-hidden">
        {!playerVisible ? (
          <button
            onClick={handlePlay}
            className="text-white bg-blue-600 px-4 py-2 rounded"
          >
            Play Video
          </button>
        ) : (
          <iframe
            ref={iframeRef}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=${isLive ? 0 : 1}&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&autoplay=${isLive ? 1 : 0}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      {!isLive && (
        <div className="flex justify-between mt-2">
          <button
            onClick={handlePlay}
            className={`px-4 py-2 rounded ${videoPlaying ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
          >
            Play
          </button>
          <button
            onClick={handlePause}
            className={`px-4 py-2 rounded ${!videoPlaying ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
          >
            Pause
          </button>
          <button
            onClick={handleStop}
            className="px-4 py-2 rounded bg-gray-600 text-white"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer;