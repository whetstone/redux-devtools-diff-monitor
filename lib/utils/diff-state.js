'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepDiff = require('deep-diff');

var _deepDiff2 = _interopRequireDefault(_deepDiff);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (current, previous) {
  var newState = _immutable2.default.fromJS(current).toJS().state;
  var oldState = _immutable2.default.fromJS(previous).toJS().state;

  console.log('Diffing', oldState, newState);
  var diff = _deepDiff2.default.diff(oldState, newState);

  return diff || [];
};