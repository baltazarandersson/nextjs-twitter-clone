import Head from "next/head"
import { addDevit, getFileURL, uploadImage } from "@firebase/client"
import { useEffect, useState } from "react"

import Avatar from "@components/Avatar"
import { useRouter } from "next/router"
import { Loader } from "@components/Loader"
import ActionButton from "@components/Buttons/ActionButton"
import Globe from "@components/Icons/Globe"
import Cross from "@components/Icons/Cross"
import ArrowLeft from "@components/Icons/ArrowLeft"
import { withAuth } from "@components/helpers/withAuth"
import BackButton from "@components/Buttons/BackButton"

import { colors, fonts } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
}

const DRAG_IMAGES_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

const ComposeDevit = ({ user }) => {
  const [devitContent, setDevitContent] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGES_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const router = useRouter()

  useEffect(() => {
    if (task) {
      task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress)
        },
        (error) => {
          console.error(error)
        },
        () => {
          getFileURL(task, setImgURL)
        }
      )
    }
  }, [task])

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
      userUid: user.uid,
      displayName: user.displayName,
      userName: user.userName,
      img: imgURL,
    }).then(router.push("/home/"))
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.DRAG_OVER)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.NONE)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.NONE)
    const file = e.dataTransfer.files[0]

    const uploadTask = uploadImage(file)
    setTask(uploadTask)
  }

  return (
    <>
      <Head>
        <title>Compose a new Devit / Devtter</title>
      </Head>
      <section>
        <BackButton
          size={34}
          hoverColor={addOpacityToColor(colors.gray, 0.15)}
          title="Back"
        >
          <ArrowLeft width={20} height={20} color={colors.black} />
        </BackButton>

        <div className="compose">
          <Avatar src={user.avatar} alt={user.userName} />
          <form onSubmit={handleSumbit}>
            <div className="input-container">
              <textarea
                placeholder="What's happening?"
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onChange={handleChange}
                value={devitContent}
              ></textarea>
              {imgURL && (
                <div className="image-container">
                  <button
                    onClick={() => setImgURL(null)}
                    className="remove-image-button"
                  >
                    <Cross width={30} height={30} font-weight="bold" />
                  </button>
                  <img src={imgURL} />
                </div>
              )}
              <div className="upload-progress-bar" />
            </div>
            <div className="sumbit-devit-container">
              <div className="sumbit-devit-info">
                <div className="globe">
                  <Globe height={16} width={16} />
                </div>
                <span>This devit is public</span>
              </div>
              <ActionButton disabled={isButtonDisabled} type="sumbit">
                {status === 1 ? (
                  <Loader color={colors.dimmedGray} size={23} border={3} />
                ) : (
                  "Devit"
                )}
              </ActionButton>
            </div>
          </form>
        </div>
      </section>
      <style jsx>{`
        .compose {
          display: flex;
          align-items: start;
          padding: 16px 0;
        }
        section {
          padding: 16px;
        }
        .input-container {
          position: relative;
        }
        .image-container {
          width: 100%;
          position: relative;
        }
        .remove-image-button {
          position: absolute;
          background: ${addOpacityToColor(colors.black, 0.8)};
          color: ${colors.dimmedGray};
          top: 8px;
          left: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          transition: background 0.2s ease-in-out;
        }
        .remove-image-button:hover {
          background: ${addOpacityToColor(colors.black, 0.6)};
        }
        .image-container > img {
          width: 100%;
          border-radius: 10px;
          margin-bottom: 16px;
        }
        .upload-progress-bar {
          transition: width 0.3s ease;
          position: absolute;
          bottom: 16px;
          left: 0;
          height: 8px;
          width: ${uploadProgress < 100 ? uploadProgress : 0}%;
          background-color: ${addOpacityToColor(colors.primary, 0.6)};
          background-color: ${uploadProgress === 100 &&
          addOpacityToColor("#008000", 0.6)};
          border-radius: 9999px;
        }
        form {
          flex-grow: 1;
          min-width: 0;
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
          color: ${addOpacityToColor(colors.primary, 0.9)};
          transition: background 0.2s ease-in-out;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .sumbit-devit-info:hover {
          background: ${addOpacityToColor(colors.primary, 0.1)};
        }
        .sumbit-devit-info > span {
          font-family: ${fonts.secondary};
          letter-spacing: 1px;
          font-size: 14px;
          margin-left: 8px;
          font-weight: 600;
          vertical-align: middle;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        textarea {
          border: ${drag === DRAG_IMAGES_STATES.DRAG_OVER
            ? `2px dashed ${colors.primary}`
            : "2px dashed transparent"};
          border-radius: 10px;
          min-height: 120px;
          outline: 0;
          width: -webkit-fill-available;
          margin: 0 12px 12px 12px;
          padding: 12px 8px;
          font-size: 21px;
          resize: none;
          transition: border 0.2s ease;
        }
      `}</style>
    </>
  )
}

export default withAuth(ComposeDevit)
