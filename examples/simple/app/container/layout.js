import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
import Layout from '../components/layout'
import config from '../../config'
import { setLocale } from '../../../../src/app'

function mapStateToProps(state) {
  return {
    language: state.i18n.language,
    supportedLocales: config.i18n.supportedLocales
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setLanguage: language => dispatch(setLocale(language))
  }
  // return bindActionCreators(globalAction, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps, (x, y, props) => {
  return {
    ...x,
    ...y,
    ...props
  }
})(Layout)

