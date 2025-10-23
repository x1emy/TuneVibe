import React, { useState } from "react";

export default function SongList({ songs }) {
  const [audio, setAudio] = useState(null);

  const handlePlay = (previewUrl) => {
    if (audio) audio.pause();
    const newAudio = new Audio(previewUrl);
    newAudio.play();
    setAudio(newAudio);
  };

  const handleStop = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
  };

  return (
    <div className="song-list">
      {songs.map((song) => (
        <div className="song-card" key={song.trackId}>
          <img src={song.artworkUrl100} alt={song.trackName} />
          <h4>{song.trackName}</h4>
          <p>{song.artistName}</p>
          <button onClick={() => handlePlay(song.previewUrl)}>▶️ Play</button>
          <button onClick={handleStop}>⏸ Stop</button>
        </div>
      ))}
    </div>
  );
}
