import { useState, useRef, useEffect } from 'react';

export const useVideoControls = (playerRef) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeContainerRef = useRef(null);
  const startY = useRef(null);

  // Các hàm điều khiển video
  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleMute = () => setIsMuted(!isMuted);

  const seekForward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + 10, "seconds");
  };

  const seekBackward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime - 10, "seconds");
  };

  const handleProgress = (state) => setPlayed(state.played);

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setPlayed(newTime);
    playerRef.current.seekTo(newTime, "fraction");
  };

  const handleDuration = (duration) => setDuration(duration);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) setIsMuted(false);
  };

  const toggleVolumeSlider = () => setShowVolumeSlider(!showVolumeSlider);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!startY.current) return;
    e.preventDefault();
    const deltaY = startY.current - e.touches[0].clientY;
    const newVolume = Math.min(1, Math.max(0, volume + deltaY * 0.005));
    setVolume(newVolume);
  };

  const handleTouchEnd = () => {
    startY.current = null;
  };

  const toggleFullScreen = (containerRef) => {
    const videoElement = playerRef.current?.getInternalPlayer();
    if (videoElement?.webkitEnterFullscreen) {
      videoElement.webkitEnterFullscreen();
    } else if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.mozRequestFullScreen) {
      containerRef.current.mozRequestFullScreen();
    } else if (containerRef.current.msRequestFullscreen) {
      containerRef.current.msRequestFullscreen();
    }
  };

  // Effect quản lý fullscreen
  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  // Effect quản lý click ngoài thanh âm lượng
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (volumeContainerRef.current && !volumeContainerRef.current.contains(event.target)) {
        setShowVolumeSlider(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    isPlaying,
    isMuted,
    volume,
    played,
    duration,
    fullScreen,
    showVolumeSlider,
    volumeContainerRef,
    handlePlayPause,
    handleMute,
    seekForward,
    seekBackward,
    handleProgress,
    handleSeek,
    handleDuration,
    handleVolumeChange,
    toggleVolumeSlider,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    toggleFullScreen
  };
};