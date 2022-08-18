import { storiesOf } from '@storybook/vue'
import { select, text, boolean } from '@storybook/addon-knobs'

import Notes from './Text.md'

import DarwinText from './Text'

storiesOf('Typography', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Text',
    () => ({
      components: { DarwinText },
      props: {
        type: {
          default: select(
            'Type',
            ['augmented', 'general', 'small', 'expressive'],
            'general'
          )
        },
        fontWeight: {
          default: select(
            'Font weight',
            ['regular', 'medium', 'bold'],
            'regular'
          )
        },
        expressiveSize: {
          default: select(
            'Expressive size',
            ['augmented', 'general', 'small'],
            'general'
          )
        },
        text: {
          default: text('Text', 'Some text')
        },
        light: {
          default: boolean('Light', false)
        }
      },
      template: `<darwin-text
        :text="text"
        :type="type"
        :font-weight="fontWeight"
        :expressive-size="expressiveSize"
        :light="light"
      />`
    }),
    {
      info: {
        summary:
          'The text component. Depending on props may has different styles.<br><br>' +
          '<b>Location:</b> ./components/atoms/Text.vue'
      }
    }
  )
