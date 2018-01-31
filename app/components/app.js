import React, { Component } from 'react'
import styles from './app.css'
export default class App extends Component {

    constructor() {
        super()
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        console.log('111111133333')
    }

    render() {
        return (
            <div onClick={this.onClick} className={styles.wrapper}> Hello world!!! </div>
        )
    }
}
