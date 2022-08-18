import { storiesOf } from '@storybook/vue'
import { text } from '@storybook/addon-knobs'

import store from '../../.storybook/store'
import Notes from './CardInstagram.md'

import InstagramCard from './CardInstagram'

storiesOf('Cards', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Instagram',
    () => ({
      components: { InstagramCard },
      store,
      props: {
        src: {
          default: text('Src', '/images/sample_image.png')
        },
        date: {
          default: text('Date', '2020-06-12')
        },
        text: {
          default: text(
            'Text',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
          )
        }
      },
      template: `<Instagram-card :data="{ picture: src, date: date, title: text }" style="width: 337px;" />`
    }),
    {
      info: {
        summary:
          'The Instagram card component. Consists of picture, date and heading components.<br><br>' +
          '<b>Location:</b> ./components/molecules/CardInstagram.vue'
      }
    }
  )
