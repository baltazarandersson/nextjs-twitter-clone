import { colors } from "@styles/theme"

export default function ActionButton({
  onClick,
  children,
  disabled,
  type = "button",
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
          color: #fff;
          cursor: pointer;
          display: flex;
          font-size: 14px;
          font-weight: 700;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
          background-color: ${colors.black};
          user-select: none;
          ${styles};
        }
        button:hover {
          opacity: 0.85;
        }
        button[disabled] {
          cursor: auto;
          opacity: 0.4;
        }
        button > :global(svg) {
          margin-right: 8px;
        }
      `}</style>
    </>
  )
}
