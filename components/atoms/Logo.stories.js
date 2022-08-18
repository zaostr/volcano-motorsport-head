import { storiesOf } from '@storybook/vue'

import store from '../../.storybook/store'
import Notes from './Logo.md'

import DarwinLogo from './Logo'

storiesOf('Logos', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Logo',
    () => ({
      components: { DarwinLogo },
      store,
      template: `<darwin-logo  />`
    }),
    {
      info: {
        summary:
          'SVG based logo component.<br><br>' +
          '<b>Location:</b> ./components/atoms/Logo.vue'
      }
    }
  )
  .add(
    'Favicon',
    () => ({
      template: `<img src="/favicon.png" height="16px" width="16px" />`
    }),
    {
      info: {
        summary:
          'The favicon image.<br><br>' + '<b>Location:</b> ./static/favicon.png'
      }
    }
  )
  .add(
    'Webclip',
    () => ({
      template: `<img src="/icon.png" />`
    }),
    {
      info: {
        summary:
          'The webclip image.<br><br>' + '<b>Location:</b> ./static/icon.png'
      }
    }
  )
