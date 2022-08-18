import { storiesOf } from '@storybook/vue'
import { select, text } from '@storybook/addon-knobs'

import Notes from './Picture.md'

import Picture from './Picture'

storiesOf('Pictures', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Picture',
    () => ({
      components: { Picture },
      props: {
        src: {
          default: text('Src', '/images/sample_image.png')
        },
        caption: {
          default: text('Caption', 'Picture caption')
        },
        alt: {
          default: text('Alt', 'Picture alt')
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
      template: `<Picture
        :picture="src"
        :caption="caption"
        :alt="alt"
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
          'The picture component. Accepts simple src of the image or array of the images.<br>' +
          'In case of array allows browser to select which image download depends on ' +
          'device screen width and pixel density.<br><br>' +
          '<b>Location:</b> ./components/atoms/Picture.vue'
      }
    }
  )
  .add(
    'No Picture',
    () => ({
      components: { Picture },
      props: {
        noPictureSize: {
          default: select(
            'No picture class',
            ['tiny', 'small', 'medium', 'large', 'huge'],
            'large'
          )
        }
      },
      template: `<Picture :no-picture-size="noPictureSize" />`
    }),
    {
      info: {
        summary:
          'The empty picture component. May be different sizes depends on noPictureSize prop.<br><br>' +
          '<b>Location:</b> ./components/atoms/Picture.vue'
      }
    }
  )
