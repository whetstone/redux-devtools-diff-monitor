'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var ManifestButton = (function () {
  function ManifestButton() {
    _classCallCheck(this, ManifestButton);
  }

  ManifestButton.prototype.render = function render() {
    var _props = this.props;
    var label = _props.label;
    var action = _props.action;

    return _react2['default'].createElement(
      'div',
      { style: _style2['default'].base, onClick: action },
      label
    );
  };

  return ManifestButton;
})();

exports['default'] = ManifestButton;
module.exports = exports['default'];