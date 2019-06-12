<template>
  <div class="cube" :style="styleObj">
    <face
      ref="face"
      v-for="(face, index) in cube.faces"
      :key="index"
      :type="face.type"
      :color="face.color"
      :cube="cube"
    ></face>
  </div>
</template>

<script>
import { Face } from '@/utils/global'
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
      }
    }
  },
  props: {
    cube: Object
  },
  created () {
    this.init()
  },
  updated () {
    this.init()
    console.log('dsfdasasd')
  },
  // watch: {
  //   cube () {
  //     this.init()
  //   }
  // },
  methods: {
    init () {
      let transform = ''
      transform += 'translate3d(' + (-Face.SIZE / 2) + 'px, ' + (-Face.SIZE / 2) + 'px, ' + (-Face.SIZE / 2) + 'px) '
      if (this.cube.rotation) {
        transform += this.cube.rotation + ' '
      }

      let half = Math.floor(3 / 2)
      let x = this.cube.position[0]
      let y = this.cube.position[1]
      let z = -this.cube.position[2]
      x -= half
      y -= half
      z += half + 1 / 2
      transform += 'translate3d(' + (x * Face.SIZE) + 'px, ' + (y * Face.SIZE) + 'px, ' + (z * Face.SIZE) + 'px)'

      let val = this.cube.rotation ? 'transform 300ms' : ''
      this.$set(this.styleObj, 'transition', val)
      this.$set(this.styleObj, 'transform', transform)
    }
  }
}
</script>

<style scoped>

</style>
