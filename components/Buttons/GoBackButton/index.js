import ArrowLeft from "@components/Icons/ArrowLeft"
import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import Link from "next/link"

export default function GoBackButton({ url, size = 34 }) {
  return (
    <>
      <Link href={url}>
        <button>
          <ArrowLeft />
        </button>
      </Link>
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
      `}</style>
    </>
  )
}
