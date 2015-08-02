import React, { PropTypes } from 'react';
import classNames from 'classnames';
import style from './style';

export default class ManifestActionComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  render() {
    const { action, diff: { length }, skipped } = this.props;

    if (length > 0) {
      style.title.background = 'lightgreen';
    }

    if (skipped) {
      style.title.background = 'black';
      style.title.color = 'white';
    }

    const actionBlock = this.state.expanded ?
      <div>
        <pre>{JSON.stringify(action)}</pre>
      </div> :
      null;

    let changes = [];
    if (diff.length > 0) {
      changes = diff.map(this.renderDiff.bind(this));
    }

    const storeBlock = this.state.expanded && diff.length > 0 ?
      <div>
        <div style={style.header}><span>Store Mutations</span></div>
        <pre style={style.store}>{changes}</pre>
      </div> :
      null;


    const enableToggle = this.props.skipped ?
      'enable' :
      'disable';

    return (
      <div>
        <div style={style.base}>
          <div style={style.title}>
            <span onClick={this.expandAction.bind(this)}>{action.type}</span>
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

  renderDiff(diff, index) {
    const oldValue = JSON.stringify(diff.lhs);
    const newValue = JSON.stringify(diff.rhs);

    return (
      <span key={index}>
        {diff.path.join('.')}: <span style={style.storeOld}>{oldValue}</span> {newValue}
        <br/>
      </span>
    );
  }

  expandAction() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  disableAction() {
    this.props.toggleAction(this.props.index);
  }
}
