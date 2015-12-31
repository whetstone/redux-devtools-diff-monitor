import React, { PropTypes } from 'react';
import style from './style';

export default function ManifestButton({ label, action }) {
    return (
        <div style={style.base} onClick={action}>
            {label}
        </div>
    );
}

ManifestButton.propTypes = {
    label: PropTypes.string,
    action: PropTypes.func,
};
