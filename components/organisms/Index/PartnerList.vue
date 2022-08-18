<template>
  <section class="grid-container">
    <div v-for="partner in partnerList" :key="partner.id" class="partner-card">
      <Picture
        :picture="getPartnerPicture(partner)"
        :lqip="partner.image ? partner.image.lqip : null"
        :title="partner.name"
      />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

/** components **/
import Picture from '@/components/atoms/Picture'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'PartnerList',

  components: { Picture },

  computed: {
    partnerList() {
      return this.companyData && this.companyData.partners
    },

    ...mapState(['companyData'])
  },

  methods: {
    getPartnerPicture(partnerData) {
      if (['string', 'undefined'].includes(typeof partnerData.image)) {
        // flat picture fallback
        return partnerData.image
      } else if (typeof partnerData.image === 'object') {
        const picture = []
        const separator = partnerData.image?.url?.includes('?') ? '&' : '?'
        picture.push({
          min_width: 320,
          srcset: [
            { density: '1x', src: partnerData.image.url + separator + 'w=170' },
            { density: '2x', src: partnerData.image.url + separator + 'w=340' }
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
@import './assets/styles/variables';

.grid-container {
  margin-top: 40px;
}

.partner-card {
  border: 1px solid $white015;
  padding: 0 30%;
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.picture-container {
  padding: 25% 0;
  max-height: 100%;
}

@media (max-width: $sm-breakpoint) {
  .grid-container {
    margin-bottom: -18px;
  }

  .partner-card {
    margin-bottom: 18px;
  }
}

@media (min-width: $sm-breakpoint) {
  .grid-container {
    margin-bottom: -18px;
  }

  .partner-card {
    grid-column: span 6;
    margin-bottom: 18px;
  }
}

@media (min-width: $md-breakpoint) {
  .grid-container {
    margin-bottom: -24px;
  }

  .partner-card {
    margin-bottom: 24px;
  }
}

@media (min-width: $lg-breakpoint) {
  .partner-card {
    grid-column: span 4;
  }
}
</style>
