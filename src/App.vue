<script setup>
import {getGoodList} from '@/api/goods.js'

import {reactive, computed} from 'vue'

let goodsList = reactive([])

let fullChecked = computed(()=> {
  return goodsList.every(item=> {
    return item.goods_state
  })
})

let totalPrice = computed(()=> {
  return goodsList.filter(item=> item.goods_state).reduce((amount,item)=> {
    return amount+=item.goods_price*item.goods_count
  },0)
})
let totalNum = computed(()=> {
  return goodsList.filter(item=> item.goods_state).reduce((amount,item)=> {
    return amount+=item.goods_count
  },0)
})

getGoods()

async function getGoods() {
  let {list} = await getGoodList()
  // goodsList = list会使得 goodsList 失去了响应式的效果
  // 解决方法：可以使用 ref 定义、使用 push 方法、数组外层嵌套一个对象
  goodsList.push(...list)
}

function statusChange(e) {
  goodsList.some(item=> {
    if (item.id === e.id) {
      item.goods_state = e.value
      return true
    }
  })
}

function fullStatusChange(e) {
  goodsList.forEach(item=> {
    item.goods_state = e
  })
}
</script>

<template>
<div class="app-content">
  <Header></Header>
  <div class="goods-list">
      <Goods v-for="item in goodsList" :key="item.id" :id="item.id" :title="item.goods_name" :pic="item.goods_img"
             :status="item.goods_state" :price="item.goods_price" :count="item.goods_count" @statusChange="statusChange"></Goods>
  </div>
  <Footer :full-checked="fullChecked" :totalPrice="totalPrice" :totalNum="totalNum" @fullStatusChange="fullStatusChange"></Footer>

</div>
</template>

<style lang="less" scoped>
.app-content {
  padding: 40px 0 0 0;

  .goods-list {
    height: calc(100vh - 100px);
    overflow: auto;
  }
}
</style>
