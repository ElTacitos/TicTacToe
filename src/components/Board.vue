<template>
    <div class="board">
        <div class="line" v-for="line in board" :key="line.id">
            <div
                class="row"
                v-for="cell in line"
                :key="cell.id"
                v-on:click="cross(cell)"
                :class="{ notCheck: !cell.checked && !gameEnded }"
            >
                <p class="cell" :class="{ winCell: cell.winning }">
                    {{ cell.symbol }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { ICell } from "@/interface";
    import { State } from "vuex-class";
    import { Component, Prop, Vue, Watch } from "vue-property-decorator";

    const NUMBER_COLUMNS_LINES = 3;
    const MAX_PLAY = 9;
    const SECOND = 2;

    @Component
    export default class Board extends Vue {
        @State protected board!: ICell[][];
        @Prop(Boolean) protected needToReset!: boolean;

        protected curSymbol = "X";
        protected gameEnded = false;
        protected placed = 0;

        @Watch("needToReset")
        protected reset(): void {
            this.$store.commit("resetBoard");
            this.placed = 0;
            this.gameEnded = false;
            this.$emit("resetDone");
        }

        // Check a specific column for a win
        protected checkColumn(columnNumber: number): boolean {
            if (
                this.board[0][columnNumber].symbol !== " " &&
                this.board[0][columnNumber].symbol ===
                    this.board[1][columnNumber].symbol &&
                this.board[1][columnNumber].symbol ===
                    this.board[SECOND][columnNumber].symbol
            ) {
                this.gameEnded = true;
                this.$emit("endGame", this.board[0][columnNumber].symbol);
                this.board[0][columnNumber].winning = true;
                this.board[1][columnNumber].winning = true;
                this.board[SECOND][columnNumber].winning = true;
                return true;
            }
            return false;
        }

        // Check a specific line for a win
        protected checkLine(lineNumber: number): boolean {
            if (
                this.board[lineNumber][0].symbol !== " " &&
                this.board[lineNumber][0].symbol ===
                    this.board[lineNumber][1].symbol &&
                this.board[lineNumber][1].symbol ===
                    this.board[lineNumber][SECOND].symbol
            ) {
                this.gameEnded = true;
                this.$emit("endGame", this.board[lineNumber][0].symbol);
                this.board[lineNumber][0].winning = true;
                this.board[lineNumber][1].winning = true;
                this.board[lineNumber][SECOND].winning = true;
                return true;
            }
            return false;
        }

        // Check the left top conner to bottom right conner diagonal for a win
        // eslint-disable-next-line @typescript-eslint/member-ordering
        protected checkLRDiagonal(): boolean {
            if (
                this.board[1][1].symbol !== " " &&
                this.board[0][0].symbol === this.board[1][1].symbol &&
                this.board[1][1].symbol === this.board[SECOND][SECOND].symbol
            ) {
                this.gameEnded = true;
                this.$emit("endGame", this.board[1][1].symbol);
                this.board[0][0].winning = true;
                this.board[1][1].winning = true;
                this.board[SECOND][SECOND].winning = true;
                return true;
            }
            return false;
        }

        // Check the right top conner to bottom left conner diagonal for a win
        // eslint-disable-next-line @typescript-eslint/member-ordering
        protected checkRLDiagonal(): boolean {
            if (
                this.board[1][1].symbol !== " " &&
                this.board[0][SECOND].symbol === this.board[1][1].symbol &&
                this.board[1][1].symbol === this.board[SECOND][0].symbol
            ) {
                this.gameEnded = true;
                this.$emit("endGame", this.board[1][1].symbol);
                this.board[0][SECOND].winning = true;
                this.board[1][1].winning = true;
                this.board[SECOND][0].winning = true;
                return true;
            }
            return false;
        }

        // Scan the board to see if a player won or if the game is over
        protected checkWin(): void {
            for (let i = 0; i < NUMBER_COLUMNS_LINES; i += 1) {
                if (this.checkLine(i)) return;
                if (this.checkColumn(i)) return;
            }
            if (this.checkLRDiagonal()) return;
            if (this.checkRLDiagonal()) return;
            if (this.placed === MAX_PLAY) {
                this.gameEnded = true;
                this.$emit("endGame", " ");
            }
        }

        // Cross off a cell in the board
        protected cross(cell: ICell): void {
            if (!this.gameEnded && !cell.checked) {
                cell.symbol = this.curSymbol;
                cell.checked = true;
                this.placed += 1;
                if (this.curSymbol === "X") this.curSymbol = "O";
                else this.curSymbol = "X";
                this.checkWin();
            }
        }
    }
</script>

<style scoped>
    .board {
        border-width: 2px;
        border-color: #1a2f37;
        border-style: solid;
    }
    .line {
        display: flex;
        flex-direction: row;
    }
    .row {
        border-width: 2px;
        border-color: #1a2f37;
        border-style: solid;
        display: flex;
        flex-direction: column;
        width: 10em;
        height: 10em;
        max-height: 10em;
        justify-content: center;
    }

    .cell {
        font-size: 5em;
        color: #d7674b;
    }
    .notCheck:hover {
        background-color: #345e6f;
    }
    .winCell {
        color: #ff9478;
    }
    @media only screen and (max-width: 600px) {
        .row {
            border-width: 2px;
            border-color: #23404b;
            border-style: solid;
            display: flex;
            flex-direction: column;
            width: 7em;
            height: 7em;
            max-height: 7em;
            justify-content: center;
        }
    }
</style>
