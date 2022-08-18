<template>
  <main class="grid-container page-container">
    <Heading
      id="main-heading"
      :text="$t('cars.heading')"
      :size="headingSize"
      seo="h1"
    />

    <div class="banners-container">
      <transition name="opacity">
        <div v-if="isActiveCarForSale" class="price-tag-container __desktop">
          <div class="price-tag-wrap">
            <DarwinText :text="$t('cars.priceTagText')" />
            <Heading
              :text="prepareCarPriceString(activeBanner.car.price)"
              family="oswald"
              size="h4"
            />

            <ControlButton
              :text="$t('cars.priceTagButtonText')"
              @click="scrollToByCarBlock"
            />
          </div>

          <div class="bottom-decoration-container">
            <PriceTagBottomBorderEl v-for="i in tagBottomElCount" :key="i" />
          </div>
        </div>
      </transition>

      <!--Swiper placeholder-->
      <Picture
        v-if="!isMounted"
        :picture="getBannerImage(carBannersList[0].image)"
        :lqip="carBannersList[0].image && carBannersList[0].image.lqip"
        :loaded-initially="true"
        :aspect-ratio="aspectRatio"
        class="swiper-slide"
      />
      <SlideSwiper
        v-else
        ref="slide-swiper"
        :slide-index="activeBannerIndex"
        :options="{ loop: true }"
        @change-slide="changeSlideHandler"
      >
        <Picture
          v-for="banner in carBannersList"
          :key="banner.id"
          :picture="getBannerImage(banner.image)"
          :lqip="banner.image && banner.image.lqip"
          :loaded-initially="true"
          :aspect-ratio="aspectRatio"
          class="swiper-slide"
        />
      </SlideSwiper>
    </div>

    <Heading
      :text="activeBanner.car.signature"
      :size="signatureSize"
      class="car-signature"
    />

    <transition name="opacity">
      <div v-if="isActiveCarForSale" class="price-tag-container __mobile">
        <div class="price-tag-wrap">
          <div class="price-tag">
            <DarwinText
              v-if="!['xs', 'sm'].includes(deviceWidth)"
              :text="$t('cars.priceTagText')"
            />
            <Heading v-else :text="$t('cars.priceTagText')" size="h5" />

            <Heading
              :text="prepareCarPriceString(activeBanner.car.price)"
              :family="['xs', 'sm'].includes(deviceWidth) ? 'averta' : 'oswald'"
              :size="['xs', 'sm'].includes(deviceWidth) ? 'h5' : 'h4'"
              :weight="['xs', 'sm'].includes(deviceWidth) ? 'bold' : 'regular'"
            />
          </div>

          <div class="right-decoration-container">
            <PriceTagBottomBorderEl v-for="i in tagRightElCount" :key="i" />
          </div>
        </div>
      </div>
    </transition>

    <ControlButton
      v-if="isActiveCarForSale"
      :text="$t('cars.priceTagButtonText')"
      class="buy-car-button __mobile"
      @click="scrollToByCarBlock"
    />

    <div class="banner-details-container">
      <DarwinText :text="activeBanner.text" size="augmented" />

      <transition name="opacity">
        <div v-if="activeBanner.quote.text" class="banner-quote-wrap __mobile">
          <IconQuote />

          <DarwinText :text="activeBanner.quote.text" />
          <DarwinText
            :text="activeBanner.quote.author"
            family="oswald"
            size="tiny"
            class="author"
          />
        </div>
      </transition>

      <div
        v-if="isActiveCarForSale"
        id="bay-car-block"
        class="cars-for-sale-block"
      >
        <IconSale />

        <div class="sale-email-container">
          <Heading :text="$t('cars.carForSaleText')" size="h5" />

          <LinkCopy
            :text="companyData.email_sale"
            :href="`mailto:${companyData.email_sale}`"
          />
        </div>
      </div>

      <transition name="opacity">
        <div v-if="activeBanner.specification" class="specification-container">
          <Heading :text="$t('cars.specification')" family="oswald" size="h4" />

          <div class="specification-table">
            <div
              v-for="specRow in activeBanner.specification"
              :key="specRow.name"
              class="specification-row"
            >
              <div class="specification-col">
                <DarwinText :text="specRow.name" weight="bold" />
              </div>

              <div class="specification-col">
                <RichText :block-list="specRow.value" />
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="opacity">
        <Link
          v-if="activeBanner && activeBanner.fullSpecificationLink"
          :text="$t('cars.fullSpecification')"
          :href="activeBanner.fullSpecificationLink"
          :show-external-icon="true"
          type="secondary"
          class="full-specification-link"
        />
      </transition>
    </div>

    <div class="banner-quote-container">
      <transition name="opacity">
        <div v-if="activeBanner.quote.text" class="banner-quote-wrap __desktop">
          <IconQuote />

          <DarwinText :text="activeBanner.quote.text" />
          <DarwinText
            :text="activeBanner.quote.author"
            family="oswald"
            size="tiny"
            class="author"
          />
        </div>
      </transition>

      <div class="buttons-container">
        <ControlButton
          :text="$t('cars.previous')"
          type="secondary"
          @click="prevCarHandler"
        />
        <ControlButton
          :text="$t('cars.next')"
          type="secondary"
          @click="nextCarHandler"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import VueScrollTo from 'vue-scrollto'

/** utils **/
import numberWithSpaces from '@/utils/numberWithSpaces'

/** mixins **/
import head from '@/mixins/head'

/** components **/
import SlideSwiper from '@/components/molecules/SlideSwiper'
import LinkCopy from '@/components/molecules/LinkCopy'
import Heading from '@/components/atoms/Heading'
import Picture from '@/components/atoms/Picture'
import ControlButton from '@/components/atoms/ControlButton'
import DarwinText from '@/components/atoms/Text'
import IconQuote from '@/components/icons/Quote'
import IconSale from '@/components/icons/Sale'
import RichText from '@/components/organisms/RichText'
import Link from '@/components/atoms/Link'
import PriceTagBottomBorderEl from '@/components/decorations/PriceTagBottomBorderEl'

export default {
  name: 'CarsPage',

  components: {
    PriceTagBottomBorderEl,
    Link,
    RichText,
    LinkCopy,
    IconSale,
    IconQuote,
    DarwinText,
    ControlButton,
    Picture,
    SlideSwiper,
    Heading
  },

  mixins: [head],

  async asyncData({ store, error }) {
    try {
      await store.dispatch('fetchCarsPageData')
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  data() {
    return {
      isMounted: false,
      activeBannerIndex: 0,
      tagBottomElCount: 20,
      tagRightElCount: 8
      // contactsPageRouteName: routeNamesList.contacts
    }
  },

  computed: {
    activeBanner() {
      return this.carBannersList[this.activeBannerIndex]
    },

    activeCarId() {
      return this.activeBanner?.car?.id
    },

    isActiveCarForSale() {
      return this.activeBanner?.car?.isForSale
    },

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h3' : 'h2'
    },

    signatureSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h4' : 'h3'
    },

    aspectRatio() {
      if (this.deviceWidth === 'xs') {
        return '2:3'
      } else {
        return '9:16'
      }
    },

    metaData() {
      return {
        title: this.$t('pages.cars'),
        description: this.$t('pageDescriptions.cars'),
        image: this.settings?.meta_image?.url
      }
    },

    ...mapState(['deviceWidth', 'carBannersList', 'companyData', 'settings'])
  },

  mounted() {
    this.isMounted = true
  },

  methods: {
    getBannerImage(image) {
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
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: image.url + separator + 'w=960'
              },
              {
                density: '2x',
                src: image.url + separator + 'w=1920'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: image.url + separator + 'w=1140'
              },
              {
                density: '2x',
                src: image.url + separator + 'w=2280'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: image.url + separator + 'w=1320'
              },
              {
                density: '2x',
                src: image.url + separator + 'w=2640'
              }
            ]
          }
        )

        return picture
      }

      return null
    },

    scrollToByCarBlock() {
      VueScrollTo.scrollTo('#bay-car-block', { offset: -110 }) // for desktop
    },

    changeSlideHandler(index) {
      this.activeBannerIndex = index
    },

    prepareCarPriceString(price) {
      return `${this.$t('cars.priceTagFor')} $${numberWithSpaces(
        this.activeBanner.car.price
      )}`
    },

    prevCarHandler() {
      /* let prevCarBannerReverseIndex = [...this.carBannersList]
        .reverse()
        .findIndex(
          (banner, index) =>
            banner?.car?.id !== this.activeCarId &&
            index < this.activeBannerIndex
        )

      if (prevCarBannerReverseIndex === -1) {
        prevCarBannerReverseIndex = this.carBannersList.length - 1
      }

      // but we need first banner of this car
      const prevCarId = this.carBannersList[prevCarBannerReverseIndex]?.car?.id

      this.activeBannerIndex = this.carBannersList.findIndex(
        (banner) => banner?.car?.id === prevCarId
      ) */

      /* this.activeBannerIndex =
        this.activeBannerIndex - 1 >= 0
          ? this.activeBannerIndex - 1
          : this.carBannersList.length - 1 */

      this.$refs['slide-swiper'].slidePrev()

      this.scrollToSwiper()
    },

    nextCarHandler() {
      /* const nextCarBannerIndex = this.carBannersList.findIndex(
        (banner, index) =>
          banner?.car?.id !== this.activeCarId && index > this.activeBannerIndex
      )

      if (nextCarBannerIndex === -1) {
        this.activeBannerIndex = 0
      } else {
        this.activeBannerIndex = nextCarBannerIndex
      } */

      /* this.activeBannerIndex =
        this.activeBannerIndex + 1 <= this.carBannersList.length - 1
          ? this.activeBannerIndex + 1
          : 0 */

      this.$refs['slide-swiper'].slideNext()
      this.scrollToSwiper()
    },

    scrollToSwiper() {
      VueScrollTo.scrollTo('#main-heading' /* { offset: -110 } */) // for desktop
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.banners-container {
  position: relative;
}

.banner-quote-wrap {
  position: relative;
  padding-left: 30px;
  margin-bottom: 32px;

  .icon {
    position: absolute;
    top: 4px;
    left: 0;
    color: $orange-500;
  }

  .author {
    margin-top: 8px;
    text-transform: uppercase;
  }
}

.specification-row {
  display: grid;
  border: 1px solid $white015;

  & + & {
    margin-top: 8px;
  }
}

.specification-col:nth-child(1) {
  padding: 12px 4px;
  background: $gray-050;
  color: $gray-880;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.specification-col:nth-child(2) {
  padding: 12px 24px 12px 0;
}

.full-specification-link {
  margin-top: 24px;
}

.buttons-container {
  display: flex;

  > * + * {
    margin-left: 24px;
  }
}

@media (max-width: $sm-breakpoint) {
  .cars-for-sale-block {
    margin-top: 32px;

    > * + * {
      margin-top: 24px;
    }

    .link-copy {
      margin-top: 12px;
    }
  }

  .specification-row {
    grid-template-columns: repeat(6, 1fr);
  }

  .specification-col:nth-child(1) {
    grid-column: 1/3;
    word-break: break-word;
  }

  .specification-col:nth-child(2) {
    grid-column: 3/7;
  }
}

@media (min-width: $sm-breakpoint) {
  .cars-for-sale-block {
    margin-top: 32px;
    display: flex;

    > * + * {
      margin-left: 24px;
    }

    .link-copy {
      margin-top: 12px;
    }
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .specification-row {
    grid-template-columns: repeat(12, 1fr);
  }

  .specification-col:nth-child(1) {
    grid-column: 1/4;
    word-break: break-word;
  }

  .specification-col:nth-child(2) {
    grid-column: 4/13;
  }
}

@media (max-width: $md-breakpoint) {
  .__desktop {
    display: none !important;
  }

  .banners-container {
    margin-top: 32px;
  }

  .price-tag-container {
    overflow-y: hidden;
    margin-top: 24px;
  }

  .price-tag-wrap {
    position: relative;
    width: fit-content;
    background: $gray-050;
    color: $gray-880;
    padding: 12px 16px;
    display: flex;
    align-items: center;

    .right-decoration-container {
      position: absolute;
      right: -8px;
      color: $gray-050;
      display: flex;
      flex-direction: column;
      // align-items: center;

      > * {
        transform: rotate(-90deg);

        margin: 4px 0;
      }
    }
  }

  .buy-car-button {
    margin-top: 4px;
  }

  .car-signature {
    margin-top: 44px;
  }

  .banner-details-container {
    margin-top: 24px;
  }

  .banner-quote-wrap {
    margin-top: 32px;
  }

  .cars-for-sale-block {
    margin-top: 56px;
  }

  .specification-container {
    margin-top: 80px;
  }

  .specification-table {
    margin-top: 24px;
  }

  .specification-row {
    grid-column-gap: 18px;
  }

  .buttons-container {
    margin-top: 56px;
  }
}

@media (min-width: $md-breakpoint) {
  .__mobile {
    display: none !important;
  }

  .banners-container,
  .car-signature {
    margin-top: 56px;
  }

  .banner-details-container {
    grid-column: 1/8;
    margin-top: 24px;
  }

  .price-tag-container {
    position: absolute;
    right: 32px;
    width: min-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    padding-bottom: 4px;
    z-index: 10;

    .control-group {
      margin-top: 16px;
    }

    .bottom-decoration-container {
      position: absolute;
      bottom: 0;
      color: $gray-050;
      display: flex;
      justify-content: center;
    }
  }

  .price-tag-wrap {
    position: relative;
    background: $gray-050;
    color: $gray-880;
    padding: 12px 16px 16px;
  }

  .buttons-container {
    justify-content: flex-end;
  }

  .specification-row {
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: 24px;
  }

  .banner-quote-container {
    grid-column: 9/13;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
  }

  .buttons-container {
    margin-top: auto;
  }

  .specification-container {
    margin-top: 96px;
  }

  .specification-table {
    margin-top: 24px;
  }

  .specification-col:nth-child(1) {
    grid-column: 1/4;
    word-break: break-word;
  }

  .specification-col:nth-child(2) {
    grid-column: 4/8;
  }
}

@media (min-width: $lg-breakpoint) {
  .specification-col:nth-child(1) {
    grid-column: 1/3;
    word-break: break-word;
  }

  .specification-col:nth-child(2) {
    grid-column: 3/8;
  }
}
</style>
