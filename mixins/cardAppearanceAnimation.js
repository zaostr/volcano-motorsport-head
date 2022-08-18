// import Velocity from 'velocity-animate'

export default {
  data() {
    return {
      duration: 150,
      delay: 50,
      perPage: 12
    }
  },

  methods: {
    beforeEnter(el) {
      if (process.browser) {
        el.style.transform = 'translateY(32px)'
        el.style.opacity = 0
      }
    },

    enter(el, done) {
      if (process.browser) {
        const Velocity = require('velocity-animate')

        const elDelay = (el.dataset.index % this.perPage) * this.delay

        setTimeout(() => {
          Velocity(
            el,
            { transform: 'translateY(0px)', opacity: 1 },
            { duration: this.duration, easing: 'ease-out', complete: done }
          )
        }, elDelay)
      }
    }

    /* leave(el, done) {
      const elDelay = el.dataset.index * this.delay
      setTimeout(function () {
        this.$velocity(el, { opacity: 0, height: 0 }, { complete: done })
      }, elDelay)
    }, */
  }
}
