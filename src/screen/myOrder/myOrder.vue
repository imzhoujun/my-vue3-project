<template>
  <div>
    <section id="swiper_content">
      <z-paging ref="paging" refresher-only>
        <template #top>
          <div id="search_bar" class="bg-white px-[20px] box-border">
            <div
              class="search h-[37px] bg-[#f5f5f5] leading-[37px] rounded-full"
              @click="toSearchOrders"
            >
              <uni-icons
                type="search"
                size="12"
                class="ml-[15px] mr-[10px]"
              ></uni-icons>
              <text>请输入订单编号或商品名</text>
            </div>
          </div>
        </template>
        <z-tabs ref="tabs" :list="list" @change="tabsChange"></z-tabs>
        <swiper
          class="swiper"
       
          :current="swiperCurrent"
          @transition="swiperTransition"
          @animationfinish="swiperAnimationfinish"
        >
          <swiper-item v-for="(item, index) in list" :key="index">
            <orderItem></orderItem>
          </swiper-item>
        </swiper>
      </z-paging>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { TabList } from '@/util/types'
import useTabs from '@/hooks/z-tabs_swiper'
import MyRouter from '@/util/router'

const list = ref<TabList[]>([
  {
    name: '全部',
    value: 0,
  },
  {
    name: '待付款',
    value: 1,
  },
  {
    name: '待发货',
    value: 2,
  },
  {
    name: '已发货',
    value: 3,
  },
  {
    name: '交易完成',
    value: 4,
  },
  {
    name: '交易关闭',
    value: 5,
  },
])

const {
  swiperCurrent,
  tabs,
  swiperHeight,
  tabsChange,
  swiperTransition,
  swiperAnimationfinish,
} = useTabs()

const toSearchOrders = () => {
  MyRouter.to('searchOrders')
}
</script>

<style scoped lang="scss">
::v-deep.uni-searchbar__box {
  background-color: #f5f5f5;
}
.swiper {
  height: 1000px;
}
</style>
