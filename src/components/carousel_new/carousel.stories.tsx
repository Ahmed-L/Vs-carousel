import { ComponentStory } from '@storybook/react'
import { Carousel } from './carousel'
import { CarouselHandler } from './carousel_handler'

export default {
  title: 'Components/Carousel',
  component: Carousel,
  argTypes: {
    slideby: { control: { type: 'number', min: 1, max: 3, defaultValue: 1 } },
    showItemsPerRow: { control: { type: 'number', min: 1, max: 4, defaultValue: 1 } },
    autoplay: {
      control: 'inline-radio',
      options: [true, false],
      defaultValue: false,
    },
    rows: { control: { type: 'number', min: 1, max: 3, defaultValue: 2 } },
    autoplayInterval: {
      control: {
        type: 'number',
        min: 1000,
        max: 10000,
        step: 500,
      },
    },
  },
}

const Template: ComponentStory<typeof Carousel> = (args) => {
  return (
    <div className="w-screen h-screen flex relative">
      <CarouselHandler {...args} />
    </div>
  )
}

export const CarouselV2 = Template.bind({})
