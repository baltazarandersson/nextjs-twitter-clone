import Avatar from "@components/Avatar"
import ActionButton from "@components/Buttons/ActionButton"
import BackButton from "@components/Buttons/BackButton"
import CommentsList from "@components/CommentsList"
import DevitInteractions from "@components/Devit/DevitInteractions"
import ArrowLeft from "@components/Icons/ArrowLeft"
import AppLayout from "@components/Layout/AppLayout"
import Header from "@components/Layout/AppLayout/Header"
import TextSeparator from "@components/TextSeparator"
import { addCommentToDevit, listenLatestDevitComments } from "@firebase/client"
import useDateTimeFormat from "@hooks/useDateTimeFormat"
import useUser from "@hooks/useUser"
import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

export async function getServerSideProps(context) {
  const { query } = context
  const { id } = query

  const apiResponse = await fetch(`http://localhost:3000/api/devit/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  } else {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    }
  }
}

export default function DevitPage({
  id,
  displayName,
  userName,
  avatar,
  content,
  userUid,
  likedBy,
  commentsCount,
  shares,
  createdAt,
  img,
}) {
  const createdAtFormated = useDateTimeFormat(createdAt, "en-EN", {
    hour: "numeric",
    minute: "numeric",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const [replyContent, setReplyContent] = useState("")
  const [devitComments, setDevitComments] = useState([])
  const user = useUser()

  const isButtonDisabled = useMemo(
    () => !replyContent.length || !user,
    [replyContent, user]
  )
  useEffect(() => {
    const unsub = listenLatestDevitComments(id, setDevitComments)
    return () => unsub()
  }, [])

  const handleSumbit = async (e) => {
    e.preventDefault()
    const commentData = {
      displayName: user.displayName,
      userName: user.userName,
      avatar: user.avatar,
      content: replyContent,
    }
    addCommentToDevit(commentData, id).then(() => {
      setReplyContent("")
    })
  }

  const handleChange = (e) => {
    const { value } = e.target
    setReplyContent(value)
  }

  return (
    <>
      <Head>
        <title>{displayName + ' on Devtter: "' + content + '"'}</title>
      </Head>
      <AppLayout>
        <Header>
          <div className="back-to-home-button">
            <BackButton
              size={34}
              hoverColor={addOpacityToColor(colors.gray, 0.15)}
              title="Back"
            >
              <ArrowLeft width={20} height={20} color={colors.black} />
            </BackButton>
          </div>
          <h1>Devit</h1>
        </Header>
        <article>
          <div className="devit-headers-container">
            <Link href={`/${userName}`}>
              <a
                onClick={(e) => e.stopPropagation()}
                className="avatar-container"
              >
                <Avatar src={avatar} alt={displayName} />
              </a>
            </Link>
            <div className="devit-headers">
              <Link href={`/${userName}`}>
                <a
                  onClick={(e) => e.stopPropagation()}
                  className="text-ellipsis-container"
                >
                  <span className="user-name">{displayName}</span>
                </a>
              </Link>
              <Link href={`/${userName}`}>
                <a
                  onClick={(e) => e.stopPropagation()}
                  className="text-ellipsis-container"
                >
                  <span className="user-tag">@{userName}</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="devit-content-container">
            <p className="devit-content">{content}</p>
            {img && <img src={img} />}
          </div>
          <div className="devit-info-container">
            <Link href={`/status/${id}`}>
              <a>
                <time>{createdAtFormated}</time>
              </a>
            </Link>
            <TextSeparator />
            <span>Devtter Web App</span>
          </div>
        </article>
        {user && (
          <>
            <section className="interactions-container">
              <DevitInteractions
                likedBy={likedBy}
                commentsCount={commentsCount}
                shares={shares}
                id={id}
                userUid={userUid}
              />
            </section>
            <section className="form-section-container">
              <form className="post-comment-form" onSubmit={handleSumbit}>
                <Link href={`/${userName}`}>
                  <a
                    onClick={(e) => e.stopPropagation()}
                    className="avatar-container"
                  >
                    <Avatar src={user.avatar} alt={displayName} />
                  </a>
                </Link>
                <textarea
                  placeholder="Devit your reply"
                  onChange={handleChange}
                  value={replyContent}
                ></textarea>
                <ActionButton
                  type="sumbit"
                  disabled={isButtonDisabled}
                  color={colors.primary}
                >
                  Reply
                </ActionButton>
              </form>
            </section>
          </>
        )}
        <CommentsList list={devitComments} />
      </AppLayout>
      <style jsx>{`
        h1 {
          font-size: 20px;
          font-weight: 700;
        }
        .back-to-home-button {
          min-width: 56px;
        }
        .devit-headers-container {
          display: flex;
        }
        .avatar-container {
          flex: 0 0 auto;
          margin-right: 12px;
        }
        .devit-headers {
          width: auto;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .devit-content-container {
          display: flex;
          flex-direction: column;
        }
        .devit-info-container {
          color: ${colors.gray};
          padding: 16px 0px;
          display: flex;
          gap: 4px;
        }
        .devit-info-container > span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .devit-content {
          word-break: break-word;
        }
        time {
          white-space: nowrap;
        }
        time:hover {
          text-decoration: underline;
        }
        article {
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 10px 15px;
          border-bottom: 1px solid ${colors.dimmedGray};
        }
        p {
          font-size: 23px;
          margin: 0;
          margin-top: 12px;
        }
        .user-name {
          font-weight: 600;
        }
        .user-tag {
          color: ${colors.gray};
        }
        img {
          margin-top: 12px;
          width: 100%;
          border-radius: 10px;
        }
        time {
          color: ${colors.gray};
        }
        .text-ellipsis-container {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .user-name:hover {
          text-decoration: underline;
        }
        .form-section-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 10px 15px;
          border-bottom: 1px solid ${colors.dimmedGray};
        }
        textarea {
          border: none;
          border-radius: 10px;
          min-height: 40px;
          outline: 0;
          flex: 1 1 auto;
          padding: 12px 8px;
          margin-right: 12px;
          font-size: 21px;
          resize: none;
          transition: border 0.2s ease;
        }
        .post-comment-form {
          display: flex;
          align-items: start;
          justify-content: space-between;
        }
        .interactions-container {
          width: 100%;
          padding: 12px 15px;
          border-bottom: 1px solid ${colors.dimmedGray};
        }
      `}</style>
    </>
  )
}
