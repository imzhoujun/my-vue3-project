<template>
  <!-- 优惠券 -->
  <div class="content">
    <div v-for="(item, index) in couponList" :key="index">
      <discountItem :value="item"></discountItem>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface couponItem {
  create_time: number
  end_time: number
  quota: number
  start_time: number
  status: number
  take_count: number
  used_amount: number
  used_count: number
  with_amoun: number
  _id: st
}
// uni.$cloud
//   .add('coupon', {
//     start_time: 1684252800,
//     end_time: 1688054400,
//     with_amoun: 100,
//     used_amount: 20,
//     quota: 100,
//   })
//   .then((res) => {
//     console.log(res)
//   })
const couponList = ref<couponItem[]>([])
onMounted(async () => {
  await uni.$cloud.find('coupon', 'end_time>$cloudEnv_now').then((res) => {
    couponList.value = res.result.data
    // console.log(couponList.value)
  })
})
</script>

<style scoped lang="scss">
.bg {
  width: 100%;
  height: 150rpx;
  background-size: 217% 1500rpx;
  background-position: 0 -442rpx;
  background-image: url(https://mp-6c0413ae-ffe0-416f-9cf2-a86c9d47758d.cdn.bspapp.com/cloudstorage/7ac913da-536b-4932-9923-a3d1a5bbfdbb.png);
}

.price {
  width: 139px;
  white-space: nowrap;
  text-align: center;
  position: relative;
  right: 5px;
}

.textColor {
  color: #ec2222;
}
.circle {
  border-radius: 50%;
  box-shadow: 0 2px 8px 0 rgba(164, 27, 27, 0.35);
  background: linear-gradient(180deg, #fff0d2, #ffd69a);
}
</style>
