import { storiesOf } from '@storybook/vue'
import { text, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Notes from './ControlInput.md'

import DarwinInput from './ControlInput'

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
    'Input',
    () => ({
      components: { DarwinInput },
      props: {
        type: {
          default: select('Type', ['primary', 'secondary'], 'primary')
        },
        required: {
          default: boolean('Required', false)
        },
        disabled: {
          default: boolean('Disabled', false)
        },
        placeholder: {
          default: text('Placeholder', 'Placeholder')
        },
        label: {
          default: text('Label', 'Label')
        },
        error: {
          default: text('Error', '')
        }
      },
      methods: {
        changed: action('changed'),
        submitted: action('submitted'),
        keyup: action('keyup'),
        overflow: action('overflow')
      },
      template: `<darwin-input
        id="input" :type="type"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        :label="label"
        :error="error"
        @changed="changed"
        @submitted="submitted"
        @keyup="keyup"
        @overflow="overflow"
      />`
    }),
    {
      info: {
        summary:
          'The input component. Depending on the props may have different appearance and behavior.<br><br>' +
          '<b>Location:</b> ./components/atoms/ControlInput.vue'
      }
    }
  )
