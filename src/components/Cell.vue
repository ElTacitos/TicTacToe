<template>
    <p
        class="cell"
        :class="{
            winCell: this.winning,
            notCheck: !this.checked && !this.gameEnded,
        }"
        v-on:click="crossCell"
    >
        {{ this.symbol }}
    </p>
</template>

<script lang="ts">
    import { State } from "vuex-class";
    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class Cell extends Vue {
        @Prop(Number) public column!: number;
        @Prop(Number) public line!: number;
        @State protected curSymbol!: string;
        @State protected gameEnded!: boolean;
        @State protected nbPlaced!: number;

        public checked = false;
        public symbol = "";
        public winning = false;

        // Cross off a cell in the board
        protected crossCell(): void {
            if (!this.gameEnded && !this.checked) {
                this.symbol = this.curSymbol;
                this.checked = true;
                this.$store.commit("increaseNbPlayed");
                this.$store.commit("changeSymbol");
                this.$store.commit("updateCell", {
                    column: this.column,
                    line: this.line,
                    newCell: {
                        checked: this.checked,
                        symbol: this.symbol,
                        winning: this.winning,
                    },
                });
            }
        }
    }
</script>

<style scoped>
    .cell {
        margin: 0px;
        border-width: 2px;
        border-color: #1a2f37;
        border-style: solid;
        display: flex;
        flex-direction: column;
        width: 2em;
        height: 2em;
        max-height: 8em;
        justify-content: center;
        font-size: 5em;
        color: #d7674b;
    }
    .notCheck:hover {
        background-color: #345e6f;
    }
    .winCell {
        color: #ff9478;
    }
</style>
