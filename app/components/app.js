import React, { Component } from 'react'

export default class App extends Component {

  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    console.log('1111111')
  }

  render() {
    return (
      <div onClick={this.onClick}> Hello world! </div>
    )
  }
}