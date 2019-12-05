// 异步加载的高德地图插件
export default function MapLoader() {
  return new Promise((resolve, reject) => {
    if (window.AMap) { // 已经加载成功，不重复加载
      resolve(window.AMap)
    } else {
      window.amapinit = () => {
        resolve(window.AMap)
      }
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.charset = 'utf-8'
      script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=你自己的key值&callback=amapinit'
      script.onerror = reject
      document.head.appendChild(script)
    }
  })
  // promise.all中的then的成功回调返回rusult是一个数组，分别代表p1和p2的结果，这里只返回p1的结果（map对象）就可
}
