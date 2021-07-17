<template>
<div>
  <button v-on:click="resetBoard">Replay</button>
  <button v-on:click="resetAll">Reset</button>
</div>
</template>

<script>
export default {
  name: "Buttons",
  methods:{
    resetBoard: function (){
      this.$emit("resetBoard");
    },
    resetAll: function (){
      this.$emit("resetScore");
      this.resetBoard();
    }
  }
}
</script>

<style scoped>
button{
  font-size: 3em;
  margin: 1em;
  padding: 0.2em;
  color: #F4A261;
  background-color: #1A2F37;
  border-style: none;
}
button:active{
  background-color: #0c161a;
}

@media only screen and (max-width: 400px) {
  button{
    margin: 0.5em;
    font-size: 2em;
  }
}

</style>
