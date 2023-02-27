<script setup>
import { getGoodList } from '@/api/goods.js'

import { onMounted, onBeforeUnmount, computed, reactive } from 'vue'

import emitter from '@/libs/eventBus';


let goodsList = reactive([])

let fullChecked = computed(() => {
  return goodsList.every(item => {
    return item.goods_state
  })
})

let totalPrice = computed(() => {
  return goodsList.filter(item => item.goods_state).reduce((amount, item) => {
    return amount += item.goods_price * item.goods_count
  }, 0)
})
let totalNum = computed(() => {
  return goodsList.filter(item => item.goods_state).reduce((amount, item) => {
    return amount += item.goods_count
  }, 0)
})

onMounted(() => {
  getGoods()

  //监听
  emitter.on("numberChange", (val) => {
    goodsList.forEach(item => {
      if (val.id === item.id) {
        item.goods_count = val.count
      }
    })
  })
})

onBeforeUnmount(() => {
  emitter.off("numberChange")
})


const getGoods = async () => {
  let {list} = await getGoodList()
  // goodsList = list会使得 goodsList 失去了响应式的效果
  // 解决方法：可以使用 ref 定义、使用 push 方法、数组外层嵌套一个对象
  goodsList.push(...list)
}

const statusChange = (e) => {
  goodsList.some(item => {
    if (item.id === e.id) {
      item.goods_state = e.value
      return true
    }
  })
}

const fullStatusChange = (e) => {
  goodsList.forEach(item => {
    item.goods_state = e
  })
}
</script>

<template>
  <div class="app-content">
    <Header></Header>
    <div class="goods-list">
      <Goods v-for="item in goodsList" :id="item.id" :key="item.id" :count="item.goods_count" :pic="item.goods_img"
             :price="item.goods_price" :status="item.goods_state" :title="item.goods_name"
             @statusChange="statusChange">
      </Goods>
    </div>
    <Footer :full-checked="fullChecked" :totalNum="totalNum" :totalPrice="totalPrice"
            @fullStatusChange="fullStatusChange"></Footer>

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
