import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteTracks: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const recoveredFavorites = await getFavoriteSongs();
    this.setState({
      favoriteTracks: recoveredFavorites,
      isLoading: false,
    });
  }

  handleChange = (trackId) => {
    const { album } = this.props;
    const { favoriteTracks } = this.state;
    const alreadyExists = favoriteTracks.some((track) => track.trackId === trackId);
    const foundTrack = album.find((track) => track.trackId === trackId);

    if (!alreadyExists) {
      this.setState({ isLoading: true }, async () => {
        await addSong(foundTrack);
        const newList = await getFavoriteSongs();
        this.setState(({
          isLoading: false,
          favoriteTracks: newList,
        }));
      });
    } else {
      this.setState({ isLoading: true }, async () => {
        await removeSong(foundTrack);
        const filteredList = await getFavoriteSongs();
        this.setState(({
          favoriteTracks: filteredList,
          isLoading: false,
        }));
      });
    }
  }

  render() {
    const { album } = this.props;
    const { isLoading, favoriteTracks } = this.state;

    return (
      <ul className="track-list">
        { isLoading ? <Loading />
          : album.map((track, index) => (
            <li key={ index } id={ index } className="album-track">
              <p className="track-name">{track.trackName}</p>
              <audio
                data-testid="audio-component"
                src={ `${track.previewUrl}` }
                controls
                className="track-preview"
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="checkbox-music">
                ❤️
                <input
                  checked={ favoriteTracks
                    .some((song) => song.trackId === track.trackId) }
                  type="checkbox"
                  data-testid={ `checkbox-music-${track.trackId}` }
                  id="checkbox-music"
                  onChange={ () => this.handleChange(track.trackId) }
                />
              </label>
            </li>))}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default MusicCard;
