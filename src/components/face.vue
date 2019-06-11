<template>
  <div
    class="face"
    :class="extClass"
    :style="styleObj"
  ></div>
</template>

<script>
import { Face } from '@/utils/global'

export default {
  name: 'face',
  data () {
    return {
      styleObj: {
        width: Face.SIZE + 'px',
        height: Face.SIZE + 'px',
        position: 'absolute',
        left: '0px',
        top: '0px',
        boxSizing: 'border-box',
        backgroundColor: this.color
      },
      extClass: 'face' + this.type
    }
  },
  props: {
    type: Number,
    cube: Object,
    color: {
      default: null,
      type: String
    }
  },
  created () {
    this.init()
  },
  updated () {
    this.init()
  },
  watch: {
    type: {
      immediate: true,
      handler () {
        this.init()
      }
    },
    color: {
      immediate: true,
      handler () {
        this.init()
      }
    }
  },
  methods: {
    init () {
      console.log(this.type, this.cube)
      switch (this.type) {
        case Face.LEFT:
          this.$set(this.styleObj, 'transformOrigin', '100% 50%')
          this.$set(this.styleObj, 'transform', 'translate3d(-' + Face.SIZE + 'px, 0px, 0px) rotateY(-90deg)')
          break
        case Face.RIGHT:
          this.$set(this.styleObj, 'transformOrigin', '0% 50%')
          this.$set(this.styleObj, 'transform', 'translate3d(' + Face.SIZE + 'px, 0px, 0px) rotateY(90deg)')
          break
        case Face.TOP:
          this.$set(this.styleObj, 'transformOrigin', '50% 100%')
          this.$set(this.styleObj, 'transform', 'translate3d(0px, -' + Face.SIZE + 'px, 0px) rotateX(90deg)')
          break
        case Face.BOTTOM:
          this.$set(this.styleObj, 'transformOrigin', '50% 0%')
          this.$set(this.styleObj, 'transform', 'translate3d(0px, ' + Face.SIZE + 'px, 0px) rotateX(-90deg)')
          break
        case Face.FRONT:
          break
        case Face.BACK:
          this.$set(this.styleObj, 'transform', 'translate3d(0px, 0px, -' + Face.SIZE + 'px) rotateY(180deg)')
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
