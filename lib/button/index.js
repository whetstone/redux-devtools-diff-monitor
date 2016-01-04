'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ManifestButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ManifestButton(_ref) {
    var label = _ref.label;
    var action = _ref.action;

    return _react2.default.createElement(
        'div',
        { style: _style2.default.base, onClick: action },
        label
    );
}

ManifestButton.propTypes = {
    label: _react.PropTypes.string,
    action: _react.PropTypes.func
};