import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export function Loader({ size = 28, color = colors.primary, border = 4 }) {
  return (
    <>
      <span className="loader"></span>
      <style jsx>{`
        .loader {
          width: ${size}px;
          height: ${size}px;
          border: ${border}px solid ${addOpacityToColor(color, 0.2)};
          border-bottom-color: ${color};
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 0.6s linear infinite;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}
