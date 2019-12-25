import React from 'react'

import Heading from './app/heading.jsx'
import List from './app/list.jsx'

import {getList, getImage, getSearchList} from "./app/utils/api.jsx"
import EmptyState from "./app/empty_state.jsx"
import Search from "./app/search.jsx";
import PrimaryColorPicker from "./app/primary_color_picker.jsx";

import InfiniteScroll from 'react-infinite-scroller'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      illustrations: [],
      hasMore: null,

      searchTerms: '',
      primaryColor: '#bada55',

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
          hasMore: response.data.hasMore
        })
      })
      .catch(err => {
        window.postMessage('nativeLog', "❌ Unable to load illustrations: " + err)
      })
      .finally(() => {
        this.setState({loading: false})
      })
  }

  fetchSearch() {
    const {searchTerms} = this.state

    this.setState({searching: true})
    window.postMessage('console', 'loading' + searchTerms)

    getSearchList(searchTerms)
      .then(response => {
        this.setState({
          searchIllustrations: response.data.icons
        })
      })
      .catch(err => {
        window.postMessage('nativeLog', '❌ Error while searching: ' + err)
      })
      .finally(() => {
        this.setState({searching: false})
      })
  }

  close() {
    window.postMessage('close')
  }

  onSvgClick(item) {
    const {primaryColor} = this.state
    this.setState({pasting: true})

    getImage(item.image, primaryColor)
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

  onSearchChange(searchTerms) {
    this.setState({searchTerms})
    this.fetchSearch()
  }

  onPrimaryColorChange(primaryColor) {
    this.setState({primaryColor})
  }

  render() {
    const {
      loading,
      pasting,
      searching,
      illustrations,
      hasMore,
      primaryColor,
      searchIllustrations,
      searchTerms
    } = this.state

    let content

    const showSearchResults = searchTerms !== ''

    if (loading) {
      content = <EmptyState message="Loading..." />
    } else if (pasting) {
      content = <EmptyState message="Downloading & Pasting..." />
    } else if (searching) {
      content = <EmptyState message="Searching..."/>
    } else {
      content =
        <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchMore.bind(this)}
          hasMore={showSearchResults ? false : hasMore}
          loader={<div className="text-center">Loading more...</div>}
          useWindow={false}
        >
          <List
            illustrations={showSearchResults ? searchIllustrations : illustrations}

            onSvgClick={this.onSvgClick.bind(this)}
          />
        </InfiniteScroll>
    }


    return (
      <div className="app__container">
        <Heading close={this.close.bind(this)}/>

        <div id="list__config">
          <Search searchTerms={searchTerms} onChange={this.onSearchChange.bind(this)}/>
          <PrimaryColorPicker primaryColor={primaryColor} onChange={this.onPrimaryColorChange.bind(this)} />
        </div>

        {content}
      </div>
    )
  }
}
