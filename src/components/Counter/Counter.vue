<template>
  <div>
    <el-input-number v-model="goodsCount" @change="handleChange" :min="1" :max="99" size="small" label="描述文字"></el-input-number>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import bus from '../eventBus.js'

const props = defineProps({
  id: {
    require: true,
    type: Number
  },
  count: {
    default: 1,
    type: Number
  }
})

let goodsCount = ref(1)

onMounted(()=> {
  goodsCount = props.count
})

const handleChange = (e)=> {
  let obj = {id: props.id, count: goodsCount}
  bus.$emit('share', obj)
}

</script>

<style scoped>

</style>