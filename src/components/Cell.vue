<template>
    <p
        class="cell"
        :class="{
            winCell: this.cell.winning,
            notCheck: !this.cell.checked && !this.gameEnded,
        }"
        v-on:click="crossCell"
    >
        {{ this.cell.symbol }}
    </p>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "vue-property-decorator";
    import { Getter, State } from "vuex-class";
    import { ICell, ICoordinates } from "@/interface";

    @Component
    export default class Cell extends Vue {
        @Prop() public coords!: ICoordinates;
        @State protected curSymbol!: string;
        @State protected gameEnded!: boolean;
        @Getter protected getNbPlaced!: () => number;
        @State protected toggleResetCells!: boolean;

        public cell!: ICell;

        @Watch("toggleResetCells")
        protected resetCell(): void {
            this.cell.checked = false;
            this.cell.symbol = " ";
            this.cell.winning = false;
            this.updateStoreCell();
        }

        public created(): void {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            this.cell = this.$store.getters.getCell(this.coords);
        }

        // Cross off a cell in the board
        protected crossCell(): void {
            if (!this.gameEnded && !this.cell.checked) {
                this.cell.symbol = this.curSymbol;
                this.cell.checked = true;
                this.$store.commit("changeSymbol");
                this.updateStoreCell();
            }
            console.log(this.getNbPlaced());
        }

        private updateStoreCell(): void {
            this.$store.commit("updateCell", {
                column: this.coords.column,
                line: this.coords.line,
                newCell: this.cell,
            });
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
