import Vue from "vue";
import Vuex from "vuex";
import { ICell, ICoordinates } from "@/interface";

Vue.use(Vuex);

interface IState {
    board: ICell[][];
    curSymbol: string;
    gameEnded: boolean;
    toggleResetCells: number;
}

interface IPayloadCell {
    column: number;
    line: number;
    newCell: ICell;
}

export default new Vuex.Store<IState>({
    getters: {
        getCell:
            (state): ((coords: ICoordinates) => ICell) =>
            (coords: ICoordinates): ICell => {
                return state.board[coords.line][coords.column];
            },
        getNbPlaced:
            (state): (() => number) =>
            (): number => {
                let count = 0;
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                for (let i = 0; i < 3; i += 1) {
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    for (let j = 0; j < 3; j += 1) {
                        if (state.board[i][j].checked) count += 1;
                    }
                }
                return count;
            },
    },

    mutations: {
        changeSymbol(state): void {
            if (state.curSymbol === "X") state.curSymbol = "O";
            else state.curSymbol = "X";
        },
        replay(state): void {
            state.gameEnded = false;
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
        toggleEndGame(state): void {
            state.gameEnded = !state.gameEnded;
        },
        updateCell(state, payload: IPayloadCell): void {
            state.board[payload.line][payload.column] = payload.newCell;
        },
    },

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
        toggleResetCells: 0,
    },
});
