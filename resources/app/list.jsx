import React from 'react'

import ListItem from './list_item.jsx'
import Search from './search.jsx'
import EmptyState from './empty_state.jsx'

export default class List extends React.Component {
  render() {
    const {illustrations} = this.props

    if (illustrations.length > 0) {
      const items = illustrations.map(item => {
        return <ListItem key={item._id} item={item} />
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
