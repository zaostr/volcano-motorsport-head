import { storiesOf } from '@storybook/vue'
import { text } from '@storybook/addon-knobs'

import Notes from './Video.md'

import DarwinVideo from './Video'

storiesOf('Videos', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'External Video',
    () => ({
      components: { DarwinVideo },
      props: {
        content: {
          default: text(
            'Content',
            'https://www.youtube.com/watch?v=y_RFOaSDL8I&list=PL55RiY5tL51rcCnrOrZixuOsZhAHHy6os&index=6'
          )
        },
        width: {
          default: text('Width', '480px')
        },
        height: {
          default: text('Height', '100%')
        },
        minWidth: {
          default: text('Min width', '')
        },
        minHeight: {
          default: text('Min height', '')
        },
        maxWidth: {
          default: text('Max width', '')
        },
        maxHeight: {
          default: text('Max height', '')
        },
        aspectRatio: {
          default: text('Aspect Ratio', '2:3')
        }
      },
      template: `<darwin-video
        :content="content"
        :width="width"
        :height="height"
        :min-width="minWidth"
        :min-height="minHeight"
        :max-width="maxWidth"
        :max-height="maxHeight"
        :aspect-ratio="aspectRatio"
      />`
    }),
    {
      info: {
        summary:
          'The video component.<br><br>' +
          '<b>Location:</b> ./components/atoms/Video.vue'
      }
    }
  )
  .add(
    'Embedded Video',
    () => ({
      components: { DarwinVideo },
      props: {
        content: {
          default: text('Content', '/video/sample-video.mp4')
        },
        width: {
          default: text('Width', '480px')
        },
        height: {
          default: text('Height', '100%')
        },
        minWidth: {
          default: text('Min width', '')
        },
        minHeight: {
          default: text('Min height', '')
        },
        maxWidth: {
          default: text('Max width', '')
        },
        maxHeight: {
          default: text('Max height', '')
        },
        aspectRatio: {
          default: text('Aspect Ratio', '2:3')
        }
      },
      template: `<darwin-video
        :content="content"
        format="video/mp4"
        :width="width"
        :height="height"
        :min-width="minWidth"
        :min-height="minHeight"
        :max-width="maxWidth"
        :max-height="maxHeight"
        :aspect-ratio="aspectRatio"
      />`
    }),
    {
      info: {
        summary:
          'The video component.<br><br>' +
          '<b>Location:</b> ./components/atoms/Video.vue'
      }
    }
  )
