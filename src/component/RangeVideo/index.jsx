import { useState, useRef, useEffect } from 'react'
import './style.scss'

function VideoRange({ percentage = 0, onChange, maxDuration = 0 }) {
  const [marginLeft, setMarginLeft] = useState(0)

  const rangeRef = useRef()
  const thumbRef = useRef()

  const currentProgress = isNaN((percentage / maxDuration) * 100) ? 0 : (percentage / maxDuration) * 100

  useEffect(() => {
    const thumbWidth = thumbRef.current.getBoundingClientRect().width
    const centerThumb = (thumbWidth / 100) * percentage * -1
    setMarginLeft(centerThumb)
  }, [percentage])

  return (
    <div className='slider-container'>
      <div
        className='progress-bar-cover'
        style={{
          width: `${currentProgress}%`
        }}
      ></div>
      <div
        className='thumb'
        ref={thumbRef}
        style={{
          left: `${currentProgress}%`,
          marginLeft: `${marginLeft}px`
        }}
      ></div>
      <input
        type='range'
        value={currentProgress}
        ref={rangeRef}
        min='0.0'
        step='any' 
        max='100.00'
        className='range'
        onChange={onChange}
      />
    </div>
  )
}

export default VideoRange