<template>
  <div
    v-swiper:mySwiper="swiperOptions"
    :class="{ '__zoom-in': zoomIn }"
    class="swiper-container"
  >
    <div
      :class="{ '__vertical-centered': verticalCentered }"
      class="swiper-wrapper"
    >
      <!-- @slot has to contain numerous items with "swiper-slide" class. -->
      <slot />
    </div>

    <div v-if="!zoomIn" class="swiper-pagination"></div>

    <div class="swiper-navigation">
      <div slot="button-prev" class="swiper-button-prev"><IconChevron /></div>
      <div slot="button-next" class="swiper-button-next"><IconChevron /></div>
    </div>
  </div>
</template>

<script>
import IconChevron from '@/components/icons/Chevron'
// import NextAltIcon from '@/components/icons/Chevron'

// import 'swiper/dist/css/swiper.css'
/**
 * This is a reusable swiper component. Mostly used to show some images but can be used with any content as a slot.
 * Each slide have to contain "swiper-slide" class.
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'SlideSwiper',

  components: {
    IconChevron
  },

  props: {
    /**
     * Custom options of the swiper. See https://swiperjs.com/api/ for details.
     */
    options: {
      type: Object,
      default: () => {}
    },

    zoomIn: {
      type: Boolean,
      default: false
    },

    slideIndex: {
      type: Number,
      default: 0
    },

    verticalCentered: {
      type: Boolean,
      default: false
    }

    /* changeSlideHandler: {
      type: Function,
      default: () => {}
    } */
  },

  data() {
    return {
      swiperOptions: {},
      defaultOptions: {
        slidesPerView: 1, // 'auto',
        spaceBetween: 1,
        speed: 300,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
        // breakpoints: {}
        /* on: {
          activeIndexChange(event) {
            console.log('activeIndexChange', this.activeIndex, event)
          }
        } */
      }
    }
  },

  watch: {
    slideIndex() {
      // move to specific slide
      this.$nextTick(async () => {
        // need this on /cars page due to some strange render issue on banner update
        await this.mySwiper.update()

        /* if (this.mySwiper.realIndex !== value) {
          this.changeSlide(value)
        } */
      })
    }
  },

  beforeMount() {
    /**
     * merge props options with default ones
     */
    Object.assign(this.swiperOptions, this.defaultOptions, this.options)
  },

  mounted() {
    if (this.slideIndex) {
      // move to specific slide for gallery
      this.changeSlide(this.slideIndex, 300)
    }

    // notify about slide change
    this.mySwiper.on('slideChange', () => {
      this.$emit('change-slide', this.mySwiper.realIndex)
    })
  },

  methods: {
    async changeSlide(index) {
      await this.mySwiper.slideTo(index, 300, 'ease-out')
      await this.$nextTick(() => {
        this.mySwiper.update()
      })
    },

    async slidePrev() {
      await this.mySwiper.slidePrev(300, 'ease-out')
      await this.$nextTick(() => {
        this.mySwiper.update()
      })
    },

    async slideNext() {
      await this.mySwiper.slideNext(300, 'ease-out')
      await this.$nextTick(() => {
        this.mySwiper.update()
      })
    }
  }
}
</script>

<style lang="scss">
/* WARNING: be aware of class names, they are not scoped */
@import './assets/styles/variables';

// NB: mobile first
.swiper-container {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  list-style: none;
  z-index: 1;

  &:not(.__zoom-in) {
    padding: 0 0 calc(24px + 8px);
    position: relative;
  }
}

.swiper-wrapper {
  position: relative;
  height: 100%;
  max-height: 100%;
  z-index: 1;
  display: flex;
  /* display: inline-flex;
  width: auto; //Edge fix
  width: fit-content; */
  box-sizing: content-box;
  transition-property: transform, -webkit-transform;

  &.__vertical-centered {
    margin-top: auto;
    margin-bottom: auto;
  }
}

.__zoom-in {
  .swiper-wrapper {
    max-height: calc(80vh);
  }
}

.swiper-navigation {
  display: none;
}

.swiper-pagination {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  border: 1px solid $white;
  display: block;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: all 200ms ease;
}

.swiper-pagination-bullet-active {
  background: $white;
}

.swiper-pagination-bullet + .swiper-pagination-bullet {
  margin-left: 12px;
}

@media (min-width: $md-breakpoint) {
  .swiper-navigation {
    position: absolute;
    top: calc(50% - 28px - 16px); // height is 56px and padding-bottom is 32px
    left: 0;
    z-index: 10;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .__zoom-in {
    .swiper-navigation {
      top: calc(50% - 28px); // height is 56px
      padding: 0 32px;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: $white;
    height: 56px;
    width: 40px;

    .icon {
      height: 32px;
      width: 32px;
      color: $gray-900;
    }
  }

  .swiper-button-prev {
    .icon {
      margin-right: 2px;
      transform: rotate(-90deg);
    }
  }

  .swiper-button-next {
    .icon {
      margin-left: 2px;
      transform: rotate(90deg);
    }
  }
}
</style>
