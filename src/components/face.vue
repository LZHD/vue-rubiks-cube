<template>
    <div class="face face {{ _type }}" style="position: absolute; "></div>
</template>

<script>
    import CSS3 from '../utils/CSS3'
    export default {
        name: "face",
        mixins: [CSS3],
        data() {
            return {
                SIZE: 100,
                LEFT: 0,
                RIGHT: 1,
                TOP: 2,
                BOTTOM: 3,
                FRONT: 4,
                BACK: 5
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
            switch (this._type) {
                case this.LEFT:
                    this.set(this._node, "transform-origin", "100% 50%");
                    this.set(this._node, "transform", "translate3d(-" + Face.SIZE + "px, 0px, 0px) rotateY(-90deg)");
                    break;
                case this.RIGHT:
                    this.set(this._node, "transform-origin", "0% 50%");
                    this.set(this._node, "transform", "translate3d(" + Face.SIZE + "px, 0px, 0px) rotateY(90deg)");
                    break;
                case this.TOP:
                    this.set(this._node, "transform-origin", "50% 100%");
                    this.set(this._node, "transform", "translate3d(0px, -" + Face.SIZE + "px, 0px) rotateX(90deg)");
                    break;
                case this.BOTTOM:
                    this.set(this._node, "transform-origin", "50% 0%");
                    this.set(this._node, "transform", "translate3d(0px, " + Face.SIZE + "px, 0px) rotateX(-90deg)");
                    break;
                case this.FRONT:
                    break;
                case this.BACK:
                    this.set(this._node, "transform", "translate3d(0px, 0px, -" + Face.SIZE + "px) rotateY(180deg)");
                    break;
            }
        },
        computed: {
            ROTATION: function () {
                return [
                    [this.TOP, this.FRONT, this.BOTTOM, this.BACK].reverse(), [this.LEFT, this.BACK, this.RIGHT, this.FRONT].reverse(), [this.LEFT, this.BOTTOM, this.RIGHT, this.TOP].reverse()
                ]
            }
        },
        methods: {
            getCube () {
                return this._cube;
            },
            getNode () {
                return this.$refs;
            },
            getType () {
                return this._type;
            },
            setColor (color) {
                this._color = color;
                this.$refs.style.backgroundColor = color;
            },
            getColor () {
                return this._color;
            }
        }
    }
</script>

<style scoped>

</style>