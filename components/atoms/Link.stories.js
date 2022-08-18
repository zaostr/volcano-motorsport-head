import { storiesOf } from '@storybook/vue'
import { text, boolean, select } from '@storybook/addon-knobs'

import Notes from './Link.md'

import DarwinLink from './Link'

storiesOf('Links', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Link',
    () => ({
      components: { DarwinLink },
      props: {
        text: {
          default: text('Text', 'Link')
        },
        hasArrow: {
          default: boolean('Has arrow', false)
        },
        type: {
          default: select('Type', ['primary', 'secondary'], 'primary')
        }
      },
      template: `<darwin-link :text="text" :has-arrow="hasArrow" :type="type" style="width: 120px;" />`
    }),
    {
      info: {
        summary:
          'The link component. Converts to <nuxt-link ...> or <a target="_blank" ...> depending on props<br><br>' +
          '<b>Location:</b> ./components/atoms/Link.vue'
      }
    }
  )
