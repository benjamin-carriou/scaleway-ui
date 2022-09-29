import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { Spaces, space } from '../../theme'
import Box, { BoxProps } from '../Box'

type RowProps = {
  children: ReactNode
  gutter?: Spaces
} & BoxProps

/**
 * @deprecated
 */
const Row = styled(Box, {
  shouldForwardProp: prop => !['gutter'].includes(prop),
})<RowProps>`
  flex-grow: 1;
  flex-wrap: wrap;
  display: flex;
  margin-left: ${({ gutter = 1 }) => `-${space[gutter]}`};
  margin-right: ${({ gutter = 1 }) => `-${space[gutter]}`};
`

export default Row
