import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { ActionCreators } from 'redux-devtools';
import ManifestAction from './action';
import ManifestButton from './button';
import diffState from './utils/diff-state';
import style from './style';

const { reset, rollback, commit, sweep, toggleAction } = ActionCreators;

class ManifestComponent extends Component {

  static reducer = () => {};

  static propTypes = {
    // Stuff you can use
    dispatch: PropTypes.func,
    computedStates: PropTypes.array,
    actionsByIds: PropTypes.object,
    stagedActionIds: PropTypes.array,
    skippedActionIds: PropTypes.array,
  };

  jumpingTo(index) {
    this.props.jumpToState(index);
  }

  handleRollback = () => {
    this.props.dispatch(rollback());
  };

  handleSweep = () => {
    this.props.dispatch(sweep());
  };

  handleCommit = () => {
    this.props.dispatch(commit());
  };

  handleReset = () => {
    this.props.dispatch(reset());
  };

  renderAction(action, index) {
    const diffedStates = diffState(this.props.computedStates, index);
    const skippingAction = this.props.skippedActionIds.indexOf(action.id) !== -1;

    return (
      <ManifestAction
        action={action}
        index={index}
        key={index}
        diff={diffedStates}
        skipped={skippingAction}
        toggleAction={this.props.toggleAction.bind(this, index)}
        jumpTo={this.jumpingTo.bind(this, index)}
      />
    );
  }

  render() {
    const actionReports = this.props.stagedActions.map(this.renderAction.bind(this));
    const { visible } = this.state;

    return (
      <div style={[
          style.base,
          visible && style.hidden
        ]}
      >
        <div style={style.controls}>
          <ManifestButton label="Commit" action={this.handleCommit} />
          <ManifestButton label="Rollback" action={this.handleRollback} />
          <ManifestButton label="Reset" action={this.handleReset} />
        </div>

        {actionReports.reverse()}
      </div>
    );
  }
}

export default Radium(ManifestComponent);
