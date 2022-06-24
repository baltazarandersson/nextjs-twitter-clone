import { colors } from "@styles/theme"

export default function TextSeparator() {
  return (
    <>
      <span>·</span>
      <style jsx>{`
        span {
          color: ${colors.gray};
          padding: 0px 4px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}
