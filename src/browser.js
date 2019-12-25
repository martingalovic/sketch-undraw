import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'

import sketch from 'sketch'
import sketchDOM from 'sketch/dom'

const webviewIdentifier = 'sketch-undraw.webview'

export default function (context) {
  const options = {
    identifier: webviewIdentifier,
    width: 800,
    height: 600,
    show: false
  }

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', s => {
    sketch.UI.message(s)
  })

  webContents.on('pasteIllustration', illustration => {
    try {
      const group = sketchDOM.createLayerFromData(illustration, 'svg')
      group.name = 'Illustration'

      const document = sketch.fromNative(context.document)
      const page = document.selectedPage
      const layers = page.selectedLayers

      if (layers.length === 1) {
        layers.forEach(layer => {
          layer.layers.push(group)
        })
      } else {
        // paste to page
        page.layers.push(group)
      }
    } catch (err) {
      sketch.UI.message("❌ Error occured: " + err)
    }
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}
