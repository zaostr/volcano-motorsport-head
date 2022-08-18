<template>
  <nav class="menu-main">
    <ul v-if="['xxl', 'xl'].includes(deviceWidth)" class="menu-item-list">
      <li v-for="(item, index) in menuLinks" :key="index" class="menu-item">
        <NLink
          :to="
            localePath({
              name: item.routeName,
              params: item.routeParams
            })
          "
          :text="item.text"
          :class="{ __active: isActiveItem(item.routeName) }"
          class="menu-item-link"
        >
          <DarwinText :text="item.text" size="small" />
        </NLink>
      </li>
    </ul>

    <ControlButton
      v-else
      :prevent-default="true"
      :icon-only="true"
      type="alternative"
      size="small"
      @click="showMobileMenuHandler"
    >
      <IconMenu />
    </ControlButton>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

/** mixins **/
import menuLinks from '@/mixins/menuLinks'

/** components **/
import IconMenu from '@/components/icons/Menu'
import DarwinText from '@/components/atoms/Text'
import ControlButton from '@/components/atoms/ControlButton'

export default {
  name: 'MenuMain',

  components: { IconMenu, ControlButton, DarwinText },

  mixins: [menuLinks],

  computed: {
    ...mapState(['deviceWidth'])
  },

  methods: {
    showMobileMenuHandler(show = true) {
      // console.log('showMobileMenuHandler', show)
      this.$store.dispatch('setMenuShown', show)
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.menu-main {
  display: flex;
  height: 100%;
  align-items: center;
}

.menu-item-list {
  display: flex;
  height: 100%;
}

.menu-item {
  & + & {
    margin-left: 32px;
  }
}

.menu-item-link {
  text-align: center;
}

@media (max-width: $md-breakpoint) {
  .control-group {
    margin-right: 10px;
  }
}

@media (min-width: $md-breakpoint) and (max-width: $xl-breakpoint) {
  .control-group {
    margin-right: 16px;
  }
}

@media (min-width: $xl-breakpoint) {
  .menu-main {
    margin-right: 32px;
  }

  .menu-item-link {
    text-transform: uppercase;
    display: flex;
    align-items: center;
    // padding: 12px;
    height: 100%;
    transition: color 150ms linear;
    position: relative;

    &:hover {
      color: $orange-500;
      text-decoration: none;
    }

    &:after {
      position: absolute;
      content: '';
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 3px;
      background: $orange-500;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 150ms linear;
    }

    &.nuxt-link-active,
    &.__active {
      color: $orange-500;

      &:after {
        transform-origin: left;
        transform: scaleX(1);
      }
    }
  }
}
</style>
