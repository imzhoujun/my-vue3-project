<template>
  <div>
    {{ state.value }}
    <template v-if="state.matches({ idle: 'loading' })">
      <div>Loading...</div>
    </template>
    <template v-if="state.matches({ idle: 'success' })">
      <div class="uni-list">
        <checkbox-group @change="change">
          <label
            v-for="(item, index) in products"
            :key="index"
            class="flex box-border p-[10px] bg-white mb-[10px]"
          >
            <div class="check_box flexCenter">
              <checkbox
                class="round red"
                :value="item.goods_id"
                :checked="item.ischeck"
              />
            </div>
            <div class="content flexCenter">
              <div class="content_left">
                <image
                  :src="item.goods_thumb"
                  class="w-[72px] h-[72px] rounded-[10px]"
                >
                </image>
              </div>
              <div
                class="content_right h-full w-full flexCenter flex-wrap ml-[10px]"
              >
                <div class="title ellipsis-1 w-[220px]">
                  <text class="ellipsis-1">{{ item.name }}</text>
                </div>
                <div
                  class="price_box flexCenter w-full justify-between mt-[10px]"
                >
                  <div class="price_left textColor">
                    <text>￥</text>
                    <text class="text-[18px]">{{ item.market_price }}</text>
                  </div>
                  <div class="price_right pr-[10px]">
                    <div class="flexCenter">
                      <button
                        class="indexBtn"
                        :disabled="item.index == 1"
                        style="border-right-color: transparent"
                        @click="sub(index)"
                      >
                        <text>-</text>
                      </button>
                      <input
                        :value="item.index"
                        class="w-[41px] h-[23px] text-center leading-[23px] border-[1px] border-solid border-[#aaaaaa]"
                        type="text"
                        :data-index="index"
                        auto-blur
                        @blur="blur($event, index)"
                      />
                      <button
                        class="indexBtn"
                        style="border-left-color: transparent"
                        @click="add(index)"
                      >
                        <text>+</text>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </checkbox-group>
      </div>
      <div class="total_box bg-white flexCenter justify-between">
        <div @click="All">
          <label class="flexCenter">
            <checkbox
              class="round red"
              value="isAll"
              :checked="state.context.isAll"
            />
            <div>全选</div>
          </label>
        </div>
        <div>
          <div class="total_nb flexCenter">
            <div>
              <text>合计:</text>
            </div>
            <div class="textColor">
              <text>￥</text
              ><text class="text-[18px]">{{ state.context.total }}</text>
            </div>
            <div>
              <button
                class="totalBtn bg-[#4a90e2] text-white"
                @click.prevent="settle"
              >
                结算
              </button>
            </div>
          </div>
        </div>
      </div></template
    >
    <div></div>
  </div>
</template>

<script setup lang="ts">
import type { ListObj } from '@/machine/useCartMachine'
import { useCartMachine } from '@/machine/useCartMachine'
import MyRouter from '@/util/router'

const { state, send } = useCartMachine()
const products = computed(() => state.value.context.cartList)

const add = (i: number) => send({ type: 'addIndex', value: i })
const sub = (i: number) => send({ type: 'subIndex', value: i })
const change = (e: EventHandle) => {
  const checkedArr = e.detail.value
  send({ type: 'isCheck', value: checkedArr })
}
const All = () => send({ type: 'allCheck' })
const settle = () => {
  const hasIsCheck = products.value.some((item: ListObj) => item.ischeck)
  if (hasIsCheck) {
    MyRouter.to('ConfirmAnOrder')
  } else {
    uni.showToast({
      title: '请选择一样商品',
      icon: 'none',
    })
  }
}

const blur = (e: InputEvent, index: number) => {
  console.log(e)
}

onMounted(() => {
  send('Fetch')
})
</script>

<style scoped lang="scss">
.total_box {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10px 15px;
  box-sizing: border-box;
}
.indexBtn {
  height: 25px;
  width: 25px;
  border: 1px solid #e5e5e5;
  line-height: 25px;
  text-align: center;
  position: relative;
  display: block;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0px;
  padding-right: 0px;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 0;
}
.indexBtn::after {
  border: none;
}
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

<!-- <template>
  <div class="container">
    <div
      ref="dom"
      class="scroll1"
      style="color: red"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div v-for="(item, index) in 100" :key="index">{{ item }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const dom = ref<HTMLElement | null>(null)
const newdom = dom.value as HTMLElement

const onTouchMove = (e: TouchEvent) => {
  //获取触摸位置和速度
  const touch = e.touches[0]
  console.log(e)

  // const x = touch.clientX
  // const y = touch.clientY
  // const vx = touch.velocityX
  // const vy = touch.velocityY
  // const direction = 'y' // 可以根据需要修改
  // // 计算transform的值
  // let tx = x * vx
  // let ty = y * vy
  // // 限制transform的范围
  // if (tx > 20) tx = 20
  // if (tx < -20) tx = -20
  // if (ty > 20) ty = 20
  // if (ty < -20) ty = -20
}
const onTouchEnd = (e: TouchEvent) => {}

onMounted(() => {
  //获取div高度
  console.log((dom.value as HTMLElement).clientHeight)
})
// 获取滚动元素
// const scrollEl = document.querySelector('.scroll')
// // 定义触摸事件的回调函数
// const onTouchMove = (e) => {
//   // 获取触摸位置和速度
//   const touch = e.touches[0]
//   const x = touch.clientX
//   const y = touch.clientY
//   const vx = touch.velocityX
//   const vy = touch.velocityY
//   const direction = 'y' // 可以根据需要修改
//   // 计算transform的值
//   let tx = x * vx
//   let ty = y * vy
//   // 限制transform的范围
//   if (tx > 20) tx = 20
//   if (tx < -20) tx = -20
//   if (ty > 20) ty = 20
//   if (ty < -20) ty = -20
//   // 应用transform属性
//   scrollEl.style.transition = 'none'
//   scrollEl.style.transform = `translate${direction.toUpperCase()}(${
//     direction === 'y' ? ty : tx
//   }px)`
// }
// // 添加触摸事件的监听器
// scrollEl.addEventListener('touchmove', onTouchMove)
// // 定义松开事件的回调函数
// const onTouchEnd = () => {
//   // 恢复原始状态
//   scrollEl.style.transition = 'transform 0.5s'
//   scrollEl.style.transform = 'none'
// }
// // 添加松开事件的监听器
// scrollEl.addEventListener('touchend', onTouchEnd)
</script>

<style>
.container {
  width: 600px;
  height: 300px;
  overflow: hidden;
}
.dom {
  width: 100%;
  height: 100%;
}
</style> -->
