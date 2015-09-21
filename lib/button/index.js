'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var ManifestButton = (function (_React$Component) {
  _inherits(ManifestButton, _React$Component);

  function ManifestButton() {
    _classCallCheck(this, ManifestButton);

    _React$Component.apply(this, arguments);
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
})(_react2['default'].Component);

exports['default'] = ManifestButton;
module.exports = exports['default'];