import Avatar from "@components/Avatar"
import useTimeAgo from "@hooks/createdAt"
import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export default function Devit({
  id,
  avatar,
  userName,
  userId,
  likesCount,
  sharesCount,
  createdAt,
  content,
  img,
}) {
  const timeAgo = useTimeAgo(createdAt)

  return (
    <>
      <article>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <div className="devit-content-container">
          <div className="devit-info">
            <strong>{userName}</strong>
            <span className="separator">·</span>
            <div className="timestamp-container">
              <time>{timeAgo}</time>
            </div>
          </div>
          <p>{content}</p>
          {img && <img src={img} />}
          {console.log(img)}
        </div>
      </article>
      <style jsx>{`
        .devit-info {
          width: auto;
          display: flex;
          white-space: nowrap;
        }
        .timestamp-container {
          display: flex;
          gap: 4px;
        }
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 1px solid ${colors.dimmedGray};
          transition: background 0.2s ease-in-out;
        }
        .devit-content-container {
          overflow-x: hidden;
          flex-grow: 1;
        }
        article:hover {
          background: ${addOpacityToColor(colors.dimmedGray, 0.8)};
        }
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        strong {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .separator {
          color: ${colors.gray};
          padding: 0px 4px;
          font-weight: 600;
        }
        img {
          margin-top: 12px;
          width: 100%;
          border-radius: 10px;
          margin-bottom: 16px;
        }
        time {
          color: ${colors.gray};
        }
      `}</style>
    </>
  )
}
