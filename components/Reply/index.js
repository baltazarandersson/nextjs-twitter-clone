import Link from "next/link"

import Avatar from "@components/Avatar"
import InteractButton from "@components/Buttons/InteractButton"
import Like from "@components/Icons/Like"
import TextSeparator from "@components/TextSeparator"
import useDateTimeFormat from "@hooks/useDateTimeFormat"
import useTimeAgo from "@hooks/useTimeAgo"

import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export default function Reply({ replyContent }) {
  const { avatar, createdAt, displayName, userName, content, img } =
    replyContent
  const timeAgo = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)

  return (
    <>
      <article>
        <div className="avatar-container">
          <Link href={`/${userName}`}>
            <a onClick={(e) => e.stopPropagation()}>
              <Avatar src={avatar} alt={displayName} />
            </a>
          </Link>
        </div>
        <div className="reply-container">
          <div className="reply-info-container">
            <Link href={`/${userName}`}>
              <a className="text-ellipsis-container">
                <span className="user-name">{displayName}</span>
              </a>
            </Link>

            <a className="text-ellipsis-container">
              <span className="user-tag">@{userName}</span>
            </a>

            <TextSeparator />

            <a className="text-ellipsis-container">
              <time className="timestamp" title={createdAtFormated}>
                {timeAgo}
              </time>
            </a>
          </div>
          <div className="reply-content-container">
            <p className="reply-content">{content}</p>
            {img && <img src={img} />}
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
          display: flex;
          align-items: stretch;
          padding: 10px 15px;
          border-bottom: 1px solid ${colors.dimmedGray};
          transition: background 0.2s ease-in-out;
          overflow: hidden;
        }
        .avatar-container {
          padding-right: 10px;
        }
        .reply-container {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1 1 auto;
        }
        .reply-info-container {
          display: flex;
        }
        .timestamp {
          color: ${colors.gray};
          font-size: 15px;
        }
        .reply-content-container {
          display: flex;
          flex-direction: column;
        }
        .reply-content {
          word-break: break-word;
        }
        .interactions-container {
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
        }
        .interactions-container > :global(svg) {
          color: ${colors.gray};
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
        article:hover {
          background: ${colors.dimmedGray};
        }
        .user-name:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
