<template>
  <div id="app">
    <div class="top">
      <Board :cur-symbol="curSymbol" v-on:endGame="endGame" :needToReset="reset"
            v-on:resetDone="resetDone"/>
      <SideInfos :win-msg="this.winMsg" :game-ended="this.gameEnded"
               :s-p1="this.sP1" :s-p2="this.sP2"></SideInfos>
    </div>
    <Buttons class="bottom" v-on:resetBoard="resetBoard" v-on:resetScore="resetScore" />
  </div>
</template>

<script>
import Board from "@/components/Board";
import SideInfos from "@/components/SideInfos";
import Buttons from "@/components/Buttons";

export default {
  name: 'App',
  components: {
    Buttons,
    SideInfos,
    Board,
  },
  data(){
    return{
      curSymbol: "X",
      winMsg: '',
      gameEnded: false,
      sP1: 0,
      sP2: 0,
      reset: false,
    }
  },
  methods:{
    //Find winner and update message and score
    endGame: function (winner){
      switch (winner) {
        case ' ':
          this.winMsg = "Draw";
          break;
        case 'X':
          this.winMsg = "X Won";
          this.sP1++;
          break;
        case 'O':
          this.winMsg = "Y Won";
          this.sP2++;
          break;
        default:
          this.winMsg = "What is this " + winner;
      }
      this.gameEnded = true;
    },
    //Clear the board
    resetBoard: function (){
      this.winMsg = "";
      this.reset = true;
    },
    //Change reset value
    resetDone: function (){
      this.reset = false;
    },
    //Reset the score
    resetScore: function (){
      this.sP1 = 0;
      this.sP2 = 0;
    }
  }
}
</script>

<style>
body{
  background-color: #264653;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
.top{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
