import { storiesOf } from '@storybook/vue'
import { text, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ArrowIcon from '../_old/atoms/IconArrow'
import Notes from './ControlButton.md'

import DarwinButton from './ControlButton'

storiesOf('Controls', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Button with text',
    () => ({
      components: { DarwinButton },
      props: {
        type: {
          default: select(
            'Type',
            ['primary', 'secondary', 'danger', 'inverse'],
            'primary'
          )
        },
        text: {
          default: text('Text', 'Button')
        }
      },
      methods: {
        action: action('Button clicked')
      },
      template: `<darwin-button :type="type" :prevent-default="true" @click="action">{{ text }}</darwin-button>`
    }),
    {
      info: {
        summary:
          'The button component. Depending on props may have different appearance and behavior. ' +
          'Default slot is used for text injection. Converts to <nuxt-link ...> or <a ...> depending on props<br><br>' +
          '<b>Location:</b> ./components/atoms/ControlButton.vue'
      }
    }
  )
  .add(
    'Button with icon',
    () => ({
      components: { DarwinButton, ArrowIcon },
      props: {
        type: {
          default: select(
            'Type',
            ['primary', 'secondary', 'danger', 'inverse'],
            'secondary'
          )
        }
      },
      methods: {
        action: action('Button clicked')
      },
      template: `<darwin-button :type="type" :is-symbol="true" :prevent-default="true" @click="action">
                <arrow-icon :light="['primary', 'danger'].includes(type)" />
              </darwin-button>`
    }),
    {
      info: {
        summary:
          'The button component. Depending on props may have different appearance and behavior. Default slot is used for icon injection..<br><br>' +
          '<b>Location:</b> ./components/atoms/ControlButton.vue'
      }
    }
  )
