<template>
  <div class="hello">
    <template v-if="!spawned">
       <button @click="spawnAsPeasant">Spawn as peasant</button>
       <button @click="spawnAsVampire">Spawn as vampire</button>
    </template>

    <Canvas v-bind:socket="socket"
      v-if="player!=null && otherPlayers!=null" 
      v-bind:player="player" 
      v-bind:otherPlayers="otherPlayers"
      v-bind:walls="walls"
      v-bind:invisRunes="invisRunes"/>
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
      spawned: false,
      walls: [],
      invisRunes: [],
      invises: 0
    }
  },
  created() {
    this.socket = io("http://192.168.1.109:3000");
    this.socket.binaryType = 'blob';

    this.socket.on("join", player => {
      this.player = player;
      this.spawned = true;
    });

    this.socket.on("serverError", message => {
      alert("Server error: " + message);
    });
    
    this.socket.on("initWalls", walls => {
      // eslint-disable-next-line no-console
      console.log(walls);
      this.walls = walls;
    });

    this.socket.on("initInvises", invisRunes => {
      // eslint-disable-next-line no-console
      console.log(invisRunes);
      invisRunes.forEach(rune => {
        this.invisRunes.push(rune);
      });
    });

    this.socket.on("invisSpawned", invis => {
      // eslint-disable-next-line no-console
      this.invisRunes.push(invis);
    });
   
    this.socket.on("invisConsumed", playerId => {
      // eslint-disable-next-line no-console
      if (this.player != null && this.player.id == playerId) this.player.isInvisible = true;
      if (this.otherPlayers[playerId] != null) this.otherPlayers[playerId].isInvisible = true;
    });
    
    this.socket.on("deleteInvisesFromMap", ids => {
      // eslint-disable-next-line no-console
      ids.forEach(invisId => {
          let index = this.invisRunes.findIndex(x => x.id === invisId);
          if (index != -1) {
              this.invisRunes.splice(index, 1);
          }
      });
    });
    
    this.socket.on("invisExpired", (data) => {
      let playerId = this.onPlayerMoved(data);
      if (this.player.id === playerId) this.player.isInvisible = false;
      if (this.otherPlayers[playerId] != null) this.otherPlayers[playerId].isInvisible = false;
    })

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
    
    this.socket.on("playerMoved", data => {
      this.onPlayerMoved(data);
    });
    
    this.socket.on("playerDied", id => {
      if (this.player.id === id) {
        this.player = null;
        // this.spawned = false;
        alert('umro si nube, F5');
      } else {
        Vue.delete(this.otherPlayers, id);
      }
    });
  },
  mounted() {
  },
  methods: {
    onPlayerMoved(data) {
      data = new Buffer(data).toString();
      // eslint-disable-next-line no-console
      var positionX = parseInt(data.substring(0, 4), 10);
      var positionY = parseInt(data.substring(4, 8), 10);
      var id = data.substring(8);

      if (this.player != null && id == this.player.id) {
        this.player.position.x = positionX;
        this.player.position.y = positionY;
      } else {
        var otherPlayer = this.otherPlayers[id];
        if (otherPlayer != null) {
          otherPlayer.position.x = positionX;
          otherPlayer.position.y = positionY;
        }
      }

      return id;
    },
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