<template>
  <div class="board">
    <div class="line" v-for="line in board" :key="line">
      <div class="cell" v-for="cell in line" :key="cell">
        <p v-on:click="check(cell)">{{cell.symbol}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  props: {
    curSymbol: String,
  },
  data() {
    return {
      board: [
        [{symbol: '_', checked: false},{symbol: '_', checked: false},{symbol: '_', checked: false}],
        [{symbol: '_', checked: false},{symbol: '_', checked: false},{symbol: '_', checked: false}],
        [{symbol: '_', checked: false},{symbol: '_', checked: false},{symbol: '_', checked: false}],
      ],
      placed: 0,
      gameEnded: false,
      winner: "",
    }
  },
  methods:{
    check: function (cell){
      if (!this.gameEnded && !cell.checked) {
        cell.symbol = this.curSymbol;
        cell.checked = true;
        this.placed++;
        if (this.curSymbol == "X")
          this.curSymbol = "O";
        else
          this.curSymbol = "X";
        this.checkWin();
      }
    },
    checkWin: function (){
      for (let i = 0; i < 3; ++ i) {
        if ((this.board[i][0].symbol != "_") && (this.board[i][0].symbol == this.board[i][1].symbol)
            && (this.board[i][1].symbol == this.board[i][2].symbol)) {
          this.gameEnded = true;
          this.winner = this.board[i][0].symbol;
        }
        if ((this.board[0][i].symbol != "_") && (this.board[0][i].symbol == this.board[1][i].symbol)
            && (this.board[1][i].symbol == this.board[2][i].symbol)) {
          this.gameEnded = true;
          this.winner = this.board[i][0].symbol;
        }
      }
      if ((this.board[1][1].symbol != "_") && (this.board[0][0].symbol == this.board[1][1].symbol)
          && (this.board[1][1].symbol == this.board[2][2].symbol)) {
        this.gameEnded = true;
        this.winner = this.board[1][1].symbol;
      }
      if ((this.board[1][1].symbol != "_") && (this.board[0][2].symbol == this.board[1][1].symbol)
          && (this.board[1][1].symbol == this.board[2][0].symbol)) {
        this.gameEnded = true;
        this.winner = this.board[1][1].symbol;
      }
      if (this.placed == 9)
        this.gameEnded = true;
    }
  }
}
</script>

<style scoped>
.board{
  border-width: 2px;
  border-color: red;
  border-style: solid;
}
.line{
  display: flex;
  flex-direction: row;
}
.cell{
  border-width: 2px;
  border-color: green;
  border-style: solid;
  display: flex;
  flex-direction: column;
}
</style>
