import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import './Album.css';
import Loading from './Loading';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      albumInfo: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({ albumInfo: { ...result[0] }, album: result });
  }

  render() {
    const { album, albumInfo } = this.state;
    const onlyTracks = album.slice(1);

    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-details-page">
          { albumInfo.artworkUrl100 ? <img
            src={ albumInfo.artworkUrl100 }
            alt={ albumInfo.collectionName }
            className="album-cover"
          /> : <Loading />}

          <span
            data-testid="artist-name"
            className="artist-name"
          >
            {String(albumInfo.artistName).toUpperCase()}
          </span>
          <span
            data-testid="album-name"
            className="album-name"
          >
            {albumInfo.collectionName}
          </span>
          <MusicCard album={ onlyTracks } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
