import Avatar from "@components/Avatar"
import Devit from "@components/devit"
import { Loader } from "@components/Loader"
import { fetchLatestDevits } from "@firebase/client"
import useUser from "@hooks/useUser"
import { colors } from "@styles/theme"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <div className="timeline-container">
        <header>
          {user ? (
            <Avatar alt="user-avatar" src={user.avatar} size={32} />
          ) : (
            <Loader size={32} />
          )}
          <h2>Inicio</h2>
        </header>
        <section>
          {user ? (
            timeline.map(
              ({
                id,
                avatar,
                userName,
                userId,
                likesCount,
                sharesCount,
                createdAt,
                content,
              }) => {
                return (
                  <Devit
                    key={id}
                    userName={userName}
                    avatar={avatar}
                    content={content}
                    id={id}
                    userId={userId}
                    likesCount={likesCount}
                    sharesCount={sharesCount}
                    createdAt={createdAt}
                  />
                )
              }
            )
          ) : (
            <div className="loader-container">
              <Loader size={32} />
            </div>
          )}
        </section>
        <nav></nav>
      </div>
      <style jsx>{`
        .timeline-container {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        header {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          border-bottom: 1px solid ${colors.dimmedGray};
          position: sticky;
          height: 49px;
          padding: 0 16px;
          width: 100%;
          top: 0;
        }
        section {
          flex-grow: 1;
          overflow-y: scroll;
        }
        h2 {
          font-size: 21px;
          font-weight: 700;
          margin-left: 16px;
        }
        nav {
          position: relative;
          bottom: 0;
          background: white;
          border-top: 1px solid ${colors.dimmedGray};
          height: 49px;
          width: 100%;
        }
        .loader-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
