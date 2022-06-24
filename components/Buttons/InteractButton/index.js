import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export default function InteractButton({
  children,
  onClick,
  title = "button",
  hoverColor,
  hoverBgColor = addOpacityToColor(colors.primary, 0.1),
  padding = 8,
  size = 34,
}) {
  return (
    <>
      <section onClick={() => onClick && onClick()} title={title}>
        <div />
        {children}
      </section>
      <style jsx>{`
        section {
          position: relative;
          display: flex;
          width: ${size}px;
          height: ${size}px;
          border: none;
          background: inherit;
        }
        section > div {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: -8px;
          border-radius: 9999px;
          transition: background 0.2s ease;
        }
        section > :global(svg) {
          display: block;
        }
        section > div:hover {
          background: ${hoverBgColor};
        }
        section:hover :global(svg) {
          color: ${hoverColor};
        }
      `}</style>
    </>
  )
}
