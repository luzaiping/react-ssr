import React, { Component, PropTypes } from 'react'
import styles from './app.css'

export default class App extends Component {

    render() {
        let { counter, items = [], increment, decrement } = this.props
        return (
            <div onClick={this.onClick} className={styles.wrapper}> 
                当前值：{counter}
                <div className={styles.btnWrapper}>
                    <input type='button' value='increment' onClick={increment} className={styles.firstBtn}/>
                    <input type='button' value='increment' onClick={decrement}/>
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
    counter: PropTypes.number,
    items: PropTypes.array,
    increment: PropTypes.func,
    decrement: PropTypes.func
}

