import { colors } from "@styles/theme"

export default function DefaultButton({
  onClick,
  children,
  disabled,
  type = "button",
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
          font-weight: 800;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
          background-color: ${colors.black};
          user-select: none;
        }
        button:hover {
          opacity: 0.8;
        }
        button[disabled] {
          cursor: auto;
          opacity: 0.4;
        }
      `}</style>
    </>
  )
}
