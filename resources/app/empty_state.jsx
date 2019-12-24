import React from 'react'

export default class EmptyState extends React.Component {
  render() {
    return (
      <div className="empty-state">
        {this.props.message}
      </div>
    )
  }
}
