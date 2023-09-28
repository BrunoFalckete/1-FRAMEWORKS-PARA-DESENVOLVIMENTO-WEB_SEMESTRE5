import { Component } from "react";
import "../index.css";
import AlbumService from "../services/albumService";
import PhotoService from "../services/photoService";
import { loadAlbums } from "../utils/load-albums";

class Album extends Component {
  state = {
    albums: [],
  };

  componentDidMount() {
    this.loadAlbums();
  }

  loadAlbums = async () => {
    const albumService = new AlbumService();
    const photoService = new PhotoService();

    const albumsWithPhotos = await loadAlbums(photoService, albumService);

    this.setState({ albums: albumsWithPhotos });
  };

  render() {
    return (
      <div className="container">
        <div className="albums">
          {this.state.albums.map((album) => (
            <div className="post" key={album.id}>
              <img src={album.image} />
              <span>{album.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Album;
