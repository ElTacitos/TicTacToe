import { ICoordinates } from "@/interface";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        board: [
            [
                { checked: false, symbol: " ", winning: false },
                { checked: false, symbol: " ", winning: false },
                { checked: false, symbol: " ", winning: false },
            ],
            [
                { checked: false, symbol: " ", winning: false },
                { checked: false, symbol: " ", winning: false },
                { checked: false, symbol: " ", winning: false },
            ],
            [
                { checked: false, symbol: " ", winning: false },
                { checked: false, symbol: " ", winning: false },
                { checked: false, symbol: " ", winning: false },
            ],
        ],
        curSymbol: "X",
        gameEnded: false,
        nbPlaced: 0,
        toggleResetCells: 0,
    },

    // eslint-disable-next-line sort-keys
    mutations: {
        changeSymbol(state): void {
            if (state.curSymbol === "X") state.curSymbol = "O";
            else state.curSymbol = "X";
        },
        increaseNbPlayed(state): void {
            state.nbPlaced += 1;
        },
        replay(state): void {
            state.gameEnded = false;
            state.nbPlaced = 0;
        },
        resetBoard(state): void {
            state.board = [
                [
                    { checked: false, symbol: " ", winning: false },
                    { checked: false, symbol: " ", winning: false },
                    { checked: false, symbol: " ", winning: false },
                ],
                [
                    { checked: false, symbol: " ", winning: false },
                    { checked: false, symbol: " ", winning: false },
                    { checked: false, symbol: " ", winning: false },
                ],
                [
                    { checked: false, symbol: " ", winning: false },
                    { checked: false, symbol: " ", winning: false },
                    { checked: false, symbol: " ", winning: false },
                ],
            ];
            state.toggleResetCells += 1;
        },
        toggleEndGame(state): void{
            state.gameEnded = !state.gameEnded;
        },
        updateCell(state, payload): void {
            // eslint-disable-next-line
            state.board[payload.line][payload.column] = payload.newCell;
        },
    },

    // eslint-disable-next-line sort-keys
    getters: {
        // Need to create a type for the cells info or find a way to store a list on Cell
        // Straight away
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        getCell: (state) => (coords: ICoordinates) => {
            return state.board[coords.line][coords.column];
        },
    },
});
