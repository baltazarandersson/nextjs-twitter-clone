import Avatar from "@components/Avatar"
import useUser from "@hooks/useUser"
import { addDevit } from "@firebase/client"
import { useState } from "react"
import { useRouter } from "next/router"
import { Loader } from "@components/Loader"
import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import DefaultButton from "@components/Buttons/DefaultButton"
import GoBackButton from "@components/Buttons/GoBackButton"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
}

export default function DevitCompose() {
  const [devitContent, setDevitContent] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const user = useUser()
  const router = useRouter()

  const isButtonDisabled =
    !devitContent.length || status === COMPOSE_STATES.LOADING

  const handleChange = (event) => {
    const { value } = event.target
    setDevitContent(value)
  }
  const handleSumbit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: devitContent,
      userId: user.uid,
      userName: user.userName,
    }).then(router.push("/home/"))
  }

  return (
    <>
      <section>
        <GoBackButton url="/home" />
        {user && (
          <form onSubmit={handleSumbit}>
            <Avatar src={user.avatar} alt={user.userName} />
            <div className="form-input-container">
              <textarea
                placeholder="What's happening?"
                onChange={handleChange}
              ></textarea>
              <div className="sumbit-devit-container">
                <div className="sumbit-devit-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ height: 18 }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>This devit is public</span>
                </div>
                <DefaultButton disabled={isButtonDisabled} type="sumbit">
                  {status === 1 ? (
                    <Loader color={colors.dimmedGray} size={23} border={3} />
                  ) : (
                    "Devit"
                  )}
                </DefaultButton>
              </div>
            </div>
          </form>
        )}
      </section>
      <style jsx>{`
        form {
          display: flex;
          align-items: start;
          padding: 16px 0;
        }
        section {
          padding: 16px;
        }
        .form-input-container {
          flex-grow: 1;
        }
        .sumbit-devit-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sumbit-devit-info {
          cursor: pointer;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 2px 12px;
          border-radius: 9999px;
          color: ${colors.primary};
          transition: background 0.2s ease-in-out;
        }
        .sumbit-devit-info:hover {
          background: ${addOpacityToColor(colors.primary, 0.1)};
        }
        .sumbit-devit-info > span {
          font-size: 14px;
          margin-left: 8px;
          font-weight: 700;
          vertical-align: middle;
          display: inline-block;
        }
        textarea {
          min-height: 150px;
          outline: 0;
          width: 100%;
          border: none;
          padding: 12px;
          font-size: 21px;
          resize: none;
        }
      `}</style>
    </>
  )
}
