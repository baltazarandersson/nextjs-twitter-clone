import { likeDevit, unlikeDevit } from "@firebase/client"
import { useMemo, useRef, useState } from "react"

import { useUser } from "@context/UserContext"
import InteractButton from "@components/Buttons/InteractButton"
import Reply from "@components/Icons/Reply"
import Like from "@components/Icons/Like"
import LikeFill from "@components/Icons/LikeFill"
import Revit from "@components/Icons/Revit"
import Share from "@components/Icons/Share"
import { ReplyModal } from "@components/Modals/ReplyModal"
import AddClipboard from "@components/Icons/AddClipboard"

import { addOpacityToColor } from "@styles/utils"
import { colors } from "@styles/theme"

export default function DevitInteractions({
  id,
  size = 18,
  justify = "space-between",
  devit,
}) {
  const [isReplyModalShown, setReplyModal] = useState(false)
  const [showLikeAnimation, toggleLikeAnimation] = useState(false)
  const [showShareOptions, setShareOptions] = useState()

  const user = useUser()
  const shareTextRef = useRef()

  const isDevitLikedByUser = useMemo(() => {
    return user.devitsLiked.includes(id)
  }, [user])

  const handleToggleLike = () => {
    if (isDevitLikedByUser) {
      unlikeDevit(id, user.uid)
    } else {
      toggleLikeAnimation(true)
      likeDevit(id, user.uid).then(() => {
        setTimeout(() => {
          toggleLikeAnimation(false)
        }, 600)
      })
    }
  }

  const handleReply = () => {
    setReplyModal(true)
  }

  const hiddeReplyModal = () => {
    setReplyModal(false)
  }

  const handleShare = (e) => {
    e.stopPropagation()
    setShareOptions(!showShareOptions)
  }

  const copyToClipboard = (e) => {
    const contentToCopy = e.current.innerText
    const type = "text/plain"
    const blob = new Blob([contentToCopy], { type })
    const { ClipboardItem } = window
    const data = [new ClipboardItem({ [type]: blob })]
    navigator.clipboard.write(data)
  }

  return (
    <>
      {devit && (
        <section>
          <div onClick={(e) => e.stopPropagation()}>
            <InteractButton
              color={colors.gray}
              size={size}
              hoverColor={colors.primary}
              hoverBgColor={addOpacityToColor(colors.primary, 0.1)}
              title="Reply"
              count={devit.repliesCount}
              onClick={() => handleReply()}
            >
              <Reply width={size} height={size} />
            </InteractButton>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <InteractButton
              color={colors.gray}
              size={size}
              hoverColor={colors.green}
              hoverBgColor={addOpacityToColor(colors.green, 0.1)}
              title="Revit"
            >
              <Revit width={size} height={size} />
            </InteractButton>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <InteractButton
              color={isDevitLikedByUser ? colors.fuxia : colors.gray}
              size={size}
              hoverColor={colors.fuxia}
              hoverBgColor={addOpacityToColor(colors.fuxia, 0.1)}
              title="Like"
              count={devit.likesCount}
              onClick={() => handleToggleLike()}
            >
              {isDevitLikedByUser ? (
                <div className={`${showLikeAnimation && "like-animation"}`}>
                  <LikeFill width={size} height={size} />
                </div>
              ) : (
                <Like width={size} height={size} />
              )}
            </InteractButton>
          </div>
          <div onClick={(e) => handleShare(e)} className="share-button">
            {showShareOptions && (
              <>
                <section
                  className="share-options-container"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="icon-container"
                    onClick={() => copyToClipboard(shareTextRef)}
                  >
                    <InteractButton
                      color={colors.primary}
                      size={26}
                      hoverColor={colors.primary}
                      hoverBgColor={addOpacityToColor(colors.primary, 0.1)}
                      title="Copy"
                    >
                      <AddClipboard width={26} height={26} />
                    </InteractButton>
                  </div>
                  <span className="share-link" ref={shareTextRef}>
                    https://devtter-next.vercel.app/status/{id}
                  </span>
                </section>
                <div className="click-detector" />
              </>
            )}
            <InteractButton
              color={colors.gray}
              size={size}
              hoverColor={colors.secondary}
              hoverBgColor={addOpacityToColor(colors.secondary, 0.1)}
              title="Share"
            >
              <Share width={size} height={size} />
            </InteractButton>
          </div>
        </section>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        {isReplyModalShown && (
          <ReplyModal devit={devit} hiddeModal={hiddeReplyModal} />
        )}
      </div>
      <style jsx>{`
        section {
          width: 100%;
          display: flex;
          justify-content: ${justify};
        }
        .like-animation {
          animation: like 0.6s normal;
        }
        .share-button {
          position: relative;
        }
        .click-detector {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
        }
        .share-options-container {
          position: absolute;
          display: flex;
          align-items: center;
          width: max-content;
          width: 35vw;
          max-width: 480px;
          min-width: 350px;
          top: 0px;
          right: 0px;
          z-index: 3;
          padding: 16px;
          border-radius: 4px;
          background-color: #fff;
          box-shadow: rgb(101 119 134 / 10%) 0px 0px 15px,
            rgb(101 119 134 / 25%) 0px 0px 3px 1px;
          animation: expand 0.1s normal;
        }
        .share-link {
          border: 1px solid ${addOpacityToColor(colors.primary, 0.3)};
          border-radius: 9999px;
          padding: 4px 12px;
          word-break: break-word;
        }
        .icon-container {
          margin-right: 12px;
        }
        @keyframes expand {
          0% {
            transform-origin: top;
            transform: scaleY(0);
          }
          100% {
            transform-origin: top;
            transform: scaleY(1);
          }
        }
        @keyframes like {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          60% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  )
}
