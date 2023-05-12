import { ComponentStory } from '@storybook/react'
import VsButton from './index'

export default {
  title: 'Components/Form Elements',
  component: VsButton,
  argTypes: {
    btnBorderStyle: {
      control: 'inline-radio',
      options: ['none', 'default', 'rounded'],
    },
    btnType: { control: 'inline-radio', options: ['solid', 'outline'] },
    btnColor: {
      control: 'select',
      options: [
        'default',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ],
    },
    btnSize: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
  },
}

const Template: ComponentStory<typeof VsButton> = (args) => {
  return <VsButton {...args}>Button</VsButton>
}

export const Button = Template.bind({})
