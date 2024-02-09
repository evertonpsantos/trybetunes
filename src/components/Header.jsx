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
            <Link to="/search" className="header-link">Search</Link>
            <Link to="/favorites" className="header-link">Favorites</Link>
            <Link to="/profile" className="header-link">Profile</Link>
          </nav>

        </header>
      </div>
    );
  }
}

export default Header;
