import Head from "next/head"

import SumbitButton from "@components/Buttons/ActionButton"
import AppLayout from "@components/Layout/AppLayout"
import Header from "@components/Layout/AppLayout/Header"

import { colors, fonts } from "@styles/theme"
import Location from "@components/Icons/Location"
import Calendar from "@components/Icons/Calendar"

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

export default function User({
  displayName,
  userName,
  photoURL,
  location,
  following,
  followers,
  likes,
  email,
}) {
  console.log(following)
  return (
    <>
      <Head>
        <title>{`${displayName} (@${userName}) / Devtter`}</title>
      </Head>
      <AppLayout>
        <Header></Header>
        <section>
          <div className="cover-container"></div>
          <section className="user-container">
            <div className="header-info">
              <div className="picture-container">
                <img className="picture" src={photoURL} />
              </div>
              <SumbitButton>Follow</SumbitButton>
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
                <span>Joined March 2022</span>
              </span>
            </div>
            <div className="social-stats">
              <div className="social-stat-container">
                <span className="social-stat">{following.length}</span>
                <span className="social-stat-name">Following</span>
              </div>
              <div className="social-stat-container">
                <span className="social-stat">{followers.length}</span>
                <span className="social-stat-name">Followers</span>
              </div>
            </div>
          </section>
        </section>
      </AppLayout>
      <style jsx>{`
        section {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
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
        }
        .header-info {
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
          font-size: 20px;
          font-weight: 700;
        }
        .tag-name {
          font-size: 15px;
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
          gap: 4px;
          margin-right: 20px;
          font-size: 15px;
        }
        .social-stat {
          font-family: ${fonts.secondary};
          line-height: 24px;
        }
        .social-stat-name {
          color: ${colors.gray};
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
