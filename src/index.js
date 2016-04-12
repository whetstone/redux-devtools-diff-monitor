import React, { PropTypes } from 'react';
import ManifestAction from './action';
import ManifestButton from './button';
import diffState from './utils/diff-state';
import { ActionCreators } from 'redux-devtools';
import { StyleSheet, css } from 'aphrodite';
const { reset, rollback, commit, toggleAction, jumpToState } = ActionCreators;

export default class ManifestComponent extends React.Component {
  static propTypes = {
    computedStates  : PropTypes.array,
    actionsById     : PropTypes.object,
    stagedActionIds : PropTypes.array,
    skippedActionIds: PropTypes.array,
    dispatch        : PropTypes.func,
  };

  static update = () => {
  };

  handleJumpTo = id => {
    this.props.dispatch(jumpToState(id));
  };

  handleToggleAction = id => {
    this.props.dispatch(toggleAction(id));
  };

  renderAction = id => {
    const action         = this.props.actionsById[id];
    const diffedStates   = diffState(this.props.computedStates, id);
    const skippingAction = this.props.skippedActionIds.indexOf(id) !== -1;

    return (
      <ManifestAction
        action={action}
        index={id}
        key={id}
        diff={diffedStates}
        skipped={skippingAction}
        toggleAction={() => this.handleToggleAction(id)}
        jumpTo={() => this.handleJumpTo(id)}
      />
    );
  };

  render() {
    const actionReports = this.props.stagedActionIds.map(this.renderAction);
    const { dispatch } = this.props;

    return (
      <div>
        <div className={css(styles.container)}>
          <ManifestButton label="Commit" action={() => dispatch(commit())} />
          <ManifestButton label="Rollback" action={() => dispatch(rollback())} />
          <ManifestButton label="Reset" action={() => dispatch(reset())} />
        </div>
        <div className={css(styles.actions)}>
          {actionReports.reverse()}
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display      : 'flex',
    flexDirection: 'row',
    flexWrap     : 'nowrap',
    borderBottom : '1px solid #ddd',
  },
  actions  : {
    margin: '10px',
  },
});
