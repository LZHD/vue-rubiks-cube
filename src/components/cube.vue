<template>
  <div class="cube" :style="styleObj">
    <face :_type="type" :color="color"/>
  </div>
</template>

<script>
  import Face from '../utils/global'
  import face from '@/components/face'
  export default {
    name: "cube",
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
      _position: String,
      type: Number,
      color: String
    }
  }
</script>

<style scoped>

</style>
