<template>
  <!--  <masonry :cols="cols" :gutter="gutter">-->
  <div class="grid-container">
    <InstagramCard
      v-for="item in innerItemsList"
      :key="item.id"
      :data="item"
      class="instagram-item"
    />
  </div>
  <!--  </masonry>-->
</template>

<script>
import { mapState } from 'vuex'

/** components **/
import InstagramCard from '@/components/molecules/CardInstagram'

/**
 * This is a reusable instagram feed component.
 * Layout powered by vue-masonry-css package.
 * @version 0.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'InstagramFeed',

  components: {
    InstagramCard
  },

  props: {
    /**
     * Data from the outside
     */
    itemsList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      innerItemsList: this.itemsList.length ? this.itemsList.slice(0, 6) : [],
      textHtml: null
    }
  },

  computed: {
    /* cols() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 2 : 3
    },

    gutter() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 18 : 24
    }, */
    instagramAccessToken() {
      return this.settings && this.settings.instagram_access_token
    },

    ...mapState(['deviceWidth', 'settings'])
  },

  mounted() {
    /* const fields = [
      'id',
      'caption',
      'permalink',
      'media_type',
      'media_url',
      'thumbnail_url',
      'children',
      'timestamp'
    ] */
    // TODO: put to storage to not refetch each time
    // 18/08/22, mt:
    // WORKaround: Use our justbusiness.site/instagram/loader-volcano.php script
    // Re:
    // fetch(
    //  'https://graph.instagram.com/me/media' +
    //    `?fields=${fields.join(',')}&access_token=${this.instagramAccessToken}`
    // )
    fetch('https://insta.justbusiness.site/instagram/uploads/media-volcano.json', {
      cache: 'no-cache'
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.data && response.data.length) {
          response.data.slice(0, 6).forEach((item) => {
            if (item.media_type === 'IMAGE') {
              this.innerItemsList.push({
                id: item.id,
                picture: item.media_url,
                type: item.media_type,
                date: item.timestamp,
                text: item.caption,
                link: item.permalink
              })
            } else if (item.media_type === 'VIDEO') {
              this.innerItemsList.push({
                id: item.id,
                video: item.media_url,
                thumbnail: item.thumbnail_url,
                type: item.media_type,
                date: item.timestamp,
                text: item.caption,
                link: item.permalink
              })
            } else if (item.media_type === 'CAROUSEL_ALBUM') {
              this.innerItemsList.push({
                id: item.id,
                // TODO: add proper instagram links
                // carousel: item.children,
                picture: item.media_url,
                type: item.media_type,
                date: item.timestamp,
                text: item.caption,
                link: item.permalink
              })
            }
          })
        }
      })
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/variables';

.grid-container {
  margin-top: 40px;
  margin-bottom: -18px;
}

.instagram-item {
  margin-bottom: 18px;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .instagram-item {
    grid-column: span 6;
  }
}

@media (min-width: $md-breakpoint) {
  .grid-container {
    margin-bottom: -24px;
  }

  .instagram-item {
    grid-column: span 6;
    margin-bottom: 24px;
  }
}

@media (min-width: $lg-breakpoint) {
  .instagram-item {
    grid-column: span 4;
  }
}
</style>
