<template>
  <!-- 确认订单 -->
  <div class="container p-[10px]">
    <!-- <div v-for="(item, index) in cart" :key="index">
      {{ item.ischeck }}
    </div> -->
    <div class="address flexCenter bg-white rounded-[8px] justify-between">
      <div class="p-[10px]">
        <div class="address_top mb-[10px]">
          <text class="text-[15px] mr-[5px]">牛牛牛牛牛</text>
          <text>11111111111</text>
        </div>
        <div class="address_bottom">
          广东省广州市黄埔区联合街道神舟路29号银城宿舍楼
        </div>
      </div>
      <div class="select mr-[15px]">
        <uni-icons type="right" size="30" color="gray"></uni-icons>
      </div>
    </div>
    <div class="items pb-[50px]">
      <div
        v-for="(item, index) in 6"
        :key="index"
        class="store bg-white mt-[10px] p-[10px]"
      >
        <div class="top flexCenter">
          <div class="img-left mr-[10px]">
            <image src="@img/八宝粥.jpg" class="w-[70px] h-[70px]"> </image>
          </div>
          <div class="info-right">
            <div class="title ellipsis-2 text-[12px] leading-[1.5]">
              心相印抽纸整箱装茶语经典压花茶香3层100抽24包
            </div>
            <div class="price-info flexCenter justify-between mt-[10px]">
              <div class="price">￥37.90</div>
              <div>x1</div>
            </div>
          </div>
        </div>
        <div class="remark flexCenter">
          <div class="mr-[10px]"><text>订单备注:</text></div>
          <div class="flex-1">
            <input
              v-model="value"
              type="text"
              placeholder="选填，请先和商家协商一致，付款后..."
              @input="input"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="z-10 bottom-0 left-0 h-[50px] flexCenter fixed bg-white w-full">
      <div class="flexCenter">
        <div>
          <div>合计￥120</div>
        </div>
        <button
          class="totalBtn bg-[#4a90e2] text-white"
          @click.prevent="settle"
        >
          结算
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartMachine } from '@/machine/useCartMachine'
const { state, send } = useCartMachine()

const cart = computed(() => state.value.context.cartList)
const value = ref('')
const input = (e: InputEvent) => {
  console.log(e)
}
const settle = () => {
  uni.showModal({
    title: '提示',
    content: '这是一个模态弹窗',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}
</script>

<style scoped lang="scss">
.totalBtn {
  width: 70px;
  height: 30px;
  border-radius: 100px;
  font-size: 14px;
  line-height: 30px;
  &:active {
    color: rgb(142, 222, 233);
  }
}
</style>
