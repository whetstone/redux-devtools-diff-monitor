'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphrodite = require('aphrodite');

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ManifestActionComponent = function (_React$Component) {
  _inherits(ManifestActionComponent, _React$Component);

  function ManifestActionComponent() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ManifestActionComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ManifestActionComponent)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      expanded: false
    }, _this.expandAction = function () {
      _this.setState({
        expanded: !_this.state.expanded
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ManifestActionComponent, [{
    key: 'disableAction',
    value: function disableAction() {
      this.props.toggleAction(this.props.index);
      this.setState({
        expanded: false
      });
    }
  }, {
    key: 'createOldValue',
    value: function createOldValue(diff) {
      if (diff.item) {
        return JSON.stringify(diff.item.lhs);
      }

      return JSON.stringify(diff.lhs);
    }
  }, {
    key: 'createNewValue',
    value: function createNewValue(diff) {
      if (diff.item) {
        return JSON.stringify(diff.item.rhs);
      }

      return JSON.stringify(diff.rhs);
    }
  }, {
    key: 'createPath',
    value: function createPath(diff) {
      var path = [];

      if (diff.path) {
        path = path.concat(diff.path);
      }
      if (typeof diff.index !== 'undefined') {
        path.push(diff.index);
      }
      return path.length ? path.join('.') : '';
    }
  }, {
    key: 'getDiffs',
    value: function getDiffs() {
      var _this2 = this;

      var diff = this.props.diff;

      return diff.map(function (d, i) {
        return _this2.renderDiff(d, i);
      });
    }
  }, {
    key: 'renderDiff',
    value: function renderDiff(diff, index) {
      var oldValue = this.createOldValue(diff);
      var newValue = this.createNewValue(diff);
      var path = this.createPath(diff);
      return _react2.default.createElement(
        'div',
        { key: index },
        path,
        ': ',
        _react2.default.createElement(
          'span',
          { className: (0, _aphrodite.css)(styles.oldValue) },
          oldValue || 'undefined'
        ),
        _react2.default.createElement(
          'span',
          { className: (0, _aphrodite.css)(styles.newValue) },
          ' ',
          newValue,
          ' '
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var action = _props.action.action;
      var diff = _props.diff;
      var skipped = _props.skipped;

      var expanded = this.props.expanded || this.state.expanded;
      var storeHasChanged = !!diff.length;
      var changes = this.getDiffs();

      var actionSummary = this.state.expanded ? _react2.default.createElement(
        'div',
        { className: (0, _aphrodite.css)(styles.code) },
        _react2.default.createElement(_reactJsonTree2.default, { data: action })
      ) : null;

      var changesToStore = expanded && storeHasChanged ? _react2.default.createElement(
        'div',
        { className: (0, _aphrodite.css)(styles.code) },
        changes
      ) : null;

      var enableToggle = skipped ? 'enable' : 'disable';

      return _react2.default.createElement(
        'div',
        { className: (0, _aphrodite.css)(styles.container) },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: (0, _aphrodite.css)(styles.header, this.state.expanded && styles.bottomBordered, storeHasChanged && styles.mutated) },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { style: { display: 'flex', flexDirection: 'row' } },
                _react2.default.createElement(
                  'div',
                  { style: { flex: '1 0 auto' },
                    className: (0, _aphrodite.css)(skipped && styles.skipped),
                    onClick: this.expandAction.bind(this) },
                  _react2.default.createElement(
                    'span',
                    null,
                    action.type
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'span',
                    { onClick: this.disableAction.bind(this),
                      className: (0, _aphrodite.css)(styles.toggle) },
                    enableToggle
                  )
                )
              )
            )
          ),
          actionSummary,
          changesToStore
        )
      );
    }
  }]);

  return ManifestActionComponent;
}(_react2.default.Component);

ManifestActionComponent.propTypes = {
  diff: _react.PropTypes.array,
  toggleAction: _react.PropTypes.func,
  index: _react.PropTypes.number,
  action: _react.PropTypes.object,
  skipped: _react.PropTypes.bool,
  expanded: _react.PropTypes.bool
};


var styles = _aphrodite.StyleSheet.create({
  container: {
    marginBottom: '10px',
    border: '1px solid #ddd',
    background: '#eee'
  },

  header: {
    padding: 10
  },

  bottomBordered: {
    borderBottom: '1px solid #ddd'
  },

  toggle: {
    padding: '0 5px',
    flex: '1 0 auto',
    textAlign: 'right',
    textDecoration: 'underline'
  },

  title: {
    cursor: 'pointer',
    padding: '12px',
    background: '#ddd',
    userSelect: 'none',
    WebkitUserSelect: 'none'
  },

  mutated: {
    background: 'lightgreen'
  },

  skipped: {
    textDecoration: 'line-through'
  },

  code: {
    border: '1px solid #ddd',
    background: 'white',
    padding: 5,
    wordWrap: 'normal',
    fontFamily: 'monospace',
    margin: '10'
  },

  changedProperty: {
    display: 'block'
  },

  oldValue: {
    textDecoration: 'line-through',
    color: 'pink'
  },

  newValue: {
    color: 'darkgreen'
  }
});

exports.default = ManifestActionComponent;