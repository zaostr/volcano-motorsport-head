import { storiesOf } from '@storybook/vue'
import { text } from '@storybook/addon-knobs'

import store from '../../.storybook/store'
import Notes from './CardNews.md'

import NewsCard from './CardNews'

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
    'News',
    () => ({
      components: { NewsCard },
      store,
      props: {
        src: {
          default: text('Src', '/images/sample_image.png')
        },
        date: {
          default: text('Date', '2020-12-25')
        },
        text: {
          default: text(
            'Text',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
          )
        }
      },
      template: `<news-card :data="{ picture: src, date: date, title: text }" style="width: 337px;" />`
    }),
    {
      info: {
        summary:
          'The news card component. Consists of picture, date and heading components.<br><br>' +
          '<b>Location:</b> ./components/molecules/CardNews.vue'
      }
    }
  )
