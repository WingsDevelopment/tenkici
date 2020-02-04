<template>
  <div class="hello">
    <p>{{position.x}}</p>
    <p>{{position.y}}</p>
    <v-stage :config="configKonva">
    <v-layer>
      <div ></div>
      <v-circle  :config="configCircle"></v-circle>
      <template v-if="otherPlayers!=null">
        <playerCanvas v-for="player in otherPlayers" v-bind:player="player" v-bind:key="player.id" ></playerCanvas>
      </template>
    </v-layer>
  </v-stage>
  </div>

</template>

<script>
// import io from 'socket.io-client';
// import player from '../viewModels/Player';
import direction from '../viewModels/Direction';
import playerCanvas from './Player.vue';

export default {
  name: 'Canvas',
  props: {
    socket : Object,
    player : Object,
    otherPlayers : Object
  },
  components: {
    playerCanvas
  },
  data() {
    return {
      position: {
        x: 0,
        y: 0
      },
      configKonva: {
        width: 1960,
        height: 1000
      },
      map: {65:false, 83: false, 68: false, 87:false }
    }
  },
  created() {    
  },
  computed: {
    configCircle(){
      return{
        x: this.player.position.x,
        y: this.player.position.y,
        radius: 20,
        fill: this.player.color,
        stroke: "black",
        strokeWidth: 4
        }
      },
    configCirclesForOther(id){
      // eslint-disable-next-line no-console
      console.log(this.otherPlayers);
      // eslint-disable-next-line no-console
      console.log(id);
      
      return{
        x: this.otherPlayers[id].position.x,
        y: this.otherPlayers[id].position.y,
        radius: 20,
        fill: this.otherPlayers[id].color,
        stroke: "black",
        strokeWidth: 4
        }
    },
  },
  mounted() {
    let self = this;
    window.addEventListener("keydown", function(e){
      
      self.checkAndTranslate(e.keyCode);
    });
  },
  methods:{
    
    checkAndTranslate(keyCode){
      switch(keyCode){
        //A
        case 65:
          this.socket.emit("move", {id: this.player.id, direction: direction.Left});
          break;
          //s
        case 83:
          this.socket.emit("move", {id: this.player.id, direction: direction.Down});
          break;
          // d
        case 68:
          this.socket.emit("move", {id: this.player.id, direction: direction.Right});
          break;
          //w
        case 87:
          this.socket.emit("move", {id: this.player.id, direction: direction.Up});
          break;
      }
    }
  }
  // alert(e.keyCode);
      // if(e.keyCode in this.map){
      //   this.map[e.keyCode] = true;
      // }

  // window.addEventListener("keyup", function(){
    //   for(var i = 0; i < this.map.length; i++){
    //     this.map[i] = false;
    //   }
    // });
}
</script>

<style scoped>
</style>

