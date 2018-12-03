<template lang="html">
  <div v-if="visible" class="vue-context-menu" :style="menuStyle" @click="close" @contextmenu.prevent>
    <slot :context-data="context"></slot>
  </div>
</template>

<script>
export default {
  name: 'VueContextMenu',
  data() {
    return {
      visible: false,
      eX: null,
      eY: null,
      context: {}
    }
  },
  computed: {
    menuStyle() {
      return {
        position: 'fixed',
        zIndex: this.visible ? 9999 : 0,
        display: this.visible ? 'block' : 'none',
        left: `${this.eX || 0}px`,
        top: `${this.eY || 0}px`
      }
    }
  },
  methods: {
    open(e, ...data) {
      e.preventDefault()
      if (this.visible) {
        this.close()
      }

      this.eX = e.x
      this.eY = e.y
      this.context = data.length === 1 ?
        data[0] :
        data

      this.visible = true
      this.$nextTick(() => {
        let top = e.y
        let left = e.x

        const largestHeight = window.innerHeight - this.$el.offsetHeight - 25;
        const largestWidth = window.innerWidth - this.$el.offsetWidth - 25;

        if (top > largestHeight) {
          top = largestHeight;
        }

        if (left > largestWidth) {
          left = largestWidth;
        }

        this.eY = top;
        this.eX = left

        this.addEventListeners()
      })
    },
    close() {
      this.removeEventListeners()
      this.visible = false
      this.eX = null
      this.eY = null
      this.context = {}
    },

    onOutsideClick(e) {
      let targetEl = e.target
      do {
        if (targetEl == this.$el) return
        targetEl = targetEl.parentNode;
      } while (targetEl);
      this.close()
    },
    onOutsideRightclick (e) {
      let targetEl = e.target
      do {
        if (targetEl === this.$el) return
        targetEl = targetEl.parentNode;
      } while (targetEl);
      this.close()
    },

    addEventListeners() {
      window.document.addEventListener('click', this.onOutsideClick)
      window.document.addEventListener('contextmenu', this.onOutsideRightclick)
    },
    removeEventListeners() {
      window.document.removeEventListener('click', this.onOutsideClick)
      window.document.removeEventListener('contextmenu', this.onOutsideRightclick)
    }
  },
  beforeDestroy () {
    this.removeEventListeners()
  }
}
</script>

<style lang="scss">
.vue-context-menu {
  border: thin solid #d0d0d0;
  background-color: #fafafa;
  border: 1px solid #bdbdbd;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  min-width: 150px;
}
</style>
