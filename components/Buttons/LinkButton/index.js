import Link from "next/link"

import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

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
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          height: fit-content;
          padding: ${padding}px;
          border-radius: 9999px;
          transition: background 0.2s ease;
        }
        div > :global(svg) {
          display: block;
        }
        div:hover {
          background: ${hoverColor};
        }
      `}</style>
    </>
  )
}
