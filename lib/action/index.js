'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var ManifestActionComponent = (function (_React$Component) {
  _inherits(ManifestActionComponent, _React$Component);

  function ManifestActionComponent() {
    var _this = this;

    _classCallCheck(this, ManifestActionComponent);

    _React$Component.call(this);

    this.getDiffs = function () {
      var diff = _this.props.diff;

      return diff.map(function (diff) {
        return _this.renderDiff(diff);
      });
    };

    this.expandAction = function () {
      _this.setState({
        expanded: !_this.state.expanded
      });
    };

    this.disableAction = function () {
      _this.props.toggleAction(_this.props.index);
    };

    this.renderDiff = function (diff, index) {
      var oldValue = JSON.stringify(diff.lhs);
      var newValue = JSON.stringify(diff.rhs);

      return _react2['default'].createElement(
        'div',
        { key: index },
        diff.path.join('.'),
        ': ',
        _react2['default'].createElement(
          'span',
          { style: _style2['default'].oldValue },
          oldValue || 'undefined'
        ),
        _react2['default'].createElement(
          'span',
          { style: _style2['default'].newValue },
          ' ',
          newValue,
          ' '
        )
      );
    };

    this.state = {
      expanded: false
    };
  }

  ManifestActionComponent.prototype.render = function render() {
    var _props = this.props;
    var action = _props.action;
    var diff = _props.diff;
    var skipped = _props.skipped;
    var expanded = this.state.expanded;

    var storeHasChanged = !!diff.length;
    var changes = this.getDiffs();

    var actionBlock = this.state.expanded ? _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'pre',
        { style: _style2['default'].actionData },
        JSON.stringify(action)
      )
    ) : null;

    var storeBlock = expanded && storeHasChanged ? _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'div',
        { style: _style2['default'].header },
        _react2['default'].createElement(
          'span',
          null,
          'Store Mutations'
        )
      ),
      _react2['default'].createElement(
        'pre',
        { style: _style2['default'].store },
        changes
      )
    ) : null;

    var enableToggle = skipped ? 'enable' : 'disable';

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'div',
        { style: _style2['default'].base },
        _react2['default'].createElement(
          'div',
          {
            style: [_style2['default'].title, diff.length && _style2['default'].mutated, skipped && _style2['default'].skipped]
          },
          _react2['default'].createElement(
            'span',
            { onClick: this.expandAction },
            action.type
          ),
          _react2['default'].createElement(
            'span',
            { style: _style2['default'].toggle, onClick: this.disableAction },
            enableToggle
          )
        ),
        actionBlock,
        storeBlock
      )
    );
  };

  return ManifestActionComponent;
})(_react2['default'].Component);

exports['default'] = _radium2['default'](ManifestActionComponent);
module.exports = exports['default'];