import LinkButton from "@components/Buttons/LinkButton"
import Create from "@components/Icons/Create"
import Home from "@components/Icons/Home"
import Search from "@components/Icons/Search"
import User from "@components/Icons/User"
import { colors } from "@styles/theme"

export default function AppLayout({ children }) {
  return (
    <>
      <section>{children}</section>
      <nav>
        <LinkButton href="/home" title="Home" size={42} padding={6}>
          <Home width={26} height={26} color={colors.primary} />
        </LinkButton>
        <LinkButton href="/search" title="Search" size={42} padding={6}>
          <Search width={26} height={26} color={colors.primary} />
        </LinkButton>
        <LinkButton href="/compose/devit" title="Devit" size={42} padding={6}>
          <Create width={26} height={26} color={colors.primary} />
        </LinkButton>
        <LinkButton href="/" title="profile" size={42} padding={6}>
          <User width={26} height={26} color={colors.primary} />
        </LinkButton>
      </nav>
      <style jsx>{`
        section {
          flex: 1 1 auto;
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
        nav > :global(a) {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1 1 auto;
        }
      `}</style>
    </>
  )
}
