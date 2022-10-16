<template>
  <div class="goods-footer">
    <div class="goods-footer-left">
      <input class="full-check" type="checkbox" :checked="fullChecked" @change="statusChange"/>
      <label class="full-check-label">全选</label>
    </div>

    <div class="goods-footer-center">
      <span>合计：</span>
      <span class="goods-total-price">￥{{ totalPrice }}</span>
    </div>
    <div class="goods-footer-right">
      <el-button type="primary" round size="small">结算({{ totalNum }})</el-button>
    </div>


  </div>
</template>

<script setup>
const props = defineProps({
  fullChecked: {
    default: false,
    type: Boolean
  },
  totalPrice: {
    default: 0,
    type: Number
  },
  totalNum: {
    default: 0,
    type: Number
  }
})

const emits = defineEmits('fulStatusChange')

function statusChange(e) {
  emits('fullStatusChange', e.target.checked)
}
</script>

<style lang="less" scoped>
.goods-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0 0 0;
  padding: 6px;
  font-size: 14px;
  height: 41px;
  border-top: 1px solid #ccc;

  .goods-footer-left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 6px;

    .full-check {
      margin: 0 6px 0 0;
    }

    .full-check-label {
      font-size: 14px;
    }
  }

  .goods-footer-center {
    .goods-total-price {
      color: red;
    }
  }


}
</style>