import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import { useRouter } from "next/router"

export default function BackButton({
  children,
  title = "button",
  hoverColor = addOpacityToColor(colors.primary, 0.18),
  padding = 8,
  size = 34,
}) {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <>
      <a title={title} onClick={handleClick}>
        <div>{children}</div>
      </a>
      <style jsx>{`
        a {
          display: block;
          width: ${size}px;
          height: ${size}px;
        }
        a > div {
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          height: fit-content;
          padding: ${padding}px;
          border-radius: 9999px;
          transition: background 0.2s ease;
        }
        a > div > :global(svg) {
          display: block;
        }
        a > div:hover {
          background: ${hoverColor};
        }
      `}</style>
    </>
  )
}
