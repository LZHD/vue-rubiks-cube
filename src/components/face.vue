<template>
  <div class="face face{{ _type }}" :styles="styles"></div>
</template>

<script>
  import CSS3 from '../utils/CSS3'
  import Face from '../utils/global'

  export default {
    name: "face",
    mixins: [CSS3],
    data() {
      return {
        styles: {
          width: Face.SIZE + 'px',
          height: Face.SIZE + 'px',
          position: 'absolute',
          left: '0px',
          top: '0px'
        }
      }
    },
    props: {
      _type: string,
      _cube: string,
      color: {
        default: null,
        type: string
      }
    },
    created() {
      this.set(this.$refs, "box-sizing", "border-box")
      switch (this._type) {
        case Face.LEFT:
          this.set(this._node, "transform-origin", "100% 50%");
          this.set(this._node, "transform", "translate3d(-" + Face.SIZE + "px, 0px, 0px) rotateY(-90deg)");
          break;
        case Face.RIGHT:
          this.set(this._node, "transform-origin", "0% 50%");
          this.set(this._node, "transform", "translate3d(" + Face.SIZE + "px, 0px, 0px) rotateY(90deg)");
          break;
        case Face.TOP:
          this.set(this._node, "transform-origin", "50% 100%");
          this.set(this._node, "transform", "translate3d(0px, -" + Face.SIZE + "px, 0px) rotateX(90deg)");
          break;
        case Face.BOTTOM:
          this.set(this._node, "transform-origin", "50% 0%");
          this.set(this._node, "transform", "translate3d(0px, " + Face.SIZE + "px, 0px) rotateX(-90deg)");
          break;
        case Face.FRONT:
          break;
        case Face.BACK:
          this.set(this._node, "transform", "translate3d(0px, 0px, -" + Face.SIZE + "px) rotateY(180deg)");
          break;
      }
    },
    computed: {
      ROTATION: function () {
        return [
          [Face.TOP, Face.FRONT, Face.BOTTOM, Face.BACK].reverse(),
          [Face.LEFT, Face.BACK, Face.RIGHT, Face.FRONT].reverse(),
          [Face.LEFT, Face.BOTTOM, Face.RIGHT, Face.TOP].reverse()
        ]
      }
    },
    methods: {
      getCube() {
        return this._cube;
      },
      getNode() {
        return this.$refs;
      },
      getType() {
        return this._type;
      },
      setColor(color) {
        // this._color = color;
        this.$set(this.$data, '_color', color);
        this.$refs.style.backgroundColor = color;
      },
      getColor() {
        return this._color;
      }
    }
  }
</script>

<style scoped>

</style>
