import { fonts, colors } from "@styles/theme"
import css from "styled-jsx/css"
import { addOpacityToColor } from "@styles/utils"

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export default css.global`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }

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
    font-family: ${fonts.base};
    color: ${colors.black};
    font-size: 15px;
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

  svg {
    min-width: fit-content;
    min-height: fit-content;
  }
`
