<template>
  <div class="hello">
    <template v-if="!spawned">
       <button @click="spawnAsPeasant">Spawn as peasant</button>
       <button @click="spawnAsVampire">Spawn as vampire</button>
    </template>

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
      otherPlayers: {},
      spawned: false
    }
  },
  created() {
    this.socket = io("http://192.168.0.17:3000");
    this.socket.binaryType = 'blob';

    this.socket.on("join", player => {
      this.player = player;
      this.spawned = true;
    });

    this.socket.on("serverError", message => {
      alert("Useravamo se, server error: " + message);
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
      data = new Buffer(data).toString();
      var positionX = parseInt(data.substring(0, 4), 10);
      var positionY = parseInt(data.substring(4, 8), 10);
      var id = data.substring(8);

      if (id == this.player.id) {
        this.player.position.x = positionX;
        this.player.position.y = positionY;
      } else {
        var otherPlayer = this.otherPlayers[id];
        if (otherPlayer != null) {
          otherPlayer.position.x = positionX;
          otherPlayer.position.y = positionY;
        }
      }
    });
    
    this.socket.on("playerDied", id => {
      if (this.player.id === id) {
        this.player = null
        // alert('umro si nube');
      } else {
        Vue.delete(this.otherPlayers, id);
      }

    });
  },
  mounted() {
  },
  methods: {
    spawnAsVampire() {
      this.socket.emit("createPlayer", 1);
    },
    spawnAsPeasant() {
      this.socket.emit("createPlayer", 0);
    }
  }
}
</script>

<style scoped>
</style>