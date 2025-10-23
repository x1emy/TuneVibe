import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ArtistInfo from "./components/ArtistInfo";
import SongList from "./components/SongList";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [artistInfo, setArtistInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(null);
  const [randomSong, setRandomSong] = useState(null);

  // 🎵 Функция для загрузки песен по имени артиста
  const fetchSongs = async (artist) => {
    try {
      setLoading(true);
      setError(null);
      setSongs([]);
      setArtistInfo(null);

      // 1️⃣ iTunes API — песни
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&media=music&limit=12`
      );
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      if (data.results.length === 0) throw new Error("No songs found.");
      setSongs(data.results);

      // 2️⃣ TheAudioDB API — информация об исполнителе
      const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artist)}`;
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const infoRes = await fetch(proxyUrl);
      const infoData = await infoRes.json();

      if (infoData.artists && infoData.artists.length > 0) {
        setArtistInfo(infoData.artists[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🎶 Получаем случайного артиста при первом запуске
  useEffect(() => {
    const randomArtists = ["Adele", "Coldplay", "Drake"];
    const random = randomArtists[Math.floor(Math.random() * randomArtists.length)];
    fetchSongs(random);
  }, []);

  // 🔍 Поиск
  const handleSearch = () => {
    if (!query.trim()) {
      setError("Please enter an artist name.");
      return;
    }
    fetchSongs(query.trim());
  };

  // 🔄 Очистка
  const handleClear = () => {
    setQuery("");
    setSongs([]);
    setArtistInfo(null);
    setError(null);
    if (audio) audio.pause();
  };

  // 🎯 Рандомный артист
  const handleFeelingLucky = () => {
    const artists = ["The Weeknd", "Adele", "Eminem", "Dua Lipa", "Coldplay", "Drake"];
    const random = artists[Math.floor(Math.random() * artists.length)];
    setQuery(random);
    fetchSongs(random);
  };

  // ▶️ Проигрывание
  const handlePlayPreview = (previewUrl) => {
    if (audio) audio.pause();
    const newAudio = new Audio(previewUrl);
    newAudio.play();
    setAudio(newAudio);
  };

  // ⏹️ Остановка
  const handleStopPreview = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
  };

  // 🎵 Рандомная песня дня
  const fetchRandomSong = async () => {
    try {
      const genres = ["pop", "rock", "hiphop", "jazz", "indie"];
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      const res = await fetch(
        `https://itunes.apple.com/search?term=${randomGenre}&media=music&limit=1`
      );
      const data = await res.json();
      if (data.results.length > 0) {
        setRandomSong(data.results[0]);
      }
    } catch (error) {
      console.error("Ошибка загрузки рандомной песни:", error);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🎧 TuneVibe</h1>
        <p>Discover artists, songs & a random tune of the day 🎶</p>
      </header>

      {/* 🌈 Рандомная песня дня */}
      {randomSong && (
        <div className="random-song neon-card">
          <h2>🎵 Song of the Day</h2>
          <img
            src={randomSong.artworkUrl100}
            alt="cover"
            className="song-cover"
          />
          <p className="song-title">{randomSong.trackName}</p>
          <p className="song-artist">{randomSong.artistName}</p>
          <div className="song-buttons">
            <button onClick={() => handlePlayPreview(randomSong.previewUrl)}>
              ▶️ Play
            </button>
            <button onClick={handleStopPreview}>⏹ Stop</button>
            <button onClick={fetchRandomSong}>🔄 Next</button>
          </div>
        </div>
      )}

      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        onClear={handleClear}
        onLucky={handleFeelingLucky}
      />

      <main>
        {loading && <div className="loading">Loading...</div>}
        {error && !loading && <div className="error">{error}</div>}
        {!loading && artistInfo && <ArtistInfo info={artistInfo} />}
        {!loading && !error && (
          <SongList songs={songs} onPlay={handlePlayPreview} onStop={handleStopPreview} />
        )}
      </main>

      <footer>© 2025 TuneVibe — made by ballgimn 💜</footer>
    </div>
  );
}
