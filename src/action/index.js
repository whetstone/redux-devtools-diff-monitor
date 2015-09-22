import React, { PropTypes } from 'react';
import Radium from 'radium';
import style from './style';

class ManifestActionComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  getDiffs = () => {
    const { diff } = this.props;
    return diff.map((d,i) => this.renderDiff(d,i));
  }

  expandAction = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  disableAction = () => {
    this.props.toggleAction(this.props.index);
  }

  renderDiff = (diff, index) => {
    const oldValue = JSON.stringify(diff.lhs);
    const newValue = JSON.stringify(diff.rhs);

    return (
      <div key={index}>
        { diff.path.join('.') }: <span style={style.oldValue}>{ oldValue || 'undefined' }</span>
        <span style={style.newValue}> { newValue } </span>
      </div>
    );
  }

  render() {
    const { action, diff, skipped } = this.props;
    const { expanded } = this.state;
    const storeHasChanged = !!diff.length;
    const changes         = this.getDiffs();

    const actionBlock = this.state.expanded ?
      <div>
        <pre style={style.actionData}>{JSON.stringify(action)}</pre>
      </div> :
      null;

    const storeBlock = (expanded && storeHasChanged) ?
      <div>
        <div style={style.header}>
          <span>Store Mutations</span>
        </div>
        <pre style={style.store}>
          {changes}
        </pre>
      </div> :
      null;

    const enableToggle = skipped ?
      'enable' :
      'disable';

    return (
      <div>
        <div style={style.base}>
          <div
            style={[
              style.title,
              diff.length && style.mutated,
              skipped && style.skipped,
            ]}
            onClick={this.expandAction}
            >
            <span>{action.type}</span>
            <span style={style.toggle} onClick={this.disableAction}>
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

export default Radium(ManifestActionComponent);
