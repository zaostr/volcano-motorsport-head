<template>
  <div class="icon">
    <div class="outer">
      <div class="inner" />
    </div>
  </div>
</template>

<script>
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'IconPoint'
}
</script>

<style scoped lang="scss">
.outer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #fd7222 0%,
    rgba(253, 114, 34, 0) 100%
  );
}

.inner {
  height: 17px;
  width: 17px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #fd7222 75%,
    rgba(253, 114, 34, 0) 100%
  );
}
</style>
