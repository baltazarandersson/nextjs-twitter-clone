const admin = require("firebase-admin")

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG)
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
serviceAccount.private_key = privateKey

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const firestore = admin.firestore()
