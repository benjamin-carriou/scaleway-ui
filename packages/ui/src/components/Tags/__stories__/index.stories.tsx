import type { Meta } from '@storybook/react'
import Tags from '..'

export default {
  component: Tags,
  parameters: {
    docs: {
      description: {
        component: 'Text input with multiple tag component in a row.',
      },
    },
  },
  title: 'Components/Data Entry/Tags',
} as Meta

export { Playground } from './Playground.stories'