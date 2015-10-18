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

var _reduxDevtools = require('redux-devtools');

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _utilsDiffState = require('./utils/diff-state');

var _utilsDiffState2 = _interopRequireDefault(_utilsDiffState);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var reset = _reduxDevtools.ActionCreators.reset;
var rollback = _reduxDevtools.ActionCreators.rollback;
var commit = _reduxDevtools.ActionCreators.commit;
var sweep = _reduxDevtools.ActionCreators.sweep;
var toggleAction = _reduxDevtools.ActionCreators.toggleAction;

var ManifestComponent = (function (_Component) {
  _inherits(ManifestComponent, _Component);

  function ManifestComponent() {
    var _this = this;

    _classCallCheck(this, ManifestComponent);

    _Component.apply(this, arguments);

    this.handleRollback = function () {
      _this.props.dispatch(rollback());
    };

    this.handleSweep = function () {
      _this.props.dispatch(sweep());
    };

    this.handleCommit = function () {
      _this.props.dispatch(commit());
    };

    this.handleReset = function () {
      _this.props.dispatch(reset());
    };
  }

  ManifestComponent.prototype.jumpingTo = function jumpingTo(index) {
    this.props.jumpToState(index);
  };

  ManifestComponent.prototype.renderAction = function renderAction(action, index) {
    var diffedStates = _utilsDiffState2['default'](this.props.computedStates, index);
    var skippingAction = this.props.skippedActionIds.indexOf(action.id) !== -1;

    return _react2['default'].createElement(_action2['default'], {
      action: action,
      index: index,
      key: index,
      diff: diffedStates,
      skipped: skippingAction,
      toggleAction: this.props.toggleAction.bind(this, index),
      jumpTo: this.jumpingTo.bind(this, index)
    });
  };

  ManifestComponent.prototype.render = function render() {
    var actionReports = this.props.stagedActions.map(this.renderAction.bind(this));
    var visible = this.state.visible;

    return _react2['default'].createElement(
      'div',
      { style: [_style2['default'].base, visible && _style2['default'].hidden]
      },
      _react2['default'].createElement(
        'div',
        { style: _style2['default'].controls },
        _react2['default'].createElement(_button2['default'], { label: 'Commit', action: this.handleCommit }),
        _react2['default'].createElement(_button2['default'], { label: 'Rollback', action: this.handleRollback }),
        _react2['default'].createElement(_button2['default'], { label: 'Reset', action: this.handleReset })
      ),
      actionReports.reverse()
    );
  };

  _createClass(ManifestComponent, null, [{
    key: 'reducer',
    value: function value() {},
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      // Stuff you can use
      dispatch: _react.PropTypes.func,
      computedStates: _react.PropTypes.array,
      actionsByIds: _react.PropTypes.object,
      stagedActionIds: _react.PropTypes.array,
      skippedActionIds: _react.PropTypes.array
    },
    enumerable: true
  }]);

  return ManifestComponent;
})(_react.Component);

exports['default'] = _radium2['default'](ManifestComponent);
module.exports = exports['default'];