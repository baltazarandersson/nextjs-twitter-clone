import { useRouter } from "next/router"
import Link from "next/link"

import Avatar from "@components/Avatar"
import TextSeparator from "@components/TextSeparator"
import useDateTimeFormat from "@hooks/useDateTimeFormat"
import useTimeAgo from "@hooks/useTimeAgo"
import DevitInteractions from "./DevitInteractions"

import { colors } from "@styles/theme"
import DevitOptions from "./DevitOptions"
import { useMemo } from "react"
import { useUser } from "@context/UserContext"

export default function Devit({
  devit,
  showInteractions = true,
  showOptions = true,
}) {
  const {
    id,
    avatar,
    content,
    createdAt,
    displayName,
    userName,
    userUid,
    img,
  } = devit
  const timeAgo = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()
  const user = useUser()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  const isDevitMadeByCurrentUser = useMemo(() => {
    return userUid === user.uid
  }, [])

  return (
    <>
      <article onClick={handleArticleClick}>
        <div className="avatar-container">
          <Link href={`/${userName}`}>
            <a onClick={(e) => e.stopPropagation()}>
              <Avatar src={avatar} alt={displayName} />
            </a>
          </Link>
        </div>
        <div className="devit-container">
          <div className="devit-headers-container">
            <div className="devit-info-container">
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
              <TextSeparator />
              <Link href={`/status/${id}`}>
                <a className="text-ellipsis-container">
                  <time className="timestamp" title={createdAtFormated}>
                    {timeAgo}
                  </time>
                </a>
              </Link>
            </div>
            {showOptions && isDevitMadeByCurrentUser && (
              <div
                className="devit-options"
                onClick={(e) => e.stopPropagation()}
              >
                <DevitOptions devitId={id} />
              </div>
            )}
          </div>
          <div className="devit-content-container">
            <p className="devit-content">{content}</p>
            {img && <img src={img} />}
            <div>
              {showInteractions && (
                <section className="interactions-container">
                  <DevitInteractions id={id} devit={devit} />
                </section>
              )}
            </div>
          </div>
        </div>
      </article>
      <style jsx>{`
        .text-ellipsis-container {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        article {
          position: relative;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: stretch;
          padding: 10px 15px;
          border-bottom: 1px solid ${colors.dimmedGray};
          transition: background 0.2s ease-in-out;
        }
        .avatar-container {
          padding-right: 10px;
        }
        .devit-container {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1 1 auto;
        }
        .devit-headers-container {
          display: flex;
        }
        .devit-info-container {
          min-width: 0;

          display: flex;
        }
        .devit-options {
          min-width: 34px;
          flex: 1 1 auto;
          display: flex;
          justify-content: flex-end;
        }
        .timestamp {
          color: ${colors.gray};
          font-size: 15px;
        }
        .devit-content-container {
          display: flex;
          flex-direction: column;
        }
        .devit-content {
          word-break: break-word;
        }
        .user-name {
          font-weight: 600;
        }
        .user-tag {
          margin-left: 4px;
          color: ${colors.gray};
          font-size: 15px;
        }
        img {
          margin-top: 12px;
          width: 100%;
          border-radius: 10px;
          margin-bottom: 16px;
          border: 1px solid ${colors.lightGray};
        }
        .timestamp:hover {
          text-decoration: underline;
        }
        article:hover {
          background: ${colors.dimmedGray};
        }
        .user-name:hover {
          text-decoration: underline;
        }
        .interactions-container {
          margin-top: 12px;
        }
      `}</style>
    </>
  )
}
