import React from "react";

export default function ArtistInfo({ info }) {
  return (
    <div className="artist-info">
      {info.strArtistThumb && <img src={info.strArtistThumb} alt={info.strArtist} />}
      <h2>{info.strArtist}</h2>
      <p><strong>Genre:</strong> {info.strGenre || "Unknown"}</p>
      <p><strong>Country:</strong> {info.strCountry || "N/A"}</p>
      <p>{info.strBiographyEN?.slice(0, 250) || "No biography available."}...</p>
    </div>
  );
}
