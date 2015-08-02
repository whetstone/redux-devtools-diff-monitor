import React, { PropTypes } from 'react';
import classNames from 'classnames';
import style from './style';

export default class ManifestButton {
  render() {
    const { label } = this.props;

    return (
      <div style={style.base} onClick={this.props.action}>
        {label}
      </div>
    );
  }
}
