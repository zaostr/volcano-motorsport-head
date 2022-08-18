import { storiesOf } from '@storybook/vue'
import VueI18n from 'vue-i18n'

import store from '../../.storybook/store'
import Notes from './Footer.md'

import DarwinFooter from './Footer'

import messages from '@/lang/en'
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: messages
  }
})

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
    'Footer',
    () => ({
      components: { DarwinFooter },
      store,
      i18n,
      methods: {
        switchLocale(locale) {
          store.dispatch('setLocale', locale)
        }
      },
      template: `<div style="align-self: flex-end;">
        <darwin-footer
        @switch-locale="switchLocale"
        style="width: 100vw;"
        />
      </div>`
    }),
    {
      info: {
        components: { DarwinFooter },
        summary:
          'The CSS grid layout based footer component. Consists of other components.<br><br>' +
          '<b>Location:</b> ./components/organisms/Footer.vue'
      }
    }
  )
