import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export default function InteractButton({
  children,
  onClick,
  title = "button",
  hoverColor,
  hoverBgColor = addOpacityToColor(colors.primary, 0.1),
  size = 34,
  color = colors.gray,
  count,
}) {
  return (
    <>
      <section onClick={() => onClick && onClick()} title={title}>
        <span>{count}</span>
        <div />
        {children}
      </section>
      <style jsx>{`
        section {
          color: ${color};
          position: relative;
          display: flex;
          width: ${size}px;
          height: ${size}px;
          border: none;
          background: inherit;
          justify-content: center;
          align-items: center;
        }
        section > span {
          position: absolute;
          left: 30px;
          font-size: 13px;
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
          color: ${color};
          display: block;
        }
        section > div:hover {
          background: ${hoverBgColor};
        }
        section:hover {
          color: ${hoverColor};
        }
        section:hover :global(svg) {
          color: ${hoverColor};
        }
      `}</style>
    </>
  )
}
