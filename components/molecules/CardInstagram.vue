<template>
  <div class="card-wrap">
    <a :href="data.link" target="_blank">
      <Picture
        v-if="data.type === 'IMAGE'"
        :picture="data.picture"
        :title="data.text"
      />

      <Video
        v-if="data.type === 'VIDEO'"
        :content="data.video"
        :title="data.text"
        :thumbnail="data.thumbnail"
        format="video/mp4"
      />

      <Picture
        v-if="data.type === 'CAROUSEL_ALBUM'"
        :picture="data.picture"
        :title="data.text"
      />

      <!--    TODO: implement Carousel-->
      <!--    <Carousel
      v-if="data.type === 'CAROUSEL_ALBUM'"
      :list="data.carousel"
      :title="data.text"
    />-->
    </a>
  </div>
</template>

<script>
// import bigInt from 'big-integer'

/** components **/
import Picture from '@/components/atoms/Picture'
import Video from '@/components/atoms/Video'
// import Carousel from '@/components/molecules/Carousel'
// import DarwinDate from '@/components/atoms/Date'
// import DarwinText from '@/components/atoms/Text'
// import InstagramIcon from '@/components/icons/Instagram'

/**
 * This is a reusable instagram card component.
 * @version 0.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'CardInstagram',

  components: {
    // Carousel,
    Video,
    Picture
    // DarwinDate,
    // DarwinText,
    // InstagramIcon
  },

  props: {
    /**
     * All the card data
     */
    data: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    /* getInstagramUrlFromMediaId(mediaId) {
      console.log(mediaId)

      const alphabet =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
      let shortenedId = ''
      mediaId = mediaId.substring(0, mediaId.indexOf('_'))

      console.log(mediaId)

      while (mediaId > 0) {
        const remainder = bigInt(mediaId).mod(64)
        mediaId = bigInt(mediaId)
          .minus(remainder)
          .divide(64)
          .toString()
        shortenedId = alphabet.charAt(remainder) + shortenedId
      }

      return 'https://www.instagram.com/p/' + shortenedId + '/'
    } */
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.instagram-item > a {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: #262626;
}
.instagram-item video,
.instagram-item img,
.instagram-item picture {
  object-fit: contain !important;
  display: inline !important;
  max-width: unset;
  max-height: unset;
}
.card-wrap {
  overflow: hidden;

  .picture-container,
  .video-container {
    transition: all 600ms ease-out;
  }

  &:hover .picture-container,
  &:hover .video-container {
    transform: scale(1.05);
  }
}
</style>
