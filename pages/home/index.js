import { useEffect, useState } from "react"
import Head from "next/head"
import { listenLatestDevits } from "@firebase/client"

import AppLayout from "@components/Layout/AppLayout"
import useUser from "@hooks/useUser"
import Avatar from "@components/Avatar"
import Devit from "@components/Devit"
import { Loader } from "@components/Loader"

import { colors, breakpoints } from "@styles/theme"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    if (user) {
      const unsub = listenLatestDevits((newDevits) => {
        setTimeline(newDevits)
      })
      return () => unsub()
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Home / Devtter</title>
      </Head>
      <AppLayout>
        <header>
          <div>
            {user ? (
              <Avatar alt="user-avatar" src={user.avatar} size={32} />
            ) : (
              <Loader size={32} />
            )}
          </div>
          <h1>Home</h1>
        </header>
        <section>
          {timeline.length ? (
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
                img,
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
                    img={img}
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
      </AppLayout>
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${colors.dimmedGray};
          position: sticky;
          height: 49px;
          min-height: 49px;
          padding: 0 16px;
          width: 100%;
          top: 0;
          z-index: 1;
        }
        header > div {
          min-width: 56px;
        }
        section {
          position: relative;
        }
        h1 {
          font-size: 20px;
          font-weight: 700;
        }
        .loader-container {
          flex: 1;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: ${breakpoints.mobile}) {
          header > div {
            display: none;
          }
        } ;
      `}</style>
    </>
  )
}
