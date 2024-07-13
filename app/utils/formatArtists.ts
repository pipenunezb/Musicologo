export const formatArtists = (artists: string[] | string) => {
  const artistsText = Array.isArray(artists) ? artists.join(", ") : artists

  return artistsText
}
