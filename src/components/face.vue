<template>
  <div
    class="face"
    :class="extClass"
    :style="styleObj"
    @mousedown.prevent="dragStart"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @touchstart.prevent="dragStart"
    @touchmove="dragMove"
    @touchend="dragEnd"
  ></div>
</template>

<script>
import Face from '@/utils/global'
import { store } from '@/utils/store'

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
      extClass: 'face' + this.type,
      drag: {
        mouse: [],
        face: null
      },
      isMove: false,
      shareState: store.state
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
  },
  methods: {
    dragStart (e) {
      this.isMove = true
      e = (e.touches ? e.touches[0] : e)
      this.drag.mouse = [e.clientX, e.clientY]
      this.drag.face = this
      store.setCurrentFace(this.drag)
    },
    dragMove (e) {
      if (e.touches && e.touches.length > 1) {
        return
      }
      if (!this.isMove) {
        return
      }
      if (this.$el === this.shareState.currentFace.face.$el) {
        return
      }
      this.isMove = false
      this.rotate(this, this.shareState.currentFace)
    },
    dragEnd () {
      this.isMove = false
    },
    rotate (face1, face2) {
      const t1 = face1.type
      const t2 = face2.face.type
      const pos1 = face1.cube.position
      const pos2 = face2.face.cube.position
      let diff = 0
      let diffIndex = -1
      for (let i = 0; i < 3; i++) {
        let d = pos1[i] - pos2[i]
        if (d) {
          if (diffIndex !== -1) { return }
          diff = d > 0 ? 1 : -1
          diffIndex = i
        }
      }
      if (t1 === t2) {
        let coef
        switch (t1) {
          case Face.FRONT:
          case Face.BACK:
            coef = (t1 === Face.FRONT ? 1 : -1)
            if (diffIndex === 0) {
              this.rotateChange(['rotateY', coef * diff, pos1[1]])
            } else {
              this.rotateChange(['rotateX', coef * diff, pos1[0]])
            }
            break

          case Face.LEFT:
          case Face.RIGHT:
            coef = (t1 === Face.LEFT ? 1 : -1)
            if (diffIndex === 2) {
              this.rotateChange(['rotateY', -coef * diff, pos1[1]])
            } else {
              this.rotateChange(['rotateZ', coef * diff, pos1[2]])
            }
            break

          case Face.TOP:
          case Face.BOTTOM:
            coef = (t1 === Face.TOP ? 1 : -1)
            if (diffIndex === 0) {
              this.rotateChange(['rotateZ', -coef * diff, pos1[2]])
            } else {
              this.rotateChange(['rotateX', -coef * diff, pos1[0]])
            }
            break
        }
      }
      if (t1) {
        let coef
        switch (t1) {
          case Face.FRONT:
          case Face.BACK:
            coef = (t1 === Face.FRONT ? 1 : -1)
            if (t2 === Face.LEFT) {
              this.rotateChange(['rotateY', coef, pos1[1]])
            }
            if (t2 === Face.RIGHT) {
              this.rotateChange(['rotateY', -1 * coef, pos1[1]])
            }
            if (t2 === Face.TOP) {
              this.rotateChange(['rotateX', coef, pos1[0]])
            }
            if (t2 === Face.BOTTOM) {
              this.rotateChange(['rotateX', -1 * coef, pos1[0]])
            }
            break

          case Face.LEFT:
          case Face.RIGHT:
            coef = (t1 === Face.LEFT ? 1 : -1)
            if (t2 === Face.FRONT) {
              this.rotateChange(['rotateY', -1 * coef, pos1[1]])
            }
            if (t2 === Face.BACK) {
              this.rotateChange(['rotateY', coef, pos1[1]])
            }
            if (t2 === Face.TOP) {
              this.rotateChange(['rotateZ', coef, pos1[2]])
            }
            if (t2 === Face.BOTTOM) {
              this.rotateChange(['rotateZ', -1 * coef, pos1[2]])
            }
            break

          case Face.TOP:
          case Face.BOTTOM:
            coef = (t1 === Face.TOP ? 1 : -1)
            if (t2 === Face.FRONT) {
              this.rotateChange(['rotateX', -1 * coef, pos1[0]])
            }
            if (t2 === Face.BACK) {
              this.rotateChange(['rotateX', coef, pos1[0]])
            }
            if (t2 === Face.LEFT) {
              this.rotateChange(['rotateZ', -1 * coef, pos1[2]])
            }
            if (t2 === Face.RIGHT) {
              this.rotateChange(['rotateZ', coef, pos1[2]])
            }
            break
        }
      }
    },
    rotateChange (type) {
      this.$emit('rotate', type)
    }
  }
}
</script>

<style scoped>

</style>
