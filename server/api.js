
const data = ['FJ', 'XM', 'SM']

export function apiMiddleware(req, res) {

  let { query = {} } = req

  let { index = 0 } = query

  setTimeout(() => {
    res.status(200).json(data.slice(index))
  }, 500)

}
