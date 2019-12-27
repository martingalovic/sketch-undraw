import React from 'react'
import _ from 'underscore'

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
    const {recentColors, documentColors, primaryColor} = this.props

    // recent colors are the first ones
    let tmpColors = (
      documentColors && documentColors.length > 0
        ? documentColors
        : this.defaultColors)

    // then we add document colors
    if (recentColors) {
      tmpColors = tmpColors.concat(recentColors)
    }

    if (primaryColor && tmpColors.indexOf(primaryColor) === -1) {
      tmpColors = [primaryColor].concat(tmpColors)
    }
    tmpColors = _.unique(tmpColors)

    const lastColors = tmpColors.slice(0, this.colorsLimit)

    window.postMessage('updateRecentColorsSetting', JSON.stringify(lastColors))

    return lastColors;
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
