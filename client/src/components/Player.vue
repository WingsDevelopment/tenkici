<template>
  <div class="hello">
    <v-circle  :config="configCircle"></v-circle>
  </div>
</template>

<script>
export default {
    name: 'Canvas',
    props: {
        socket : Object,
        player : Object,
        // otherPlayers : Object
    },
    computed:{
        configCircle(){
            return{
                x: this.player.position.x,
                y: this.player.position.y,
                radius: this.player.radius,
                fill: this.player.color,
                stroke: this.player.isInvisible ? "" : "black",
                strokeWidth: this.player.isInvisible ? 0 : 4,
                shadowBlur: 15
            }
        },
    }
}
</script>