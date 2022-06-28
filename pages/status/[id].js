import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { addReplyToDevit, listenLatestDevitReplies } from "@firebase/client"

import { useUser } from "@context/UserContext"
import useDateTimeFormat from "@hooks/useDateTimeFormat"
import Avatar from "@components/Avatar"
import BackButton from "@components/Buttons/BackButton"
import RepliesList from "@containers/RepliesList"
import DevitInteractions from "@components/Devit/DevitInteractions"
import ArrowLeft from "@components/Icons/ArrowLeft"
import AppLayout from "@components/Layout/AppLayout"
import Header from "@components/Layout/AppLayout/Header"
import TextComposer from "@components/TextComposer"
import TextSeparator from "@components/TextSeparator"

import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

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
  repliesCount,
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
  const [devitReplies, setDevitReplies] = useState([])
  const user = useUser()

  useEffect(() => {
    const unsub = listenLatestDevitReplies(id, setDevitReplies)
    return () => unsub()
  }, [])

  const handleSumbit = async (content, imgURL) => {
    return addReplyToDevit(
      {
        avatar: user.avatar,
        content,
        userUid: user.uid,
        displayName: user.displayName,
        userName: user.userName,
        img: imgURL,
      },
      id
    )
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
                repliesCount={repliesCount}
                shares={shares}
                id={id}
                userUid={userUid}
                size={22}
                justify={"space-around"}
              />
            </section>
            <section className="form-section-container">
              <TextComposer
                user={user}
                onSumbit={handleSumbit}
                placeholder="Devit your reply"
                size={80}
              />
            </section>
          </>
        )}
        <RepliesList list={devitReplies} />
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
          margin: 16px 0px;
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
        img {
          margin-top: 12px;
          width: 100%;
          border-radius: 10px;
          border: 1px solid ${colors.lightGray};
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
        .interactions-container {
          width: 100%;
          padding: 12px 15px;
          border-bottom: 1px solid ${colors.dimmedGray};
        }
      `}</style>
    </>
  )
}
