<template>
  <div id="app">
    <Board :cur-symbol="curSymbol"/>
  </div>
</template>

<script>
import Board from "@/components/Board";

export default {
  name: 'App',
  components: {
    Board,
  },
  data(){
    return{
      curSymbol: "X"
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
