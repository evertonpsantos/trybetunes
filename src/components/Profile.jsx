import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      description: '',
      email: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const response = await getUser();
    this.setState(({
      name: response.name,
      image: response.image,
      description: response.description,
      email: response.email,
      isLoading: false,
    }));
  }

  render() {
    const { name, image, description, email, isLoading } = this.state;

    const userInfo = (
      <div>
        <img data-testid="profile-image" src={ image } alt={ name } />
        <p>
          { name }
        </p>
        <p>
          { email }
        </p>
        <p>
          { description }
        </p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );

    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <p>Carregando...</p> : userInfo }
      </div>
    );
  }
}
