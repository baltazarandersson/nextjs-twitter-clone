import { adminFirestore } from "@firebase/admin/admin"
import { fromTimeStampToDate } from "utils/fromTimestampToDate"

export default (req, res) => {
  const { query } = req
  const { userTag } = query

  adminFirestore
    .collection("users")
    .where("userName", "==", userTag)
    .get()
    .then((querySnap) => {
      const [user] = querySnap.docs.map((userDoc) => {
        return userDoc.data()
      })
      const { creationDate } = user

      if (user) {
        res
          .status(200)
          .json({ ...user, creationDate: fromTimeStampToDate(creationDate) })
      } else {
        res.status(404).json({
          errors: {
            code: 404,
            message: "User Not Found",
          },
        })
      }
    })
    .catch(() => {
      res.status(404).json({
        errors: {
          code: 404,
          message: "User Not Found",
        },
      })
    })
}
