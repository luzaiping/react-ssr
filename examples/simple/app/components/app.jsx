import React, { Component, PropTypes } from 'react'
import styles from './app.css'
import counterAction from '../actions/counterAction'

export default class App extends Component {
  /**
   * 定义获取数据的action function
   */
  static fetchData(params) {
    // return store.dispatch(counterAction.getData(params))
    return counterAction.getData(params)
  }

  /* componentDidMount() {
    this.props.getData()
  } */

  render() {
    let { count, items = [], increment, decrement } = this.props
    return (
      <div onClick={this.onClick} className={styles.wrapper}>
        当前值：{count}
        <div className={styles.btnWrapper}>
          <input type='button' value='increment' onClick={increment} className={styles.firstBtn}/>
          <input type='button' value='decrement' onClick={decrement}/>
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

App.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  getData: PropTypes.func
}
