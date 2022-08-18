<template>
  <header class="header">
    <TeamLogo />

    <div class="navigation-container">
      <MenuMain />

      <LangSwitch
        v-if="!['xs', 'sm'].includes(deviceWidth)"
        @switch-locale="switchLocale"
      />
    </div>

    <NavigationDrawer />
  </header>
</template>

<script>
import { mapState } from 'vuex'

/** mixins **/
import switchLocale from '@/mixins/switchLocale'

/** components **/
import TeamLogo from '@/components/atoms/Logo'
import LangSwitch from '@/components/atoms/LangSwitch'
import MenuMain from '@/components/molecules/MenuMain'
import NavigationDrawer from '@/components/organisms/NavigationDrawer'

/**
 * This is a reusable header component. Consists of other components.
 * @version 0.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Header',

  components: {
    NavigationDrawer,
    MenuMain,
    TeamLogo,
    LangSwitch
  },

  mixins: [switchLocale],

  computed: {
    ...mapState(['cssVariables', 'isMenuShown', 'deviceWidth'])
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.header {
  background: $gray-900;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid $white015;
  z-index: 100;
  transition: height 150ms ease;
}

.navigation-container {
  display: flex;
}

@media (max-width: $md-breakpoint) {
  .header {
    height: 64px;
  }

  .logo-wrap {
    margin: 10px 0 0 18px;
  }
}

@media (min-width: $md-breakpoint) {
  .header {
    height: 80px;
  }

  .logo-wrap {
    margin: 14px 0 0 32px;
  }

  .lang-switch {
    border-left: 1px solid $white015;
  }
}
</style>
