<template>
  <div
    v-show="picture"
    ref="container"
    :style="
      !loaded ? lqipStyle : { width: containerWidth ? containerWidth : null }
    "
    class="picture-container"
  >
    <div v-if="loadedInitially" class="clear-fix" v-text="'&nbsp;'" />
    <picture
      :class="{ 'aspect-ratio-box': aspectRatio }"
      :style="{
        height: aspectRatio && aspectRatio !== '0' ? '0' : height,
        width,
        minHeight,
        minWidth,
        maxHeight,
        maxWidth,
        paddingBottom
      }"
    >
      <source
        v-for="(item, index) in sortedItems"
        :key="index"
        :media="constructMediaQuery(item)"
        :data-srcset="item.srcset"
      />

      <img
        v-show="sortedItems[0]"
        ref="image"
        :data-srcset="sortedItems[0] && sortedItems[0].srcset"
        :data-src="sortedItems[0] && sortedItems[0].src"
        :alt="alt ? alt : caption"
        :style="{ objectFit }"
        :class="{
          __loaded: loaded,
          ['__full-height']: fullHeight
        }"
        class="lazyload"
        @load="onLoaded"
      />
      <template v-if="!sortedItems || !sortedItems.length" class="no-image">
        <div :class="'__' + noPictureSize" class="no-picture-wrap" />
      </template>

      <div v-if="author" class="author-text" v-text="authorText" />
    </picture>
    <div v-if="loadedInitially" class="clear-fix" v-text="'&nbsp;'" />

    <div v-if="caption" class="caption" v-text="caption" />
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import throttle from 'lodash/throttle'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

/**
 * This is a reusable picture component. Accepts simple src of the image or array of the images.
 * Allows browser to select which image download depends on device screen width and pixel density.
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Picture',

  props: {
    /* Expected formats:
        'img_src_path' - simple string - only one img tag will be generated
        - OR -
        [{min_width: 768, src: 'img_src_path1'}
         {min_width: 1024, srcset: [{density: '1x', src: 'img_src_path2'}, {density: '2x', src: 'img_src_path3'}]}]
         */
    /**
     * Accepts simple src string of the image source or an array of images for different device screen width and pixel density.
     * See format details at component prop comments.
     */
    picture: {
      type: [Array, String],
      default: ''
    },
    /**
     * Caption of the picture
     */
    caption: {
      type: String,
      default: ''
    },
    /**
     * Alt attribute of the <img .../> tag
     */
    alt: {
      type: String,
      default: ''
    },
    /**
     * Low quality image placeholder
     */
    lqip: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    /**
     * Aspect ratio of the picture in x:y format. If filled other dimensional props may be ignored.
     */
    aspectRatio: {
      type: String,
      default: ''
    },
    /**
     * Height of the picture in any css units (px, %, ...)
     */
    height: {
      type: String,
      default: ''
    },
    /**
     * Width of the picture in any css units (px, %, ...)
     */
    width: {
      type: String,
      default: ''
    },
    /**
     * Minimum height of the picture in any css units (px, %, ...)
     */
    minHeight: {
      type: String,
      default: ''
    },
    /**
     * Minimum width of the picture in any css units (px, %, ...)
     */
    minWidth: {
      type: String,
      default: ''
    },
    /**
     * Maximum height of the picture in any css units (px, %, ...)
     */
    maxHeight: {
      type: String,
      default: ''
    },
    /**
     * Maximum width of the picture in any css units (px, %, ...)
     */
    maxWidth: {
      type: String,
      default: ''
    },
    /**
     * Makes <img ...> tag height 100vh
     */
    fullHeight: {
      type: Boolean,
      default: false
    },
    /**
     * If the picture doesn't have a picture prop no-picture icon appears.
     * This prop defines it's size.
     * @values 'tiny', 'small', 'medium', 'large', 'huge'
     */
    noPictureSize: {
      type: String,
      default: 'large',
      validator: (val) =>
        ['tiny', 'small', 'medium', 'large', 'huge'].includes(val)
    },
    objectFit: {
      type: String,
      default: 'cover'
    },
    loadedInitially: {
      type: Boolean,
      default: false
    },
    maintainAspectRatio: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      paddingBottom: 0,
      loaded: this.loadedInitially,
      naturalHeight: null,
      naturalWidth: null,
      containerWidth: null,
      imageEl: null,
      resizeListener: null
    }
  },

  computed: {
    el() {
      let elem = 'image-large-icon'
      if (!['large', 'huge'].includes(this.noPictureSize)) {
        elem = 'image-' + this.noPictureSize + '-icon'
      }
      return elem
    },

    sortedItems() {
      // Array.sort function affects array itself
      // so we need to clone it to avoid prop changes
      const outPicture = cloneDeep(this.picture)
      if (Array.isArray(outPicture)) {
        // Resort Array by min_width (higher is above)
        outPicture.sort(function(a, b) {
          return b.min_width - a.min_width
        })
        // if srcset is array of images prepare srcset string
        outPicture.forEach(function(item, k) {
          if (Array.isArray(item.srcset)) {
            let srcset = ''
            item.srcset.forEach(function(srcObj, i) {
              srcset +=
                (i === 0 ? '' : ', ') + srcObj.src + ' ' + srcObj.density
            })
            if (srcset) {
              outPicture[k].srcset = srcset
            }
          }
        })
      } else if (typeof outPicture === 'string') {
        return [{ min_width: 0, src: outPicture }]
      } else {
        return []
      }
      return outPicture
    },

    lqipStyle() {
      if (this.lqip) {
        return `background-image: url('${this.lqip}'); background-size: cover;`
      }
      return ''
    },

    authorText() {
      if (this.author) {
        return this.$t('picture.authorPrefix') + ': ' + this.author
      } else {
        return ''
      }
    }
  },

  watch: {
    aspectRatio() {
      this.recalculatePadding()
    }
  },

  created() {
    if (this.aspectRatio) {
      this.recalculatePadding()
    }
  },

  mounted() {
    if (this.maintainAspectRatio) {
      this.resizeListener = throttle(this.recalculateContainerWidth, 100, {
        leading: true,
        trailing: true
      })
      window.addEventListener('resize', this.resizeListener)
    }
  },

  beforeDestroy() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener)
    }
  },

  methods: {
    onLoaded(e) {
      this.loaded = true
      this.imageEl = e.target
      this.naturalHeight = e.target.naturalHeight
      this.naturalWidth = e.target.naturalWidth

      if (this.maintainAspectRatio) {
        this.recalculateContainerWidth()
      }

      if (
        String(this.imageEl.getAttribute('src')) !==
        String(this.sortedItems[0]?.src)
      ) {
        // lazysizes will not change src on data-src change
        // so do it manually
        this.imageEl.setAttribute('src', this.sortedItems[0]?.src)
      }
    },

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
    },

    constructMediaQuery(item) {
      if (item.min_width && item.max_width) {
        return `(min-width: ${item.min_width}px) and (max-width: ${item.max_width}px)`
      } else if (item.min_width) {
        return `(min-width: ${item.min_width}px)`
      } else if (item.max_width) {
        return `(max-width: ${item.max_width}px)`
      } else {
        return null
      }
    },

    recalculateContainerWidth() {
      this.containerWidth = null

      this.$nextTick(() => {
        const imageEl = this.imageEl || this.$refs.image

        if (!this.naturalWidth) {
          this.naturalHeight = imageEl.naturalHeight
          this.naturalWidth = imageEl.naturalWidth
        }

        if (imageEl.clientHeight && this.naturalWidth && this.naturalHeight) {
          this.containerWidth =
            (this.naturalWidth * imageEl.clientHeight) / this.naturalHeight +
            'px'
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';

.picture-container {
  background-size: cover;
  background-position: center;
  position: relative;
}

picture {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $border-radius;
  overflow: hidden;
  position: relative;

  img {
    opacity: 0;
    transition: opacity 150ms ease;
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
    text-indent: -9999px;
    white-space: nowrap;
    overflow: hidden;
  }

  img.__loaded {
    opacity: 1;
  }
}
.instagram-item picture {
  display: inline;
}

picture.aspect-ratio-box {
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  content: '';

  > img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.clear-fix {
  height: 0;
  opacity: 0;
}

.author-text {
  position: absolute;
  right: 0;
  bottom: 0;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 16px;
  background: $white;
  color: $gray-900;
  padding: 1px 5px;
}

.caption {
  margin-top: 12px;
}

.__full-height {
  height: 100vh;
}

.no-picture-wrap {
  background: $smoky-gray;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-picture-wrap.__tiny {
  border-radius: 12px;
  height: 24px;
  width: 24px;
}

.no-picture-wrap.__small {
  border-radius: 16px;
  height: 32px;
  width: 32px;
}

.no-picture-wrap.__medium {
  border-radius: $border-radius;
  height: 48px;
  width: 48px;
}

.no-picture-wrap.__large {
  border-radius: $border-radius;
  height: 100%; // 80px;
  width: 100%; // 80px;
}

.no-picture-wrap.__huge {
  width: 100%;
  height: 100%;
  min-width: 160px;
  min-height: 160px;
}
</style>
