<template>
  <error-page />
</template>

<script>
import errorPage from '@/layouts/error'

/**
 * Used for netlify fallback
 */
export default {
  name: 'ErrorPage',

  layout: 'error_layout',

  components: {
    errorPage
  }
}
</script>
