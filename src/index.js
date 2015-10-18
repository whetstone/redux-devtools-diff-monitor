import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { ActionCreators } from 'redux-devtools';

import ManifestAction from './action';
import ManifestButton from './button';

import diffState from './utils/diff-state';

import style from './style';

class ManifestComponent extends Component {

  static propTypes = {
    // Stuff you can use
    computedStates: PropTypes.array.isRequired,
    currentStateIndex: PropTypes.number.isRequired,
    stagedActions: PropTypes.array.isRequired,
    skippedActions: PropTypes.object.isRequired,

    // Stuff you can do
    toggleAction: PropTypes.func.isRequired, // ({ index })
    jumpToState: PropTypes.func.isRequired // ({ index })
  };

  jumpingTo(index) {
    this.props.jumpToState(index);
  }

  renderAction(action, index) {
    const diffedStates = diffState(this.props.computedStates, index);
    const skippingAction = this.props.skippedActions[index]===true;

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
    const { commit, rollback, reset } = this.props;

    return (
      <div style={[
          style.base,
          visible && style.hidden
        ]}
      >
        <div style={style.controls}>
          <ManifestButton label="Commit" action={commit} />
          <ManifestButton label="Rollback" action={rollback} />
          <ManifestButton label="Reset" action={reset} />
        </div>

        {actionReports.reverse()}
      </div>
    );
  }
}

export default Radium(ManifestComponent);
