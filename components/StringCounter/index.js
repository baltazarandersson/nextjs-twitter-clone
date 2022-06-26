import { colors } from "@styles/theme"
import { useEffect, useState } from "react"

export default function StringCounter({ characters = 0, maxLength = 280 }) {
  const [resCharacters, setResCharacters] = useState(null)

  const progress = (characters / maxLength) * 100

  const compensation = progress >= 93 ? 2 : 10

  let primaryColor = progress >= 93 ? "#FFAD1F" : colors.primary
  const secondaryColor = "#eff3f4"
  const textColor = progress >= 100 ? colors.error : "#FFAD1F"
  const stroke = 2
  const size = 32

  if (progress >= 100) {
    primaryColor = colors.error
  }

  // const size = radius * 2;
  const subtractionSize = size - stroke * 2 - compensation
  const circumference = subtractionSize * Math.PI
  const percentage = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (progress >= 93) {
      setResCharacters(maxLength - characters)
    } else {
      setResCharacters(null)
    }
  }, [progress])

  return (
    <>
      <section>
        <svg height={size} width={size}>
          <circle
            stroke={secondaryColor}
            strokeWidth={stroke}
            fill="transparent"
            r={subtractionSize / 2}
            cx="50%"
            cy="50%"
          />
          <circle
            stroke={primaryColor}
            strokeWidth={stroke}
            fill="transparent"
            r={subtractionSize / 2}
            cx="50%"
            cy="50%"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={
              progress < 100
                ? Number(percentage)
                : circumference + circumference
            }
          />
        </svg>
        <div>
          <p>{resCharacters}</p>
        </div>
      </section>
      <style jsx>{`
        section {
          position: relative;
          display: inline-block;
          display: flex;
          align-items: center;
          justify-content: center;
          height: ${size}px;
          width: ${size}px;
        }
        circle {
          transition: all 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
        div {
          position: absolute;
          height: ${size}px;
          width: ${size}px;
          left: 0;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        p {
          font-size: calc(${size}px / 3);
          font-weight: lighter;
          color: ${textColor};
        }
      `}</style>
    </>
  )
}
