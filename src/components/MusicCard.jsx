import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteTracks: [],
      isLoading: false,
    };
  }

  handleChange = (trackId) => {
    const { album } = this.props;
    const { favoriteTracks } = this.state;
    const alreadyExists = favoriteTracks.some((track) => track.trackId === trackId);
    const foundTrack = album.find((track) => track.trackId === trackId);

    if (!alreadyExists) {
      this.setState((prevState) => ({
        favoriteTracks: [...prevState.favoriteTracks, foundTrack],
        isLoading: true,
      }), async () => {
        await addSong(foundTrack);
        this.setState({ isLoading: false });
      });
    } else {
      const filteredList = favoriteTracks.filter((track) => track.trackId !== trackId);
      this.setState({
        favoriteTracks: filteredList,
      });
    }
  }

  render() {
    const { album } = this.props;
    const { isLoading, favoriteTracks } = this.state;

    return (
      <ul className="track-list">
        { isLoading ? <p>Carregando...</p>
          : album.map((track, index) => (
            <li key={ index } id={ index }>
              <p>{track.trackName}</p>
              <audio data-testid="audio-component" src={ `${track.previewUrl}` } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="checkbox-music">
                Favorita
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
