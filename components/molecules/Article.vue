<template>
  <div class="article-container">
    <DarwinText :text="data.annotation" size="augmented" />

    <div class="footer">
      <DarwinText
        :text="data.source"
        family="oswald"
        size="tiny"
        class="source"
      />

      <Link :text="$t('article.readMore')" :href="data.link" size="tiny" />
    </div>
  </div>
</template>

<script>
import DarwinText from '@/components/atoms/Text'
import Link from '@/components/atoms/Link'
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Article',
  components: { Link, DarwinText },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

.article-container {
  border-bottom: 1px solid $white015;
  padding-bottom: 24px;
}

.footer {
  margin-top: 8px;
  display: flex;
  align-items: baseline;

  > * + * {
    margin-left: 12px;
  }
}

.source {
  text-transform: uppercase;
}
</style>
