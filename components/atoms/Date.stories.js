import { storiesOf } from '@storybook/vue'
import { select, text } from '@storybook/addon-knobs'

import store from '../../.storybook/store'
import Notes from './Date.md'

import DarwinDate from './Date'

storiesOf('Date', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Fixed date',
    () => ({
      components: { DarwinDate },
      store,
      props: {
        utc: {
          default: text('Date', '1995-12-25')
        },
        format: {
          default: select(
            'Format',
            ['DD MMM YYYY', 'DD MMMM YYYY'],
            'DD MMMM YYYY'
          )
        }
      },
      template: `<darwin-date :date="utc" :format="format" />`
    }),
    {
      info: {
        summary:
          'The date component. Accepts String, Timestamp or UTC date<br><br>' +
          '<b>Location:</b> ./components/atoms/Date.vue'
      }
    }
  )
