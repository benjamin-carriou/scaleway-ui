import styled from '@emotion/styled'
import { ReactNode, useMemo } from 'react'
import ProgressBar from '../ProgressBar'
import Text from '../Text'

interface StateBarStateProps {
  children?: ReactNode
  label?: string
}

const StyledText = styled(Text)`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space['1']};
`

export const StateBarState = ({
  label = '',
  children,
}: StateBarStateProps): JSX.Element => (
  <StyledText variant="bodyStrong" prominence="strong" as="div" color="neutral">
    <strong>{`${label}${children ? ': ' : ''}`}</strong>
    {children && (
      <Text as="span" variant="body" color="neutral">
        {children}
      </Text>
    )}
  </StyledText>
)

interface StateBarBarProps {
  unlimited?: boolean
  value?: number
  progress?: boolean
}

const StyledProgressBar = styled(ProgressBar)`
  flex: 1;
  margin-top: 12px;
`

export const StateBarBar = ({
  unlimited = false,
  value = 0,
  progress = false,
}: StateBarBarProps): JSX.Element => {
  const variant = useMemo(() => {
    if (unlimited) return 'success'
    if (value < 90 && value >= 70) return 'warning'
    if (value >= 90) return 'danger'

    return 'primary'
  }, [unlimited, value])

  return (
    <StyledProgressBar
      variant={variant}
      value={unlimited ? 100 : value}
      progress={progress}
    />
  )
}

type StateBarType = ((props: {
  children: ReactNode
  className?: string
}) => JSX.Element) & {
  Bar: (props: StateBarBarProps) => JSX.Element
  State: (props: StateBarStateProps) => JSX.Element
}

// eslint-disable-next-line react/prop-types
const StateBar: StateBarType = ({ children, className }) => (
  <div className={className}>{children}</div>
)

StateBar.Bar = StateBarBar
StateBar.State = StateBarState

export default StateBar
