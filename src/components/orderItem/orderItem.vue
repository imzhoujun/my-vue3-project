<template>
  <div>
    <div
      v-for="(item, index) in 2"
      :key="index"
      class="orderItem flex bg-white m-[10px] rounded-[10px]"
    >
      <div class="left_box p-[10px]">
        <image class="img" src="@img/八宝粥.jpg"> </image>
      </div>
      <div class="right_box flex-1 p-[15px] relative">
        <div class="top flexCenter justify-between">
          <div class="title ellipsis-1 w-[200px] text-[14px]">
            <text>伊利冰淇淋巧乐兹经典巧恋果雪糕冰棍冰激凌75g5支</text>
          </div>
          <div class="price">
            <text>￥111</text>
          </div>
        </div>
        <div class="bottom absolute right-[20px] bottom-[20px]">
          <div class="context flexCenter text-[13px]">
            <div class="total mr-[5px]"><text>总价 ￥147</text></div>
            <div class="real"><text>实付款 ￥147</text></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
