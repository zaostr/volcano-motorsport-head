<template>
  <div class="date-badge">
    <IconCalendar />
    <DarwinText :text="formattedDate" size="tiny" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

/** components **/
import IconCalendar from '@/components/icons/Calendar'
import DarwinText from '@/components/atoms/Text'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'DateBadge',

  components: { DarwinText, IconCalendar },

  props: {
    date: {
      type: String,
      default: ''
    }
  },

  computed: {
    formattedDate() {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }
      return dayjs(this.date).format('DD MMM YYYY')
    },

    ...mapState(['locale'])
  },

  async created() {
    if (this.locale === 'es') {
      await require('dayjs/locale/es')
      dayjs.locale('es')
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.date-badge {
  display: flex;
  align-items: center;
  min-width: fit-content;

  .text {
    margin-left: 8px;
  }
}
</style>
