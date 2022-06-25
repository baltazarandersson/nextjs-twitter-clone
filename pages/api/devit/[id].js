import { adminFirestore } from "@firebase/admin/admin"
import { fromTimeStampToDate } from "utils/fromTimestampToDate"

export default (req, res) => {
  const { query } = req
  const { id } = query

  adminFirestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      res.json({ ...data, id, createdAt: fromTimeStampToDate(createdAt) })
    })
    .catch(() => {
      res.status(404).json({
        errors: {
          code: 404,
          message: "Devit Not Found",
        },
      })
    })
}
