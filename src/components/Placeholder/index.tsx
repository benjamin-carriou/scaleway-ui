import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import Block from './Block'
import Blocks from './Blocks'
import BoxWithIcon from './BoxWithIcon'
import Donut from './Donut'
import Line from './Line'
import List from './List'
import Slider from './Slider'

const shineAnimation = keyframes`
  from {
    left: -25%;
  }
  to {
    left: 100%;
  }
`

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 25%;
  opacity: 0.8;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  animation: ${shineAnimation} 1s linear infinite;
  animation-direction: alternate;
`

const variants = {
  block: Block,
  blocks: Blocks,
  box: BoxWithIcon,
  donut: Donut,
  line: Line,
  list: List,
  slider: Slider,
}

type PlaceholderVariant = keyof typeof variants

const Placeholder: React.VoidFunctionComponent<{
  variant?: PlaceholderVariant
  length?: number
  width?: number
  height?: number
  col?: number
}> = ({ variant = 'blocks', length, width, height, col, ...props }) => {
  const Component = variants[variant]

  return (
    <Box
      position="relative"
      display="block"
      width="100%"
      overflow="hidden"
      {...props}
    >
      <Component length={length} width={width} height={height} col={col} />

      <StyledDiv />
    </Box>
  )
}

export const placeholderTypes = Object.keys(variants)

Placeholder.propTypes = {
  col: PropTypes.number,
  height: PropTypes.number,
  length: PropTypes.number,
  variant: PropTypes.oneOf(placeholderTypes as [PlaceholderVariant]),
  width: PropTypes.number,
}

Placeholder.defaultProps = {
  variant: 'blocks',
}

export default Placeholder