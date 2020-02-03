<template>
  <div class="hello">
    <p>{{position.x}}</p>
    <p>{{position.y}}</p>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'HelloWorld',
  props: {
    
  },
  data() {
    return {
      socket: {},
      position: {
        x: 0,
        y: 0
      }
    }
  },
  created() {
    this.socket = io("http://localhost:3000");
    
  },
  mounted() {
    this.socket.on("position", data => {
      this.position = data;
    })
  }
}
</script>

<style scoped>
</style>