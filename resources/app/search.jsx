import React from 'react'
import _ from 'underscore'

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tmpSearchTerms: ''
    }
  }

  performAppUpdate() {
    this.props.onChange(this.state.tmpSearchTerms)
  }

  handleSearchQuery(query) {
    clearTimeout(this.typingTimer)

    this.typingTimer = setTimeout(() => {
      this.performAppUpdate()
    }, 500)
  }

  handleValueChange(event) {
    this.setState({tmpSearchTerms: event.target.value}, () => {
      this.handleSearchQuery(this.state.tmpSearchTerms)
    })
  }

  clear() {
    this.setState({tmpSearchTerms: ''}, () => {
      this.performAppUpdate()
    })
  }

  isEmpty() {
    return !this.state.tmpSearchTerms || this.state.tmpSearchTerms === ''
  }

  render() {
    const {searchTerms, onChange} = this.props
    const {tmpSearchTerms} = this.state

    return (
      <div id="search-form">
        <input value={tmpSearchTerms} onChange={(event) => this.handleValueChange(event)} autoFocus={true} placeholder="Type to search" />
        <button onClick={this.clear.bind(this)} disabled={this.isEmpty()}>Cancel</button>
      </div>
    )
  }
}
