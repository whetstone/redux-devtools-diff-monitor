'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var ManifestActionComponent = (function (_React$Component) {
  _inherits(ManifestActionComponent, _React$Component);

  function ManifestActionComponent() {
    _classCallCheck(this, ManifestActionComponent);

    _React$Component.call(this);
    this.state = {
      expanded: false
    };
  }

  ManifestActionComponent.prototype.render = function render() {
    var _props = this.props;
    var action = _props.action;
    var length = _props.diff.length;
    var skipped = _props.skipped;

    if (length > 0) {
      _style2['default'].title.background = 'lightgreen';
    }

    if (skipped) {
      _style2['default'].title.background = 'black';
      _style2['default'].title.color = 'white';
    }

    var actionBlock = this.state.expanded ? _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'pre',
        null,
        JSON.stringify(action)
      )
    ) : null;

    var changes = [];
    if (diff.length > 0) {
      changes = diff.map(this.renderDiff.bind(this));
    }

    var storeBlock = this.state.expanded && diff.length > 0 ? _react2['default'].createElement(
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

    var enableToggle = this.props.skipped ? 'enable' : 'disable';

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'div',
        { style: _style2['default'].base },
        _react2['default'].createElement(
          'div',
          { style: _style2['default'].title },
          _react2['default'].createElement(
            'span',
            { onClick: this.expandAction.bind(this) },
            action.type
          ),
          _react2['default'].createElement(
            'span',
            { style: _style2['default'].toggle, onClick: this.disableAction.bind(this) },
            enableToggle
          )
        ),
        actionBlock,
        storeBlock
      )
    );
  };

  ManifestActionComponent.prototype.renderDiff = function renderDiff(diff, index) {
    var oldValue = JSON.stringify(diff.lhs);
    var newValue = JSON.stringify(diff.rhs);

    return _react2['default'].createElement(
      'span',
      { key: index },
      diff.path.join('.'),
      ': ',
      _react2['default'].createElement(
        'span',
        { style: _style2['default'].storeOld },
        oldValue
      ),
      ' ',
      newValue,
      _react2['default'].createElement('br', null)
    );
  };

  ManifestActionComponent.prototype.expandAction = function expandAction() {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  ManifestActionComponent.prototype.disableAction = function disableAction() {
    this.props.toggleAction(this.props.index);
  };

  return ManifestActionComponent;
})(_react2['default'].Component);

exports['default'] = ManifestActionComponent;
module.exports = exports['default'];