import { colors } from "@styles/theme"

export default function Header({ children }) {
  return (
    <>
      <header>{children}</header>
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${colors.dimmedGray};
          position: sticky;
          height: 49px;
          min-height: 49px;
          padding: 0 16px;
          width: 100%;
          top: 0;
          z-index: 1;
        }
      `}</style>
    </>
  )
}
