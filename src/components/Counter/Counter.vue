<template>
  <div>
    <el-input-number v-model="goodsCount" :max="99" :min="1" label="描述文字" size="small"
                     @change="handleChange"></el-input-number>
  </div>
</template>

<script setup>
import { ref,onBeforeUnmount } from "vue";
import emitter from '@/libs/eventBus';

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

let goodsCount = ref(props.count)

const handleChange = (e) => {
  let obj = {id: props.id, count: goodsCount.value}
  emitter.emit('numberChange', obj)
}

onBeforeUnmount(()=> {
  emitter.off('numberChange')
})

</script>

<style scoped>

</style>