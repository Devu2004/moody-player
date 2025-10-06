import React, {useState}from 'react'
import './MoodSongs.css'


const MoodSongs = () => {
    const [Song, setSong] = useState([
        {
            title:'testing-1',
            artist:'artist-1',
            url:'url-1'
        },
        {
            title:'testing-2',
            artist:'artist-2',
            url:'url-2'
        },
        {
            title:'testing-3',
            artist:'artist-3',
            url:'url-1'
        }
    ])
  return (
    <>
    <div className='song-Container'>
        <h2>Recommended Songs</h2>
        {Song.map((song,index)=>(
            <div key={index} className='song'>
                <div className="title">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                </div>
                <div className="playPauseButtons">
                    <i class="ri-play-line"></i>
                    <i class="ri-pause-line"></i>
                </div>
            </div>
        ))}
    </div>
    </>
  )
}

export default MoodSongs