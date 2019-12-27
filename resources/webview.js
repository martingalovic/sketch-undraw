import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

window.initializeApp = function(props) {
  ReactDOM.render(React.createElement(App, props), document.getElementById('app'))
}


// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})
