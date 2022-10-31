import faunadb  from "faunadb"
const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_KEY,
  domain: 'db.fauna.com',
  // NOTE: Use the correct domain for your database's Region Group.
  port: 443,
  scheme: 'https',
})
const q = faunadb.query
const getResponse = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("selas-address"))),
      q.Lambda("doc", q.Get(q.Var("doc")))
    )
  )

  return data
}

module.exports = {
  getResponse,
}
