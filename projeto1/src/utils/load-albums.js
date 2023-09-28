export const loadAlbums = async (photoService, albumService) => {
  const albums = await albumService.getAllAlbums();

  const photosJson = await photoService.getAllPhotos();

  const albumsWithPhotos = albums.map((album, index) => {
    return {
      ...album,
      image: photosJson[index].url,
    };
  });

  return albumsWithPhotos;
};
