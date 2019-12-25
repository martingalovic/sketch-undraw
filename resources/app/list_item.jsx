import React from 'react'

export default class ListItem extends React.Component {
  render() {
    const {item, onSvgClick} = this.props

    const imageSrc = item.image.replace(".svg", ".png").replace("/illustrations/", "/pngs/")

    return (
      <div className="list__item" onClick={() => onSvgClick(item)}>
        <div className="inner">
          <div className="image">
            <img src={imageSrc} alt=""/>
          </div>
          <h4>{item.title}</h4>
        </div>
      </div>
    )
  }
}
