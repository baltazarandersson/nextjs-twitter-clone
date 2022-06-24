import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import Link from "next/link"

export default function LinkButton({
  children,
  href = "/",
  title = "button",
  hoverColor = addOpacityToColor(colors.primary, 0.18),
  padding = 8,
  size = 34,
}) {
  return (
    <>
      <Link href={href}>
        <a title={title}>
          <div>{children}</div>
        </a>
      </Link>
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
