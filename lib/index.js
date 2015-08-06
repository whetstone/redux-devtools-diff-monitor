'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _deepDiff = require('deep-diff');

var _deepDiff2 = _interopRequireDefault(_deepDiff);

var _mousetrap = require('mousetrap');

var _mousetrap2 = _interopRequireDefault(_mousetrap);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var ManifestComponent = (function (_React$Component) {
  _inherits(ManifestComponent, _React$Component);

  function ManifestComponent() {
    _classCallCheck(this, ManifestComponent);

    _React$Component.call(this);
    this.state = {
      visible: true
    };
  }

  // ({ index })

  ManifestComponent.prototype.componentDidMount = function componentDidMount() {
    var self = this;
    Mousetrap.bind(['ctrl+h', 'ctrl+]'], function (e) {
      self.toggleVisibility();
      return false;
    });
  };

  ManifestComponent.prototype.toggleVisibility = function toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  };

  ManifestComponent.prototype.componentWillUnmount = function componentWillUnmount() {
    Mousetrap.unbind(['ctrl+h', 'ctrl+]']);
  };

  ManifestComponent.prototype.render = function render() {
    var actionReports = this.props.stagedActions.map(this.renderAction.bind(this));
    var visible = this.state.visible;
    var _props = this.props;
    var commit = _props.commit;
    var rollback = _props.rollback;
    var reset = _props.reset;

    return _react2['default'].createElement(
      'div',
      { style: [_style2['default'].base, visible && _style2['default'].hidden]
      },
      _react2['default'].createElement(
        'div',
        { style: _style2['default'].controls },
        _react2['default'].createElement(_button2['default'], { label: 'Commit', action: commit }),
        _react2['default'].createElement(_button2['default'], { label: 'Rollback', action: rollback }),
        _react2['default'].createElement(_button2['default'], { label: 'Reset', action: reset })
      ),
      actionReports.reverse()
    );
  };

  ManifestComponent.prototype.renderAction = function renderAction(action, index) {
    var newState = undefined,
        oldState = undefined,
        diff = undefined;
    if (index !== 0) {
      newState = this.props.computedStates[index].state;
      oldState = this.props.computedStates[index - 1].state;
      diff = _deepDiff2['default'].diff(oldState, newState);
    }

    var skippingAction = this.props.skippedActions[index] === true;

    return _react2['default'].createElement(_action2['default'], { action: action,
      index: index,
      key: index,
      diff: diff || [],
      skipped: skippingAction,
      toggleAction: this.props.toggleAction.bind(this, index),
      jumpTo: this.jumpingTo.bind(this, index) });
  };

  ManifestComponent.prototype.jumpingTo = function jumpingTo(index) {
    this.props.jumpToState(index);
  };

  _createClass(ManifestComponent, null, [{
    key: 'propTypes',
    value: {
      // Stuff you can use
      computedStates: _react.PropTypes.array.isRequired,
      currentStateIndex: _react.PropTypes.number.isRequired,
      stagedActions: _react.PropTypes.array.isRequired,
      skippedActions: _react.PropTypes.object.isRequired,

      // Stuff you can do
      reset: _react.PropTypes.func.isRequired,
      commit: _react.PropTypes.func.isRequired,
      rollback: _react.PropTypes.func.isRequired,
      sweep: _react.PropTypes.func.isRequired,
      toggleAction: _react.PropTypes.func.isRequired, // ({ index })
      jumpToState: _react.PropTypes.func.isRequired },
    enumerable: true
  }]);

  return ManifestComponent;
})(_react2['default'].Component);

exports['default'] = _radium2['default'](ManifestComponent);
module.exports = exports['default'];