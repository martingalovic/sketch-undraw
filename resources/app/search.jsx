import React from 'react'
import _ from 'underscore'

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tmpSearchTerms: ''
    }
  }

  updateAppValue() {
    this.props.onChange(this.state.tmpSearchTerms)
  }

  updateValue(event) {
    this.setState({tmpSearchTerms: event.target.value})
    this.updateAppValue()
  }

  clear() {
    this.setState({tmpSearchTerms: ''})
  }

  render() {
    const {searchTerms, onChange} = this.props
    const {tmpSearchTerms} = this.state

    return (
      <div id="search-form">
        <input value={tmpSearchTerms} onChange={(event) => this.updateValue(event)} placeholder="Type to search" />
        <button onClick={this.clear.bind(this)}>Clear</button>
      </div>
    )
  }
}
