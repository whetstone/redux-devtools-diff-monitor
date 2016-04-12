import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

const ManifestButton = ({ label, action }) => (
  <div className={css(styles.button)} onClick={action}>
    {label}
  </div>
);

const styles = StyleSheet.create({
  button: {
    flex     : '1 0 auto',
    cursor   : 'pointer',
    color    : 'black',
    display  : 'inline-block',
    padding  : '10px 0',
    textAlign: 'center',
    ':hover' : {
      backgroundColor: '#eee',
    },
  },
});

ManifestButton.propTypes = {
  label : PropTypes.string,
  action: PropTypes.func,
};

export default ManifestButton;
