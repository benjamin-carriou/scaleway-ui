import { Meta, Story } from '@storybook/react'
import React from 'react'
import Image, { ImageProps } from '..'
import logo from './scaleway-text.png'

export default {
  component: Image,
  parameters: {
    docs: {
      description: {
        component:
          'A native img html tag. You can pass props that you used to pass to the native element',
      },
    },
  },
  title: 'Components/Image',
} as Meta

const Template: Story<ImageProps> = args => (
  <Image src={logo} alt="Scaleway logo" {...args} />
)

export const Default = Template.bind({})