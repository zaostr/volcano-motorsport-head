<template>
  <div class="search-wrap">
    <!--v-if="showSearchInput"-->
    <DarwinInput
      :value="q"
      :placeholder="$t('searchInput.placeholder')"
      @changed="changeSearchQuery"
      @submitted="searchHandler()"
    />

    <IconSearch class="search-btn" @click.native="searchHandler()" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

/** utils **/
import { routeNamesList } from '@/utils/routes'

/** components **/
import DarwinInput from '@/components/atoms/ControlInput'
import IconSearch from '@/components/icons/Search'

export default {
  name: 'SearchInput',

  components: {
    DarwinInput,
    IconSearch
  },

  data() {
    return {
      q: this.$route && this.$route.query.q,
      searchQueryMinLength: 3,
      searchRouteName: routeNamesList.search
    }
  },

  computed: {
    /* showSearchInput() {
      return !['xs', 'sm'].includes(this.deviceWidth)
    }, */

    ...mapState(['deviceWidth', 'searchQuery'])
  },

  mounted() {
    this.q = this.q || this.searchQuery
  },

  methods: {
    changeSearchQuery(value) {
      this.q = value
    },

    async searchHandler() {
      if (this.q && this.q.length >= this.searchQueryMinLength) {
        this.$nuxt.$loading.start()

        await this.$store.dispatch('setSearchQuery', this.q)

        // reset search results
        await this.$store.commit('SET_SEARCH_RESULT_LIST', [])

        // fetchSearchResults
        try {
          await this.$store.dispatch('fetchSearchResults')
        } catch (e) {
          // TODO: redirect to 503
          console.log(e)
        }

        this.$nuxt.$loading.finish()
      } else {
        console.log('TODO: search query too short')
      }

      await this.$router.push(
        this.localePath({
          name: this.searchRouteName,
          query: {
            q: this.q
          }
        })
      )
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

// NB: mobile first
.search-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.control-group {
  // width: 138px;
}

.search-btn {
  margin-left: 16px;
  min-width: 32px;
  min-height: 32px;
  cursor: pointer;
  transition: color 150ms linear;

  &:hover {
    color: $orange-500;
  }
}

@media (max-width: $md-breakpoint) {
  .control-group {
    display: none;
  }
}
</style>
