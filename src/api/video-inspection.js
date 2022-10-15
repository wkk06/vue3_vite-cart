import axios from '@/libs/api.request'

// 根据车站id获取巡检任务列表
export const getVideoTaskListByStationId = (stationId) => {
  return axios.request({
    url: 'api/cart',
    method: 'get',
    params: {
      stationId: stationId
    }
  })
}