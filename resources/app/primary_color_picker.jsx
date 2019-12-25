import React from 'react'

export default class PrimaryColorPicker extends React.Component {
  render() {
    const {onChange, primaryColor} = this.props

    const colors = ['#bada55', '#fff', '#e74c3c', '#000000'].map(color => {
      const active = primaryColor === color

      return (
        <li className={(active ? "active" : '')} style={{backgroundColor: color}} onClick={() => onChange(color)} />
      )
    })

    return (
      <div id="primary-color-picker">
        <span>Primary color</span>
        <ul>
          {colors}
        </ul>
      </div>
    )
  }
}
