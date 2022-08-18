<template>
  <div class="date small-text" v-text="formattedDate" />
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import 'moment/locale/es.js'

/**
 * This is a reusable date component. Accepts String, Timestamp or UTC date
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Date',
  props: {
    /**
     * Accepts String, Timestamp or UTC date
     */
    date: {
      type: [String, Number],
      default: Date.now()
    },
    /**
     * Output format
     */
    format: {
      type: String,
      default: 'D MMMM YYYY' // Use 'MMM' for short month and 'DD' for day with leadin zero
    },
    /**
     * If is true output will be in seconds, minutes, hours ... from now
     */
    fromNow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedDate() {
      moment.locale(this.locale)

      if (this.fromNow) {
        return moment(this.date).fromNow()
      }

      // TODO: convert timestamp to ICO or RFC2822
      if (moment(this.date).isValid()) {
        return moment(this.date).format(this.format)
      } else if (
        (this.date + '').length === 10 &&
        moment(parseInt(this.date + '000')).isValid()
      ) {
        return moment(parseInt(this.date + '000')).format(this.format)
      }
      return this.date
    },
    ...mapState(['locale'])
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

// NB: mobile first
.date {
  color: $twilight-gray;
}
</style>
