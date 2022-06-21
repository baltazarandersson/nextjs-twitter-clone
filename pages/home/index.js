import Avatar from "@components/Avatar"
import Devit from "@components/devit"
import useUser from "@hooks/useUser"
import { colors } from "@styles/theme"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetch("http://localhost:3000/api/statuses/home_timeline")
        .then((res) => res.json())
        .then(setTimeline)
        .catch((err) => {
          console.error(err)
        })
  }, [user])

  return (
    <>
      <header>
        <Avatar alt="icon" src="https://robohash.org/stefan-one" size={32} />
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map((devit) => {
          return (
            <Devit
              key={devit.id}
              username={devit.username}
              avatar={devit.avatar}
              message={devit.message}
              id={devit.id}
            />
          )
        })}
      </section>
      <nav></nav>
      <style jsx>{`
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

        h2 {
          font-size: 21px;
          font-weight: 700;
          margin-left: 16px;
        }
        nav {
          position: sticky;
          bottom: -1px;
          background: rgba(255, 255, 255);
          border-top: 1px solid ${colors.dimmedGray};
          height: 49px;
          width: 100%;
        }
      `}</style>
    </>
  )
}
