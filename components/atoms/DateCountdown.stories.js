import { storiesOf } from '@storybook/vue'
import { text } from '@storybook/addon-knobs'

import Notes from './DateCountdown.md'

import DateCountdown from './DateCountdown'

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
    'Date countdown',
    () => ({
      components: { DateCountdown },
      props: {
        deadline: {
          default: text('Deadline', '2021-12-25T16:05:10')
        }
      },
      template: `<date-countdown :deadline="deadline" />`
    }),
    {
      info: {
        summary:
          'The date countdown component.<br><br>' +
          '<b>Location:</b> ./components/atoms/DateCountdown.vue'
      }
    }
  )
