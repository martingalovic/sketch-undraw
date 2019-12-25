import React from 'react'

export default class PrimaryColorPicker extends React.Component {
  render() {
    const {onChange} = this.props

    const colors = ['#bada55', '#e74c3c', '#000000'].map(color => {
      return (
        <li style={{backgroundColor: color}} onClick={() => onChange(color)} />
      )
    })

    return (
      <div>
        <span>Primary color</span>
        <ul>
          {colors}
        </ul>
      </div>
    )
  }
}
