import styled from '@emotion/styled'
import IconPlaceholder from './IconPlaceholder'
import Line from './Line'

const StyledContainer = styled.div<{ col: number }>`
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  gap: ${({ theme }) => theme.space['2']};
`

const Block = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space['1']} ${theme.space['2']}`};
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: 4px;
  overflow: hidden;
`

const Blocks = ({ col = 4, length = 8 }: { col?: number; length?: number }) => (
  <StyledContainer col={col}>
    {Array.from({ length }, (_, i) => (
      <Block key={`placeholder-blocks-${i}`}>
        <IconPlaceholder />
        <Line />
      </Block>
    ))}
  </StyledContainer>
)

export default Blocks
