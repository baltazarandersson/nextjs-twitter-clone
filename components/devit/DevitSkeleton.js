import InteractButton from "@components/Buttons/InteractButton"
import Comment from "@components/Icons/Comment"
import Like from "@components/Icons/Like"
import Revit from "@components/Icons/Revit"
import Share from "@components/Icons/Share"
import TextSeparator from "@components/TextSeparator"
import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export default function DevitSkeleton() {
  return (
    <>
      <article>
        <div className="avatar"></div>
        <div className="skeleton-container">
          <div className="skeleton-info-container">
            <span className="text-skeleton" />
            <TextSeparator color={colors.skeleton} />
            <span className="text-skeleton" />
          </div>
          <div className="skeleton-content-container">
            <span className="skeleton-content content-first" />
            <span className="skeleton-content content-second" />
            <span className="skeleton-content content-third" />
            <div>
              <section className="interactions-container">
                <InteractButton
                  color={addOpacityToColor(colors.gray, 0.2)}
                  size={18}
                  disabled
                >
                  <Comment
                    width={18}
                    height={18}
                    color={addOpacityToColor(colors.gray, 0.2)}
                  />
                </InteractButton>
                <InteractButton
                  color={addOpacityToColor(colors.gray, 0.2)}
                  size={18}
                  disabled
                >
                  <Revit
                    width={18}
                    height={18}
                    color={addOpacityToColor(colors.gray, 0.2)}
                  />
                </InteractButton>
                <InteractButton
                  color={addOpacityToColor(colors.gray, 0.2)}
                  size={18}
                  disabled
                >
                  <Like
                    width={18}
                    height={18}
                    color={addOpacityToColor(colors.gray, 0.2)}
                  />
                </InteractButton>
                <InteractButton
                  color={addOpacityToColor(colors.gray, 0.2)}
                  size={18}
                  disabled
                >
                  <Share
                    width={18}
                    height={18}
                    color={addOpacityToColor(colors.gray, 0.2)}
                  />
                </InteractButton>
              </section>
            </div>
          </div>
        </div>
      </article>
      <style jsx>{`
        article {
          cursor: pointer;
          display: flex;
          align-items: stretch;
          padding: 10px 15px;
          border-bottom: 1px solid ${colors.dimmedskeleton};
          transition: background 0.2s ease-in-out;
          overflow: hidden;
        }
        .avatar {
          margin-right: 10px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${colors.skeleton};
        }
        .skeleton-container {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1 1 auto;
          gap: 4px;
        }
        .skeleton-info-container {
          display: flex;
          align-items: center;
        }
        .skeleton-content-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .skeleton-content {
          width: 100%;
          height: 13px;
          background: ${colors.skeleton};
          border-radius: 9999px;
        }
        .content-first {
          width: 70%;
        }
        .content-second {
          width: 90%;
        }
        .content-third {
          width: 50%;
        }
        .text-skeleton {
          flex: 1 1 auto;
          height: 10px;
          background: ${colors.skeleton};
          border-radius: 9999px;
        }
        .interactions-container {
          margin-top: 12px;
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  )
}
