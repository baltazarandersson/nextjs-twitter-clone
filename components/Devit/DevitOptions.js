import { useState } from "react"
import { deleteDevit } from "@firebase/client"

import { useUser } from "@context/UserContext"
import InteractButton from "@components/Buttons/InteractButton"
import MenuHorizontal from "@components/Icons/MenuHorizontal"
import Trash from "@components/Icons/Trash"

import { colors } from "@styles/theme"
import { addOpacityToColor } from "@styles/utils"

export default function DevitOptions({ devitId }) {
  const [showOptions, setShowOptions] = useState(false)
  const user = useUser()

  const toggleOptions = () => {
    setShowOptions(!showOptions)
  }

  const handleDelete = () => {
    deleteDevit(devitId, user.uid)
  }

  return (
    <>
      <div className="options-container">
        {showOptions && (
          <>
            <section onClick={() => handleDelete()}>
              <div className="icon-container">
                <Trash color={colors.red} width={18} height={18} />
              </div>
              Delete
            </section>
            <div className="click-detector" onClick={toggleOptions} />
          </>
        )}
        <InteractButton
          color={colors.gray}
          size={18}
          hoverColor={colors.secondary}
          hoverBgColor={addOpacityToColor(colors.secondary, 0.1)}
          title="More"
          onClick={toggleOptions}
        >
          <MenuHorizontal width={18} height={18} />
        </InteractButton>
      </div>
      <style jsx>{`
        .options-contaier {
          display: relative;
        }
        .click-detector {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
        }
        section {
          position: absolute;
          display: flex;
          align-items: center;
          width: 200px;
          top: 8px;
          right: 8px;
          z-index: 3;
          padding: 16px;
          border-radius: 4px;
          background-color: #fff;
          box-shadow: rgb(101 119 134 / 10%) 0px 0px 15px,
            rgb(101 119 134 / 25%) 0px 0px 3px 1px;
          color: ${colors.red};
          animation: expand 0.1s normal;
        }
        .icon-container {
          margin-right: 12px;
          height: 18px;
        }
        section:hover {
          background: ${colors.dimmedGray};
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
      `}</style>
    </>
  )
}
