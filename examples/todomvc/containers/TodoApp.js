import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/TodoActions';

export default class TodoApp extends Component {

  render() {
    return (
        <div>
          <Header addTodo={this.props.actions.addTodo} />
          <MainSection todos={this.props.todos} actions={this.props.actions} />
        </div>
    );
  }
}

export default connect(state => ({ todos: state.todos }), (dispatch) => ({ actions: bindActionCreators(TodoActions, dispatch) }))(TodoApp);
