import React from 'react';
import Header from './Header';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      isDisabled: true,
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

  render() {
    const { inputText, isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>

        </form>
      </div>
    );
  }
}
