import React from 'react'

export class Keyboard extends React.Component {

  constructor(props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  render() {
    return null
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(event) {
    this.props.onKeyDown && this.props.onKeyDown(event)
  }

}