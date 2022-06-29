import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export default function ActionButton({
  onClick,
  children,
  disabled = false,
  type = "button",
  color = colors.black,
  styletype = "fill",
}) {
  return (
    <>
      <button
        styletype={styletype}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
      <style jsx>{`
        button {
          align-items: center;
          border-radius: 9999px;
          border: 0;
          cursor: pointer;
          display: flex;
          font-size: 14px;
          font-weight: 700;
          padding: 8px 24px;
          transition: opacity 0.3s ease, background 0.3s ease, border 0.3s ease,
            color 0.3s ease;
          user-select: none;
        }
        button[styletype="fill"] {
          background-color: ${color};
          color: #fff;
        }
        button[styletype="fill"]:hover {
          opacity: 0.85;
        }
        button[styletype="outline"] {
          background-color: #fff;
          color: ${color};
          border: 1px solid ${addOpacityToColor(color, 0.2)};
        }
        button[styletype="outline"]:hover {
          background-color: ${addOpacityToColor(colors.red, 0.1)};
          color: ${colors.red};
          border: 1px solid ${addOpacityToColor(colors.red, 0.2)};
        }
        button[disabled] {
          background: ${addOpacityToColor(color, 0.2)};
          cursor: not-allowed;
          opacity: 1;
        }
        button[disabled]:hover {
          background: ${addOpacityToColor(color, 0.2)};
          cursor: not-allowed;
          opacity: 1;
        }
        button > :global(svg) {
          margin-right: 8px;
        }
      `}</style>
    </>
  )
}
