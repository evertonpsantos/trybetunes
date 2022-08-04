import React from 'react';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';

export default class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      name: '',
      image: '',
      description: '',
      email: '',
      buttonDisabled: true,
    };
  }

  async componentDidMount() {
    const response = await getUser();

    this.setState({
      name: response.name,
      image: response.image,
      description: response.description,
      email: response.email,
      isLoading: false,
    });
  }

  handleChange = ({ target }) => {
    const { value, name: nameTarget } = target;

    this.setState({ [nameTarget]: value }, () => {
      const { name, image, description, email } = this.state;

      if (!name || !image || !description || !email || !email.includes('@')) {
        return this.setState({ buttonDisabled: true });
      }
      this.setState({ buttonDisabled: false });
    });
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { name, image, description, email } = this.state;
    const { history } = this.props;
    const newInfo = {
      name,
      image,
      description,
      email,
    };
    await updateUser(newInfo);
    history.push('/profile');
  }

  render() {
    const { name, image, description, email, isLoading, buttonDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <label htmlFor="edit-input-name">
            {/* Nome: */}
            <input
              type="text"
              data-testid="edit-input-name"
              value={ name }
              id="edit-input-name"
              onChange={ this.handleChange }
              name="name"
            />
          </label>

          <label htmlFor="edit-input-email">
            {/* E-mail: */}
            <input
              type="email"
              data-testid="edit-input-email"
              value={ email }
              id="edit-input-email"
              onChange={ this.handleChange }
              name="email"
            />
          </label>

          <label htmlFor="edit-input-description">
            {/* Descrição: */}
            <textarea
              data-testid="edit-input-description"
              value={ description }
              id="edit-input-description"
              onChange={ this.handleChange }
              name="description"
            />
          </label>

          <label htmlFor="edit-input-image">
            {/* Imagem: */}
            <input
              type="text"
              data-testid="edit-input-image"
              value={ image }
              id="edit-input-image"
              onChange={ this.handleChange }
              name="image"
            />
          </label>

          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Editar perfil

          </button>

        </form>
      </div>
    );
  }
}
