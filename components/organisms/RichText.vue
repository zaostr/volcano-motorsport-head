<template>
  <div v-if="blockList.length" class="rich-text">
    <template v-for="(block, index) in blockList">
      <DarwinText
        v-if="block.type === 'html'"
        :key="index"
        :text="block.content"
        :size="textSize"
      />

      <Heading
        v-else-if="block.type === 'header'"
        :key="index"
        :text="block.content"
        :size="block.seo"
      />

      <Picture
        v-else-if="block.type === 'image'"
        :key="index"
        :picture="getPicture(block.content)"
        :lqip="block.content ? block.content.lqip : null"
        :author="block.author"
        aspect-ratio="2:3"
      />

      <Video
        v-else-if="block.type === 'video'"
        :key="index"
        :content="block.content"
        aspect-ratio="9:16"
      />
      <pre v-else :key="index">TODO: {{ block }}</pre>
    </template>
  </div>
</template>

<script>
import DarwinText from '@/components/atoms/Text'
import Heading from '@/components/atoms/Heading'
import Picture from '@/components/atoms/Picture'
import Video from '@/components/atoms/Video'
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'RichText',

  components: { Video, Picture, Heading, DarwinText },

  props: {
    blockList: {
      type: Array,
      default: () => []
    },

    /**
     * Type of the text.
     * @values 'augmented', 'general', 'small', 'tiny', 'micro'
     */
    textSize: {
      type: String,
      default: 'general',
      validator: (val) =>
        ['augmented', 'general', 'small', 'tiny', 'micro'].includes(val)
    }
  },

  methods: {
    getPicture(image) {
      if (!image) {
        return null
      }

      if (['string', 'undefined'].includes(typeof image)) {
        // flat picture fallback
        return image
      } else if (typeof image === 'object') {
        const picture = []
        const separator = image?.url?.includes('?') ? '&' : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              {
                density: '1x',
                src: image.url + separator + 'w=444'
              },
              {
                density: '2x',
                src: image.url + separator + 'w=888'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: image.url + separator + 'w=732'
              },
              {
                density: '2x',
                src: image.url + separator + 'w=1464'
              }
            ]
          },
          {
            min_width: 768,
            srcset: [
              {
                density: '1x',
                src: image.url + separator + 'w=410'
              },
              {
                density: '2x',
                src: image.url + separator + 'w=820'
              }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: image.url + separator + 'w=550'
              },
              {
                density: '2x',
                src: image.url + separator + 'w=1100'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: image.url + separator + 'w=654'
              },
              {
                density: '2x',
                src: image.url + separator + 'w=1308'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: image.url + separator + 'w=760'
              },
              {
                density: '2x',
                src: image.url + separator + 'w=1520'
              }
            ]
          }
        )

        return picture
      }

      return null
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.rich-text {
  * + .text,
  * + .picture-container,
  * + .video-container {
    margin-top: 24px;
  }

  .text + .heading {
    margin-top: 48px;
  }

  .heading + .text {
    margin-top: 12px;
  }
}
</style>

<style lang="scss">
@import './assets/styles/variables';

.rich-text {
  .heading {
    * {
      font-weight: 700;
    }
  }

  .text {
    a {
      text-decoration: none;
      color: $orange-550;
    }

    a:hover {
      text-decoration: underline;
    }
  }
}
</style>
