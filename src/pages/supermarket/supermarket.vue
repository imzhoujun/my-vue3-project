<template>
  <div>
    <section id="top">
      <div id="_top-bg" class="relative p-[10px]">
        <image class="bg" src="@img/supermarket-bg.png"></image>
        <div
          id="my_store"
          class="w-[355px] bg-[#ffffff] mt-[55px] pb-[10px]"
          style="box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1); cursor: pointer"
        >
          <div class="p-[10px] relative bg-white z-10">
            <div id="store_name" class="w-[252px] text-[16px] ellipsis-1">
              我的小店
            </div>
            <div
              id="store_line"
              class="w-[252px] text-[#999999] mt-[7px] ellipsis-1"
            >
              24H便利店,爱你每一刻
            </div>
            <div id="store_img">
              <image
                class="w-[50px] h-[50px] absolute right-[10px] top-[10px]"
                src="@img/mystore.png"
              >
              </image>
            </div>
          </div>
          <div
            id="discounts_notice"
            class="flex flex-wrap m-[10px] overflow-hidden"
          >
            <div id="couponList">
              <div class="coupon_item">
                <div class="money">￥5</div>
                <div class="ver"></div>
                <div class="coupon_get">领取</div>
                <div class="dot1 left-[-2.5px]"></div>
                <div class="dot2 right-[-2.5px]"></div>
              </div>
              <div class="coupon_item">
                <div class="money">￥10</div>
                <div class="ver"></div>
                <div class="coupon_get">领取</div>
                <div class="dot1 left-[-2.5px]"></div>
                <div class="dot2 right-[-2.5px]"></div>
              </div>
              <div class="coupon_item">
                <div class="money">￥20</div>
                <div class="ver"></div>
                <div class="coupon_get">领取</div>
                <div class="dot1 left-[-2.5px]"></div>
                <div class="dot2 right-[-2.5px]"></div>
              </div>
            </div>
            <div class="notice">
              <div class="flex">
                <div class="" style="flex-shrink: 0">公告:&nbsp;&nbsp;</div>
                <div class="notice_text ellipsis-1">
                  欢迎光临，很高兴为您服务，本店满40元起送，配送费￥6.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="tabs">
      <div
        class="tabs flex text-[14px] bg-white"
        style="position: sticky; top: 0"
      >
        <div
          v-for="(item, index) in ['点餐', '评论', '商家']"
          :key="index"
          class="w-[33.3%] text-center flex-col flex items-center"
          @click="change(index)"
        >
          <div class="tabs_name h-[27px] leading-[27px]">{{ item }}</div>
          <div class="tabs_dot" :class="{ active: index == current }"></div>
        </div>
      </div>
      <div v-show="current == 0" class="tabs_none">
        <div class="none_img">
          <image src="@img/超值.png" class="w-[347px] h-[90px] m-auto p-[14px]">
          </image>
        </div>

        <div class="roll-box flex pb-[56px]" style="padding-bottom: 0">
          <div class="box_left">
            <scroll-view
              class="roll-left h-[470px]"
              style="height: 526px"
              scroll-y="true"
            >
              <div
                v-for="item in currentName"
                :key="item.value"
                class="left_item h-[45px] px-[3px] w-[79px] text-center flex items-center justify-center"
              >
                <div>
                  {{ item.name }}
                </div>
              </div>
            </scroll-view>
          </div>
          <div class="box_right flex-1">
            <scroll-view
              class="roll-right h-[470px] bg-white"
              style="height: 526px"
              scroll-y="true"
            >
              <div v-for="(item, index) in goodsList" :key="index">
                <div
                  class="cate_name p-[13px] text-[14px] sticky top-0 z-1 bg-white"
                >
                  {{ item.name }}
                </div>
                <div
                  v-for="item1 in item.list"
                  :key="item1._id._value"
                  class="goods_box flex items-center p-[13px]"
                  @click.prevent="
                    toGoodsDetail({ id: item1._id._value, name: item.name })
                  "
                >
                  <div class="box_left">
                    <image
                      lazy-load
                      class="w-[92px] h-[92px]"
                      :src="item1.goods_thumb"
                    >
                    </image>
                  </div>
                  <div class="goods_right">
                    <div
                      class="content flex justify-between flex-wrap h-[92px]"
                    >
                      <div
                        class="cont_top w-[160px] ellipsis-2 leading-[1.2] text-[14px] pl-[9px] pt-[2px]"
                      >
                        <template v-if="!item1.is_hot"
                          ><div class="is_hot text-[12px] inline-block">
                            热卖
                          </div></template
                        >
                        {{ item1.name }}
                      </div>
                      <div
                        class="cont_bottom pl-[9px] flex items-center justify-between w-[100%]"
                      >
                        <div class="price_box text-[15px] textColor">
                          ￥{{ item1._id['opendb-mall-sku'][0].market_price }}
                        </div>
                        <div class="seckill mr-[4px]">购买</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </scroll-view>
          </div>
        </div>
      </div>
      <div v-show="current == 1" class="tabs_none">
        <div v-if="isEmpty" class="isEmpty">
          <image class="w-[100%] h-[307px]" src="@img/empty.png"> </image>
        </div>
      </div>
      <div v-show="current == 2" class="tabs_none">
        <div class="merchant">
          <div class="merchant_info py-[16px] px-[14px] mb-[14px]">
            <div class="title">配送信息</div>
            <div class="content mt-[7px]">
              商家自行配送，10元起送，配送费￥10.00起
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section id="bottom" class="fixed w-full bottom-0 z-10">
      <div class="content_box h-[56px] flex justify-between w-full">
        <div
          class="box_left flex flex-1"
          style="background: rgba(0, 0, 0, 0.75)"
        >
          <div class="img_box relative">
            <image
              class="w-[56px] h-[56px] absolute left-[12px] top-[-6px]"
              src="@img/buyBtnImg.png"
              style="filter: saturate(5) sepia(1)"
            >
            </image>
            <div class="buyTip ml-[80px] h-[100%] flex items-center text-white">
              <text>未选购商品</text>
            </div>
          </div>
        </div>
        <div
          class="text-white box_right h-[100%] flex items-center w-[106px] text-[16px] justify-center"
          style="background: linear-gradient(0deg, #717171, #666)"
        >
          <text>去结算</text>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script setup lang="ts">
import { getAllGoods, getCategoryId } from '@/util/unicloud'
import MyRouter from '@/util/router'

const current = ref(0)
const isEmpty = ref(true)
const currentName = ref<
  {
    name: string
    value: number
  }[]
>([])
const goodsList = ref<
  {
    name: string
    list: any[]
  }[]
>([])

const change = (index: number) => {
  console.log(index)
  current.value = index
}
const toGoodsDetail = (query: { id: st | number; name: string }) => {
  const queryStr = encodeURIComponent(JSON.stringify(query))
  MyRouter.to('goodsDetail', queryStr)
}

onMounted(async () => {
  const res = await getCategoryId()
  currentName.value = [...res.slice(1)]
  const res1 = await getAllGoods()
  const data = res1.result.data

  const newarr: any = []
  currentName.value.forEach((item1: any) => {
    const arr: any[] = []
    const obj: {
      name?: string
      list?: any[]
    } = {}
    data.forEach((item2: any) => {
      if (item1.value == item2.category_id[0]._id) {
        arr.push(item2)
        obj.name = item1.name
        obj.list = arr
      }
    })
    newarr.push(obj)
  })
  console.log(newarr, 'supermarket')
  goodsList.value = newarr
})
</script>

<style scoped lang="scss">
page {
  background-color: #dbe9f9;
}
.bg {
  background-color: rgba(74, 144, 226, 0.6);
  z-index: 2;
  width: 100%;
  height: 105px;
  position: absolute;
  top: 0;
  left: 0;
}

.coupon_item {
  float: left;
  background: linear-gradient(-90deg, #ffd88e, #fff1ba);
  @apply px-[5px] max-h-[20px] items-center relative mr-[10px] flex;
  .money {
    @apply text-[#5a524d] mr-[3px];
  }
  .ver {
    @apply h-[20px] w-[1px] mr-[3px];
    display: inline-block;
    border: 0 dashed #e7b971;
    border-right-width: 1px;
  }
  .dot1,
  .dot2 {
    @apply w-[5px] h-[5px] bg-white absolute;
    border-radius: 100%;
    display: inline-block;
    top: 50%;
    transform: translateY(-50%);
  }
}

.notice {
  @apply mt-[10px]  w-[335px];
  cursor: pointer;
}
.tabs {
  border-bottom: 1px solid #eee;
}

.active {
  border: 0 solid #4a90e2;
  border-top-width: 3px;
  width: 20px;
}
</style>
