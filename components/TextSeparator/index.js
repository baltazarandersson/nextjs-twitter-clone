import { colors } from "@styles/theme"

export default function TextSeparator({ color = colors.gray }) {
  return (
    <>
      <span>·</span>
      <style jsx>{`
        span {
          color: ${color};
          padding: 0px 4px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}
