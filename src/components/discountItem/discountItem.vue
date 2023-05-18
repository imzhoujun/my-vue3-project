<template>
  <!-- 优惠券 -->
  <div id="discount_coupondList">
    <div id="wrapper">
      <div id="list" class="px-[15px] pt-[5px] pb-[15px] bg-white">
        <div class="bg flex items-center mt-[10px]">
          <div id="price" class="">
            <div class="flex items-center price justify-center textColor">
              <div id="CNY" class="text-[13px]">￥</div>
              <div id="CNYnum" class="text-[25px]" style="line-height: 36px">
                {{ value.used_amount }}
              </div>
            </div>
          </div>
          <div id="info" style="width: 145px; color: white">
            <div id="text" class="mb-[6px]">店铺优惠</div>
            <div id="condition">满 {{ value.with_amoun }} 可用</div>

            <div id="time">
              {{ dateMsec(value.start_time, 'YYYY.MM.DD') }}-
              {{ dateMsec(value.end_time, 'YYYY.MM.DD') }}
            </div>
          </div>
          <div id="get">
            <div
              class="circle w-[46px] h-[46px] flex items-center justify-center"
            >
              <text class="w-[25px] textColor" @click="$emit('parent-fn')">{{
                value.coupon_id ? '立即使用' : '立即领取'
              }}</text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@/machine/couponMachine'
import { useMoment } from '@/hooks/useMoment'

interface Props {
  value: Item
}

const props = withDefaults(defineProps<Props>(), {})
const { dateMsec } = useMoment()
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
