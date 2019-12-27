import React from 'react'

export default class PrimaryColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.defaultColors = [
      '#DF1F20',
      '#FA6401',
      '#F7B600',
      '#6DD500',
      '#44D7B6',
      '#0191FF',
      '#6137FF',
      '#6D7278',
    ]
    this.colorsLimit = 10
  }

  colors() {
    const {colors, primaryColor} = this.props

    let tmpColors = (colors.length > 0 ? colors : this.defaultColors)

    if (tmpColors.indexOf(primaryColor) === -1) {
      tmpColors = [primaryColor].concat(tmpColors)
    }

    return tmpColors.slice(0, this.colorsLimit);
  }

  render() {
    const {onChange, primaryColor} = this.props

    const colorsItems = this.colors().map(color => {
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
