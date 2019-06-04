<template>
  <div :style="styleObj">
    <cube v-for="(item, index) in cubes" :key="index" :faces="item.faces" :_position="item.position"/>
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
  data () {
    return {
      size: 3,
      cubes: [],
      faces: [],
      faceNodes: [],
      drag: {
        ec: [],
        mouse: [],
        face: null
      },
      styleObj: {
        position: 'absolute',
        left: '50%',
        top: '55%',
        width: 0,
        height: 0,
        transformStyle: 'preserve-3d'
      },
      rotation: {
        x: '',
        y: '',
        z: '',
        w: ''
      }
    }
  },
  created () {
    for (let z = 0; z < 3; z++) {
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          let faces = []
          if (z === 0) {
            faces.push({
              type: Face.FRONT,
              color: 'red'
            })
          }
          if (z === 2) {
            faces.push({
              type: Face.BACK,
              color: 'orange'
            })
          }

          if (x === 0) {
            faces.push({
              type: Face.LEFT,
              color: 'blue'
            })
          }
          if (x === 2) {
            faces.push({
              type: Face.RIGHT,
              color: 'green'
            })
          }

          if (y === 0) {
            faces.push({
              type: Face.TOP,
              color: 'yellow'
            })
          }
          if (y === 2) {
            faces.push({
              type: Face.BOTTOM,
              color: 'white'
            })
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
    update: function () {
      document.body.style.perspective = '460px'
      console.log(Quaternion.fromRotation([1, 0, 0], -35))
      this.rotation = Quaternion.fromRotation([1, 0, 0], -35).multiply(Quaternion.fromRotation([0, 1, 0], 45))
      this.$set(this.styleObj, 'transform', 'translateZ(' + (-Face.SIZE / 2 - Face.SIZE) + 'px) ' + this.rotation.toRotation() + ' translateZ(' + (Face.SIZE / 2) + 'px)')
      document.body.addEventListener('mousedown', this.dragStart);
    },
    eventToFace (e) {
      let node;
      if (document.elementFromPoint) {
        const e = (e.touches ? e.touches[0] : e);
        node = document.elementFromPoint(e.clientX, e.clientY);
      } else {
        node = e.target;
      }
      var index = this.faceNodes.indexOf(node);
      if (index === -1) { return null; }
      return this.faces[index];
    },
    dragStart (e) {
      e.preventDefault();
      e = (e.touches ? e.touches[0] : e);
      this.drag.mouse = [e.clientX, e.clientY];
      document.body.addEventListener('mousemove', this.dragMove);
      document.body.addEventListener('mouseup', this.dragEnd);
    },
    dragMove (e) {
      e = (e.touches ? e.touches[0] : e);
      const mouse = [e.clientX, e.clientY];
      const dx = mouse[0] - this.drag.mouse[0];
      const dy = mouse[1] - this.drag.mouse[1];
      const norm = Math.sqrt(dx * dx + dy * dy);
      if (!norm) {
        return;
      }
      const N = [-dy / norm, dx / norm];

      this.drag.mouse = mouse;
      this.rotation = Quaternion.fromRotation([N[0], N[1], 0], norm / 2).multiply(this.rotation);
      this.$set(this.styleObj, 'transform', 'translateZ(' + (-Face.SIZE / 2 - Face.SIZE) + 'px) ' + this.rotation.toRotation() + ' translateZ(' + (Face.SIZE / 2) + 'px)')
    },
    dragEnd () {
      document.body.removeEventListener('mousemove', this.dragMove);
      document.body.removeEventListener('mouseup', this.dragEnd);
    }
  }
}
</script>

<style lang="scss">

</style>
