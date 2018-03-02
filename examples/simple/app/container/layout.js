import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import globalAction from '../actions/globalAction'
import Layout from '../components/layout'
import { i18n } from '../../config'
function mapStateToProps(state) {
  return {
    language: state.global.language,
    supportedLocales: i18n.supportedLocales
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(globalAction, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps, (x, y, props) => {
  return {
    ...x,
    ...y,
    ...props
  }
})(Layout)

