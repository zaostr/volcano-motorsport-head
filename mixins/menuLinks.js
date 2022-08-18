import { routeNamesList } from '@/utils/routes'

export default {
  data() {
    return {
      routeNamesList,
      menuLinks: [
        {
          text: this.$t('pages.news'),
          routeName: routeNamesList.newsList,
          routeParams: { year: new Date().getFullYear() }
        },
        {
          text: this.$t('pages.season'),
          routeName: routeNamesList.season,
          routeParams: { year: new Date().getFullYear() }
        },
        {
          text: this.$t('pages.team'),
          routeName: routeNamesList.team
        },
        {
          text: this.$t('pages.cars'),
          routeName: routeNamesList.cars
        },
        {
          text: this.$t('pages.wallpapers'),
          routeName: routeNamesList.wallpapers
        },
        {
          text: this.$t('pages.careers'),
          routeName: routeNamesList.careers
        },
        {
          text: this.$t('pages.contacts'),
          routeName: routeNamesList.contacts
        }
      ]
    }
  },

  methods: {
    isActiveItem(itemRoute) {
      const [currentRouteName] = this.$route.name?.split('___') || []

      if (
        itemRoute === this.routeNamesList.newsList &&
        currentRouteName === this.routeNamesList.search
      ) {
        return true
      } else {
        return this.$route.name?.includes(itemRoute)
      }
    }
  }
}
