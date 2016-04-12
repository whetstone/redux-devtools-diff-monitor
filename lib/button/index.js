'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphrodite = require('aphrodite');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManifestButton = function ManifestButton(_ref) {
  var label = _ref.label;
  var action = _ref.action;
  return _react2.default.createElement(
    'div',
    { className: (0, _aphrodite.css)(styles.button), onClick: action },
    label
  );
};

var styles = _aphrodite.StyleSheet.create({
  button: {
    flex: '1 0 auto',
    cursor: 'pointer',
    color: 'black',
    display: 'inline-block',
    padding: '10px 0',
    textAlign: 'center',
    ':hover': {
      backgroundColor: '#eee'
    }
  }
});

ManifestButton.propTypes = {
  label: _react.PropTypes.string,
  action: _react.PropTypes.func
};

exports.default = ManifestButton;