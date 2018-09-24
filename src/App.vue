<template>
  <div :style="styleObj">
    <cube v-for="(item, index, key) in size" :type="item.type" :color="item.color" :key="key"/>
  </div>
</template>

<script>
  import cube from '@/components/cube'
  import Face from './utils/global'
export default {
  name: 'app',
  components: {
    cube
  },
  data () {
    return {
      size: [],
      styleObj: {
        position: 'absolute',
        left: '50%',
        top: '55%',
        width: '0px',
        height: '0px',
        transformStyle: 'preserve-3d'
      }
    }
  },
  created() {
    for (let z = 0; z < 3; z++) {
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          if (z === 0) {
            this.size.push({
              type: Face.FRONT,
              color: 'red'
            });
          }
          if (z === 2) {
            this.size.push({
              type: Face.BACK,
              color: 'orange'
            });
          }

          if (x === 0) {
            this.size.push({
              type: Face.LEFT,
              color: 'blue'
            });
          }
          if (x === 2) {
            this.size.push({
              type: Face.RIGHT,
              color: 'green'
            });
          }

          if (y === 0) {
            this.size.push({
              type: Face.TOP,
              color: 'yellow'
            });
          }
          if (y === 2) {
            this.size.push({
              type: Face.BOTTOM,
              color: 'white'
            });
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">

</style>
