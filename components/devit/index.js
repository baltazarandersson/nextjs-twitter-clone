import Avatar from "@components/Avatar"
import InteractButton from "@components/Buttons/InteractButton"
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
        <div className="devit-container">
          <div className="devit-info-container">
            <span className="user-name">{userName}</span>
            <TextSeparator />
            <Link href={`/status/${id}`}>
              <a className="timestamp-container">
                <time className="timestamp" title={createdAtFormated}>
                  {timeAgo}
                </time>
              </a>
            </Link>
          </div>
          <div className="debit-content">
            <p>{content}</p>
            {img && <img src={img} />}
            <section className="interactions-container">
              <InteractButton
                size={18}
                hoverColor={colors.primary}
                hoverBgColor={addOpacityToColor(colors.primary, 0.1)}
                title="Comment"
              >
                <Comment width={18} height={18} color={colors.gray} />
              </InteractButton>
              <InteractButton
                size={18}
                hoverColor={colors.green}
                hoverBgColor={addOpacityToColor(colors.green, 0.1)}
                title="Revit"
              >
                <Revit width={18} height={18} color={colors.gray} />
              </InteractButton>
              <InteractButton
                size={18}
                hoverColor={colors.red}
                hoverBgColor={addOpacityToColor(colors.red, 0.1)}
                title="Like"
              >
                <Like width={18} height={18} color={colors.gray} />
              </InteractButton>
              <InteractButton
                size={18}
                hoverColor={colors.secondary}
                hoverBgColor={addOpacityToColor(colors.secondary, 0.1)}
                title="Share"
              >
                <Share width={18} height={18} color={colors.gray} />
              </InteractButton>
            </section>
          </div>
        </div>
      </article>
      <style jsx>{`
        article {
          cursor: pointer;
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
        .devit-container {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1 1 auto;
        }
        .devit-info-container {
          display: flex;
        }
        .timestamp-container {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .timestamp {
          color: ${colors.gray};
        }
        .debit-content {
          display: flex;
          flex-direction: column;
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
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        img {
          margin-top: 12px;
          width: 100%;
          border-radius: 10px;
          margin-bottom: 16px;
        }
        .timestamp:hover {
          text-decoration: underline;
        }
        article:hover {
          background: ${addOpacityToColor(colors.dimmedGray, 0.8)};
        }
      `}</style>
    </>
  )
}
