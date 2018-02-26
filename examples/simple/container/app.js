import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import counterAction from '../actions/counterAction'
import App from '../components/app'

function mapStateToProps(state) {
  return state.counter
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(counterAction, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps, (x, y, props) => {
  return {
    ...x,
    ...y,
    ...props
  }
})(App)

