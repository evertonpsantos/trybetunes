import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import './Login.css';
import Loading from './Loading';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      enableButton: true,
      userName: '',
      isLoading: false,
    };
  }

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    const MIN_CHARS = 3;

    this.setState({ [name]: value }, () => {
      if (value.length >= MIN_CHARS) {
        return this.setState({ enableButton: false,
        });
      }
      this.setState({ enableButton: true });
    });
  }

  handleButtonClick = (event) => {
    event.preventDefault();
    const { userName } = this.state;
    const { history } = this.props;

    this.setState({ isLoading: true }, async () => {
      await createUser({ name: userName });
      history.push('/search');
    });
  }

  render() {
    const { enableButton, userName, isLoading } = this.state;

    return (
      <div data-testid="page-login" className="login-form-container">
        { isLoading ? <Loading /> : (
          <form className="login-form">
            <p className="login-form-title">TrybeTunes</p>
            <input
              data-testid="login-name-input"
              id="login-name-input"
              onChange={ this.handleChangeInput }
              name="userName"
              value={ userName }
              placeholder="Name"
              className="login-name-input"
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              id="login-submit-button"
              disabled={ enableButton }
              onClick={ this.handleButtonClick }
              className={ enableButton
                ? 'login-button' : 'login-button-enabled login-button' }
            >
              Login
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
