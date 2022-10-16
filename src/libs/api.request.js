import axios from './axios'
// 创建axios实例
const service =new  axios(process.env.NODE_ENV==='production'?window.AppConfig.API_URL:import.meta.env.VITE_BASE_API)
export default service
