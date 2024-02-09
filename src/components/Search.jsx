import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import './Search.css';

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

    const albumRendering = artistAlbums
      .map(({ collectionId, collectionName, artworkUrl100, artistName }) => (
        <div key={ collectionId }>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p>{collectionName}</p>
          <p>{artistName}</p>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            Mais Detalhes
          </Link>
        </div>
      ));

    return (
      <div data-testid="page-search" className="page-container">
        <Header />
        { isLoading ? <p>Carregando...</p> : (
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
            <section>
              {/* <p className="searched-artist">
                Resultado de álbuns de:
                {' '}
                {searchedArtistName}
              </p> */}
              {albumRendering}
            </section>
          )}
      </div>
    );
  }
}
