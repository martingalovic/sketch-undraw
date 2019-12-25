import React from 'react'

export default class Heading extends React.Component {
  render() {
    const {close} = this.props

    return (
      <header>
        <div>
          <h1>unDraw</h1>
          <h3>
            Attribution-free illustrations for client and personal <br/>
            design projects in any color you prefer
          </h3>
        </div>

        <div id="header__right">
          <button id="close" onClick={close}>&times;</button>

          <div id="created-by">
            <small>Created by</small>
            <a id="author" href="https://twitter.com/galovic_" target="_blank">Martin Galovic</a>
          </div>
        </div>
      </header>
    )
  }
}
