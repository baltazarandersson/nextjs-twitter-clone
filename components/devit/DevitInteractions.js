import InteractButton from "@components/Buttons/InteractButton"
import Comment from "@components/Icons/Comment"
import Like from "@components/Icons/Like"
import LikeFill from "@components/Icons/LikeFill"
import Revit from "@components/Icons/Revit"
import Share from "@components/Icons/Share"
import { ReplyModal } from "@components/Modals/ReplyModal"
import { likeDevit, listenToDevitChanges, unlikeDevit } from "@firebase/client"
import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import { useEffect, useState } from "react"

export default function DevitInteractions({
  id,
  userUid,
  size = 18,
  justify = "space-between",
}) {
  const [devit, setDevit] = useState()
  const [isReplyModalShown, setReplyModal] = useState(false)

  useEffect(() => {
    const unsub = listenToDevitChanges(id, setDevit)
    return () => unsub()
  }, [])

  const handleToggleLike = () => {
    if (!devit.likedBy.includes(userUid)) {
      likeDevit(id, userUid)
    } else {
      unlikeDevit(id, userUid)
    }
  }

  const handleComment = () => {
    setReplyModal(true)
  }

  function hiddeReplyModal() {
    setReplyModal(false)
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
              title="Comment"
              count={devit.commentsCount}
              onClick={() => handleComment()}
            >
              <Comment width={size} height={size} />
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
              color={
                devit.likedBy.includes(userUid) ? colors.fuxia : colors.gray
              }
              size={size}
              hoverColor={colors.fuxia}
              hoverBgColor={addOpacityToColor(colors.fuxia, 0.1)}
              title="Like"
              count={devit.likedBy.length}
              onClick={() => handleToggleLike()}
            >
              {devit.likedBy.includes(userUid) ? (
                <LikeFill width={size} height={size} />
              ) : (
                <Like width={size} height={size} />
              )}
            </InteractButton>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <InteractButton
              color={colors.gray}
              size={size}
              hoverColor={colors.secondary}
              hoverBgColor={addOpacityToColor(colors.secondary, 0.1)}
              title="Share"
              count={devit.shares}
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
      `}</style>
    </>
  )
}
