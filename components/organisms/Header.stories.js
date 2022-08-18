import { storiesOf } from '@storybook/vue'

import store from '../../.storybook/store'
import Notes from './Header.md'

import DarwinHeader from './Header'

storiesOf('Organisms', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Header',
    () => ({
      components: { DarwinHeader },
      store,
      methods: {
        showMenu(show) {
          store.dispatch('setMenuShown', show)
        },
        switchLocale(locale) {
          store.dispatch('setLocale', locale)
        }
      },
      template: `<darwin-header
        @show-menu="showMenu"
        @switch-locale="switchLocale"
        style="align-self: flex-start;"
      />`
    }),
    {
      info: {
        summary:
          'The header component. Consists of other components.<br><br>' +
          '<b>Location:</b> ./components/organisms/Header.vue'
      }
    }
  )
