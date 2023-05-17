<template>
  <div class="content p-[10px]">
    <div
      class="user_address_list bg-white rounded-[10px]"
      style="padding: 15px 10px"
    >
      <div class="address_box bg-white rounded-[10px]">
        <div class="box_top flexCenter justify-between">
          <div class="top_left">
            <div class="name">欲言又止</div>
          </div>
          <div class="top_right">
            <div class="phone">1111111111</div>
          </div>
        </div>
        <div class="box_center mt-[14px] mb-[20px]">
          <div class="user_address">
            <text>内蒙古自治区乌兰察布市某某乡某某镇某某村</text>
          </div>
        </div>
        <div class="box_bottom flexCenter justify-between">
          <div class="b_left">默认地址</div>
          <div class="b_right flexCenter">
            <div>编辑</div>
            <div>删除</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="h-[40px] leading-[40px] text-center textColor bg-white mt-[10px] rounded-[10px]"
      @click="addAddress"
    >
      添加新地址
    </div>
  </div>
</template>

<script setup lang="ts">
import MyRouter from '@/util/router'
const addAddress = () => {
  MyRouter.to('editAddress')
}
</script>

<style scoped></style>
