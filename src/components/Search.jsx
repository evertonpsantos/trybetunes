import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      isDisabled: true,
      isLoading: false,
      artistAlbums: [],
      showAlbums: false,
      searchedArtistName: '',
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
        searchedArtistName: inputText,
        isLoading: false,
        showAlbums: true,
      });
    });
  }

  render() {
    const { inputText, isDisabled, isLoading,
      showAlbums, searchedArtistName, artistAlbums } = this.state;

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
      <div data-testid="page-search">
        <Header />
        { isLoading ? <p>Carregando...</p> : (
          <form>
            <label htmlFor="search-artist-input">
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Nome do artista"
                id="search-artist-input"
                name="inputText"
                value={ inputText }
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="submit"
              data-testid="search-artist-button"
              id="search-button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
        )}
        { showAlbums && artistAlbums.length === 0 ? <p>Nenhum álbum foi encontrado</p>
          : (
            <section>
              <p>
                Resultado de álbuns de:
                {' '}
                {searchedArtistName}
              </p>
              {albumRendering}
            </section>
          )}
      </div>
    );
  }
}
