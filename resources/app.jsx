import React from 'react'

import Heading from './app/heading.jsx'
import List from './app/list.jsx'

import {getList, getImage, getSearch} from "./app/utils/api.jsx"
import EmptyState from "./app/empty_state.jsx"

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0,
      illustrations: [],
      hasMore: null,

      query: '',
      color: '#bada55',

      loading: true,
    }
  }

  componentDidMount() {
    getList(this.state.currentPage)
      .then(response => {
        this.setState({ illustrations: response.data.icons, hasMore: response.data.hasMore })
      })
      .catch(err => {
        window.postMessage('nativeLog', "❌ Unable to load illustrations ")
      })
      .finally(() => {
        this.setState({loading: false})
      })
  }

  onSvgClick(item) {
    const {color} = this.state

    getImage(item.image, color)
      .then(response => {
        window.postMessage('pasteIllustration', response.data.img)
      })
      .catch(err => {
        window.postMessage('nativeLog', "❌ Couldn't download illustration")
      })
  }

  render() {
    const {loading, illustrations, hasMore} = this.state

    let content

    if (loading) {
      content = <EmptyState message="Loading..." />
    } else {
      content = <List onSvgClick={this.onSvgClick.bind(this)} illustrations={illustrations} />
    }

    return (
      <div className="app__container">
        <Heading/>

        {content}
      </div>
    )
  }
}
