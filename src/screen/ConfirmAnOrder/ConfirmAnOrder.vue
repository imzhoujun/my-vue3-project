<template>
  <!-- 确认订单 -->
  <div class="container p-[10px]">
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
      <template v-for="(item, index) in cart" :key="index">
        <div v-if="item.ischeck" class="store bg-white mt-[10px] p-[10px]">
          <div class="top flexCenter">
            <div class="img-left mr-[10px]">
              <image :src="item.goods_thumb" class="w-[70px] h-[70px]"> </image>
            </div>
            <div class="info-right">
              <div class="title ellipsis-2 text-[12px] leading-[1.5] h-[36px]">
                {{ item.name }}
              </div>
              <div class="price-info flexCenter justify-between mt-[10px]">
                <template v-if="item.is_seckill">
                  <div class="price">￥{{ item.price }}</div>
                </template>
                <template v-else>
                  <div class="price">￥{{ item.market_price }}</div>
                </template>
                <div>x{{ item.index }}</div>
              </div>
            </div>
          </div>
          <div class="remark flexCenter">
            <div class="mr-[10px]"><text>订单备注:</text></div>
            <div class="flex-1">
              <input
                v-model="item.remark"
                type="text"
                placeholder="选填，请先和商家协商一致，付款后..."
              />
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="z-10 bottom-0 left-0 h-[50px] flexCenter fixed bg-white w-full">
      <div class="flexCenter">
        <div>
          <div>合计￥{{ state.context.total }}</div>

          <!-- <template>
            <div class="text-[orange]">共减￥{{ discount }}</div>
          </template> -->
          <div @click="open">优惠可用</div>
        </div>

        <button
          class="totalBtn bg-[#4a90e2] text-white"
          @click.prevent="settle"
        >
          结算
        </button>
      </div>
    </div>
    <uni-popup ref="popup" type="bottom">
      <scroll-view class="bg-white p-[15px] h-[210px] box-border" scroll-y>
        <radio-group @change="change">
          <label
            v-for="(item, index) in filteredDiscount"
            :key="index"
            class="flexCenter m-[10px] justify-between"
          >
            <div class="context">
              满{{ item.with_amoun }}减{{ item.used_amount }}
            </div>
            <div>
              <radio
                :value="index"
                :checked="index === 0"
                class="round"
                style="transform: scale(0.7)"
              />
            </div>
          </label>
          <label class="flexCenter m-[10px] justify-between">
            <div class="context">不使用优惠</div>
            <radio value="none" class="round" style="transform: scale(0.7)" />
          </label>
        </radio-group>
      </scroll-view>
    </uni-popup>
  </div>
</template>

<script setup lang="ts">
import { log } from 'xstate/lib/actions'
import { useCartMachine } from '@/machine/useCartMachine'
import { useCouponMachine } from '@/machine/couponMachine'

const { state } = useCartMachine()
const { state: userCouponState } = useCouponMachine()
// const discountTotal = ref(0)
const discount = ref(userCouponState.value.context.userCouponList)
const popup = ref()

const coupon = ref(state.value.context.total)
// 在setup函数中定义一个计算属性
const filteredDiscount = computed(() => {
  // 先过滤出满足coupon.value >= with_count的元素
  const filtered = discount.value.filter(
    (item) => coupon.value >= item.with_amoun,
  )

  // 如果没有满足条件的元素，返回discount.value数组
  if (filtered.length === 0) return discount.value
  // 如果有多个满足条件的元素，按照use_count降序排序
  if (filtered.length > 1) {
    filtered.sort((a, b) => {
      // 如果两个元素的with_count都小于coupon.value，按照use_count降序排序
      if (a.with_amoun < coupon.value && b.with_amoun < coupon.value) {
        return b.used_amount - a.used_amount
      }
      // 如果两个元素的with_count都等于coupon.value，按照use_count降序排序
      if (a.with_amoun === coupon.value && b.with_amoun === coupon.value) {
        return b.used_amount - a.used_amount
      }
      // 如果一个元素的with_count等于coupon.value，另一个元素的with_count小于coupon.value，把前者排在后者前面
      if (a.with_amoun === coupon.value && b.with_amoun < coupon.value) {
        return -1
      }
      if (a.with_amoun < coupon.value && b.with_amoun === coupon.value) {
        return 1
      }
    })
  }
  // 将满足条件的元素放在数组的首位
  const result = [...filtered]
  // 将不满足条件的元素追加到数组的后面
  for (const item of discount.value) {
    if (!filtered.includes(item)) {
      result.push(item)
    }
  }

  // 返回排序后的数组
  return result
})

const cart = computed(() => state.value.context.cartList)

const change = (e: Event) => {
  console.log(e, filteredDiscount.value)
}
const open = () => {
  popup.value.open()
}

const settle = () => {
  const arr: any[] = []
  for (const item of cart.value) {
    if (item.ischeck) {
      const obj: {
        [key: string]: any
      } = {}
      obj.title = item.name
      obj.goods_id = item.goods_id
      obj.user_id = uni.$userData._id
      obj.remark = item.remark
      obj.total_fee = state.value.context.total
      arr.push(obj)
    }
  }

  uni.showModal({
    title: '提示',
    content: '这是一个模态弹窗',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
        arr.forEach((item) => {
          item.status = 2
        })
        // uni.$cloud.add('uni-id-base-order', [...arr]).then((res) => {
        //   console.log(res, '11111111111111111111')
        // })
      } else if (res.cancel) {
        console.log('用户点击取消')
        uni.$cloud
          .add('uni-id-base-order', [...arr])
          .then((res) => {
            console.log(res, '11111111111111111111')
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
  })
}
onMounted(() => {
  console.log(filteredDiscount.value)
})
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
