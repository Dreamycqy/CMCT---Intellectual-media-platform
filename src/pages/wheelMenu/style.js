import { css } from 'styled-components'

export const container = css`
  width: 500px;
  height: 500px;
`

export const center = css`
  width: 400px;
  height: 400px;
  background-image: linear-gradient(#603c97, #321855);
  > svg {
    position: relative;
    top: calc(50%);
    left: calc(50%);
  }
`

export const slice = css`
  cursor: pointer;
  color: grey;
  background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, #ecd3ee ${centerRadius}`});
  &[filled=true] {
    color: black;
  }
  &:hover,
  &[active=true] {
    color: black;
    background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, #dc8eec ${centerRadius}`});
  }
`
