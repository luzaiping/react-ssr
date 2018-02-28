const getLoaderHtml = ({host, template = 'template', isHttp = true}) => (
  `<html>
    <head>
      <script>
        function requestSSR() {
          var route = location.hash ? location.hash.substring(1, location.hash.indexOf('?') || location.hash.length) : location.pathname || '/'
          var xhr  = $ajax()
          var url = 'http${isHttp ? '' : 's'}://${host}/ssr/${template}' + '?r='+ route
          xhr.open('GET', url)
          xhr.send()

          xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status===200) {
              document.write(xhr.responseText)
            }
          }
          function $ajax() {
            return window.XMLHttpRequest ? new XMLHttpRequest() : (new ActiveXObject(window.ActiveXObject ? "Msxml2.XMLHTTP" : "Microsoft.XMLHTTP"))
          }
        }
        requestSSR()
      </script>
    </head>
  </html>`
)

module.exports = getLoaderHtml
