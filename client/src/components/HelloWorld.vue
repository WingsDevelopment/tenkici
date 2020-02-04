<template>
  <div class="hello">
    <p>you :{{player}}</p>
    <ul id="v-for-object" class="demo">
      <li v-for="player in otherPlayers" :key="player.id">
        {{ player }}
      </li>
    </ul>
    <button @click="test(0)">click me</button>
    <button @click="test(1)">click me</button>
    <Canvas v-bind:socket="socket" v-if="player!=null && otherPlayers!=null" v-bind:player="player" v-bind:otherPlayers="otherPlayers"/>
  </div>
</template>

<script>
import io from 'socket.io-client';
import Vue from 'vue';
import Canvas from './Canvas.vue';

export default {
  name: 'HelloWorld',
  props: {
    
  },
  components: {
    Canvas
  },
  data() {
    return {
      socket: {},
      player: null,
      otherPlayers: {}
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log('hi');
    this.socket = io("http://localhost:3000");

    this.socket.on("join", player => {
      this.player = player;
    });

    this.socket.on("initOthers", players => {
      Object.keys(players).forEach( (key) => {
        if (key != this.player.id) {
          Vue.set(this.otherPlayers, key, players[key]);
        }
      });
    });

    this.socket.on("playerAdded", player => {
        if (player.id != this.player.id) {
          Vue.set(this.otherPlayers, player.id, player);
        }
    });

    this.socket.on("playerRemoved", id => {
      Vue.delete(this.otherPlayers, id);
    });
    
    this.socket.on("moved", data => {
      // eslint-disable-next-line no-debugger
      if (data.id == this.player.id) {
        this.player.position = data.position;
      } else {
        let otherPlayer = this.otherPlayers[data.id];
        if (otherPlayer != null) {
          otherPlayer.position = data.position;
        }
      }
    })
  },
  mounted() {
    this.socket.emit("createPlayer");
  },
  methods: {
    test(dir) {
      this.socket.emit("move", {id: this.player.id, direction: dir});
    },
  }
}
</script>

<style scoped>
</style>