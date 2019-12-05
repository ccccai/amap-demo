<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>

      <!-- 引用地图组件 -->
      <a-map
        id="amapLL"
        :center="mapCenter"
        :markers="mapMarkers"
        :zoom="7"
        width="100%"
      />
    </div>
    <router-view />
  </div>
</template>
<script>
import AMap from '@/components/AMap/amap'
export default {
  components: {
    AMap
  },
  data() {
    return {
      mapCenter: [116.406315, 39.908775],
      mapMarkers: [
        {
          lat: '39.927761',
          lon: '116.391467'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
