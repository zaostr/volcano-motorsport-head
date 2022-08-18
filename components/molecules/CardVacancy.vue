<template>
  <div class="card-vacancy">
    <div class="card-heading" @click="isExpanded = !isExpanded">
      <div class="vacancy-picture-container __desktop">
        <Picture
          :picture="picture"
          :lqip="data.image ? data.image.lqip : null"
          aspect-ratio="1:1"
        />

        <div class="separator" />
      </div>

      <div class="short-description-container">
        <Heading
          :text="data.name"
          :size="isExpanded ? 'h4' : 'h5'"
          :weight="isExpanded ? 'bold' : 'regular'"
          seo="h5"
          class="vacancy-name"
        />

        <transition name="email-expire">
          <div v-if="!isExpanded" class="email-expire-wrap">
            <div class="link-wrap">
              <Link
                :text="emailJob"
                :href="`mailto:${emailJob}`"
                target="_blank"
                size="tiny"
              />
            </div>

            <template v-if="hasExpireDate">
              <div class="separator" />

              <IconCalendar />
              <DarwinText :text="expireOnString" size="tiny" />
            </template>
          </div>
        </transition>
      </div>

      <div class="details-btn __desktop">
        <DarwinText
          :text="$t('cardVacancy.details')"
          family="oswald"
          size="micro"
        />
        <IconChevron :class="{ __down: !isExpanded }" />
      </div>

      <DarwinText
        :text="$t('cardVacancy.details')"
        size="tiny"
        class="more __mobile"
      />
    </div>

    <div
      ref="card-body"
      :style="{ height: isExpanded ? bodyHeight : 0 }"
      :class="{ __expanded: isExpanded }"
      class="card-body"
    >
      <RichText :block-list="data.blocksList" />

      <div class="card-body-footer">
        <Heading :text="$t('cardVacancy.toJoinTeam')" size="h5" />
        <LinkCopy :text="emailJob" :href="`mailto:${emailJob}`" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

/** components **/
import IconChevron from '@/components/icons/Chevron'
import Picture from '@/components/atoms/Picture'
import Heading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'
import Link from '@/components/atoms/Link'
import IconCalendar from '@/components/icons/Calendar'
import RichText from '@/components/organisms/RichText'
import LinkCopy from '@/components/molecules/LinkCopy'
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'CardVacancy',

  components: {
    LinkCopy,
    RichText,
    IconCalendar,
    Link,
    DarwinText,
    IconChevron,
    Heading,
    Picture
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    },

    emailJob: {
      type: String,
      default: ''
    },

    isExpandedByDefault: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isExpanded: true,
      bodyHeight: 'auto'
    }
  },

  computed: {
    picture() {
      if (!this.data.image) {
        return null
      }

      if (['string', 'undefined'].includes(typeof this.data.image)) {
        // flat picture fallback
        return this.data.image
      } else if (typeof this.data.image === 'object') {
        const picture = []
        const separator = this.data?.image?.url?.includes('?') ? '&' : '?'
        picture.push({
          min_width: 320,
          srcset: [
            { density: '1x', src: this.data.image.url + separator + 'h=108' },
            { density: '2x', src: this.data.image.url + separator + 'h=216' }
          ]
        })

        return picture
      }

      return null
    },

    hasExpireDate() {
      return !!this.data.expireOn
    },

    formattedExpireOn() {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }
      return dayjs(this.data.expireOn).format('DD MMM YYYY')
    },

    expireOnString() {
      return this.$t('cardVacancy.expireDate') + ': ' + this.formattedExpireOn
    },

    ...mapState(['locale', 'deviceWidth'])
  },

  watch: {
    deviceWidth() {
      this.recalculateBodyHeight()
    }
  },

  async created() {
    if (this.locale === 'es') {
      await require('dayjs/locale/es')
      dayjs.locale('es')
    }
  },

  mounted() {
    this.recalculateBodyHeight()
  },

  methods: {
    recalculateBodyHeight() {
      this.isExpanded = true
      this.bodyHeight = 'auto'

      this.$nextTick(() => {
        const bodyHeight = this.$refs['card-body'].clientHeight
        this.bodyHeight = bodyHeight + 'px'

        this.$nextTick(() => {
          this.isExpanded = this.isExpandedByDefault
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';
@import './assets/styles/shadows';

.card-vacancy {
  @include shadow;

  background: $gray-880;
}

.card-heading {
  cursor: pointer;
  position: relative;

  &:hover {
    .details-btn {
      background: $orange-550;
    }

    .more {
      color: $orange-500;

      &:after {
        transform-origin: left;
        transform: scaleX(1);
      }
    }
  }
}

.details-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: $orange-500;
  transition: all 150ms linear;

  .text {
    text-transform: uppercase;
  }

  .icon {
    margin-top: 8px;
    transition: all 300ms ease-out;

    &.__down {
      transform: rotate(180deg);
    }
  }
}

.card-body {
  overflow: hidden;
  transition: all 300ms ease-out;

  &.__expanded {
    padding: 24px 0;
    border-top: 1px solid $white015;
  }
}

.email-expire-wrap {
  display: flex;
  align-items: center;
  margin-top: 12px;

  .separator {
    height: 20px;
    width: 1px;
    background: $white015;
    margin: 0 12px;
  }

  .icon {
    margin-right: 8px;
  }
}

.card-body-footer {
  margin-top: 48px;

  .link-copy {
    margin-top: 12px;
  }
}

.email-expire-enter,
.opacity-leave-to {
  opacity: 0;
  transform: translateY(20px);
  // margin-top: -12px;
}

.email-expire-enter-to,
.email-expire-leave {
  opacity: 1;
  transform: translateY(0);
  // margin-top: 0;
}

.email-expire-enter-active,
.email-expire-leave-active {
  transition: all 150ms linear;
}

@media (max-width: $sm-breakpoint) {
  .email-expire-wrap {
    flex-wrap: wrap;

    .separator {
      display: none;
    }

    .link-wrap {
      width: 100%;

      .link {
        width: fit-content;
      }
    }

    .icon,
    .text {
      margin-top: 12px; // yes, i'm really in rush
    }
  }
}

@media (max-width: $md-breakpoint) {
  .__desktop {
    display: none !important;
  }

  .card-heading {
    padding: 28px 24px 60px; // to position .more link absolutely
  }

  .more {
    // margin-top: 16px;
    // position: relative;
    position: absolute;
    bottom: 24px;
    padding-bottom: 2px;
    border-bottom: 2px solid $white;
    width: fit-content;
    transition: all 150ms linear;

    &:after {
      position: absolute;
      content: '';
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: $orange-500;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 300ms ease-out;
    }
  }

  .rich-text,
  .card-body-footer {
    padding: 0 24px;
  }
}

@media (min-width: $md-breakpoint) {
  .__mobile {
    display: none !important;
  }

  .card-heading,
  .card-body {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 24px;
  }

  .vacancy-picture-container {
    grid-column: 1/4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 108px;

    .picture-container {
      height: 108px;
      width: 108px;
      min-height: 108px;
      min-width: 108px;
    }

    .separator {
      width: 1px;
      height: 60px;
      // margin-right: 16px;
      background: $white015;
    }
  }

  .short-description-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column: 4/11;
  }

  .details-btn {
    grid-column: 11/13;
  }

  .rich-text,
  .card-body-footer {
    grid-column: 4/11;
  }
}

@media (min-width: $lg-breakpoint) {
  .vacancy-picture-container {
    grid-column: 1/3;
  }

  .short-description-container {
    grid-column: 3/12;
  }

  .details-btn {
    grid-column: 12/13;
  }

  .rich-text,
  .card-body-footer {
    grid-column: 3/10;
  }
}
</style>
