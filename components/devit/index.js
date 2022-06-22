import Avatar from "@components/Avatar"
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
}) {
  return (
    <>
      <article>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <div className="devit-info">
            <strong>{userName}</strong>
            <span className="separator">·</span>
            <span>{createdAt}</span>
          </div>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 1px solid ${colors.dimmedGray};
          transition: background 0.2s ease-in-out;
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

        .separator {
          padding: 0px 4px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}
