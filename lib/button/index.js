'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var ManifestButton = (function () {
  function ManifestButton() {
    _classCallCheck(this, ManifestButton);
  }

  ManifestButton.prototype.render = function render() {
    var label = this.props.label;

    return _react2['default'].createElement(
      'div',
      { style: _style2['default'].base, onClick: this.props.action },
      label
    );
  };

  return ManifestButton;
})();

exports['default'] = ManifestButton;
module.exports = exports['default'];