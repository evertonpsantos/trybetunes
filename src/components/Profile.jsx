import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import './Profile.css';
import Loading from './Loading';

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
      <div className="profile-page">
        <div className="profile-image-container">
          <img
            data-testid="profile-image"
            src={ image }
            alt={ name }
            className="profile-image"
          />
        </div>
        <div className="profile-info-container">
          <p className="profile-info">
            { name }
          </p>
          <p className="profile-info">
            { email }
          </p>
          <p className="profile-info">
            { description }
          </p>
          <Link to="/profile/edit" className="edit-profile-button">Edit profile</Link>
        </div>
      </div>
    );

    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : userInfo }
      </div>
    );
  }
}
