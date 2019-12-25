import React from 'react'

import ListItem from './list_item.jsx'
import EmptyState from './empty_state.jsx'

export default class List extends React.Component {
  render() {
    const {illustrations, onSvgClick} = this.props

    if (illustrations.length > 0) {
      const items = illustrations.map(item => {
        return <ListItem key={item._id} onSvgClick={onSvgClick} item={item} />
      })

      return (
        <div id="list">
          {items}
        </div>
      )
    }

    return <EmptyState message="😞 Error occured while showing previews" />
  }
}
