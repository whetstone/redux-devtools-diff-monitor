import React, { PropTypes } from 'react';

import ManifestAction from './Action';
import ManifestButton from './Button';

import deep from 'deep-diff';
import './index.scss';
import classNames from 'classnames'
import mousetrap from 'mousetrap';

export default class ManifestComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
  }

  static propTypes = {
    // Stuff you can use
    computedStates: PropTypes.array.isRequired,
    currentStateIndex: PropTypes.number.isRequired,
    stagedActions: PropTypes.array.isRequired,
    skippedActions: PropTypes.object.isRequired,

    // Stuff you can do
    reset: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    rollback: PropTypes.func.isRequired,
    sweep: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired, // ({ index })
    jumpToState: PropTypes.func.isRequired // ({ index })
  };

  componentDidMount() {
    const self = this;
    Mousetrap.bind(['ctrl+]'], function (e) {
      self.toggleVisibility();
      return false;
    });
  }

  toggleVisibility() {
    this.setState({visible: !this.state.visible})
  }

  componentWillUnmount() {
    Mousetrap.unbind(['ctrl+]']);
  }

  render() {
    const actionReports = this.props.stagedActions.map(this.renderAction.bind(this));
    const frameClasses = classNames(
      'frame',
      {
        'frame--hidden': this.state.visible === false
      }
    );

    return (
      <div className={frameClasses}>
        <div className="frame__header">
          <ManifestButton label="Commit" action={this.props.commit.bind(this)} />
          <ManifestButton label="Rollback" action={this.props.rollback.bind(this)} />
          <ManifestButton label="Reset" action={this.props.reset.bind(this)} />

        </div>
        {actionReports.reverse()}
      </div>
    );
  }

  renderAction(action, index) {
    let newState, oldState, diff;
    if (index !== 0) {
      newState = this.props.computedStates[index].state;
      oldState = this.props.computedStates[index - 1].state;
      diff = deep.diff(oldState, newState);
    }

    const skippingAction = this.props.skippedActions[index]===true;

    return (
      <ManifestAction action={action}
                      index={index}
                      key={index}
                      diff={diff || []}
                      skipped={skippingAction}
                      toggleAction={this.props.toggleAction.bind(this, index)}
                      jumpTo={this.jumpingTo.bind(this, index)}/>
    )
  }

  jumpingTo(index) {
    this.props.jumpToState(index);
  }
}
