import React from 'react';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        { isLoading ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{user.name}</p>}
      </header>
    );
  }
}

export default Header;
