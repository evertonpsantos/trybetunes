import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';
import './ProfileEdit.css';
import Loading from './Loading';

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
    this.setState({ isLoading: true });
    await updateUser(newInfo);
    this.setState({ isLoading: false });
    history.push('/profile');
  }

  render() {
    const { name, image, description, email, isLoading, buttonDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading />
          : (
            <form className="profile-edit">
              <label htmlFor="edit-input-name">
                Name:
                <input
                  type="text"
                  data-testid="edit-input-name"
                  value={ name }
                  id="edit-input-name"
                  onChange={ this.handleChange }
                  name="name"
                  className="edit-input"
                />
              </label>

              <label htmlFor="edit-input-email">
                E-mail:
                <input
                  type="email"
                  data-testid="edit-input-email"
                  value={ email }
                  id="edit-input-email"
                  onChange={ this.handleChange }
                  name="email"
                  className="edit-input"
                />
              </label>

              <label htmlFor="edit-input-description">
                Description:
                <textarea
                  data-testid="edit-input-description"
                  value={ description }
                  id="edit-input-description"
                  onChange={ this.handleChange }
                  name="description"
                  className="edit-input"
                  maxLength="50"
                  size="1"
                />
              </label>

              <label htmlFor="edit-input-image">
                Image:
                <input
                  type="text"
                  data-testid="edit-input-image"
                  value={ image }
                  id="edit-input-image"
                  onChange={ this.handleChange }
                  name="image"
                  className="edit-input"
                />
              </label>

              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={ buttonDisabled }
                onClick={ this.handleClick }
                className="edit-btn"
              >
                Edit

              </button>

            </form>
          )}

      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
