<template>
    <div>
        <div>
            <p>Score:</p>
            <p>{{ scoreP1 }} - {{ scoreP2 }}</p>
            <p class="winMessage">{{ winMsg }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class SideInfos extends Vue {
        @Prop(Boolean) protected gameEnded!: boolean;
        @Prop(Number) protected scoreP1!: number;
        @Prop(Number) protected scoreP2!: number;
        @Prop(String) protected winMsg!: string;
    }
</script>

<style scoped>
    p {
        color: #f4a261;
        font-size: 4em;
    }

   /* @media only screen and (max-width: 600px) {
        p {
            color: #f4a261;
            font-size: 2em;
            padding-bottom: 0px;
            margin: 0.5em;
        }
        .winMessage {
            font-size: 1em;
        }
    }*/
</style>
