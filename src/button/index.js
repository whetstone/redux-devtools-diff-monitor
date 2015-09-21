import React, { PropTypes } from 'react';
import style from './style';

export default class ManifestButton extends React.Component {
  render() {
    const { label, action } = this.props;

    return (
      <div style={style.base} onClick={action}>
        {label}
      </div>
    );
  }
}
