import { storiesOf } from '@storybook/vue'
import { select, text } from '@storybook/addon-knobs'

import Notes from './Heading.md'

import DarwinHeading from './Heading'

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
    'Heading',
    () => ({
      components: { DarwinHeading },
      props: {
        size: {
          default: select('Size', ['h1', 'h2', 'h3', 'h4', 'h5'], 'h1')
        },
        fontWeight: {
          default: select('Font weight', ['regular', 'bold'], 'bold')
        },
        text: {
          default: text('text', 'Some Heading')
        }
      },
      template: `<darwin-heading
        :text="text"
        :size="size"
        :font-weight="fontWeight"
        :seo="size"
      />`
    }),
    {
      info: {
        summary:
          'The heading component. May be <div ...> or <h1 ...>, <h2 ...>, <h3 ...>, <h4 ...>, <h5 ...> depending on props.<br><br>' +
          '<b>Location:</b> ./components/atoms/Heading.vue'
      }
    }
  )
