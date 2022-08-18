<template>
  <div class="socials-share">
    <DarwinText
      :text="$t('socialsShare.share')"
      family="oswald"
      size="tiny"
      class="heading"
    />

    <ul class="social-share-items-list">
      <li class="social-share-item">
        <a
          :href="twLink"
          target="_blank"
          class="social-share-item-link __twitter"
        >
          <IconTwitter />
        </a>
      </li>

      <li class="social-share-item">
        <a
          :href="fbLink"
          target="_blank"
          class="social-share-item-link __facebook"
        >
          <IconFacebook />
        </a>
      </li>

      <li class="social-share-item __copy-item">
        <transition name="opacity-short" mode="out-in">
          <Link
            v-if="!copied"
            :text="$t('socialsShare.copy')"
            :prevent-default="true"
            type="secondary"
            @click="copyHandler"
          />
          <DarwinText v-else :text="$t('socialsShare.copied')" />
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
/** utils **/
import copyToClipboard from '@/utils/copyToClipboard'

/** components **/
import IconFacebook from '@/components/icons/Facebook'
import IconTwitter from '@/components/icons/Twitter'
import DarwinText from '@/components/atoms/Text'
import Link from '@/components/atoms/Link'

/**
 * This is a reusable socials share component.
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'SocialsShare',

  components: {
    Link,
    DarwinText,
    IconFacebook,
    IconTwitter
  },

  props: {
    /**
     * Title of the page to be shared
     */
    title: {
      type: String,
      default: ''
    },

    /**
     * Description of the page to be shared
     */
    /* description: {
      type: String,
      default: ''
    }, */

    /**
     * Accepts simple src string of the image source or an array of images for different device screen width and pixel density.
     * See format details at ./components/atoms/Picture.vue
     */
    picture: {
      type: [Array, String],
      default: ''
    }
  },

  data() {
    return {
      copied: false
    }
  },

  computed: {
    fbLink() {
      return (
        'https://www.facebook.com/sharer/sharer.php?u=' +
        (this.$nuxt
          ? this.baseUrl + this.$nuxt.$route.path
          : window.location.href)
      )
    },

    twLink() {
      return (
        'https://twitter.com/share?url=' +
        (this.$nuxt
          ? this.baseUrl + this.$nuxt.$route.path
          : window.location.href) +
        '&text=' +
        this.title
      )
    },

    baseUrl() {
      /**
       * Base url of the project
       */
      if (process.browser) {
        return location.protocol + '//' + location.host
      } else {
        return (
          (process.env.APP_PROTOCOL ? process.env.APP_PROTOCOL : 'http') +
          '://' +
          process.env.APP_HOST
        )
      }
    }
  },

  methods: {
    copyHandler() {
      this.copyToClipboard(window.location.href)
      this.copied = true

      setTimeout(() => {
        this.copied = false
      }, 3000)
    },

    copyToClipboard
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

.heading {
  color: $orange-500;
  text-transform: uppercase;
}

.social-share-items-list {
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.social-share-item {
  &:not(.__copy-item) {
    & + & {
      margin-left: 8px;
    }
  }

  &.__copy-item {
    margin-left: 16px;
  }
}

.social-share-item-link {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 150ms linear;

  & {
    height: 56px;
    width: 56px;
    border: 1px solid $white015;
  }

  &:hover {
    &.__twitter {
      border-color: $twitter-color;
    }

    &.__facebook {
      border-color: $facebook-color;
    }
  }
}
</style>
