
export default ({ rootContent, title, preLoadedState }) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>
    
    <body>
      <div id="root">${rootContent}</div>
      <script>
        window.__PRE_LOADED_STATE__ = ${JSON.stringify(preLoadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="/bundle.js"></script>
  </html>
`)
