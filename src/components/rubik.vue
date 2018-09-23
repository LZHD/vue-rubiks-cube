<template>
  <div>
    <div v-for="item in size">
      {{type}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "rubik",
    data () {
      return {
        size: 0,
        type: 'ddd'
      }
    },
    created() {
      for (let z = 0; z < 3; z++) {
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++) {
            if (z == 0) { this.type = "red"; }
            if (z == 2) { this.type = "orange"; }

            if (x == 0) { this.type = "blue"; }
            if (x == 2) { this.type = "green"; }

            if (y == 0) { this.type = "yellow"; }
            if (y == 2) { this.type = "white"; }
            this.size += 1;
          }
        }
      }
    },
    methods: {
      setColor (size) {
        return this.size.filter(number => {

          return number
        })
      }
    }
  }
</script>

<style scoped>

</style>
