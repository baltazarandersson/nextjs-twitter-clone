import InteractButton from "@components/Buttons/InteractButton"
import Comment from "@components/Icons/Comment"
import Like from "@components/Icons/Like"
import Revit from "@components/Icons/Revit"
import Share from "@components/Icons/Share"
import { likeDevit, listenToDevitChanges, unlikeDevit } from "@firebase/client"
import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"
import { useEffect, useState } from "react"

export default function DevitInteractions({ id, userUid }) {
  const [devit, setDevit] = useState()

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

  return (
    <>
      {devit && (
        <div>
          <InteractButton
            color={colors.gray}
            size={18}
            hoverColor={colors.primary}
            hoverBgColor={addOpacityToColor(colors.primary, 0.1)}
            title="Comment"
            count={devit.commentsCount}
          >
            <Comment width={18} height={18} color={colors.gray} />
          </InteractButton>
          <InteractButton
            color={colors.gray}
            size={18}
            hoverColor={colors.green}
            hoverBgColor={addOpacityToColor(colors.green, 0.1)}
            title="Revit"
          >
            <Revit width={18} height={18} color={colors.gray} />
          </InteractButton>
          <InteractButton
            color={devit.likedBy.includes(userUid) ? colors.red : colors.gray}
            size={18}
            hoverColor={colors.red}
            hoverBgColor={addOpacityToColor(colors.red, 0.1)}
            title="Like"
            count={devit.likedBy.length}
            onClick={() => handleToggleLike()}
          >
            <Like width={18} height={18} color={colors.gray} />
          </InteractButton>
          <InteractButton
            color={colors.gray}
            size={18}
            hoverColor={colors.secondary}
            hoverBgColor={addOpacityToColor(colors.secondary, 0.1)}
            title="Share"
            count={devit.shares}
          >
            <Share width={18} height={18} color={colors.gray} />
          </InteractButton>
        </div>
      )}
      <style jsx>{`
        div {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  )
}
