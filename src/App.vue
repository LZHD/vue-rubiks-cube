<template>
  <div :style="styleObj">
    <cube v-for="item in cubes" :faces="item.faces" :_position="item.position"/>
  </div>
</template>

<script>
  import cube from '@/components/cube'
  import Face from './utils/global'
  import Quaternion from './utils/quaternion'

  export default {
    name: 'app',
    components: {
      cube
    },
    data() {
      return {
        styleObj: {
          position: 'absolute',
          left: '50%',
          top: '55%',
          width: '0px',
          height: '0px',
          transformStyle: 'preserve-3d'
        },
        cubes: [],
        _rotation: {
          x: '',
          y: '',
          z: '',
          w: ''
        }
      }
    },
    created() {
      for (let z = 0; z < 3; z++) {
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++) {
            let faces = [];
            let position = [];
            if (z === 0) {
              faces.push({
                type: Face.FRONT,
                color: 'red'
              });
            }
            if (z === 2) {
              faces.push({
                type: Face.BACK,
                color: 'orange'
              });
            }

            if (x === 0) {
              faces.push({
                type: Face.LEFT,
                color: 'blue'
              });
            }
            if (x === 2) {
              faces.push({
                type: Face.RIGHT,
                color: 'green'
              });
            }

            if (y === 0) {
              faces.push({
                type: Face.TOP,
                color: 'yellow'
              });
            }
            if (y === 2) {
              faces.push({
                type: Face.BOTTOM,
                color: 'white'
              });
            }
            this.cubes.push({
              faces: faces,
              position: [x, y, z]
            })
          }
        }
      }
      this.update()
    },
    methods: {
      update() {
        console.log(Quaternion.fromRotation([1, 0, 0], -35))
        // this._rotation = Quaternion.fromRotation([1, 0, 0], -35).multiply(Quaternion.fromRotation([0, 1, 0], 45))
        // this.$set(this.styleObj, "transform", "translateZ(" + (-Face.SIZE / 2 - Face.SIZE) + "px) " + this._rotation.toRotation() + " translateZ(" + (Face.SIZE / 2) + "px)");
      },
      toAxis() {
        return [this.x, this.y, this.z];
      },

      toAngle() {
        let RAD2DEG = 180 / Math.PI;
        return RAD2DEG * 2 * Math.acos(this.w);
      },

      toRotation() {
        let axis = this.toAxis();
        let angle = this.toAngle();
        return "rotate3d(" + axis[0].toFixed(10) + "," + axis[1].toFixed(10) + "," + axis[2].toFixed(10) + "," + angle.toFixed(10) + "deg)";
      }
    }
  }
</script>

<style lang="scss">

</style>
