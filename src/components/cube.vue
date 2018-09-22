<template>
  <div class="cube" :style="style">
    <face v-if="{{type }}"></face>
  </div>
</template>

<script>
  import CSS3 from '../utils/CSS3'
  import Face from '../utils/global'
  import face from '@components/face'
  export default {
    name: "cube",
    mixins: [CSS3],
    comments: {
      face
    },
    data () {
      return {
        _rotation: null,
        style: {
          width: Face.SIZE + 'px',
          height: Face.SIZE + 'px',
          position: 'absolute',
        },
        _faces: {},
        _tmpFaces: {}
      }
    },
    props: {
      _position: string
    },
    created() {
      this.set(this.$refs, "transform-style", "preserve-3d")
    },
    methods: {
      setFace (type, color) {
        if (!(type in this._faces)) {
          let face = '<face></face>';
          this.$refs.appendChild(face);
          this._faces[type] = face;
        }
        this._faces[type].setColor(color);
      }
    }
  }
</script>

<style scoped>

</style>
