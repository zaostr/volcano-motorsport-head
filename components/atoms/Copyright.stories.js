import { storiesOf } from '@storybook/vue'
import { boolean, number, text } from '@storybook/addon-knobs'

import Notes from './Copyright.md'

import DarwinCopyright from './Copyright'

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
    'Copyright',
    () => ({
      components: { DarwinCopyright },
      props: {
        startYear: {
          default: number('Start year', 2017)
        },
        company: {
          default: text('Company', 'DARWIN')
        },
        light: {
          default: boolean('Light', false)
        }
      },
      template: `<darwin-copyright :start-year="startYear" :company="company" :light="light" />`
    }),
    {
      info: {
        summary:
          'The copyright component.<br><br>' +
          '<b>Location:</b> ./components/atoms/Copyright.vue'
      }
    }
  )
