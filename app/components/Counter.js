import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {increment, decrement, fetchCount} from '../actions'
import {bindActionCreators} from 'redux';

function mapStateToProps(state) {
  return {count: state.count}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      increment,
      decrement,
      fetchCount
    }, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    count: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.fetchCount()
  }

  render() {
    var {count, actions} = this.props
    return (
        <div>
          <p>Current Count: {count}</p>
          <button onClick={actions.increment}>增加一个~</button>
          <button onClick={actions.decrement}>减少一个~</button>
        </div>
    )
  }
}

export default Counter