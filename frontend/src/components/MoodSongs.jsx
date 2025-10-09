import React, { useRef, useState } from "react";
import "./MoodSongs.css";

const MoodSongs = ({ Song = [] }) => { 
  const [isPlaying, setIsPlaying] = useState(null);
  const audioRefs = useRef([]);

  const handlePlayPause = (index) => {
    if (isPlaying !== null && isPlaying !== index) {
      audioRefs.current[isPlaying].pause();
      audioRefs.current[isPlaying].currentTime = 0;
    }

    if (isPlaying === index) {
      audioRefs.current[index].pause();
      setIsPlaying(null);
    } else {
      audioRefs.current[index].play();
      setIsPlaying(index);
    }
  };

  return (
    <div className="song-Container">
      <h2>Recommended Songs</h2>
      {Song.length > 0 ? (
        Song.map((song, index) => (
          <div key={index} className="song">
            <div className="title">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>

            <div className="playPauseButtons">
              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                src={song.audio}
                onEnded={() => setIsPlaying(null)}
              ></audio>

              <button onClick={() => handlePlayPause(index)}>
                {isPlaying === index ? (
                  <i className="ri-pause-line"></i>
                ) : (
                  <i className="ri-play-line"></i>
                )}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No songs available yet.</p>
      )}
    </div>
  );
};

export default MoodSongs;
