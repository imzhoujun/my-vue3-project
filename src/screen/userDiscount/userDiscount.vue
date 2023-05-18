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
import MyRouter from '@/util/router'
interface Item {
  coupon_id: st
  end_time: number
  quota: number
  start_time: number
  status: number
  take_count: number
  used_amount: number
  used_count: number
  user_id: st
  with_amoun: number
  _id: st
}
// const couponList = ref<Item[]>([])
const toHome = () => {
  MyRouter.toTabs('home')
}
// uni.$cloud
//   .add('user-coupon', {
//     user_id: '64532023e766bb0085032f8b',
//     coupon_id: '6464efbbf5cf3a2df47a59c0',
//   })
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
const couponList = ref<Item[]>([])
onMounted(async () => {
  await uni.$cloud
    .twoFind(
      { dbname: 'user-coupon', where: 'user_id=="64532023e766bb0085032f8b"' },
      {
        dbname: 'coupon',
        field:
          '_id  ,with_amoun,used_amount,start_time,end_time,status,quota,take_count,used_count',
      },
    )
    .get()
    .then((res: any) => {
      // console.log(res, '???????????????')
      // console.log(arr[0].coupon_id)
      // eslint-disable-next-line camelcase
      const { coupon_id, ...rest } = res.result.data[0]
      // eslint-disable-next-line camelcase
      const obj = { ...coupon_id[0], coupon_id: coupon_id[0]._id }
      delete obj._id
      const arr = [{ ...rest, ...obj }]
      couponList.value = arr
    })
})
</script>

<style scoped></style>
