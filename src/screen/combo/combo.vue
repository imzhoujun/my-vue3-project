<template>
  <div>
    <div id="combo_bg" class="bg" :style="{ height: windowHeight + 'px' }">
      <div id="scroll_bar">
        <div id="logo" class="bg"></div>
        <div
          v-for="(item, index) in data"
          :key="index"
          class="list_across flex items-center bg-white rounded-[10px] mb-[10px]"
        >
          <div class="container w-[214px] flex">
            <scroll-view
              class="w-[214px] whitespace-nowrap flex"
              scroll-x="true"
            >
              <div
                v-for="(item1, index1) in item._id['opendb-mall-goods']"
                :key="index1"
                class="inline-block"
              >
                <div class="items flex" :class="{ 'ml-[10px]': index1 == 0 }">
                  <div class="img_box">
                    <div class="img pt-[10px]">
                      <image
                        :src="item1.goods_thumb"
                        class="w-[74px] h-[74px] rounded-[5px]"
                        style="border: 1px solid #eeeef3"
                        lazy-load
                      >
                      </image>
                    </div>
                    <text class="text mt-[4px]">{{ item1.goods_name }}</text>
                  </div>
                  <template v-if="index1 != 4">
                    <div class="AND">
                      <uni-icons
                        type="plusempty"
                        size="12"
                        color="#CECECE"
                        class="mt-[44px] mx-[2px] inline-block"
                      ></uni-icons>
                    </div>
                  </template>
                </div>
              </div>
            </scroll-view>
          </div>
          <div class="context flex-1">
            <div class="context_box h-[115px]">
              <div class="svg absolute left-0">
                <image
                  src="@img/equal.svg"
                  class="w-[15px] h-[15px] ml-[4px]"
                  lazy-load
                ></image>
              </div>
              <div class="box_top">
                <text>套餐价</text>
                <text class="text-[16px] textColor">￥{{ item.discount }}</text>
              </div>
              <div class="box_middle mt-[5px] textColor">
                <text>可省￥{{ item.price - item.discount }}</text>
              </div>
              <div class="box_bottom mt-[5px]">
                <button class="btn">立即购买</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { windowHeight } = uni.getWindowInfo()

type Data = {
  discount: number
  is_sell: boolean
  name: st
  price: number
  remain_count: number
  _id: {
    _value: st
    'opendb-mall-goods': {
      combo_id: st
      goods_name: st
      goods_thumb: st
      _id: st
    }[]
  }
}
const data = ref<Data[]>([])

uni.$cloud
  .twoFind(
    {
      dbname: 'goods-combo',
      field: '_id ,name,price,discount,is_sell,remain_count',
    },
    {
      dbname: 'opendb-mall-goods',
      field: 'combo_id,name as goods_name,goods_thumb',
    },
  )
  .get({ getCount: true })
  .then((res: any) => {
    data.value = res.result.data
  })
</script>

<style scoped lang="scss">
#combo_bg {
  background-size: 209%;
  padding: 10px;
  box-sizing: border-box;
  // height: calc(100vh - 20px - 44px + env(safe-area-inset-top));
}
#logo {
  background-size: 217% 1650%;
  width: 100%;
  height: 62px;
}
.text {
  font-size: 13px;
  width: 75px;
  display: inline-block;
  color: #333;
  overflow: hidden;
  white-space: nowrap;

  text-overflow: ellipsis;
}

.textColor {
  color: #4a90e2;
}
.btn {
  background: linear-gradient(270deg, rgba(74, 144, 226, 0.7), #4a90e2);
  color: white;
  width: 86px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  border-radius: 14px;
}

.context_box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 115px;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}
.bg {
  background: url('https://mp-6c0413ae-ffe0-416f-9cf2-a86c9d47758d.cdn.bspapp.com/cloudstorage/d3a1b38f-3712-4c1c-9d20-1f95292c2419.png') -402px -129px
    no-repeat;
}
</style>
