<template>
  <div class="hello">
    <p>you :{{player}}</p>
    <template v-if="otherPlayers.length > 0">
      <p v-for="pl in otherPlayers" v-bind:key="pl.id">{{pl}}</p>
    </template>
    <button @click="test(0)">click me</button>
    <button @click="test(1)">click me</button>
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
      player: null,
      otherPlayers: []
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log('hi');
    this.socket = io("http://localhost:3000");
    
    window.addEventListener('beforeunload', this.onDisc);
    
    this.socket.on("playerCreated", player => {
      this.player = player;
    });

    this.socket.on("playersChanged", players => {
      this.otherPlayers = [];
      players.forEach(data => {
        if (this.player != null) {
          if (this.player.id != data.id) {
            this.otherPlayers.push(data)
          }
        }
      });
    });
    
    this.socket.on("moved", data => {
      // eslint-disable-next-line no-debugger
      if (data.id == this.player.id) {
        this.player.position = data.position;
      } else {
        let otherPlayer = this.otherPlayers.find(x => x.id == data.id);
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
    onDisc() {
      this.socket.emit("removePlayer", {id: this.player.id});
    }
  }
}
</script>

<style scoped>
</style>