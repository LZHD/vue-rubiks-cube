<template>
  <div class="cube" :style="styleObj">
    <face v-for="(item, index) in faces" :key="index" :_type="item.type" :color="item.color"></face>
  </div>
</template>

<script>
import Face from '../utils/global'
import face from '@/components/face'

export default {
  name: 'cube',
  components: {
    face
  },
  data () {
    return {
      styleObj: {
        width: Face.SIZE + 'px',
        height: Face.SIZE + 'px',
        position: 'absolute',
        transformStyle: 'preserve-3d'
      },
      _faces: {},
      _tmpFaces: {}
    }
  },
  props: {
    _rotation: String,
    _position: Array,
    faces: Array
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      let transform = ''
      transform += 'translate3d(' + (-Face.SIZE / 2) + 'px, ' + (-Face.SIZE / 2) + 'px, ' + (-Face.SIZE / 2) + 'px) '
      if (this._rotation) { transform += this._rotation + ' ' }

      let half = Math.floor(3 / 2)
      let x = this._position[0]
      let y = this._position[1]
      let z = -this._position[2]
      x -= half
      y -= half
      z += half + 1 / 2
      transform += 'translate3d(' + (x * Face.SIZE) + 'px, ' + (y * Face.SIZE) + 'px, ' + (z * Face.SIZE) + 'px)'

      let val = this._rotation ? 'transform 300ms' : ''
      this.$set(this.styleObj, 'transition', val)
      this.$set(this.styleObj, 'transform', transform)
    },
    getPosition () {
      return this._position
    },
    getNode () {
      return this.$el
    },
    getFaces () {
      return this._faces
    },
    prepareColorChange () {

    }
  }
}
</script>

<style scoped>

</style>
