import Avatar from "@components/Avatar"
import GoBackButton from "@components/Buttons/GoBackButton"
import AppLayout from "@components/Layout/AppLayout"
import Header from "@components/Layout/AppLayout/Header"
import TextSeparator from "@components/TextSeparator"
import useDateTimeFormat from "@hooks/useDateTimeFormat"
import { colors } from "@styles/theme"
import Head from "next/head"
import Link from "next/link"

export async function getServerSideProps(context) {
  const { query, res } = context
  const { id } = query

  const apiResponse = await fetch(`http://localhost:3000/api/devit/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    let userTag = props.userName.toLowerCase()
    userTag = userTag.replace(/\s+/g, "")
    return { props: { ...props, userTag } }
  }
  if (res) {
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
  userName,
  avatar,
  content,
  userId,
  likesCount,
  sharesCount,
  createdAt,
  img,
  userTag,
}) {
  const createdAtFormated = useDateTimeFormat(createdAt, navigator.language, {
    hour: "numeric",
    minute: "numeric",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <>
      <AppLayout header="hola">
        <Head>
          <title>{userName + ' on Devtter: "' + content + '"'}</title>
        </Head>
        <Header>
          <div className="back-to-home-button">
            <GoBackButton url="/home" />
          </div>
          <h1>Devit</h1>
        </Header>
        <article>
          <div className="devit-headers-container">
            <Avatar src={avatar} alt={userName} />
            <div className="devit-headers">
              <span className="user-name">{userName}</span>
              <span className="user-tag">@{userTag}</span>
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
            <div>Devtter App</div>
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
          white-space: nowrap;
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
        div {
          padding-right: 10px;
        }
        p {
          font-size: 23px;
          line-height: 1.3125;
          margin: 0;
          margin-top: 12px;
        }
        .user-name {
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        img {
          margin-top: 12px;
          width: 100%;
          border-radius: 10px;
        }
        time {
          color: ${colors.gray};
        }
        .user-tag {
          color: ${colors.gray};
        }
      `}</style>
    </>
  )
}
