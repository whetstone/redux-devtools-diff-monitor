'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _diffState = require('./utils/diff-state');

var _diffState2 = _interopRequireDefault(_diffState);

var _reduxDevtools = require('redux-devtools');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reset = _reduxDevtools.ActionCreators.reset;
var rollback = _reduxDevtools.ActionCreators.rollback;
var commit = _reduxDevtools.ActionCreators.commit;
var toggleAction = _reduxDevtools.ActionCreators.toggleAction;
var jumpToState = _reduxDevtools.ActionCreators.jumpToState;

var ManifestComponent = (function (_React$Component) {
    _inherits(ManifestComponent, _React$Component);

    function ManifestComponent() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ManifestComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ManifestComponent)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleJumpTo = function (id) {
            _this.props.dispatch(jumpToState(id));
        }, _this.handleToggleAction = function (id) {
            _this.props.dispatch(toggleAction(id));
        }, _this.renderAction = function (id) {
            var action = _this.props.actionsById[id];
            var diffedStates = (0, _diffState2.default)(_this.props.computedStates, id);
            var skippingAction = _this.props.skippedActionIds.indexOf(id) !== -1;

            return _react2.default.createElement(_action2.default, {
                action: action,
                index: id,
                key: id,
                diff: diffedStates,
                skipped: skippingAction,
                toggleAction: function toggleAction() {
                    return _this.handleToggleAction(id);
                },
                jumpTo: function jumpTo() {
                    return _this.handleJumpTo(id);
                }
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ManifestComponent, [{
        key: 'render',
        value: function render() {
            var actionReports = this.props.stagedActionIds.map(this.renderAction);
            var dispatch = this.props.dispatch;

            return _react2.default.createElement(
                'div',
                { style: _style2.default.base },
                _react2.default.createElement(
                    'div',
                    { style: _style2.default.controls },
                    _react2.default.createElement(_button2.default, { label: 'Commit', action: function action() {
                            return dispatch(commit());
                        } }),
                    _react2.default.createElement(_button2.default, { label: 'Rollback', action: function action() {
                            return dispatch(rollback());
                        } }),
                    _react2.default.createElement(_button2.default, { label: 'Reset', action: function action() {
                            return dispatch(reset());
                        } })
                ),
                actionReports.reverse()
            );
        }
    }]);

    return ManifestComponent;
})(_react2.default.Component);

ManifestComponent.propTypes = {
    computedStates: _react.PropTypes.array,
    actionsById: _react.PropTypes.object,
    stagedActionIds: _react.PropTypes.array,
    skippedActionIds: _react.PropTypes.array,
    dispatch: _react.PropTypes.func
};

ManifestComponent.update = function () {};

exports.default = ManifestComponent;