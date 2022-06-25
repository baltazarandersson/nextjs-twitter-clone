import { useEffect, useState } from "react"
import Head from "next/head"
import { listenLatestDevits } from "@firebase/client"

import AppLayout from "@components/Layout/AppLayout"
import Avatar from "@components/Avatar"
import Devit from "@components/Devit"
import { Loader } from "@components/Loader"

import { breakpoints } from "@styles/theme"
import Header from "@components/Layout/AppLayout/Header"
import { withAuth } from "@components/helpers/withAuth"

const HomePage = ({ user }) => {
  const [timeline, setTimeline] = useState(undefined)

  useEffect(() => {
    const unsub = listenLatestDevits((newDevits) => {
      setTimeline(newDevits || [])
    })
    return () => unsub()
  }, [user])

  return (
    <>
      <Head>
        <title>Home / Devtter</title>
      </Head>
      <AppLayout>
        <Header>
          <div className="avatar-container">
            <Avatar alt="user-avatar" src={user.avatar} size={32} />
          </div>
          <h1>Home</h1>
        </Header>
        <section>
          {timeline !== undefined ? (
            timeline.map(
              ({
                id,
                avatar,
                displayName,
                userUid,
                likes,
                shares,
                comments,
                createdAt,
                content,
                img,
              }) => {
                return (
                  <Devit
                    key={id}
                    displayName={displayName}
                    avatar={avatar}
                    content={content}
                    id={id}
                    userId={userUid}
                    likes={likes}
                    shares={shares}
                    comments={comments}
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
        .avatar-container {
          min-width: 56px;
        }
        h1 {
          font-size: 20px;
          font-weight: 700;
        }
        section {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .loader-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: ${breakpoints.mobile}) {
          .avatar-container {
            display: none;
          }
        } ;
      `}</style>
    </>
  )
}

export default withAuth(HomePage)
