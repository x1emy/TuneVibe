import React, { useState } from "react";

export default function SongCard({ song }) {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const newAudio = new Audio(song.previewUrl);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
      newAudio.addEventListener("ended", () => setIsPlaying(false));
    }
  };

  return (
    <div className="song-card">
      <img src={song.artworkUrl100} alt={song.trackName} />
      <div>
        <h3>{song.trackName}</h3>
        <p>{song.artistName}</p>
        <div className="actions">
          <button onClick={handlePlayPause}>
            {isPlaying ? "⏸ Pause" : "▶️ Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
