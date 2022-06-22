import css from "styled-jsx/css"
import { breakpoints } from "@styles/theme"

export default css`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  main {
    overflow-y: auto;
    position: relative;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`
