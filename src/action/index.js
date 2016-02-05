import React, {PropTypes} from 'react';
import radium from 'radium';
import style from './style';
import diffState from '../utils/diff-state';

class ManifestActionComponent extends React.Component {
  static propTypes = {
    diff        : PropTypes.array,
    toggleAction: PropTypes.func,
    index       : PropTypes.number,
    action      : PropTypes.object,
    skipped     : PropTypes.bool,
    expanded    : PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  getDiffs() {
    const {currentState, previousState} = this.props;
    return diffState(currentState, previousState).map((d, i) => this.renderDiff(d, i));
  }

  expandAction() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  disableAction() {
    this.props.toggleAction(this.props.index);
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

  renderDiff(diff, index) {
    const oldValue = this.createOldValue(diff);
    const newValue = this.createNewValue(diff);
    const path     = this.createPath(diff);

    return (
      <div key={index}>
        { path }: <span style={style.oldValue}>{ oldValue || 'undefined' }</span>
        <span style={style.newValue}> { newValue } </span>
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props, nextProps);
    return this.props.skipped != nextProps.skipped &&
      this.props.;
  }

  render() {
    const {action: {action}, skipped} = this.props;
    const expanded    = this.props.expanded || this.state.expanded;
    const actionBlock = this.state.expanded ?
      <div>
        <pre style={style.actionData}>{JSON.stringify(action)}</pre>
      </div> :
      null;

    const storeBlock = (expanded) ?
      <div>
        <div style={style.header}>
          <span>Store Mutations</span>
        </div>
        <pre
          className="diff"
          style={style.store}
        >
          {this.getDiffs()}
        </pre>
      </div> :
      null;

    const enableToggle = skipped ?
      'enable' :
      'disable';

    return (
      <div className="manifest-action-component">
        <div style={style.base}>
          <div
            className={action.type}
            style={[
                            style.title,
                            skipped && style.skipped,
                        ]}
            onClick={this.expandAction.bind(this)}
          >
            <span>{action.type}</span>
              <span style={style.toggle} onClick={this.disableAction.bind(this)}>
                {enableToggle}
              </span>
          </div>
          {actionBlock}
          {storeBlock}
        </div>
      </div>
    );
  }
}

export default radium(ManifestActionComponent);
