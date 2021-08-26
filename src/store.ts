import { ICoordiantes } from "@/interface";
// Import { ICell } from "@/interface";
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
    },

    // eslint-disable-next-line sort-keys
    mutations: {
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
        },
        updateCell(state, payload): void {
            // eslint-disable-next-line
            state.board[payload.line][payload.column] = payload.newCell;
        },
    },

    // eslint-disable-next-line sort-keys
    getters: {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        getCell: (state) => (coords: ICoordiantes) => {
            return state.board[coords.line][coords.column];
        },
    },
});
