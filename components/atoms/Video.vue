<template>
  <div :class="{ __embedded: format }" :title="title" class="video-container">
    <!-- eslint-disable vue/no-v-html -->
    <div
      :style="{
        height: aspectRatio && aspectRatio !== '0' ? '0' : height,
        width,
        minHeight,
        minWidth,
        maxHeight,
        maxWidth,
        paddingBottom
      }"
      :class="{ 'aspect-ratio-box': aspectRatio }"
      class="video-wrap"
      v-html="videoCode"
    />
  </div>
</template>

<script>
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import getVideoId from 'get-video-id'

/**
 * This is a reusable video component.
 * The component content prop accepts youtube/vimeo link, mp4 embedded or any html
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Video',

  props: {
    /**
     * Accepts youtube/vimeo/vine link or any html
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * For embedded video
     */
    format: {
      type: String,
      default: ''
    },
    /**
     * Aspect ratio of the video in x:y format. If filled other dimensional props may be ignored.
     */
    aspectRatio: {
      type: String,
      default: ''
    },
    /**
     * Height of the video in any css units (px, %, ...)
     */
    height: {
      type: String,
      default: ''
    },
    /**
     * Width of the video in any css units (px, %, ...)
     */
    width: {
      type: String,
      default: ''
    },
    /**
     * Minimum height of the video in any css units (px, %, ...)
     */
    minHeight: {
      type: String,
      default: ''
    },
    /**
     * Minimum width of the video in any css units (px, %, ...)
     */
    minWidth: {
      type: String,
      default: ''
    },
    /**
     * Maximum height of the video in any css units (px, %, ...)
     */
    maxHeight: {
      type: String,
      default: ''
    },
    /**
     * Maximum width of the video in any css units (px, %, ...)
     */
    maxWidth: {
      type: String,
      default: ''
    },
    videoLinkOptions: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isIndex: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      paddingBottom: 0
    }
  },

  computed: {
    videoCode() {
      /**
       * If content prop contains simple link to video service, converts this link to <iframe .../>
       */
      let content = this.content
      const linkData = getVideoId(this.content) // if content is link
      if (linkData) {
        const iframeClass = `lazyload ${
          this.isIndex ? 'iframe-height-restricted' : ''
        }`

        if (linkData.service === 'youtube') {
          // this.initYoutubeEmbeddedApi()

          content =
            '<iframe width="100%" height="100%"' +
            ' src="//www.youtube.com/embed/' +
            linkData.id +
            this.videoLinkOptions +
            '&playlist=' +
            linkData.id + // to allow loop
            '" allowfullscreen class="' +
            iframeClass +
            '" allow="autoplay; encrypted-media"></iframe>'
        } else if (linkData.service === 'vimeo') {
          content =
            '<iframe width="100%" height="100%" ' +
            'src="//player.vimeo.com/video/' +
            linkData.id +
            this.videoLinkOptions +
            '&playlist=' +
            linkData.id + // to allow loop
            '" class="' +
            iframeClass +
            '" allow="autoplay; encrypted-media"></iframe>'
        }
      }

      if (this.format === 'video/mp4') {
        // TODO: check format by extension
        content =
          '<video autoplay loop muted playsinline preload="none">' +
          '<source src="' +
          content +
          '" type="video/mp4">' +
          '</video>'
      }
      return content
    }
  },

  watch: {
    aspectRatio() {
      this.recalculatePadding()
    }
  },

  mounted() {
    if (this.aspectRatio) {
      this.recalculatePadding()
    }
  },

  methods: {
    recalculatePadding() {
      /**
       * Used to correct vertical size of the map with aspectRatio when it is changed
       * @type {string[]}
       */
      const widthHeight = this.aspectRatio.split(':')
      if (widthHeight[0] && widthHeight[1]) {
        this.paddingBottom = (100 * widthHeight[0]) / widthHeight[1] + '%'
      } else {
        this.paddingBottom = 0
      }
    }

    /* initYoutubeEmbeddedApi() {
      const tag = document.createElement('script')

      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } */
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';

.video-container {
  max-width: 100%;
  max-height: 100%;
}

.video-wrap {
  border-radius: $border-radius;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

  iframe,
  video {
    border-radius: $border-radius;
    overflow: hidden;
    display: block;
    border: none;
    width: 100%;
    height: 100%;
  }
}

.aspect-ratio-box {
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  content: '';
  overflow: hidden;

  iframe,
  video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.__embedded {
  .aspect-ratio-box {
    > * {
      object-fit: cover;
    }
  }
}

.iframe-height-restricted {
  max-height: calc(100vh - 80px);
}
</style>
