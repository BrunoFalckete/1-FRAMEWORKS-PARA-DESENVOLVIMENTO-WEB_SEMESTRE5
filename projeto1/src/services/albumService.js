class AlbumService {
  async getAllAlbums() {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    return await response.json();
  }
}

export default AlbumService;
