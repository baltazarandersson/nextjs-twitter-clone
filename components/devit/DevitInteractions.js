import { likeDevit, listenToDevitChanges, unlikeDevit } from "@firebase/client"
import { useEffect, useMemo, useState } from "react"

import InteractButton from "@components/Buttons/InteractButton"
import Reply from "@components/Icons/Reply"
import Like from "@components/Icons/Like"
import LikeFill from "@components/Icons/LikeFill"
import Revit from "@components/Icons/Revit"
import Share from "@components/Icons/Share"
import { ReplyModal } from "@components/Modals/ReplyModal"

import { addOpacityToColor } from "@styles/utils"
import { colors } from "@styles/theme"
import { useUser } from "@context/UserContext"

export default function DevitInteractions({
  id,
  size = 18,
  justify = "space-between",
}) {
  const [devit, setDevit] = useState()
  const [isReplyModalShown, setReplyModal] = useState(false)
  const user = useUser()

  const isDevitLikedByUser = useMemo(() => {
    return user.devitsLiked.includes(id)
  }, [user])

  useEffect(() => {
    const unsub = listenToDevitChanges(id, setDevit)
    return () => unsub()
  }, [])

  const handleToggleLike = () => {
    if (isDevitLikedByUser) {
      unlikeDevit(id, user.uid)
    } else {
      likeDevit(id, user.uid)
    }
  }

  const handleReply = () => {
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
