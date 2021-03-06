import { useEffect, useMemo, useRef, useState } from "react"
import { getFileURL, uploadImage } from "@firebase/client"

import { useUser } from "@context/UserContext"
import { AlertPortal } from "@components/Alert"
import Avatar from "@components/Avatar"
import ActionButton from "@components/Buttons/ActionButton"
import Cross from "@components/Icons/Cross"
import { Loader } from "@components/Loader"
import StringCounter from "@components/StringCounter"
import useAlert, { ALERT_TYPES } from "@hooks/useAlert"

import { colors, fonts } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import InteractButton from "@components/Buttons/InteractButton"
import Picture from "@components/Icons/Picture"

const DRAG_IMAGES_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
}

const supportedImageExtensions = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]

export default function TextComposer({ onSumbit, placeholder, size = 120 }) {
  const [devitContent, setDevitContent] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGES_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { shownAlert, createNewAlert } = useAlert()

  const inputFileRef = useRef()
  const user = useUser()

  const contentValue = useMemo(() => {
    if (devitContent.length <= 280) {
      return devitContent.slice(0, devitContent.length)
    } else {
      return devitContent.slice(0, 280)
    }
  }, [devitContent])

  const excededCharaters = useMemo(() => {
    if (devitContent.length > 280) {
      return devitContent.slice(280)
    }
  }, [devitContent])

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

  const isButtonDisabled = useMemo(() => {
    return (
      !devitContent.length ||
      devitContent.length > 280 ||
      status === COMPOSE_STATES.LOADING
    )
  }, [devitContent, status])

  const handleChange = (event) => {
    const { value } = event.target
    setDevitContent(value)
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
    try {
      setDrag(DRAG_IMAGES_STATES.NONE)
      const file = e.dataTransfer.files[0]
      if (!supportedImageExtensions.includes(file.type)) throw new Error()
      const uploadTask = uploadImage(file)
      setTask(uploadTask)
    } catch (error) {
      createNewAlert({
        type: ALERT_TYPES.ERROR,
        title: "Error",
        message: "Invalid file format",
      })
      setStatus(COMPOSE_STATES.ERROR)
    }
  }

  const handleClickFile = (e) => {
    inputFileRef.current.click()
  }

  const handleSumbitFile = (e) => {
    try {
      const file = e.target.files[0]
      if (!supportedImageExtensions.includes(file.type)) throw new Error()
      const uploadTask = uploadImage(file)
      setTask(uploadTask)
    } catch (error) {
      createNewAlert({
        type: ALERT_TYPES.ERROR,
        title: "Error",
        message: "Invalid file format",
      })
      setStatus(COMPOSE_STATES.ERROR)
    }
  }

  const handleFormSumbit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    const newDevitContent = devitContent
    const devitImageUrl = imgURL
    setImgURL(null)
    setDevitContent("")
    onSumbit(newDevitContent, devitImageUrl).then(() => {
      setStatus(COMPOSE_STATES.SUCCESS)
      setTask(null)
    })
  }

  return (
    <>
      <div className="compose-main-container">
        <div className="avatar-container">
          <Avatar src={user.avatar} alt={user.userName} />
        </div>
        <form onSubmit={handleFormSumbit}>
          <div className="inputs-container">
            <div className="textarea-input-container">
              <textarea
                placeholder={placeholder}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onChange={handleChange}
                value={devitContent}
                className="textarea-editor"
              ></textarea>
              <div className="textarea-back">
                <p>
                  {contentValue}
                  <span className="textarea-back--exceded-characters">
                    {excededCharaters}
                  </span>
                </p>
              </div>
            </div>
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
            <input
              type="file"
              ref={inputFileRef}
              onChange={handleSumbitFile}
              style={{ display: "none" }}
            />
            <div onClick={handleClickFile}>
              <InteractButton
                size={20}
                color={colors.primary}
                title="Upload Picture"
              >
                <Picture width={20} height={20} />
              </InteractButton>
            </div>
            <div className="sumbit-button-container">
              <StringCounter characters={devitContent.length} />
              <ActionButton
                disabled={isButtonDisabled}
                type="sumbit"
                color={colors.primary}
              >
                {status === COMPOSE_STATES.LOADING ? (
                  <Loader color={colors.dimmedGray} size={16} border={3} />
                ) : (
                  "Devit"
                )}
              </ActionButton>
            </div>
          </div>
        </form>
      </div>
      {shownAlert && <AlertPortal {...shownAlert} />}
      <style jsx>{`
        .compose-main-container {
          display: flex;
          align-items: start;
        }
        .avatar-container {
          flex: 0 0 auto;
          margin-right: 12px;
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
        .sumbit-button-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .inputs-container {
          position: relative;
        }
        .textarea-input-container {
          position: relative;
        }
        .textarea-editor {
          bottom: 0;
          top: 0;
          left: 0;
          right: 0;
          position: absolute;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .textarea-back {
          white-space: pre-wrap;
          word-wrap: break-word;
          color: transparent;
        }
        .textarea-editor,
        .textarea-back {
          cursor: text;
          background: transparent;
          border: ${drag === DRAG_IMAGES_STATES.DRAG_OVER
            ? `2px dashed ${colors.primary}`
            : "2px dashed transparent"};
          font-family: ${fonts.base};
          font-size: 17px;
          margin: auto;
          border-radius: 10px;
          min-height: ${size}px;
          outline: none;
          width: 100%;
          height: 100%;
          transition: border 0.2s ease;
          resize: none;
          overflow: hidden;
          padding: 12px 0px;
        }

        .textarea-back--exceded-characters {
          background: ${addOpacityToColor(colors.red, 0.3)};
        }
      `}</style>
    </>
  )
}
