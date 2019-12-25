import React from 'react'

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

  updateValue(tmpSearchTerms) {
    this.setState({tmpSearchTerms})
  }

  clear() {
    this.setState({tmpSearchTerms: ''})
  }

  render() {
    const {onChange} = this.props
    const {tmpSearchTerms} = this.state

    return (
      <div id="search-form">
        <input value={tmpSearchTerms} onChange={this.updateValue.bind(this)} />
        <button onClick={this.clear.bind(this)}>Clear</button>
      </div>
    )
  }
}
