import Avatar from "@components/Avatar"
import LinkButton from "@components/Buttons/LinkButton"
import ArrowLeft from "@components/Icons/ArrowLeft"
import AppLayout from "@components/Layout/AppLayout"
import Header from "@components/Layout/AppLayout/Header"
import TextSeparator from "@components/TextSeparator"
import useDateTimeFormat from "@hooks/useDateTimeFormat"
import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import Head from "next/head"
import Link from "next/link"

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
  likes,
  comments,
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

  return (
    <>
      <Head>
        <title>{displayName + ' on Devtter: "' + content + '"'}</title>
      </Head>
      <AppLayout>
        <Header>
          <div className="back-to-home-button">
            <LinkButton
              href="/home"
              title="Back"
              color={colors.black}
              hoverColor={addOpacityToColor(colors.gray, 0.15)}
              size={34}
            >
              <ArrowLeft width={20} height={20} color={colors.black} />
            </LinkButton>
          </div>
          <h1>Devit</h1>
        </Header>
        <article>
          <div className="devit-headers-container">
            <Avatar src={avatar} alt={displayName} />
            <div className="devit-headers">
              <span className="user-name">{displayName}</span>
              <span className="user-tag">@{userName}</span>
            </div>
          </div>
          <div className="devit-content-container">
            <p>{content}</p>
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
        .devit-headers-container > :global(div) > :global(img) {
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
        time {
          white-space: nowrap;
        }
        time:hover {
          text-decoration: underline;
        }
        article {
          display: flex;
          flex-direction: column;
          padding: 10px 15px;
          border-bottom: 1px solid ${colors.dimmedGray};
          transition: background 0.2s ease-in-out;
        }
        p {
          font-size: 23px;
          margin: 0;
          margin-top: 12px;
        }
        .user-name {
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .user-tag {
          color: ${colors.gray};
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img {
          margin-top: 12px;
          width: 100%;
          border-radius: 10px;
        }
        a {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        time {
          color: ${colors.gray};
        }
      `}</style>
    </>
  )
}
