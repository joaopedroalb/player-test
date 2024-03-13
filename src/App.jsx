import { useRef, useState } from 'react'

function App() {
  const [videoUrl, setVideoUrl] = useState('')
  const videoRef = useRef()

  const changeVideoUrl = (event) => {
    const newUrl = event.target.value
    videoRef.current.src = newUrl
    setVideoUrl(newUrl)
  }

  return (
    <div className='container'>
     <div className='url-container'>
      <h1>Link do video: </h1>
      <input onChange={changeVideoUrl} value={videoUrl}/>
     </div>
     <div>
      <video 
        controls width={400} controlsList="nodownload"
        onError={err=>console.error(err)} ref={videoRef}
      >
        <source type="video/webm" />
        <source type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>
     </div>
    </div>
  )
}

export default App
