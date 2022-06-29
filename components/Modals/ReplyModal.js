import { addReplyToDevit } from "@firebase/client"
import ReactDOM from "react-dom"

import { useUser } from "@context/UserContext"
import Devit from "@components/Devit"
import TextComposer from "@components/TextComposer"

import { colors } from "@styles/theme"
import Head from "next/head"

function Reply({ devit, hiddeModal }) {
  const user = useUser()

  const handleSumbit = async (content, imgURL) => {
    addReplyToDevit(
      {
        avatar: user.avatar,
        content,
        userUid: user.uid,
        displayName: user.displayName,
        userName: user.userName,
        img: imgURL,
      },
      devit.id
    ).then(() => {
      hiddeModal()
    })
  }

  const handleClick = () => {
    hiddeModal()
  }

  return (
    <>
      <Head>
        <title>Compose a new Devit / Devtter</title>
      </Head>
      <div onClick={handleClick}>
        <section onClick={(e) => e.stopPropagation()}>
          <Devit devit={devit} showInteractions={false} showOptions={false} />
          <section className="form-section-container">
            <TextComposer
              user={user}
              onSumbit={handleSumbit}
              placeholder="Devit your reply"
              size={80}
            />
          </section>
        </section>
      </div>
      <style jsx>{`
        div {
          position: absolute;
          display: grid;
          place-content: center;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          backdrop-filter: brightness(70%) blur(0.5px);
          z-index: 1;
        }
        section {
          overflow: hidden;
          border-radius: 16px;
          max-width: 400px;
          background-color: #fff;
          padding: 12px 0;
        }
        .form-section-container {
          overflow: scroll;
          max-height: 200px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 10px 15px;
          border-bottom: 1px solid ${colors.dimmedGray};
        }
      `}</style>
    </>
  )
}

export function ReplyModal({ devit, hiddeModal }) {
  return ReactDOM.createPortal(
    <Reply devit={devit} hiddeModal={hiddeModal} />,
    document.getElementById("modals")
  )
}
