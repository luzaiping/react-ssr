import React, { Component, PropTypes } from 'react'
import styles from './list.css'
import counterAction from '../actions/counterAction'
import {intlShape, injectIntl, defineMessages} from 'react-intl'

const messages = defineMessages({
  increment: {
    id: 'list.increment',
    defaultMessage: '增加'
  },
  decrement: {
    id: 'list.decrement',
    defaultMessage: '减少'
  },
  currentNumber: {
    id: 'list.currentNumber',
    defaultMessage: '当前值'
  }
})

class List extends Component {
  /**
   * 定义获取数据的action function
   */
  static fetchData(params) {
    // return store.dispatch(counterAction.getData(params))
    return counterAction.getData(params)
  }

  componentDidMount() {
    this.props.getData()
  }

  render() {
    let { count, items = [], increment, decrement, intl } = this.props
    let { formatMessage } = intl

    return (
      <div onClick={this.onClick} className={styles.wrapper}>
        {formatMessage(messages.currentNumber)}：{count}
        <div className={styles.btnWrapper}>
          <input type='button' value={formatMessage(messages.increment)} onClick={increment} className={styles.firstBtn}/>
          <input type='button' value={formatMessage(messages.decrement)} onClick={decrement}/>
        </div>
        <ul>
          {
            items.map((item = {}, index) => {
              let { name, quantity } = item
              return (
                <li key={index}>
                  {name}: quantity_{quantity}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

List.propTypes = {
  intl: intlShape.isRequired,
  count: PropTypes.number,
  items: PropTypes.array,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  getData: PropTypes.func
}

export default injectIntl(List)
