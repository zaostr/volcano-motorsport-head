/**
 * Used to inject head seo tags into the pages
 */

// Note: metaData should be overwritten in each page component
// by importing appropriate metaData file and
// injecting metaData variable to the data() block

export default {
  /* data() {
    return {
      metaData: {}
    }
  }, */

  // TODO: use default SEO data from store

  head() {
    return {
      title: this.metaData && this.metaData.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaData && this.metaData.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `Volcano Motorsport :: ${this.metaData &&
            this.metaData.title}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metaData && this.metaData.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.metaData && this.metaData.image
        }
      ]
    }
  },

  methods: {
    prepareMetaImagePath(picture) {
      /**
       * Get path from the picture. See format details at picture component props
       */
      let path = ''

      if (Array.isArray(picture) && picture[0]) {
        // get first (small) src of the picture
        if (picture[0].src) {
          path = picture[0].src
        } else if (picture[0].srcset && picture[0].srcset[0].src) {
          path = picture[0].srcset[0].src
        }
      } else if (typeof picture === 'string') {
        // picture is a plain string
        path = picture
      }

      return path
    },

    prepareMetaDescription(description) {
      return (
        description &&
        description
          .replace(/(<([^>]+)>)/gi, '')
          .substring(0, 160)
          .concat('...')
      )
    }
  }
}
