import { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { fetchLatestDevits } from "@firebase/client"

import useUser from "@hooks/useUser"
import Avatar from "@components/Avatar"
import Devit from "@components/Devit"
import Create from "@components/Icons/Create"
import Home from "@components/Icons/Home"
import Search from "@components/Icons/Search"
import { Loader } from "@components/Loader"

import { colors, breakpoints } from "@styles/theme"
import User from "@components/Icons/User"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Home / Devtter</title>
      </Head>
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
      <nav>
        <Link href="/home">
          <a title="Home">
            <Home width={32} height={32} />
          </a>
        </Link>
        <Link href="/search">
          <a title="Search">
            <Search width={32} height={32} />
          </a>
        </Link>
        <Link href="/compose/devit">
          <a title="Devit">
            <Create width={32} height={32} />
          </a>
        </Link>
        <Link href="/">
          <a title="Profile">
            <User width={32} height={32} />
          </a>
        </Link>
      </nav>

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
          flex: 1;
          flex-grow: 1;
        }
        h1 {
          font-size: 20px;
          font-weight: 700;
        }
        nav {
          position: sticky;
          display: flex;
          bottom: -1px;
          background: white;
          border-top: 1px solid ${colors.dimmedGray};
          max-height: 49px;
          min-height: 49px;
          width: 100%;
        }
        nav a {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1 1 auto;
        }
        nav a > :global(svg) {
          stroke: ${colors.primary};
          color: ${colors.primary};
        }
        nav a:hover {
          background: radial-gradient(#1962ff2d 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
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
