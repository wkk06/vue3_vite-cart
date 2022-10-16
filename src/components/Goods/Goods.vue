<template>
  <div class="goods-content">
    <el-row>
      <el-col >
        <el-card shadow="hover">
          <div class="custom-control">
            <input class="input-check" type="checkbox" :id="'cb'+id" :checked="status" @change="statusChange"/>
            <label class="input-label" :for="'cb'+id">
              <img class="goods-img" :src="pic">
            </label>
          </div>
          <div class="goods-info">
            <h6 class="goods-title">{{ title }}</h6>
            <div class="goods-info-bottom">
              <span class="goods-price">￥{{ price }}</span>
              <Counter :id="id" :count="count" @countChange="countChange"></Counter>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
      require: true,
      type: Number
    },
    title: {
      default: '',
      type: String
    },
    pic: {
      default: '',
      type: String
    },
    status: {
      default: true,
      type: Boolean
    },
    price: {
      default: 0,
      type: Number
    },
    count: {
      default: 0,
      type: Number
    }
})

const emit = defineEmits('statusChange')

const statusChange = (e)=> {
  emit('statusChange', {id: props.id,value:e.target.checked})
}

const countChange = (e)=> {
  console.log(e);
}
</script>

<style lang="less" scoped>
.goods-content {
  margin: 10px 6px;

  ::v-deep .el-card__body {
    display: flex;
    padding: 6px;

    .custom-control {
      display: flex;
      align-items: center;

      .input-check {
        margin: 0 6px 0 0;
      }
    }

    .goods-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin: 0 0 0 10px;

      .goods-title {
        display: contents;
      }

      .goods-info-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .goods-price {
          color: red;
        }
      }
    }

  }

}
</style>