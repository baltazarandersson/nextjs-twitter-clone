import { firestore } from "@firebase/admin/admin"

export default (req, res) => {
  const { query } = req
  const { id } = query

  firestore
    .collection("devits")
    .listDocuments()
    .then((list) => {
      console.log(list)
    })

  firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      console.log(doc.data())
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      res.json({ ...data, id, createdAt: +createdAt.toDate() })
    })
    .catch(() => {
      res.status(404).end()
    })
}
