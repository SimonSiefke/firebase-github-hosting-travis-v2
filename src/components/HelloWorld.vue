<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Installed CLI Plugins</h3>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org/en/essentials/getting-started.html" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org/en/intro.html" target="_blank">vuex</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank">vue-devtools</a>
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org/en" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
