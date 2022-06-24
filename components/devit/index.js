import Avatar from "@components/Avatar"
import Comment from "@components/Icons/Comment"
import Like from "@components/Icons/Like"
import Revit from "@components/Icons/Revit"
import Share from "@components/Icons/Share"
import TextSeparator from "@components/TextSeparator"
import useDateTimeFormat from "@hooks/useDateTimeFormat"
import useTimeAgo from "@hooks/useTimeAgo"
import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import Link from "next/link"
import { useRouter } from "next/router"

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
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick}>
        <div className="avatar-container">
          <Avatar src={avatar} alt={userName} />
        </div>
        <div className="devit-content-container">
          <div className="devit-info">
            <div className="user-name">{userName}</div>
            <TextSeparator />
            <div className="timestamp-container">
              <Link href={`/status/${id}`}>
                <a>
                  <time title={createdAtFormated}>{timeAgo}</time>
                </a>
              </Link>
            </div>
          </div>
          <p>{content}</p>
          {img && <img src={img} />}
          <section className="interactions-container">
            <Comment />
            <Revit />
            <Like />
            <Share />
          </section>
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
          cursor: pointer;
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
        .avatar-container {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
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
          overflow: hidden;
          text-overflow: ellipsis;
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
        time:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
