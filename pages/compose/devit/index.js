import Head from "next/head"
import { useRouter } from "next/router"
import { addDevit } from "@firebase/client"

import ArrowLeft from "@components/Icons/ArrowLeft"
import { withAuth } from "@components/helpers/withAuth"
import BackButton from "@components/Buttons/BackButton"
import TextComposer from "@components/TextComposer"

import { addOpacityToColor } from "@styles/utils"
import { colors } from "@styles/theme"

const ComposeDevit = ({ user }) => {
  const router = useRouter()

  const handleSumbit = (content, imgURL) => {
    return addDevit({
      avatar: user.avatar,
      content,
      userUid: user.uid,
      displayName: user.displayName,
      userName: user.userName,
      img: imgURL,
    }).then(router.push("/home/"))
  }

  return (
    <>
      <Head>
        <title>Compose a new Devit / Devtter</title>
      </Head>
      <section>
        <BackButton
          size={34}
          hoverColor={addOpacityToColor(colors.gray, 0.15)}
          title="Back"
        >
          <ArrowLeft width={20} height={20} color={colors.black} />
        </BackButton>
        <TextComposer
          user={user}
          onSumbit={handleSumbit}
          placeholder="What's happening?"
          size={150}
        />
      </section>
      <style jsx>{`
        section {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      `}</style>
    </>
  )
}

export default withAuth(ComposeDevit)
