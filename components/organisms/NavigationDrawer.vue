<template>
  <nav :class="{ __shown: isMenuShown }" class="navigation-drawer-container">
    <div class="navigation-drawer">
      <LangSwitch @switch-locale="switchLocale" />

      <ul class="header-socials-wrap">
        <li
          v-for="social in companyData.socials"
          v-show="getSocialType(social)"
          :key="social.id"
        >
          <a :href="social" target="_blank" class="socials-item-link">
            <IconInstagram v-if="getSocialType(social) === 'instagram'" />
          </a>
        </li>
      </ul>

      <IconClose class="button-close" @click.native="closeDrawerHandler" />

      <ul class="navigation-item-list">
        <li
          v-for="(item, index) in menuLinks"
          :key="index"
          class="navigation-item"
          @click="closeDrawerHandler"
        >
          <NLink
            :to="
              localePath({
                name: item.routeName,
                params: item.routeParams
              })
            "
            :text="item.text"
            :class="{ __active: isActiveItem(item.routeName) }"
            class="navigation-item-link"
          >
            <DarwinText :text="item.text" size="small" />
          </NLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

/** utils **/
import getSocialType from '@/utils/getSocialType'

/** mixins **/
import menuLinks from '@/mixins/menuLinks'
import switchLocale from '@/mixins/switchLocale'

/** components **/
import DarwinText from '@/components/atoms/Text'
import IconClose from '@/components/icons/Close'
import LangSwitch from '@/components/atoms/LangSwitch'
import IconInstagram from '@/components/icons/Instagram'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'NavigationDrawer',

  components: { LangSwitch, IconClose, DarwinText, IconInstagram },

  mixins: [menuLinks, switchLocale],

  computed: {
    ...mapState(['isMenuShown', 'companyData'])
  },

  watch: {
    isMenuShown(value) {
      const body = document && document.getElementsByTagName('body')[0]

      if (body) {
        if (value) {
          body.classList.add('__blocked_scroll')
        } else {
          body.classList.remove('__blocked_scroll')
        }
      }
    }
  },

  methods: {
    getSocialType,
    closeDrawerHandler() {
      this.$store.dispatch('setMenuShown', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.navigation-drawer-container {
  position: fixed;
  display: flex;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: $gray-900;
  right: -100vw;
  transition: right 300ms ease-out;

  &.__shown {
    right: 0;
  }
}

.navigation-drawer {
  display: flex;
  justify-content: center;
  position: relative;
  overflow-y: auto;
  width: 100%;
}

.navigation-item-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 136px 0 104px;
  height: fit-content;
}

.navigation-item {
  & + & {
    margin-top: 32px;
  }
}

.navigation-item-link {
  text-transform: uppercase;
}

.button-close {
  position: absolute;
  top: 16px;
  right: 16px;
  color: $gray-300;
  cursor: pointer;
  transition: color 150ms linear;

  &:hover {
    color: $white;
  }
}

.lang-switch {
  position: absolute;
  top: 28px;
}

.header-socials-wrap {
  position: absolute;
  top: 60px;
}

@media (min-width: $md-breakpoint) {
  .navigation-drawer-container {
    transition: right 450ms ease-out;
  }

  .lang-switch {
    display: none;
  }
  .header-socials-wrap {
    display: none;
  }
}
</style>

<style lang="scss">
body {
  &.__blocked_scroll {
    overflow-y: hidden;
  }
}
</style>
