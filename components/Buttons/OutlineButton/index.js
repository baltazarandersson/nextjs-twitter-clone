import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export default function OutlineButton({
  onClick,
  children,
  disabled,
  type = "button",
  color = colors.black,
  styles,
}) {
  return (
    <>
      <button disabled={disabled} type={type} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        button {
          align-items: center;
          border-radius: 9999px;
          border: 0;
          background: #fff;
          cursor: pointer;
          display: flex;
          font-size: 14px;
          font-weight: 700;
          padding: 8px 24px;
          transition: background 0.3s ease;
          color: ${color};
          border: 1px solid ${addOpacityToColor(color, 0.2)};
          user-select: none;
          ${styles};
        }
        button:hover {
          background: ${colors.dimmedGray};
        }
        button[disabled] {
          cursor: not-allowed;
          opacity: 0.4;
        }
        button > :global(svg) {
          margin-right: 8px;
        }
      `}</style>
    </>
  )
}
