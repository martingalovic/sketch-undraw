import React from 'react'

import ListItem from './list_item.jsx'
import EmptyState from './empty_state.jsx'

export default class List extends React.Component {
  render() {
    const {illustrations, onSvgClick, searchResults} = this.props

    if (illustrations.length > 0) {
      const items = illustrations.map(item => {
        return <ListItem key={item._id} onSvgClick={onSvgClick} item={item} />
      })

      return (
        <div id="list">
          {items}
        </div>
      )
    } else if (illustrations.length === 0) {
      let emptyMessage
      if (searchResults) {
        emptyMessage = "Ooh... No illustrations found, try searching for something else"
      } else {
        emptyMessage = "No illustrations found"
      }
      return <EmptyState message={emptyMessage} />
    }

    return <EmptyState message="😞 Error occured while showing previews" />
  }
}
