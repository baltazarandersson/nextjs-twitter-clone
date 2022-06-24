import { fonts, colors } from "@styles/theme"
import css from "styled-jsx/css"
import { addOpacityToColor } from "@styles/utils"

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export default css.global`
  html,
  body {
    overflow: hidden;
    background-image: radial-gradient(
        ${backgroundColor} 1px,
        ${colors.dimmedGray} 1px
      ),
      radial-gradient(${backgroundColor} 1px, ${colors.dimmedGray} 1px);
    background-position: 0, 0, 25px, 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
    color: ${colors.black};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }

  *::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${addOpacityToColor(colors.primary, 0.8)};
    border-radius: 10px;
    border: 3px solid #fff;
  }
`
