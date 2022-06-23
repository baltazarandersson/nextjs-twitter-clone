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
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: relative;
    background: #fff;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      border-radius: 12px;
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`
