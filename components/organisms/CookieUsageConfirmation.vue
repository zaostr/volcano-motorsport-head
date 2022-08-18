<template>
  <div class="cookie-usage-confirmation-wrap">
    <div
      v-show="!cookieUsageConfirmed"
      :class="{ __shown: isShown }"
      class="cookie-usage-confirmation"
    >
      <DarwinText :text="$t('cookieUsageConfirmation.text')" />

      <ControlButton
        :prevent-default="true"
        type="secondary"
        size="small"
        @click="acceptCookieUsageHandler"
      >
        <DarwinText
          :text="$t('cookieUsageConfirmation.buttonText')"
          size="small"
        />
      </ControlButton>
    </div>
  </div>
</template>

<script>
import getCookie from '@/utils/getCookie'
import setCookie from '@/utils/setCookie'

import DarwinText from '@/components/atoms/Text'
import ControlButton from '@/components/atoms/ControlButton'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'CookieUsageConfirmation',

  components: { ControlButton, DarwinText },

  data() {
    return {
      isShown: false,
      cookieUsageConfirmed:
        getCookie('cookieUsageConfirmed') &&
        getCookie('cookieUsageConfirmed') === 'true',
      timeout: 3
    }
  },

  mounted() {
    if (!this.cookieUsageConfirmed) {
      setTimeout(() => {
        this.isShown = true
      }, this.timeout * 1000)
    }
  },

  methods: {
    acceptCookieUsageHandler() {
      this.isShown = false

      setTimeout(() => {
        setCookie('cookieUsageConfirmed', true, { expires: 60 * 60 * 24 * 30 })
        this.cookieUsageConfirmed = true
      }, 150)
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.cookie-usage-confirmation-wrap {
  position: fixed;
  width: 100%;
  bottom: 0;
  background: $gray-700;
  display: flex;
  justify-content: center;
  overflow: hidden;
  z-index: 1001;
}

.cookie-usage-confirmation {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 150ms ease;
  transform: translateY(100%);

  &.__shown {
    transform: translateY(0);
  }

  > * + * {
    margin-left: 24px;
  }
}

@media (max-width: $md-breakpoint) {
  .cookie-usage-confirmation {
    // transform: translateY(108px);
    flex-direction: column;

    > .text {
      // max-width: 162px;
      text-align: center;
      margin: 12px 12px 0;
    }

    > .control-group {
      margin: 16px 12px 12px;
    }
  }
}

@media (max-width: $md-breakpoint) {
  .cookie-usage-confirmation {
    width: 100%;
  }

  .text {
    display: inline;
    // flex-direction: column;
    // margin: 14px 18px;
  }

  .control-group {
    // margin: 14px 18px 14px auto;
  }
}

@media (min-width: $md-breakpoint) {
  .cookie-usage-confirmation {
    // transform: translateY(calc(48px + 16px));
    height: 48px;
  }
}
</style>
