import axios from '@/libs/api.request'

// 根据商品列表
export const getGoodList = () => {
  return axios.request({
    url: 'api/cart',
    method: 'get',
  })
}