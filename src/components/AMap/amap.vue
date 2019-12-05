<template>
  <div :id="id" class="amap-container" :style="{height: height,width: width}" />
</template>
<script>
import amapLoader from '@/assets/AMap/AMap.js'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    zoom: {
      type: Number,
      default: 12
    },
    markers: {
      type: Array,
      default: () => {
        return []
      }
    },
    center: {
      type: Array,
      default: () => {
        return {}
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      map: null
    }
  },
  watch: {
    // 当中心改变的时候，重新设置zomm和中心点
    center(newData, oldData) {
      if (newData !== oldData) {
        document.getElementById(this.id).scrollIntoView()
        this.map.setZoomAndCenter(this.zoom, newData)
      }
    },
    // 当标记点改变的时候，重载地图
    markers(newData, oldData) {
      if (newData !== oldData) {
        this.createMap()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createMap()
    })
  },
  beforeDestroy() {
    if (!this.map) {
      return
    }
    // 销毁地图，并清空地图容器
    this.map.destroy()
    this.map = null
  },
  methods: {
    /* eslint-disable */
    createMap() {
      this.$loading.show()
      amapLoader().then(async AMap => {
        this.$loading.hide()
        console.log('地图加载成功')
        this.map = new AMap.Map(this.id, { // 初始化地图
          center: this.center,
          resizeEnable: true,
          pitch: 35, // 地图俯仰角度，有效范围 0 度- 83 度
          viewMode:'3D' // 地图模式
        })
        this.map.on('complete', () => { // 地图图块加载完成后触发
          AMap.plugin(['AMap.ToolBar'], () => { // 加载工具栏
            this.map.addControl(new AMap.ToolBar())
          })
          this.addMarkers(AMap) // 增加点坐标
        })
      }).catch(err => {
        this.$loading.hide()
        console.log('地图加载失败', err)
      })
    },
    compare(property) {
      return (a, b) => {
        return Number(a[property]) - Number(b[property]);
      }
    },
    addMarkers(AMap) {
      const markers = this.markers.sort(this.compare('weight'))
      markers.forEach((item, index) => {
        const marker = new AMap.CircleMarker({
          center: [item.lon, item.lat],
          radius: 10 + index * 6,//3D视图下，CircleMarker半径不要超过64px
          strokeColor: 'white',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: 'rgb(246,145,6, 1)',
          fillOpacity: 0.2 * (index + 1),
          zIndex: 10,
          bubble: true,
          cursor: 'pointer',
          clickable: true
        })
        this.map.add(marker)
      })
      this.map.setFitView()
    }
  }
}
</script>
<style lang="sass">

</style>
