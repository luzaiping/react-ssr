
const data = ['FJ', 'XM', 'SM']

export function apiMiddleware(req, res) {

  setTimeout(() => {
    res.status(200).json(data)
    console.log('====== return json response ===================')
  }, 500)

}
