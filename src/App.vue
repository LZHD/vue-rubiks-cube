<template>
  <div :style="styleObj">
    <cube ref="cube"
      v-for="(cube, index) in cubes"
      :key="index"
      :cube="cube"
      :faces="cube.faces"
      @rotateX="rotateX"
      @rotateY="rotateY"
      @rotateZ="rotateZ"
    />
  </div>
</template>

<script>
import cube from '@/components/cube'
import Face from '@/utils/global'
import Quaternion from '@/utils/quaternion'

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
    for (let z = 0; z < this.size; z++) {
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
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
            rotation: null,
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
      this.rotation = Quaternion.fromRotation([1, 0, 0], -35).multiply(Quaternion.fromRotation([0, 1, 0], 45))
      this.$set(this.styleObj, 'transform', 'translateZ(' + (-Face.SIZE / 2 - Face.SIZE) + 'px) ' + this.rotation.toRotation() + ' translateZ(' + (Face.SIZE / 2) + 'px)')
      document.body.addEventListener('mousedown', this.dragStart)
    },
    dragStart (e) {
      console.log(e)
      console.log(this.getAllFace())
      e.preventDefault()
      if (e.target.tagName !== 'BODY') {
        return
      }
      e = (e.touches ? e.touches[0] : e)
      this.drag.mouse = [e.clientX, e.clientY]
      document.body.addEventListener('mousemove', this.dragMove)
      document.body.addEventListener('mouseup', this.dragEnd)
    },
    dragMove (e) {
      e = (e.touches ? e.touches[0] : e)
      const mouse = [e.clientX, e.clientY]
      const dx = mouse[0] - this.drag.mouse[0]
      const dy = mouse[1] - this.drag.mouse[1]
      const norm = Math.sqrt(dx * dx + dy * dy)
      if (!norm) {
        return
      }
      const N = [-dy / norm, dx / norm]

      this.drag.mouse = mouse
      this.rotation = Quaternion.fromRotation([N[0], N[1], 0], norm / 2).multiply(this.rotation)
      this.$set(this.styleObj, 'transform', 'translateZ(' + (-Face.SIZE / 2 - Face.SIZE) + 'px) ' + this.rotation.toRotation() + ' translateZ(' + (Face.SIZE / 2) + 'px)')
    },
    dragEnd () {
      document.body.removeEventListener('mousemove', this.dragMove)
      document.body.removeEventListener('mouseup', this.dragEnd)
    },
    rotateX ([dir, layer]) {
      const cubes = []
      for (let i = 0; i < Math.pow(this.size, 2); i++) {
        cubes.push(layer + i * this.size)
      }
      this.rotateCubes(cubes, [dir, 0, 0])
    },
    rotateY ([dir, layer]) {
      const cubes = []
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          cubes.push(j + layer * this.size + i * Math.pow(this.size, 2))
        }
      }
      this.rotateCubes(cubes, [0, -dir, 0])
    },
    rotateZ ([dir, layer]) {
      const cubes = []
      const offset = layer * Math.pow(this.size, 2)
      for (let i = 0; i < Math.pow(this.size, 2); i++) {
        cubes.push(offset + i)
      }
      this.rotateCubes(cubes, [0, 0, dir])
    },
    rotateCubes (cubes, rotation) {
      const suffixes = ['X', 'Y', '']
      let str = ''
      for (let i = 0; i < 3; i++) {
        if (!rotation[i]) { continue }
        str = 'rotate' + suffixes[i] + '(' + (90 * rotation[i]) + 'deg)'
      }
      this.cubes.forEach((cube, index) => {
        cubes.forEach(i => {
          if (index === i) {
            const obj = Object.assign({}, cube, { rotation: str })
            this.$set(this.cubes, index, obj)
          }
        })
      })
    },
    getAllCube () {
      return this.$refs.cube
    },
    getAllFace () {
      return this.getAllCube().map(cube => cube.$refs.face).filter(faces => Array.isArray(faces)).reduce((a, b) => [...a, ...b])
    }
  }
}
</script>

<style lang="scss">

</style>
