import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {FormattedMessage} from 'react-intl'
import LanguageSelection from './languageSelection'

export default class Layout extends Component {

  static propTypes = {
    language: PropTypes.string,
    supportedLocales: PropTypes.array,
    setLanguage: PropTypes.func,
    children: PropTypes.object
  }

  getLanguageList() {
    let { supportedLocales = [], setLanguage } = this.props
    let items = supportedLocales.map((item, index) => {
      return <LanguageSelection language={item} setLanguage={setLanguage} key={`languageSelection-${index}`}/>
    })
    return (
      <div style={{ display: 'inline-block', marginLeft: '0.5rem'}}>
        {items}
      </div>
    )
  }

  render() {
    return (
      <div>
        <h3>
          <FormattedMessage id='layout.chooseLanguage' defaultMessage='选择语言'/>：{this.getLanguageList()}
        </h3>
        <h3>
          <FormattedMessage id='layout.title' defaultMessage='导航'/>
        </h3>
        <ul>
          {/* <li> <a href='#/'>Home</a></li>
          <li><a href='#/test'>Test</a></li> */}
          <li><Link to='/'><FormattedMessage id='layout.homePage' defaultMessage='首页'/></Link></li>
          <li><Link to='/test'><FormattedMessage id='layout.testPage' defaultMessage='测试页'/></Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
