import { storiesOf } from '@storybook/vue'
import { text } from '@storybook/addon-knobs'

import Notes from './SocialsShare.md'

import SocialsShare from './SocialsShare'

storiesOf('Socials', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Share',
    () => ({
      components: { SocialsShare },
      props: {
        title: {
          default: text('Share title', 'Share title')
        },
        description: {
          default: text('Share description', 'Share description')
        },
        picture: {
          default: text('Share picture', '/images/sample_image.png')
        }
      },
      template: `<socials-share :title="title" :description="description" :picture="picture" />`
    }),
    {
      info: {
        summary:
          'The socials share component.<br><br>' +
          '<b>Location:</b> ./components/atoms/SocialsShare.vue'
      }
    }
  )
