import { Meta, Story } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import RichSelect, { RichSelectProps } from '..'
import { ActivityIndicator, Badge, Box, Button, FlexBox } from '../..'
import ControlValue from '../../../__stories__/components/ControlValue'
import * as animations from '../../../utils/animations'

export default {
  component: RichSelect,
  decorators: [
    Chidren => (
      <Box mb={2}>
        <Chidren />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'RichSelect is a component used to select a value between different options.',
      },
    },
  },
  title: 'Components/Data Entry/RichSelect',
} as Meta

const Template: Story<RichSelectProps> = args => (
  <RichSelect
    isClearable
    name="basic"
    value={{ label: 'Option A', value: 'a' }}
    {...args}
  >
    <RichSelect.Option value="a">Option A</RichSelect.Option>
    <RichSelect.Option value="b">Option B</RichSelect.Option>
  </RichSelect>
)

export const Default = Template.bind({})

export const Uncontrolled = Template.bind({})
Uncontrolled.decorators = [
  () => (
    <RichSelect
      isClearable
      disabled
      name="uncontrolled"
      value={{ label: 'Option A', value: 'a' }}
    >
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b">Option B</RichSelect.Option>
    </RichSelect>
  ),
]

export const Controlled = Template.bind({})
Controlled.decorators = [
  () => (
    <ControlValue value="">
      {({ value, onChange }) => (
        <RichSelect name="controlled" value={value} onChange={onChange}>
          <RichSelect.Option value="a">Option A</RichSelect.Option>
          <RichSelect.Option value="b">Option B</RichSelect.Option>
        </RichSelect>
      )}
    </ControlValue>
  ),
]

export const CustomOptions = Template.bind({})
CustomOptions.parameters = {
  docs: {
    storyDescription:
      'You can customize options in a RichSelect by adding component inside of it. Here we added a Badge inside of option B.',
  },
}
CustomOptions.decorators = [
  () => (
    <RichSelect name="disabled">
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b">
        <FlexBox alignItems="center">
          Option B
          <Badge size="rounded" ml={1}>
            Awesome badge
          </Badge>
        </FlexBox>
      </RichSelect.Option>
    </RichSelect>
  ),
]

export const NoLabel = Template.bind({})
NoLabel.parameters = {
  docs: {
    storyDescription: 'Use `noTopLabel` to hide the label.',
  },
}
NoLabel.decorators = [
  () => (
    <RichSelect name="label" noTopLabel>
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b">Option B</RichSelect.Option>
    </RichSelect>
  ),
]

export const Searchable = Template.bind({})
Searchable.parameters = {
  docs: {
    storyDescription: 'Use `isSearchable` prop to make option searchable.',
  },
}
Searchable.decorators = [
  () => (
    <RichSelect name="searchable" isSearchable>
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b">Option B</RichSelect.Option>
    </RichSelect>
  ),
]

export const Required = Template.bind({})
Required.parameters = {
  docs: {
    storyDescription: 'Use `required` to make this input mandatory',
  },
}
Required.decorators = [
  () => (
    <RichSelect name="required" required>
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b">Option B</RichSelect.Option>
    </RichSelect>
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    storyDescription: 'Use `disabled` to disable this input',
  },
}
Disabled.decorators = [
  () => (
    <RichSelect name="disabled" disabled value="a">
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b">Option B</RichSelect.Option>
    </RichSelect>
  ),
]

export const OptionDisabled = Template.bind({})
OptionDisabled.parameters = {
  docs: {
    storyDescription:
      'Use `disabled` on `RichSelect.Option` component to disable a specific option.',
  },
}
OptionDisabled.decorators = [
  () => (
    <RichSelect inputId="test" labelId="test-label" name="option-disabled">
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b" disabled>
        Option B
      </RichSelect.Option>
    </RichSelect>
  ),
]

export const Animated = Template.bind({})
Animated.parameters = {
  docs: {
    storyDescription: `You can easily add an animation to your RichSelect using \`animationOnChange\`, \`animation\` and \`animationDuration\` properties.
The animation will be played when the value changes. Animation start when you select new value but also if you change the value of RichSelect with an external way (check example with button).

### Available animations

${Object.keys(animations)
  .map(animation => `\`${animation}\``)
  .join(' ')}`,
  },
}
Animated.decorators = [
  () => (
    <Box mx={8} my={2}>
      <ControlValue value={{ label: '', value: '' }}>
        {({ value, onChange }) => {
          const [options] = useState(
            Object.keys(animations).map(animation => ({
              label: animation,
              value: animation,
            })),
          )

          return (
            <>
              <Button
                onClick={() => onChange({ label: 'pulse', value: 'pulse' })}
                mb={4}
              >
                Select pulse animation
              </Button>
              <RichSelect
                name="animated"
                animationOnChange
                animation={value.value}
                animationDuration={1000}
                value={value}
                onChange={onChange}
                options={options}
              />
            </>
          )
        }}
      </ControlValue>
    </Box>
  ),
]

export const MultiNormal = Template.bind({})
MultiNormal.parameters = {
  docs: {
    storyDescription:
      'Add `isMulti` prop to transform this input to a multi-select.',
  },
}
MultiNormal.decorators = [
  () => (
    <RichSelect name="multi" isMulti>
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b">Option B</RichSelect.Option>
      <RichSelect.Option value="c">Option C</RichSelect.Option>
      <RichSelect.Option value="d">Option D</RichSelect.Option>
      <RichSelect.Option value="e">Option E</RichSelect.Option>
      <RichSelect.Option value="f">Option F</RichSelect.Option>
    </RichSelect>
  ),
]

export const MultiDisabled = Template.bind({})
MultiDisabled.decorators = [
  () => (
    <RichSelect
      name="multi-disabled"
      value={{ label: 'Option A', value: 'a' }}
      isMulti
      disabled
    >
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b">Option B</RichSelect.Option>
    </RichSelect>
  ),
]

export const TimeNormal = Template.bind({})
TimeNormal.parameters = {
  docs: {
    storyDescription:
      'Use `time` prop to transform the select into a time input',
  },
}
TimeNormal.decorators = [
  () => (
    <RichSelect name="time" time>
      <RichSelect.Option value="11">11:00</RichSelect.Option>
      <RichSelect.Option value="12">12:00</RichSelect.Option>
    </RichSelect>
  ),
]

export const TimeError = Template.bind({})
TimeError.decorators = [
  () => (
    <RichSelect name="time-error" time error>
      <RichSelect.Option value="11">11:00</RichSelect.Option>
      <RichSelect.Option value="12">12:00</RichSelect.Option>
    </RichSelect>
  ),
]

export const LoadingDemo = Template.bind({})
LoadingDemo.parameters = {
  docs: {
    storyDescription:
      'Use `isLoading` prop to display a loader on the right of the component.',
  },
}
LoadingDemo.decorators = [
  () => (
    <RichSelect name="loading" isLoading>
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b">Option B</RichSelect.Option>
    </RichSelect>
  ),
]

export const LoadingExample = Template.bind({})
LoadingExample.decorators = [
  () => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
      let timeout: number

      if (isLoading) {
        timeout = setTimeout(() => {
          setIsLoading(false)
        }, 3000) as unknown as number
      }

      return () => clearTimeout(timeout)
    }, [isLoading])

    return (
      <div>
        <Button size="small" mb={2} onClick={() => setIsLoading(true)}>
          Load data
        </Button>
        <RichSelect
          name="exemple"
          isLoading={isLoading}
          customComponents={{
            LoadingIndicator: () => <ActivityIndicator active size={24} />,
          }}
        >
          <RichSelect.Option value="a">Option A</RichSelect.Option>
          {!isLoading && (
            <RichSelect.Option value="b">Option B</RichSelect.Option>
          )}
        </RichSelect>
      </div>
    )
  },
]

export const KnownIssues = Template.bind({})
KnownIssues.parameters = {
  docs: {
    storyDescription: `### RichSelect doesn't keep focus on selected option

RichSelect is based on the \`react-select\` library. To keep the focus on the selected option you need to use \`options\` prop with a memoized value or a memoized \`children\``,
  },
}
KnownIssues.decorators = [() => null]