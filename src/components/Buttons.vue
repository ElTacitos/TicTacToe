<template>
    <div>
        <button v-on:click="$emit('resetBoard')">Replay</button>
        <button
            v-on:click="
                $emit('resetBoard');
                $emit('resetScore');
            "
        >
            Reset
        </button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class Buttons extends Vue {
    }
</script>

<style scoped>
    button {
        font-size: 3em;
        margin: 1em;
        padding: 0.2em;
        color: #f4a261;
        background-color: #1a2f37;
        border-style: none;
    }
    button:active {
        background-color: #0c161a;
    }

    /*@media only screen and (max-width: 400px) {
        button {
            margin: 0.5em;
            font-size: 2em;
        }
    }*/
</style>
