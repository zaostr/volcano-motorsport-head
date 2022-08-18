<template>
  <Picture
    :picture="picture"
    :lqip="image ? image.lqip : null"
    aspect-ratio="1:1"
    class="avatar"
  />
</template>

<script>
import Picture from '@/components/atoms/Picture'
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Avatar',

  components: { Picture },

  props: {
    image: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    picture() {
      if (!this.image) {
        return null
      }

      if (['string', 'undefined'].includes(typeof this.image)) {
        // flat picture fallback
        return this.image
      } else if (typeof this.image === 'object') {
        const picture = []
        const separator = this.image?.url?.includes('?') ? '&' : '?'
        picture.push({
          min_width: 320,
          srcset: [
            { density: '1x', src: this.image.url + separator + 'w=104' },
            { density: '2x', src: this.image.url + separator + 'w=208' }
          ]
        })

        return picture
      }

      return null
    }
  }
}
</script>

<style scoped lang="scss">
.avatar {
  height: 52px;
  width: 52px;
  min-height: 52px;
  min-width: 52px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
