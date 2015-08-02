import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './index.scss';

export default class ManifestButton {
  render() {
    const {label} = this.props;

    return (
      <div className="manifestButton" onClick={this.props.action}>
        {label}
      </div>
    )
  }
}
