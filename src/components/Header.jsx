import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
    };
  }

  async componentDidMount() {
    const recoveredUser = await getUser();
    this.setState({ user: recoveredUser }, () => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { user, isLoading } = this.state;

    return (
      <div className="header-container">
        <header data-testid="header-component" className="header-component">
          { isLoading ? <p>Carregando...</p>
            : <p className="header-user-name">{user.name}</p>}
          <nav>
            <Link to="/search" data-testid="link-to-search">Buscar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>

        </header>
      </div>
    );
  }
}

export default Header;
