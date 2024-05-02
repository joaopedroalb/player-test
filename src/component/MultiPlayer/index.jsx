import React, { useState, useRef, useEffect } from 'react';
import './style.scss'
import VideoRange from '../RangeVideo';
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";

const GRID_VIDEO_STYLES = {
  TWO_VIDEOS: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: '317px',
    gridTemplateColumns: '424px 424px',
    gap: '8px',
    justifyContent: 'center',
  },
  THREE_FOUR_VIDEOS: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: '200px 200px',
    gridTemplateColumns: '280px 280px',
    gap: '8px',
    justifyContent: 'center',
  },
  FIVE_MORE_VIDEOS: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: '200px 200px',
    gridTemplateColumns: '280px 280px 280px',
    gap: '8px',
    justifyContent: 'center',
  }
}

const GRID_INFO_STYLES = {
  BIG: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: '317px',
    gridTemplateColumns: '424px 424px',
    gap: '8px',
    justifyContent: 'center',
  },
  SMALL: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: '200px 200px',
    gridTemplateColumns: '280px 280px',
    gap: '8px',
    justifyContent: 'center',
  },
}


const MultiPlayer = ({ videos, handleClose }) => {
  if (!videos || videos.length <= 1)
    return null

  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const videoRefs = useRef(videos.map(() => React.createRef()));

  const isEndVideo = progress >= duration 

  const GRID_VIDEO_STYLE = videos.length == 2 ? GRID_VIDEO_STYLES.TWO_VIDEOS :  videos.length < 5 ? GRID_VIDEO_STYLES.THREE_FOUR_VIDEOS : GRID_VIDEO_STYLES.FIVE_MORE_VIDEOS 

  const updateVideos = () => {
    let maxDuration = 0
    videoRefs.current.forEach((ref, index) => {
      const video = ref.current;
      if (video) {
        video.src = videos[index].url;
        video.load();
        video.onloadedmetadata = () => {
          maxDuration = Math.max(maxDuration, video.duration)
          setDuration(maxDuration);
        };
      }
    });
  }

  useEffect(() => {
    updateVideos();
  }, [videos]);

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        if (!isEndVideo) 
          setProgress(prevProgress => prevProgress + 0.1)
        else 
          setPlaying(false)
      }, 100);
      return () => clearInterval(interval);
    }
  }, [playing, progress, duration]);

  const handleProgressChange = (e) => {
    const newValue = parseFloat(e.target.value)
    const percentage = (newValue / 100) * duration
    setProgress(percentage)
    videoRefs.current.forEach(ref => {
      const video = ref.current;
      if (video) {
        video.currentTime = percentage
      }
    })
  };

  const handlePlayPause = () => {
    if (isEndVideo) 
      setProgress(0)
    

    setPlaying(prevPlaying => !prevPlaying);
    videoRefs.current.forEach(ref => {
      const video = ref.current;
      if (video) {
        if (playing) {
          video.pause();
        } else {
          video.play();
        }
      }
    });
  };

  const getDuration = (seconds) => {
      if (!seconds || isNaN(seconds)) 
          return '00:00'
      
      let minutes = Math.floor(seconds / 60);
      let restSeconds = Math.floor(seconds % 60);
  
      let formatMinutes = minutes < 10 ? "0" + minutes : minutes;
      let formatSeconds = restSeconds < 10 ? "0" + restSeconds : restSeconds;
  
      return formatMinutes + ":" + formatSeconds;
  }

  return (
    <div className='multiplayer-bg' onClick={handleClose}>
      <div className='multiplayer' onClick={(event)=>{event.stopPropagation()}}>
        <header className='multiplayer__header'>
          <span>Visão Multi Câmera</span>
          <FaTimes className='icon' onClick={handleClose}/>
        </header>
        <div style={GRID_VIDEO_STYLE}>
          {videos.map((video, index) => (
            <div key={index} className='video-content'>
              <span className='video-title'>
                {video.title}
              </span>
              <video
                ref={videoRefs.current[index]}
                controls={false}
                src={video.url}
              />
            </div>
          ))}
        </div>
        <div className='controls-video'>
          <button onClick={handlePlayPause} className='play-btn'>
          {!playing || isEndVideo ? <FaPlay/> : <FaPause/>}
          </button>
          <div className='duration-container'>
            <span className='current-duration'>{getDuration(progress)}</span>
            /
            <span className='max-duration'>{getDuration(duration)}</span>
          </div>
          <VideoRange percentage={progress} onChange={handleProgressChange} maxDuration={duration}/>
        </div>
      </div>
    </div>
  );
};

export default MultiPlayer;
