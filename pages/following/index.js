import { useEffect, useMemo, useState } from "react"
import Head from "next/head"
import { listenLatestFollowedUsersDevits } from "@firebase/client"

import Avatar from "@components/Avatar"
import { withAuth } from "@components/helpers/withAuth"
import AppLayout from "@components/Layout/AppLayout"
import Header from "@components/Layout/AppLayout/Header"
import Timeline from "@containers/Timeline"
import { useUser } from "@context/UserContext"

import { breakpoints, colors } from "@styles/theme"

function FollowingTimeline() {
  const user = useUser()
  const [followedUsersTimeline, setFollowedUsersTimeline] = useState(undefined)

  const isUserFollowingPeople = useMemo(() => !!user.following.length, [user])

  useEffect(() => {
    if (isUserFollowingPeople) {
      const unsub = listenLatestFollowedUsersDevits(
        user.following,
        (followedUsersDevits) => {
          setFollowedUsersTimeline(followedUsersDevits)
        }
      )
      return () => unsub()
    } else {
      setFollowedUsersTimeline([])
    }
  }, [])

  return (
    <>
      <Head>
        <title>Following / Devtter</title>
      </Head>
      <AppLayout>
        <Header>
          <div className="avatar-container">
            <Avatar
              alt="user-avatar"
              src={user.avatar}
              size={32}
              hoverOpacity={1}
            />
          </div>
          <h1>Following</h1>
        </Header>
        <section>
          {isUserFollowingPeople ? (
            <Timeline devitsList={followedUsersTimeline} />
          ) : (
            <h2>
              Oops, It seems that you are currently not following anybody...
            </h2>
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
        h2 {
          color: ${colors.black};
          margin: auto;
          padding: 0px 12px;
          text-align: center;
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

export default withAuth(FollowingTimeline)
