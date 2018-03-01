import React, { Component, PropTypes } from 'react' 
import IntlProviderWrapper from './IntlProviderWrapper'

export default class RootProvider extends Component {

  render() {
    
    let { children, i18nConfig = {} } = this.props

    return i18nConfig.enableI18n ? 
      (
        <IntlProviderWrapper i18nConfig={i18nConfig}>
          { children }
        </IntlProviderWrapper>
      ) : children
  }
}

RootProvider.propTypes = {
  i18nConfig: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}

