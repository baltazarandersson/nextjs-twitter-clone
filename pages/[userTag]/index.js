import { useEffect, useMemo, useState } from "react"
import Head from "next/head"
import {
  followUser,
  listenLatestUserDevits,
  unfollowUser,
} from "@firebase/client"

import { useUser } from "@context/UserContext"
import Timeline from "@containers/Timeline"
import ActionButton from "@components/Buttons/ActionButton"
import AppLayout from "@components/Layout/AppLayout"
import Header from "@components/Layout/AppLayout/Header"
import Location from "@components/Icons/Location"
import Calendar from "@components/Icons/Calendar"
import useDateTimeFormat from "@hooks/useDateTimeFormat"
import ArrowLeft from "@components/Icons/ArrowLeft"
import BackButton from "@components/Buttons/BackButton"

import { colors, fonts } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export async function getServerSideProps(context) {
  const { query } = context
  const { userTag } = query

  const apiResponse = await fetch(`http://localhost:3000/api/users/${userTag}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  } else {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    }
  }
}

const FOLLOWING_STATES = {
  NOT_FOLLOWING: 0,
  FOLLOWING: 1,
}

export default function UserProfile({
  displayName,
  userName,
  avatar,
  uid,
  location,
  creationDate,
  following,
  followingCount,
  followers,
  followersCount,
  email,
  devits,
}) {
  const [userTimeLine, setUserTimeline] = useState(undefined)
  const [followingState, setFollowingState] = useState(
    FOLLOWING_STATES.NOT_FOLLOWING
  )
  const [isButtonHovered, setButtonHover] = useState(false)

  const user = useUser()

  const isButtonDisabled = useMemo(() => {
    return !user
  }, [user])
  const followButtonValue = useMemo(() => {
    if (followingState === FOLLOWING_STATES.FOLLOWING) {
      if (isButtonHovered) {
        return "Unfollow"
      } else {
        return "Following"
      }
    } else {
      return "Follow"
    }
  })

  useEffect(() => {
    if (user) {
      if (user.following.includes(uid))
        setFollowingState(FOLLOWING_STATES.FOLLOWING)
    } else {
      setFollowingState(FOLLOWING_STATES.NOT_FOLLOWING)
    }
  }, [user])

  const parsedCreationDate = useDateTimeFormat(creationDate, "en-EN", {
    month: "long",
    year: "numeric",
  })

  useEffect(() => {
    const unsub = listenLatestUserDevits(uid, setUserTimeline)
    return () => unsub()
  }, [])

  const handleClick = async (followedUserUid, followerUserUid) => {
    if (followingState === FOLLOWING_STATES.NOT_FOLLOWING) {
      await followUser(followedUserUid, followerUserUid)
      setFollowingState(FOLLOWING_STATES.FOLLOWING)
    } else {
      await unfollowUser(followedUserUid, followerUserUid)
      setFollowingState(FOLLOWING_STATES.NOT_FOLLOWING)
    }
  }

  return (
    <>
      <Head>
        <title>{`${displayName} (@${userName}) / Devtter`}</title>
      </Head>
      <AppLayout>
        <Header>
          <div className="back-to-home-button">
            <BackButton
              size={34}
              hoverColor={addOpacityToColor(colors.gray, 0.15)}
              title="Back"
            >
              <ArrowLeft width={20} height={20} color={colors.black} />
            </BackButton>
          </div>
          <div className="header-info-container">
            <span className="header-user-name">{displayName}</span>
            <span className="header-devits">{devits.length} devits</span>
          </div>
        </Header>
        <section className="main">
          <div className="cover-container"></div>
          <section className="user-container">
            <div className="account-header-info">
              <div className="picture-container">
                <img className="picture" src={avatar} />
              </div>
              <div
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
              >
                <ActionButton
                  disabled={isButtonDisabled}
                  onClick={() => handleClick(uid, user.uid)}
                  styletype={
                    followingState === FOLLOWING_STATES.FOLLOWING
                      ? "outline"
                      : "fill"
                  }
                >
                  {followButtonValue}
                </ActionButton>
              </div>
            </div>
            <div className="names-container">
              <span className="display-name">{displayName}</span>
              <span className="tag-name">@{userName}</span>
            </div>
            <div className="bio">A description goes here...</div>
            <div className="account-info">
              <span className="location">
                <Location />
                <span>{location}</span>
              </span>
              <span className="creation-date">
                <Calendar />
                <span>Joined {parsedCreationDate}</span>
              </span>
            </div>
            <div className="social-stats">
              <div className="social-stat-container">
                <span className="social-stat">{followingCount}</span>
                <span className="social-stat-name">Following</span>
              </div>
              <div className="social-stat-container">
                <span className="social-stat">{followersCount}</span>
                <span className="social-stat-name">Followers</span>
              </div>
            </div>
          </section>
          <section className="timeline-container">
            <Timeline devitsList={userTimeLine} />
          </section>
        </section>
      </AppLayout>
      <style jsx>{`
        .main {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          border-bottom: 1px solid ${colors.dimmedGray};
        }
        .back-to-home-button {
          min-width: 56px;
        }
        .header-info-container {
          display: flex;
          flex-direction: column;
        }
        .header-user-name {
          font-size: 18px;
          font-weight: 700;
        }
        .header-devits {
          font-size: 13px;
          color: ${colors.gray};
        }
        .cover-container {
          background-color: ${colors.primary};
          width: 100%;
          min-height: 96px;
          max-height: 96px;
        }
        .user-container {
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          border-bottom: 1px solid ${colors.dimmedGray};
        }
        .account-header-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .picture-container {
          box-sizing: content-box;
          overflow: hidden;
          position: relative;
          margin-top: -40px;
          border-radius: 50%;
          background-color: #fff;
          border: 2px solid #fff;
          width: 60px;
          height: 60px;
          max-width: 120px;
          max-height: 120px;
        }
        .picture {
          width: 100%;
          height: 100%;
        }
        .names-container {
          display: flex;
          flex-direction: column;
          margin-top: 4px;
          margin-bottom: 12px;
          font-size: ;
        }
        .display-name {
          font-size: 18px;
          font-weight: 700;
        }
        .tag-name {
          font-size: 14px;
          color: ${colors.gray};
          font-weight: 400;
        }
        .bio {
          margin-bottom: 12px;
        }
        .account-info {
          font-size: 15px;
          display: flex;
          align-items: center;
          color: ${colors.gray};
          margin-bottom: 12px;
        }
        .account-info > span {
          display: flex;
          align-items: center;
          margin-right: 12px;
          min-width: 0;
        }
        .account-info :global(svg) {
          width: 18px;
          margin-right: 4px;
        }
        .social-stats {
          display: flex;
        }
        .social-stat-container {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-right: 20px;
          font-size: 15px;
        }
        .social-stat {
          font-family: ${fonts.secondary};
        }
        .social-stat-name {
          color: ${colors.gray};
        }
        .timeline-container {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
        }
        .loader-container {
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 300px) {
          .picture-container {
            border: 3px solid #fff;
            margin-top: -13vw;
            width: 20vw;
            height: 20vw;
          }
          .picture {
          }
        }
        @media (min-width: 600px) {
          .picture-container {
            border: 5px solid #fff;
            margin-top: -70px;
            width: 120px;
            height: 120px;
          }
          .picture {
          }
        }
      `}</style>
    </>
  )
}
