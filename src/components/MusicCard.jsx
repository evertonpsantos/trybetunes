import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { album } = this.props;

    return (
      <ul className="track-list">
        { album.map((track, index) => (
          <li key={ index } id={ index }>
            <p>{track.trackName}</p>
            <audio data-testid="audio-component" src={ `${track.previewUrl}` } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
          </li>)) }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default MusicCard;
