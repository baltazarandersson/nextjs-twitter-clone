import DefaultButton from "@components/Buttons/ActionButton"
import { colors, fonts } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import Head from "next/head"
import Link from "next/link"

export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>Page not found / Devtter</title>
        <meta
          name="description"
          content="The page you were looking for is not avaliable anymore or it doesnt exist"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <div>
          <h1 className="title">ERROR 404 </h1>
          <h2>/ Page Not Found</h2>
        </div>
        <Link href="/">
          <a>
            <DefaultButton>Back to Home</DefaultButton>
          </a>
        </Link>
      </section>

      <style jsx>{`
        div {
          display: flex;
          align-items: center;
        }
        h1 {
          text-align: center;
          font-size: 28px;
          font-weight: 800;
          color: ${colors.error};
          margin: 0;
          margin-right: 8px;
        }
        h2 {
          font-family: ${fonts.secondary};
          text-align: center;
          font-size: 16px;
          color: ${addOpacityToColor(colors.black, 0.8)};
          margin: 0;
        }
        a {
          font-family: ${fonts.secondary};
          text-align: center;
          font-size: 24px;
          font-weight: 800;
          color: ${addOpacityToColor(colors.black, 0.8)};
          margin: 0;
          margin-top: 12px;
        }
        section {
          display: grid;
          place-items: center;
          place-content: center;
          height: 100%;
        }
      `}</style>
    </>
  )
}
