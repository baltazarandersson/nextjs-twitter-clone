import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import { useRouter } from "next/router"

export default function GoBackButton({ url, size = 34 }) {
  const router = useRouter()
  return (
    <>
      <button onClick={() => router.push(url)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
          </g>
        </svg>
      </button>
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: inherit;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          transition: background 0.2s ease-in-out;
        }
        button:hover {
          background: ${addOpacityToColor(colors.gray, 0.2)};
        }
        span {
          font-size: 24px;
          font-weight: bold;
        }
      `}</style>
    </>
  )
}
