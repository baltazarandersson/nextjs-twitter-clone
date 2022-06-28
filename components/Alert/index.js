import ReactDOM from "react-dom"

import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export const TYPE_COLOR = {
  0: colors.red,
  1: colors.warning,
  2: colors.primary,
}

function Alert({ type, title, message, duration }) {
  const durationInSeconds = duration / 1000
  const color = TYPE_COLOR[type]

  return (
    <>
      <section>
        <div className="border" />
        <div className="container">
          <h1>{title.toUpperCase()}</h1>
          <span>{message}</span>
        </div>
      </section>
      <style jsx>{`
        section {
          position: fixed;
          font-size: 13px;
          bottom: 10vh;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          background: ${addOpacityToColor(color, 0.4)};
          border-radius: 10px;
          overflow: hidden;
          align-items: stretch;
          animation: opacity ${durationInSeconds}s;
          color: ${colors.black};
          white-space: nowrap;
          backdrop-filter: blur(22px);
        }
        .container {
          position: relative;
          padding: 8px 12px;
          display: flex;
        }
        h1 {
          margin-right: 12px;
        }
        span {
          font-weight: 600;
        }
        .border {
          background: ${addOpacityToColor(color, 0.7)};
          width: 12px;
        }
        @keyframes opacity {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export function AlertPortal({ type, title, message, duration }) {
  return ReactDOM.createPortal(
    <Alert type={type} title={title} message={message} duration={duration} />,
    document.getElementById("modals")
  )
}
