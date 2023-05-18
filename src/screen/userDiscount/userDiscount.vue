<template>
  <!-- 用户优惠券 -->
  <div>
    <div v-for="(item, index) in couponList" :key="index">
      <discountItem
        :value="item"
        text="立即使用"
        @parent-fn="toHome"
      ></discountItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCouponMachine } from '@/machine/couponMachine'
import MyRouter from '@/util/router'

const toHome = () => {
  MyRouter.toTabs('home')
}
// const couponList = ref<Item[]>([])
const { state } = useCouponMachine()
const couponList = computed(() => state.value.context.userCouponList)
// onMounted(async () => {
//   await uni.$cloud
//     .twoFind(
//       { dbname: 'user-coupon', where: 'user_id=="64532023e766bb0085032f8b"' },
//       {
//         dbname: 'coupon',
//         field:
//           '_id  ,with_amoun,used_amount,start_time,end_time,status,quota,take_count,used_count',
//       },
//     )
//     .get()
//     .then((res: any) => {
//       // console.log(res, '???????????????')
//       // console.log(arr[0].coupon_id)
//       // eslint-disable-next-line camelcase
//       const { coupon_id, ...rest } = res.result.data[0]
//       // eslint-disable-next-line camelcase
//       const obj = { ...coupon_id[0], coupon_id: coupon_id[0]._id }
//       delete obj._id
//       const arr = [{ ...rest, ...obj }]
//       couponList.value = arr
//     })
// })
</script>

<style scoped></style>
