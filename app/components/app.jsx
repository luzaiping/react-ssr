import React, { Component, PropTypes } from 'react'
import styles from './app.css'

export default class App extends Component {

  render() {
    let { number, items = [], increment, decrement } = this.props
    return (
      <div onClick={this.onClick} className={styles.wrapper}> 
        当前值：{number}
        <div className={styles.btnWrapper}>
          <input type='button' value='increment' onClick={increment} className={styles.firstBtn}/>
          <input type='button' value='decrement' onClick={decrement}/>
        </div>
        <ul>
          {
            items.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

App.propTypes = {
  number: PropTypes.number,
  items: PropTypes.array,
  increment: PropTypes.func,
  decrement: PropTypes.func
}

