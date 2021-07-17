<template>
  <div>
    <div>
      <p>Score:</p>
      <p>{{sP1}} - {{sP2}}</p>
      <p class="winMessage">{{winMsg}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideInfos",
  props:{
    winMsg: String,
    gameEnded: Boolean,
    sP1: Number,
    sP2: Number,
  }
}
</script>

<style scoped>
p{
  color: #F4A261;
  font-size: 4em;
}

@media only screen and (max-width: 600px) {
  p{
    color: #F4A261;
    font-size: 2em;
    padding-bottom: 0px;
    margin: 0.5em;
  }
  .winMessage{
    font-size: 1em;
  }
}
</style>
