import LinkButton from "@components/Buttons/LinkButton"
import Create from "@components/Icons/Create"
import Home from "@components/Icons/Home"
import Star from "@components/Icons/Star"
import User from "@components/Icons/User"
import useUser from "@hooks/useUser"
import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export default function AppLayout({ children }) {
  const user = useUser()
  return (
    <>
      <section>{children}</section>
      <nav>
        <LinkButton
          hoverColor={addOpacityToColor(colors.gray, 0.15)}
          href="/home"
          title="Home"
          size={42}
          padding={6}
        >
          <Home width={26} height={26} color={colors.black} />
        </LinkButton>
        <LinkButton
          hoverColor={addOpacityToColor(colors.gray, 0.15)}
          href="/following"
          title="Following"
          size={42}
          padding={6}
        >
          <Star width={26} height={26} color={colors.black} />
        </LinkButton>
        <LinkButton
          hoverColor={addOpacityToColor(colors.gray, 0.15)}
          href="/compose/devit"
          title="Devit"
          size={42}
          padding={6}
        >
          <Create width={26} height={26} color={colors.black} />
        </LinkButton>
        <LinkButton
          hoverColor={addOpacityToColor(colors.gray, 0.15)}
          href={`/${user?.userName}`}
          title="Profile"
          size={42}
          padding={6}
        >
          <User width={26} height={26} color={colors.black} />
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
