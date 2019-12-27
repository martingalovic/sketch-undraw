import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

function initializeApp() {
  ReactDOM.render(React.createElement(App, {documentColors: []}), document.getElementById('app'))
}

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})
