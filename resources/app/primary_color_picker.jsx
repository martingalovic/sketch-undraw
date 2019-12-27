import React from 'react'

export default class PrimaryColorPicker extends React.Component {
  render() {
    const {colors, onChange, primaryColor} = this.props

    const colorsItems = colors.map(color => {
      const active = primaryColor === color

      return (
        <li className={(active ? "active" : '')} style={{backgroundColor: color}} onClick={() => onChange(color)} />
      )
    })

    return (
      <div id="primary-color-picker">
        <span>Primary color</span>
        <ul>
          {colorsItems}
        </ul>
      </div>
    )
  }
}
