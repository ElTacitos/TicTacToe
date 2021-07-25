<template>
  <div class="board">
    <div class="line" v-for="line in board" :key="line.id">
      <div class="row" v-for="cell in line" :key="cell.id" v-on:click="cross(cell)"
            :class="{ notCheck: !cell.checked && !gameEnded, winCell: cell.winning}">
        <p class="cell">{{cell.symbol}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  props: {
    needToReset: Boolean,
  },
  watch:{
    //Use needToReset to know when to reset
    needToReset: function (){
      this.board = [[{symbol: ' ', checked: false, winning: false},{symbol: ' ', checked: false, winning: false},
        {symbol: ' ', checked: false, winning: false}],
        [{symbol: ' ', checked: false, winning: false},{symbol: ' ', checked: false, winning: false},
          {symbol: ' ', checked: false, winning: false}],
        [{symbol: ' ', checked: false, winning: false},{symbol: ' ', checked: false, winning: false},
          {symbol: ' ', checked: false, winning: false}]];
      this.placed = 0;
      this.gameEnded = false;
      this.$emit('resetDone');
    }
  },
  data() {
    return {
      board: [
          [{symbol: ' ', checked: false, winning: false},{symbol: ' ', checked: false, winning: false},
        {symbol: ' ', checked: false, winning: false}],
        [{symbol: ' ', checked: false, winning: false},{symbol: ' ', checked: false, winning: false},
          {symbol: ' ', checked: false, winning: false}],
        [{symbol: ' ', checked: false, winning: false},{symbol: ' ', checked: false, winning: false},
          {symbol: ' ', checked: false, winning: false}]
      ],
      placed: 0,
      gameEnded: false,
      curSymbol: "X",
    }
  },
  methods:{
    //Cross of a cell  in the board
    cross: function (cell){
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
    //Check if any player won or if the board is full
    checkWin: function (){
      for (let i = 0; i < 3; ++ i) {
        if ((this.board[i][0].symbol != " ") && (this.board[i][0].symbol == this.board[i][1].symbol)
            && (this.board[i][1].symbol == this.board[i][2].symbol)) {
          this.gameEnded = true;
          this.$emit('endGame',this.board[i][0].symbol);
          this.board[i][0].winning = true;
          this.board[i][1].winning = true;
          this.board[i][2].winning = true;
          return;
        }
        if ((this.board[0][i].symbol != " ") && (this.board[0][i].symbol == this.board[1][i].symbol)
            && (this.board[1][i].symbol == this.board[2][i].symbol)) {
          this.gameEnded = true;
          this.$emit('endGame',this.board[0][i].symbol);
          this.board[0][i].winning = true;
          this.board[1][i].winning = true;
          this.board[2][i].winning = true;
          return;
        }
      }
      if ((this.board[1][1].symbol != " ") && (this.board[0][0].symbol == this.board[1][1].symbol)
          && (this.board[1][1].symbol == this.board[2][2].symbol)) {
        this.gameEnded = true;
        this.$emit('endGame',this.board[1][1].symbol);
        this.board[0][0].winning = true;
        this.board[1][1].winning = true;
        this.board[2][2].winning = true;
        return;
      }
      if ((this.board[1][1].symbol != " ") && (this.board[0][2].symbol == this.board[1][1].symbol)
          && (this.board[1][1].symbol == this.board[2][0].symbol)) {
        this.gameEnded = true;
        this.$emit('endGame',this.board[1][1].symbol);
        this.board[0][2].winning = true;
        this.board[1][1].winning = true;
        this.board[2][0].winning = true;
        return;
      }
      if (this.placed == 9) {
        this.gameEnded = true;
        this.$emit('endGame',' ');
        return;
      }
    },
  }
}
</script>

<style scoped>
.board{
  border-width: 2px;
  border-color: #1A2F37;
  border-style: solid;
}
.line{
  display: flex;
  flex-direction: row;
}
.row{
  border-width: 2px;
  border-color: #1A2F37;
  border-style: solid;
  display: flex;
  flex-direction: column;
  width: 10em;
  height: 10em;
  justify-content: center;
}

.cell{
  font-size: 5em;
  color: #E76F51;
}
.notCheck:hover{
  background-color: #345E6F;
}
.winCell{
  background-color: #345E6F;
}
@media only screen and (max-width: 600px) {
  .row{
    border-width: 2px;
    border-color: #23404B;
    border-style: solid;
    display: flex;
    flex-direction: column;
    width: 7em;
    height: 7em;
    justify-content: center;
  }
}

</style>
