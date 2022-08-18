<template>
  <div class="lang-switch">
    <component
      :is="el(lang.code ? lang.code : lang)"
      v-for="lang in localesList"
      :key="lang.code ? lang.code : lang"
      :class="{ __active: locale === (lang.code ? lang.code : lang) }"
      :href="
        switchLocalePath(lang.code ? lang.code : lang) ||
          (lang.code === 'es' ? '/es' : '/')
      "
      class="lang-item"
    >
      <DarwinText :text="lang.name ? lang.name : lang" size="tiny" />
    </component>
  </div>
</template>

<script>
/**
 * This is a reusable lang switch component. Uses locale variable of the storage.
 * @version 0.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
import { mapState } from 'vuex'
import DarwinText from '@/components/atoms/Text'

export default {
  name: 'LangSwitch',
  components: { DarwinText },
  computed: {
    localesList() {
      return this.$i18n.locales
        ? this.$i18n.locales
        : this.$i18n.availableLocales
    },
    ...mapState(['locale'])
  },

  methods: {
    el(langCode) {
      return langCode === this.locale ? 'span' : 'a'
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.lang-switch {
  display: flex;
  align-items: center;
}

.lang-item {
  cursor: pointer;
  text-decoration-line: none;
  color: $white;

  &:hover {
    color: $orange-500;
  }

  &.__active {
    cursor: default;
    color: $orange-500;
  }

  & + & {
    margin-left: 25px;
    position: relative;
    display: flex;
    align-items: center;

    &:before {
      position: absolute;
      content: '';
      left: -13px;
      width: 1px;
      height: 12px;
      background: $white015;
    }
  }
}

@media (max-width: $md-breakpoint) {
  .lang-switch {
    padding: 0 24px;
  }
}

@media (min-width: $md-breakpoint) {
  .lang-switch {
    padding: 0 32px;
  }
}
</style>
