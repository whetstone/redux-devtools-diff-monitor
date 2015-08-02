import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './index.scss';

export default class ManifestActionComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    }
  }

  render() {
    const {action, diff} = this.props;
    const actionClasses = classNames(
      'action',
      {
        'action--mutated': diff.length > 0,
        'action--disabled': this.props.skipped
      }
    );

    const actionBlock = this.state.expanded ?
      <div>
        <pre className="raw">{JSON.stringify(action)}</pre>
      </div> :
      null;

    let changes = [];
    if (diff.length > 0) {
      changes = diff.map(this.renderDiff.bind(this));
    }

    const storeBlock = this.state.expanded && diff.length > 0 ?
      <div>
        <div className="action__header"><span>Store Mutations</span></div>
        <pre className="store">{changes}</pre>
      </div> :
      null;


    const enableToggle = this.props.skipped ?
      'enable' :
      'disable';

    return (
      <div>
        <div className={actionClasses}>
          <div className="action__title">
            <span onClick={this.expandAction.bind(this)}>{action.type}</span>
            <span className="action__toggle" onClick={this.disableAction.bind(this)}>
              {enableToggle}
            </span>
          </div>
          {actionBlock}
          {storeBlock}
        </div>
      </div>
    )
  }

  renderDiff(diff, index) {
    const oldValue = JSON.stringify(diff.lhs);
    const newValue = JSON.stringify(diff.rhs);

    return (
      <span key={index}>
        {diff.path.join('.')}: <span className="old">{oldValue}</span> {newValue}
        <br/>
      </span>
    )
  }

  expandAction() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  disableAction() {
    this.props.toggleAction(this.props.index);
  }
}
