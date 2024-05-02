import { useState } from 'react'
import MultiPlayer from './component/MultiPlayer'

function App() {
  const [videoCount, setVideoCount] = useState(2)
  const [videosUrl, setVideosUrl] = useState([])
  const [videos, setVideos] = useState([])

  const changeVideoUrl = (newUrl, index) => {
    const newArr = videosUrl
    newArr[index] = newUrl
    setVideosUrl([...newArr])
  }

  const handleChangeCountVideo = (newValue) => {
    setVideoCount(newValue)
    setVideos([])
    setVideosUrl([])
  }

  const handleAddVideo = () => {
    setVideos([])
    const filterArr = videosUrl.filter(x=>x!=='')
    setVideos(filterArr)
  }

  const closeVideos = () => {
    setVideos([])
  }

  const InputsVideo = () =>  (
    <div className='input-container'>
      {
        Array.from({length: videoCount}, (_, index) => <input onBlur={({target})=>changeVideoUrl(target.value, index)} defaultValue={videosUrl[index]} key={index}/>)
      }
    </div>
  )

  const formatVideos = videos.map((value, index)=>{
    return {
      url: value, title: 'Video '+(1+index)
    }
  })

  return (
    <div className='container'>
     <div className='url-container'>
      <h1>Digite os Url dos videos</h1>
      <select defaultValue={videoCount} onChange={(({target})=>handleChangeCountVideo(target.value))} className='select-box'>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select>
      <button onClick={handleAddVideo}>Adicionar</button>

      <InputsVideo/>
      
     </div>
     <MultiPlayer videos={formatVideos} handleClose={closeVideos}/>
    </div>
  )
}

export default App
