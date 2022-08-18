import { storiesOf } from '@storybook/vue'

import store from '../../../.storybook/store'
import Notes from './InstagramFeed.md'

import InstagramFeed from './InstagramFeed'

storiesOf('Organisms', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Instagram Feed',
    () => ({
      components: { InstagramFeed },
      store,
      data() {
        return {
          itemsList: [
            {
              id: 33,
              picture: '/images/sample_image.png',
              date: '2020-06-12',
              text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
            },
            {
              id: 35,
              picture: '/images/sample_image.png',
              date: '2020-06-11',
              text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
            },
            {
              id: 37,
              picture: '/images/sample_image.png',
              date: '2020-06-10',
              text: ''
            },
            {
              id: 39,
              picture: '/images/sample_image.png',
              date: '2020-06-9',
              text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
            },
            {
              id: 43,
              picture: '/images/sample_image.png',
              date: '2020-05-12',
              text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
            },
            {
              id: 83,
              picture: '/images/sample_image.png',
              date: '2019-06-12',
              text: 'Lorem ipsum dolor sit amet,'
            }
          ]
        }
      },
      template: `
        <div class="grid-container">
          <instagram-feed :items-list="itemsList" />
        </div>
      `
    }),
    {
      info: {
        summary:
          'The Instagram Feed component. Consists of other components.<br><br>' +
          '<b>Location:</b> ./components/organisms/InstagramFeed.vue'
      }
    }
  )
