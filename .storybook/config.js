import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import VueMasonry from 'vue-masonry-css'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

import { configure, addDecorator, addParameters } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withInfo /*, setDefaults*/ } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withDesign } from 'storybook-addon-designs'
import { withA11y } from '@storybook/addon-a11y'

/*setDefaults({
  docsInPanel: false
})*/

import '../assets/styles/main.scss'
import '../assets/styles/storybook.scss'
import messagesEn from '../lang/en'
import messagesEs from '../lang/es'

Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(VueMasonry)
Vue.mixin({
  methods: {
    // stub actual build specific functions
    localePath() {},
    switchLocalePath() {}
  }
})

Vue.component('nuxt-link', {
  props: ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    }
  },
  template: '<a href="#" @click.prevent="log()"><slot>NuxtLink</slot></a>'
})

addDecorator(withInfo)
addDecorator(withKnobs)
addDecorator(withDesign)
addDecorator(withA11y)

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: messagesEn,
    es: messagesEs
  },
  availableLocales: [
    {
      name: 'En',
      code: 'en',
      iso: 'en-US',
      file: 'en.js'
    },
    {
      name: 'Es',
      code: 'es',
      iso: 'es-ES',
      file: 'es.js'
    }
  ],
  lazy: true,
  langDir: 'lang/'
})
addDecorator(() => ({
  template: '<story/>',
  i18n
}))

addParameters({
  // TODO: get background colors from diez
  backgrounds: [
    { name: 'dark-gray', value: '#282828' },
    { name: 'light-gray', value: '#f5f5f5' }
  ],
  a11y: {
    element: '#root', // optional selector which element to inspect
    config: {}, // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
    options: {} // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
  }
})

// automatically import all files ending in *.stories.js
configure(require.context('../components', true, /\.stories\.js$/), module)
