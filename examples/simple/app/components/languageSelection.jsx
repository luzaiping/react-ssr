import React, { Component, PropTypes } from 'react'
import {FormattedMessage} from 'react-intl'

export default class LanguageSelection extends Component {
  
  static displayName = 'LanguageSelection'

  static propTypes = {
    language: PropTypes.string,
    setLanguage: PropTypes.func
  }

  constructor() {
    super()
    this.onLanguageClick = this.onLanguageClick.bind(this)
  }
  
  onLanguageClick() {
    this.props.setLanguage({ language: this.props.language })
  }

  render() {
    let { language } = this.props
    return (
      <span onClick={this.onLanguageClick} style={{ paddingRight: '0.5rem'}}>
        <FormattedMessage id={`languageSelection.${language}`} defaultMessage='language name'/>
      </span>
    )
  }
}
