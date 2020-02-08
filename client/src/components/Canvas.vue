<template>
  <div>
    <v-stage :config="configKonva">
      <v-layer>
      <div ></div>
      <v-circle  :config="configCircle"></v-circle>
      <template v-if="otherPlayers!=null">
        <playerCanvas v-for="player in otherPlayers" v-bind:player="player" v-bind:key="player.id" ></playerCanvas>
      </template>
      <v-rect v-for="wall in walls" :key="wall.id" 
        :config="{
            x: wall.x,
            y: wall.y,
            width: wall.width,
            height: wall.height,
            fill: 'brown',
            shadowBlur: 10
          }"
      />
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
    otherPlayers : Object,
    walls: Array
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
        width: 1500,
        height: 730,
      },
      map: {65:false, 83: false, 68: false, 87:false },
      currentKeyDown: {}
    }
  },
  created() {    
  },
  computed: {
    configCircle(){
      return{
        x: this.player.position.x,
        y: this.player.position.y,
        radius: this.player.radius,
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
    window.addEventListener("keyup", function(e){
      self.keyUp(e.keyCode);
    });
  },
  methods:{
    checkAndTranslate(keyCode){
      switch(keyCode){
        //A
        case 65:
          if (this.currentKeyDown[keyCode] != direction.Left) {
            this.socket.emit("changeDirection", direction.Left);
            this.currentKeyDown[keyCode] = direction.Left;
          }
          break;
          //s
        case 83:
          if (this.currentKeyDown[keyCode] != direction.Down) {
            this.socket.emit("changeDirection", direction.Down);
            this.currentKeyDown[keyCode] = direction.Down;
          }
          break;
          // d
        case 68:
          if (this.currentKeyDown[keyCode] != direction.Right) {
            this.socket.emit("changeDirection", direction.Right);
            this.currentKeyDown[keyCode] = direction.Right;
          }
          break;
          //w
        case 87:
          if (this.currentKeyDown[keyCode] != direction.Up) {
            this.socket.emit("changeDirection", direction.Up);
            this.currentKeyDown[keyCode] = direction.Up;
          }
          break;
      }
    },
    keyUp(keyCode) {
      let direction = -1;
      this.currentKeyDown[keyCode] = -1;
      Object.keys(this.currentKeyDown).forEach((key) => {
          if (this.currentKeyDown[key] != -1) {
            direction = this.currentKeyDown[key];
          }
      });
      this.socket.emit("changeDirection", direction);
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

