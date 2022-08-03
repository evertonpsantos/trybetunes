import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from './Header';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteTracks: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({
      favoriteTracks: favorites,
      isLoading: false,
    });
  }

  handleChange = (trackId) => {
    const { favoriteTracks } = this.state;
    const foundTrack = favoriteTracks.find((track) => track.trackId === trackId);

    this.setState({ isLoading: true }, async () => {
      await removeSong(foundTrack);
      const filteredList = await getFavoriteSongs();
      this.setState(({
        favoriteTracks: filteredList,
        isLoading: false,
      }));
    });
  }

  render() {
    const { favoriteTracks, isLoading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <ul className="track-list">
          { isLoading ? <p>Carregando...</p>
            : favoriteTracks.map((track, index) => (
              <li key={ index } id={ index }>
                <p>{track.trackName}</p>
                <audio
                  data-testid="audio-component"
                  src={ `${track.previewUrl}` }
                  controls
                >
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
      </div>
    );
  }
}
