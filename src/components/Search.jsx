/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import './Search.css';
import Loading from './Loading';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      isDisabled: true,
      isLoading: false,
      artistAlbums: [],
      showAlbums: false,
      // searchedArtistName: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      if (value.length >= 2) {
        return this.setState({ isDisabled: false });
      }
      this.setState({ isDisabled: true });
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { inputText } = this.state;
    this.setState({ isLoading: true, inputText: '' }, async () => {
      const results = await searchAlbumsAPI(inputText);
      this.setState({
        artistAlbums: results,
        // searchedArtistName: inputText,
        isLoading: false,
        showAlbums: true,
      });
    });
  }

  render() {
    const { inputText, isDisabled, isLoading,
      showAlbums, artistAlbums } = this.state;

    const maxLength = 12;

    const albumRendering = artistAlbums
      .map(({ collectionId, collectionName, artworkUrl100, artistName }) => (
        <div key={ collectionId } className="search-album-card">
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
            className="album-details-link"
          >
            <img
              src={ artworkUrl100 }
              alt={ collectionName }
              className="img-search-album"
            />
            <p>
              {
                collectionName.length < maxLength ? collectionName
                  : `${collectionName.slice(0, maxLength)} ...`
              }
            </p>
            <p>
              { artistName.length < maxLength ? artistName
                : `${artistName.slice(0, maxLength)} ...`}
            </p>
          </Link>
        </div>
      ));

    return (
      <div data-testid="page-search" className="page-container">
        <Header />
        { isLoading ? <Loading /> : (
          <form className="form-search">
            <label htmlFor="search-artist-input">
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Search for an artist or album"
                id="search-artist-input"
                name="inputText"
                value={ inputText }
                onChange={ this.handleChange }
                className="search-input"
              />
            </label>

            <button
              type="submit"
              data-testid="search-artist-button"
              id="search-button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
              className="search-button"
            >
              🔎
            </button>
          </form>
        )}
        { showAlbums && artistAlbums.length === 0 ? <p>Nenhum álbum foi encontrado</p>
          : (
            <section className="results-section">
              {/* { searchedArtistName
              && <p className="searched-artist">
                {`Results for: ${searchedArtistName}`}
              </p>} */}
              {albumRendering}
            </section>
          )}
      </div>
    );
  }
}
