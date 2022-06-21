import GitHub from "@components/Icons/GitHub"
import { colors } from "@styles/theme"

export default function GitHubButton({ onClick }) {
  return (
    <>
      <button type="button" onClick={() => onClick()}>
        <GitHub width={16} heigth={16} />
        Sign in with Github
      </button>
      <style jsx>
        {`
          button {
            -webkit-text-size-adjust: 100%;
            tab-size: 4;
            --tw-border-opacity: 1;
            border: 0 solid #e5e7eb;
            box-sizing: border-box;
            font-family: inherit;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            border-radius: 9999px;
            background-color: ${colors.black};
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            padding-bottom: 0.625rem;
            padding-top: 0.625rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 500;
            color: white;
          }
          button > :global(svg) {
            margin-right: 8px;
          }
          button:hover {
            opacity: 0.9;
          }
        `}
      </style>
    </>
  )
}
