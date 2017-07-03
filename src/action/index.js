import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import JSONTree from 'react-json-tree';

class ManifestActionComponent extends React.Component {
  static propTypes = {
    diff        : PropTypes.array,
    toggleAction: PropTypes.func,
    index       : PropTypes.number,
    action      : PropTypes.object,
    skipped     : PropTypes.bool,
    expanded    : PropTypes.bool,
    currentState: PropTypes.object,
  };

  state = {
    expanded: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const a = JSON.stringify(this.props.currentState);
    const b = JSON.stringify(nextProps.currentState);
    return a !== b ||
      this.state.expanded !== nextState.expanded ||
      this.props.skipped !== nextProps.skipped;
  }

  getDiffs() {
    const { diff } = this.props;
    return diff.map((d, i) => this.renderDiff(d, i));
  }

  createOldValue(diff) {
    if (diff.item) {
      return (JSON.stringify(diff.item.lhs));
    }

    return JSON.stringify(diff.lhs);
  }

  createNewValue(diff) {
    if (diff.item) {
      return (JSON.stringify(diff.item.rhs));
    }

    return JSON.stringify(diff.rhs);
  }

  createPath(diff) {
    let path = [];

    if (diff.path) {
      path = path.concat(diff.path);
    }
    if (typeof(diff.index) !== 'undefined') {
      path.push(diff.index);
    }
    return path.length ? path.join('.') : '';
  }

  disableAction = () => {
    this.props.toggleAction(this.props.index);
    this.setState({
      expanded: false,
    });
  };

  expandAction = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  renderDiff(diff, index) {
    const oldValue = this.createOldValue(diff);
    const newValue = this.createNewValue(diff);
    const path     = this.createPath(diff);
    return (
      <div key={index}>
        { path }: <span className={css(styles.oldValue)}>{ oldValue || 'undefined' }</span>
        <span className={css(styles.newValue)}> { newValue } </span>
      </div>
    );
  }

  render() {
    const { action: { action }, diff, skipped } = this.props;
    const expanded        = this.props.expanded || this.state.expanded;
    const storeHasChanged = !!diff.length;
    const changes         = this.getDiffs();

    const actionSummary = this.state.expanded ?
      <div className={css(styles.code)}>
        <JSONTree data={action} />
      </div> : null;

    const changesToStore = (expanded && storeHasChanged) ?
      <div
        className={`${css(styles.code)} diff`}
      >
        {changes}
      </div> : null;

    const enableToggle = skipped ? 'enable' : 'disable';

    return (
      <div className={`${css(styles.container)} manifest-action-component`}>
        <div>
          <div className={css(
            styles.header,
            this.state.expanded && styles.bottomBordered,
            storeHasChanged && styles.mutated
          )}
          >
            <div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div
                  style={{ flex: '1 0 auto' }}
                  className={css(skipped && styles.skipped)}
                  onClick={this.expandAction}
                >
                  <span>{action.type}</span>
                </div>
                <div>
                <span
                  onClick={this.disableAction}
                  className={css(styles.toggle)}
                >
                  {enableToggle}
                </span>
                </div>
              </div>
            </div>
          </div>
          {actionSummary}
          {changesToStore}
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: '10px',
    border      : '1px solid #ddd',
    background  : '#eee',
  },

  header: {
    padding: 10,
  },

  bottomBordered: {
    borderBottom: '1px solid #ddd',
  },

  toggle: {
    padding       : '0 5px',
    flex          : '1 0 auto',
    textAlign     : 'right',
    textDecoration: 'underline',
  },

  title: {
    cursor          : 'pointer',
    padding         : '12px',
    background      : '#ddd',
    userSelect      : 'none',
    WebkitUserSelect: 'none',
  },

  mutated: {
    background: 'lightgreen',
  },

  skipped: {
    textDecoration: 'line-through',
  },

  code: {
    border    : '1px solid #ddd',
    background: 'white',
    padding   : 5,
    wordWrap  : 'normal',
    fontFamily: 'monospace',
    margin    : '10',
  },

  changedProperty: {
    display: 'block',
  },

  oldValue: {
    textDecoration: 'line-through',
    color         : 'pink',
  },

  newValue: {
    color: 'darkgreen',
  },
});

export default ManifestActionComponent;
