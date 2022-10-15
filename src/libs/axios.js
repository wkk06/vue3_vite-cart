import axios from 'axios'
import { useStorage } from "vue3-storage";
import qs from 'qs'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'
import router from '@/router'

// 读取Blob转为String
function readBlobAsStr(blob) {
  return new Promise((resolve, reject) => {
    // // 下面这种方式在ie上不兼容
    // let blobStr = await (new Response(data)).text()
    let reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsText(blob, 'utf-8')
  })
}

// 读取Blob转为json
async function readBlobAsJson(blob) {
  let blobStr = await readBlobAsStr(blob)
  return JSON.parse(blobStr)
}
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      // axios设置paramsSerializer解决在自己encodeURIComponent参数时参数为null或undefined的问题
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'brackets' })
      }
    }
    return config
  }

  interceptors(instance) {
    const storage = useStorage();
    // 请求拦截
    instance.interceptors.request.use(request => {
      const token = storage.getStorageSync("token")
      if (token) {
        request.headers['X-Access-Token'] = token
      }
      request.headers['Content-type'] = 'application/json;charset=UTF-8'
      return request
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(async response => {
      let data = response.data
      if (data instanceof Blob && data.type && data.type.indexOf('application/json') > -1) {
        data = await readBlobAsJson(data)
      }
      if (data.success || data.code == 200) {
        return data
      } else if (data instanceof Blob) {
        /**
         * 只需要判断是否是Blob对象, 是则直接返回二进制流
         * response.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8' ||
         * response.headers['content-type'] === 'application/vnd.ms-word;charset=UTF-8' ||
         * response.headers['content-type'] === 'application/x-download;charset=UTF-8'
         */
        return response
      } else {
        return Promise.reject(data)
      }

    }, error => {
      // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '错误请求'
            break
          case 401:
            // 如果token过期或者不存在则跳转到登录页面            
            storage.removeStorageSync("token")
            router.replace({
              path: '/login'              
            });
            // message.error('未授权，请重新登录')
            // error.message = '未授权，请重新登录'
            break
          case 403:
            error.message = '拒绝访问'
            break
          case 404:
            error.message = '请求错误，未找到资源'
            break
          case 405:
            error.message = '请求方法未允许'
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器端出错'
            break
          case 501:
            error.message = '网络未实现'
            break
          case 502:
            error.message = '网络错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网络超时'
            break
          case 505:
            error.message = 'http版本不支持请求'
            break
          default:
            error.message = `链接错误${error.response.status}`
        }
      } else {
        error.message = '链接服务器失败'
      }
      return Promise.reject(error)
    })
  }

  request(options) {
    const instance = axios.create()
    // 解构对象
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
