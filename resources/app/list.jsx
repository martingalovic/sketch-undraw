import React from 'react'

import ListItem from './list_item.jsx'
import Search from './search.jsx'
import EmptyState from './empty_state.jsx'
import PrimaryColorPicker from './primary_color_picker.jsx'

export default class List extends React.Component {
  render() {
    const {illustrations, onSvgClick, onSearchChange} = this.props

    if (illustrations.length > 0) {
      const items = illustrations.map(item => {
        return <ListItem key={item._id} onSvgClick={onSvgClick} item={item} />
      })

      return (
        <React.Fragment>
          <div id="list__config">
            <div>
              <Search onChange={onSearchChange}/>
            </div>

            <div>
              {/*<PrimaryColorPicker onChange={onPrimaryColorChange} />*/}
            </div>
          </div>

          <div id="list">
            {items}
          </div>
        </React.Fragment>
      )
    }

    return <EmptyState message="😞 Error occured while showing previews" />
  }
}
