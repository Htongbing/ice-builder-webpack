import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import img from '../../images/1.jpg'
import './index.less'
import 'lib-flexible'

class MyComponent extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      text: 'text'
    }
  }
  render() {
    return (
      <div className="color">
        <span>{this.state.text}</span>
        <img src={img} />
        <Text></Text>
      </div>
    )
  }
}

ReactDOM.render(<MyComponent></MyComponent>, document.getElementById('root'))