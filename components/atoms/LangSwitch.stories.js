import { storiesOf } from '@storybook/vue'

import store from '../../.storybook/store'
import Notes from './LangSwitch.md'

import LangSwitch from './LangSwitch'

storiesOf('Language selectors', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Lang Switch',
    () => ({
      components: { LangSwitch },
      store,
      methods: {
        switchLocale(locale) {
          store.dispatch('setLocale', locale)
        }
      },
      template: `<lang-switch @switch-locale="switchLocale" />`
    }),
    {
      info: {
        summary:
          'The language switch. Emits switch-locale event to be processed by parent.<br><br>' +
          '<b>Location:</b> ./components/atoms/LangSwitch.vue'
      }
    }
  )
