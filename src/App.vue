<template>
  <div :style="styleObj">
    <cube ref="cube"
      v-for="(cube, index) in cubes"
      :key="index"
      :cube="cube"
    />
  </div>
</template>

<script>
import cube from '@/components/cube'
import { Face, ROTATION } from '@/utils/global'
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
      tmpFaces: [],
      drag: {
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
    this.init()
  },
  methods: {
    init () {
      document.body.style.perspective = '460px'
      this.rotation = Quaternion.fromRotation([1, 0, 0], -35).multiply(Quaternion.fromRotation([0, 1, 0], 45))
      this.update()
      document.body.addEventListener('mousedown', this.dragStart)
    },
    update () {
      this.$set(this.styleObj, 'transform', 'translateZ(' + (-Face.SIZE / 2 - Face.SIZE) + 'px) ' + this.rotation.toRotation() + ' translateZ(' + (Face.SIZE / 2) + 'px)')
    },
    dragStart (e) {
      e.preventDefault()
      e = (e.touches ? e.touches[0] : e)
      this.drag.face = this.getAllFace().filter(face => face.$el === e.target)[0]
      this.drag.mouse = [e.clientX, e.clientY]
      document.body.addEventListener('mousemove', this.dragMove)
      document.body.addEventListener('mouseup', this.dragEnd)
    },
    dragMove (e) {
      if (e.touches && e.touches.length > 1) { return }
      if (this.drag.face) {
        const moveToFace = this.getAllFace().filter(face => face.$el === e.target)[0]
        if (!moveToFace || moveToFace === this.drag.face) {
          return
        }
        this.dragEnd()
        this.rotate(this.drag.face, moveToFace)
      } else {
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
        this.update()
      }
    },
    dragEnd () {
      document.body.removeEventListener('mousemove', this.dragMove)
      document.body.removeEventListener('mouseup', this.dragEnd)
    },
    rotate (face1, face2) {
      const t1 = face1.type
      const t2 = face2.type
      const pos1 = face1.$parent.cube.position
      const pos2 = face2.$parent.cube.position
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
              this.rotateY(coef * diff, pos1[1])
            } else {
              this.rotateX(coef * diff, pos1[0])
            }
            break

          case Face.LEFT:
          case Face.RIGHT:
            coef = (t1 === Face.LEFT ? 1 : -1)
            if (diffIndex === 2) {
              this.rotateY(-coef * diff, pos1[1])
            } else {
              this.rotateZ(coef * diff, pos1[2])
            }
            break

          case Face.TOP:
          case Face.BOTTOM:
            coef = (t1 === Face.TOP ? 1 : -1)
            if (diffIndex === 0) {
              this.rotateZ(-coef * diff, pos1[2])
            } else {
              this.rotateX(-coef * diff, pos1[0])
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
              this.rotateY(coef, pos1[1])
            }
            if (t2 === Face.RIGHT) {
              this.rotateY(-1 * coef, pos1[1])
            }
            if (t2 === Face.TOP) {
              this.rotateX(coef, pos1[0])
            }
            if (t2 === Face.BOTTOM) {
              this.rotateX(-1 * coef, pos1[0])
            }
            break

          case Face.LEFT:
          case Face.RIGHT:
            coef = (t1 === Face.LEFT ? 1 : -1)
            if (t2 === Face.FRONT) {
              this.rotateY(-1 * coef, pos1[1])
            }
            if (t2 === Face.BACK) {
              this.rotateY(coef, pos1[1])
            }
            if (t2 === Face.TOP) {
              this.rotateZ(coef, pos1[2])
            }
            if (t2 === Face.BOTTOM) {
              this.rotateZ(-1 * coef, pos1[2])
            }
            break

          case Face.TOP:
          case Face.BOTTOM:
            coef = (t1 === Face.TOP ? 1 : -1)
            if (t2 === Face.FRONT) {
              this.rotateX(-1 * coef, pos1[0])
            }
            if (t2 === Face.BACK) {
              this.rotateX(coef, pos1[0])
            }
            if (t2 === Face.LEFT) {
              this.rotateZ(-1 * coef, pos1[2])
            }
            if (t2 === Face.RIGHT) {
              this.rotateZ(coef, pos1[2])
            }
            break
        }
      }
    },
    rotateX (dir, layer) {
      const cubes = []
      for (let i = 0; i < Math.pow(this.size, 2); i++) {
        cubes.push(layer + i * this.size)
      }
      this.rotateCubes(cubes, [dir, 0, 0])
    },
    rotateY (dir, layer) {
      const cubes = []
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          cubes.push(j + layer * this.size + i * Math.pow(this.size, 2))
        }
      }
      this.rotateCubes(cubes, [0, -dir, 0])
    },
    rotateZ (dir, layer) {
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
      setTimeout(() => {
        this.finalizeRotation(cubes, rotation)
      }, 5000)
    },
    finalizeRotation (cubes, rotation) {
      let direction = 0
      for (let i = 0; i < 3; i++) {
        if (rotation[i]) {
          direction = rotation[i]
        }
      }

      if (rotation[0]) {
        direction *= -1
      }
      const half = Math.floor(this.size / 2)
      this.tmpFaces = []
      for (let i = 0; i < cubes.length; i++) {
        const x = i % this.size - half
        const y = Math.floor(i / this.size) - half

        const source = [y * direction + half, -x * direction + half]
        const sourceIndex = source[0] + this.size * source[1]

        this.prepareColorChange(cubes[i], cubes[sourceIndex], rotation)
      }

      for (let i = 0; i < cubes.length; i++) {
        this.commitColorChange(cubes[i])
      }
    },
    prepareColorChange (i, index, rotation) {
      // this.tmpFaces = []
      const sourceFaces = this.cubes[index].faces
      sourceFaces.forEach(sourceFace => {
        const targetType = this.rotateType(sourceFace.type, rotation)
        this.tmpFaces.push({
          index: i,
          color: sourceFace.color,
          type: targetType
        })
      })
    },
    rotateType (type, rotation) {
      for (let i = 0; i < 3; i++) {
        if (!rotation[i]) {
          continue
        }
        const faces = ROTATION[i]
        let index = faces.indexOf(type)
        if (index === -1) {
          continue
        }
        index = (index + rotation[i] + faces.length) % faces.length
        return faces[index]
      }
      return type
    },
    commitColorChange (index) {
      const faces = this.tmpFaces.filter(face => face.index === index).map(face => {
        delete face.index
        return face
      })
      const obj = Object.assign({}, this.cubes[index], { faces: faces, rotation: null })
      this.$set(this.cubes, index, obj)
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
