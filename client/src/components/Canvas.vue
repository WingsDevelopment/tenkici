<template>
  <div class="hello">
    <p>{{position.x}}</p>
    <p>{{position.y}}</p>
    <v-stage :config="configKonva">
    <v-layer>
      <v-circle :config="configCircle"></v-circle>
    </v-layer>
  </v-stage>
  </div>

</template>

<script>
import io from 'socket.io-client';
// import player from '../viewModels/Player';
// import direction from '../viewModels/Direction';

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
      },
      configKonva: {
        width: 1960,
        height: 1000
      },
      configCircle: {
        x: 240,
        y: 200,
        radius: 20,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      },
      map: {65:false, 83: false, 68: false, 87:false }
    }
  },
  created() {
    this.socket = io("http://192.168.0.114:3000");
    this.socket.on("playerCreated", data =>{
      this.player = data;
      // console.log(this.player);
    });

  },

  mounted() {
    let self = this;
    window.addEventListener("keydown", function(e){
      // alert(e.keyCode);
      // if(e.keyCode in this.map){
      //   this.map[e.keyCode] = true;
      // }
      self.checkAndTranslate(e.keyCode);
    });
    // window.addEventListener("keyup", function(){
    //   for(var i = 0; i < this.map.length; i++){
    //     this.map[i] = false;
    //   }
    // });
    this.socket.on("position", data => {
      this.position = data;
    })
  },
  methods:{
    checkAndTranslate(keyCode){
      switch(keyCode){
        //A
        case 65:
          this.configCircle.x-=50;
          this.socket.emit("move", {id: this.player.id, direction: 0});
          this.socket.on("position", data => {
            this.configCircle.x = data.x;
            this.configCircle.y = data.y;
          });
          break;
          //s
        case 83:
          this.configCircle.y+=50;
          this.socket.emit("move", {id: this.player.id, direction: this.direction.Left});
          break;
          // d
        case 68:
          this.configCircle.x+=50;
          this.socket.emit("move", {id: this.player.id, direction: this.direction.Left});
          break;
          //w
        case 87:
          this.configCircle.y-=50;
          break;
      }
    }
    // move(e){
      
    // }
  }
}
</script>

<style scoped>
</style>