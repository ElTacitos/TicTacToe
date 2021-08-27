<template>
    <div class="board">
        <div class="line">
            <cell v-bind:coords="{ column: 0, line: 0 }" />
            <cell v-bind:coords="{ column: 0, line: 1 }" />
            <cell v-bind:coords="{ column: 0, line: 2 }" />
        </div>
        <div class="line">
            <cell v-bind:coords="{ column: 1, line: 0 }" />
            <cell v-bind:coords="{ column: 1, line: 1 }" />
            <cell v-bind:coords="{ column: 1, line: 2 }" />
        </div>
        <div class="line">
            <cell v-bind:coords="{ column: 2, line: 0 }" />
            <cell v-bind:coords="{ column: 2, line: 1 }" />
            <cell v-bind:coords="{ column: 2, line: 2 }" />
        </div>
    </div>
</template>

<script lang="ts">
    import cell from "@/components/Cell.vue";
    import { ICell } from "@/interface";
    import { Component, Prop, Vue, Watch } from "vue-property-decorator";
    import { Getter, State } from "vuex-class";

    const NUMBER_COLUMNS_LINES = 3;
    const MAX_PLAY = 9;
    const SECOND = 2;
    @Component({
        components: {
            cell,
        },
    })
    export default class Board extends Vue {
        @State protected board!: ICell[][];
        @State protected curSymbol!: string;
        @State protected gameEnded!: boolean;
        @Getter("getNbPlaced") protected getNbPlaced!: () => number;
        @Prop(Boolean) protected needToReset!: boolean;

        protected get nbPlaced(): number {
            return this.getNbPlaced();
        }

        // Scan the board to see if a player won or if the game is over
        @Watch("nbPlaced")
        protected checkWin(): void {
            console.log("CHCEK");
            for (let i = 0; i < NUMBER_COLUMNS_LINES; i += 1) {
                if (this.checkLine(i)) return;
                if (this.checkColumn(i)) return;
            }
            if (this.checkLRDiagonal()) return;
            if (this.checkRLDiagonal()) return;
            if (this.nbPlaced === MAX_PLAY) {
                this.$store.commit("toggleEndGame");
                this.$emit("endGame", " ");
            }
        }

        @Watch("needToReset")
        protected reset(): void {
            this.$store.commit("resetBoard");
            this.$store.commit("replay");
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
                this.$store.commit("toggleEndGame");
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
                this.$store.commit("toggleEndGame");
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
                this.$store.commit("toggleEndGame");
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
                this.$store.commit("toggleEndGame");
                this.$emit("endGame", this.board[1][1].symbol);
                this.board[0][SECOND].winning = true;
                this.board[1][1].winning = true;
                this.board[SECOND][0].winning = true;
                return true;
            }
            return false;
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
