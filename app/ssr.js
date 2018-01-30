import React from 'react'
import { renderToString } from 'react-dom/server'
import template from './template'
import App from './components/app'

export default function render(req, res) {
  const appString = renderToString(<App />)

  const templateString = template({
    body: appString,
    title: 'FROM THE SERVER',
  })

  const finalString = `${templateString}<script type="text/javascript" src="/client.js"></script></body></html>`
  
  res.send(finalString)
}