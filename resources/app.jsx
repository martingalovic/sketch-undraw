import React from 'react'

import Heading from './app/heading.jsx'
import List from './app/list.jsx'

import {getList, getImage, getSearch} from "./app/utils/api.jsx"
import EmptyState from "./app/empty_state.jsx"

import InfiniteScroll from 'react-infinite-scroller'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      illustrations: [],
      hasMore: null,

      query: '',
      color: '#bada55',

      loading: true,
      pasting: false,
      searching: false,
    }
  }

  componentDidMount() {
    this.fetchMore(0)
  }

  fetchMore(page) {
    getList(page)
      .then(response => {
        this.setState({
          illustrations: this.state.illustrations.concat(response.data.icons),
          hasMore: response.data.hasMore,
          nextPage: page + 1
        })
      })
      .catch(err => {
        window.postMessage('nativeLog', "❌ Unable to load illustrations ")
      })
      .finally(() => {
        this.setState({loading: false})
      })
  }

  close() {
    window.postMessage('close')
  }

  onSvgClick(item) {
    const {color} = this.state
    this.setState({pasting: true})

    getImage(item.image, color)
      .then(response => {
        window.postMessage('pasteIllustration', response.data.img)
      })
      .catch(err => {
        window.postMessage('nativeLog', "❌ Couldn't download illustration")
      })
      .finally(() => {
        this.setState({pasting: false})
      })
  }

  render() {
    const {loading, pasting, searching, illustrations, hasMore} = this.state

    let content

    if (loading) {
      content = <EmptyState message="Loading..." />
    } else if (pasting) {
      content = <EmptyState message="Downloading & Pasting..." />
    } else if (searching) {
      content = <EmptyState message="Searching..." />
    } else {
      content = <List onSvgClick={this.onSvgClick.bind(this)} illustrations={illustrations} />
    }

    return (
      <div className="app__container">
        <Heading close={this.close.bind(this)}/>

        <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchMore.bind(this)}
          hasMore={hasMore}
          loader={<div className="text-center">Loading more...</div>}
          useWindow={false}
        >
          {content}
        </InfiniteScroll>
      </div>
    )
  }
}
