import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'

import sketch from 'sketch'
import sketchDOM from 'sketch/dom'

import _ from 'underscore'

const webviewIdentifier = 'sketch-undraw.webview'

export default function (context) {
  const options = {
    identifier: webviewIdentifier,
    title: "Pick Illustration",
    width: 800,
    height: 600,
    resizable: false,
    show: false
  }
  const recentColorsSettingKey = 'sketch-undraw.recent-colors.1'
  const lastColorSettingKey = 'sketch-undraw.last-color.1'

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', () => {
    const documentColors = sketch.getSelectedDocument().colors.map(color => color.color.substr(0, 7))
    let recentColors = sketch.Settings.settingForKey(recentColorsSettingKey)
    try {
      recentColors = JSON.parse(recentColors.length > 0 ? recentColors : null)
    } catch {
      recentColors = null
    }
    const lastColor = sketch.Settings.settingForKey(lastColorSettingKey)

    const props = {
      documentColors: documentColors,
      recentColors: recentColors,
      lastColor: lastColor,
    }
    browserWindow.webContents.executeJavaScript('initializeApp('+JSON.stringify(props)+')')

    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', s => {
    sketch.UI.message(s)
  })


  webContents.on('updateRecentColorsSetting', colors => {
    sketch.Settings.setSettingForKey(recentColorsSettingKey, colors)
  })

  webContents.on('updateLastColorSetting', color => {
    sketch.Settings.setSettingForKey(lastColorSettingKey, color)
  })

  webContents.on('externalLinkClicked', url => {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url))
  })

  webContents.on('console', s => {
    console.log(s)
  })

  webContents.on('close', () => {
    browserWindow.close()
  })

  webContents.on('pasteIllustration', illustration => {
    try {
      const group = sketchDOM.createLayerFromData(illustration, 'svg')
      group.name = 'Illustration'

      const document = sketch.fromNative(context.document)
      const page = document.selectedPage
      const layers = page.selectedLayers

      let pasted = false

      if (layers.length === 1) {
        layers.forEach(layer => {
          const ratio = group.frame.width / group.frame.height
          group.frame.width = layer.frame.width
          group.frame.height = layer.frame.width / ratio

          if (_.contains(['Artboard', 'Group'], layer.type)) {
            layer.layers.push(group)
            pasted = true
          } else if (_.contains(['ShapePath'], layer.type)) {
            group.parent = layer.parent
            group.frame.x = layer.frame.x
            group.frame.y = layer.frame.y
            layer.remove()

            pasted = true
          }
        })
      }

      if (!pasted) {
        sketch.UI.message("ℹ️ No Rectangle, Group or Artboard was selected — pasting to Page")
        // paste to page
        page.layers.push(group)
      }

      // document.centerOnLayer(group) // XXX: Personally, I don't like centering :/ Will see based on feedback
      browserWindow.close()
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
