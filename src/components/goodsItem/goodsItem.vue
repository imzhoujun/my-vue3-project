<template>
  <div>
    <div
      v-for="item in data"
      :key="item.id"
      class="_items p-[6px] flex white mb-[9px]"
    >
      <div id="goods_img">
        <image src="@img/八宝粥.jpg" class="w-[114px] h-[114px]"> </image>
      </div>
      <div id="goods_context" class="pl-[10px] flex flex-col justify-between">
        <div id="goods_title" class="text-[14px] h-[34px]">
          <text
            >超能洗衣粉非皂粉多彩芸柔低泡易漂樱花香1.7kg天然皂粒非洗衣液</text
          >
        </div>
        <div id="goods_price" class="flex pt-[6px]">
          <div id="price" class="text-[#4a90e2] flex-1">
            <text>￥</text>
            <text class="text-[18px]">{{ item.price }}</text>
          </div>
          <div id="cart_icon">
            <uni-icons type="cart" size="20" color="#4a90e2"></uni-icons>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any[]
}>()
console.log(props.data)
</script>

<style scoped>
.white {
  background-color: white;
}
</style>
