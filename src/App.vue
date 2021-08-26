<template>
    <div id="app">
        <div class="top">
            <board
                v-on:endGame="endGame"
                :needToReset="reset"
                v-on:resetDone="resetDone"
            />
            <sideInfos
                :win-msg="this.winMsg"
                :game-ended="this.gameEnded"
                :score-p1="this.scoreP1"
                :score-p2="this.scoreP2"
            ></sideInfos>
        </div>
        <buttons
            class="bottom"
            v-on:resetBoard="resetBoard"
            v-on:resetScore="resetScore"
        />
    </div>
</template>

<script lang="ts">
    import board from "@/components/Board.vue";
    import buttons from "@/components/Buttons.vue";
    import sideInfos from "@/components/SideInfos.vue";
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        components: {
            board,
            buttons,
            sideInfos,
        },
    })
    export default class App extends Vue {
        protected gameEnded = false;
        protected reset = false;
        protected scoreP1 = 0;
        protected scoreP2 = 0;
        protected winMsg = "";

        // Find winner and update message and score
        protected endGame(winner: string): void {
            switch (winner) {
                case " ":
                    this.winMsg = "Draw";
                    break;
                case "X":
                    this.winMsg = "X Won";
                    this.scoreP1 += 1;
                    break;
                case "O":
                    this.winMsg = "O Won";
                    this.scoreP2 += 1;
                    break;
                default:
                    this.winMsg = `Who is this ${winner}`;
            }
            this.gameEnded = true;
        }

        // Clear the board
        protected resetBoard(): void {
            this.winMsg = "";
            this.reset = true;
        }

        // Change the reset value back to false
        protected resetDone(): void {
            this.reset = false;
        }

        // Reset the score
        protected resetScore(): void {
            this.scoreP1 = 0;
            this.scoreP2 = 0;
        }
    }
</script>

<style>
    body {
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
    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
    }
    /*@media only screen and (max-width: 600px) {
        #app {
            margin-top: 15px;
        }
    }*/
</style>
