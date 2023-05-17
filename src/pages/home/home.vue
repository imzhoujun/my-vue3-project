<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div>
    <section
      id="search_bar"
      class="py-[11px]"
      style="background-color: #4a90e2"
    >
      <div
        class="search_bar flexCenter justify-between w-[323px] bg-white"
        @click="toIconsGoods({ id: 0, name: 'synthesize' })"
      >
        <div>请输入关键词搜索...</div>
        <div><div class="btnc text-white">搜索</div></div>
      </div>
    </section>
    <section id="select_img">
      <div>
        <navigator url="" class="flex justify-center">
          <image
            src="@img/10001.jpg"
            style="height: 160px; width: 100%"
          ></image>
        </navigator>
      </div>
    </section>
    <section id="select_ioncs" style="height: 192px">
      <div
        class="flex flex-wrap justify-center items-center"
        style="height: 192px"
      >
        <div
          v-for="item in images.list"
          :key="item.id"
          class="w-[69px] h-[71px] text-center"
        >
          <div @click="toIconsGoods({ id: item.id, name: item.name })">
            <div class="flex justify-center">
              <image :src="item.url" class="select_icons"> </image>
            </div>
            <div class="text-[12px]">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </section>
    <section id="head_line" style="height: 54px">
      <div class="flex" style="height: 100%">
        <div class="headline left text-center leading-[54px]">店铺头条</div>
        <div class="divider m-auto"></div>
        <div class="right flex-1 pl-[8px] text-[#999]">
          <swiper
            circular
            :autoplay="true"
            :duration="500"
            :vertical="true"
            :interval="2000"
            :disable-touch="true"
            class="swiper h-[54px]"
            style="font-size: 13px"
          >
            <swiper-item>
              <navigator>
                <div class="swiper-item">
                  酒水饮料，周末特惠！2件减13,快来吧!
                </div>
              </navigator>
            </swiper-item>
            <swiper-item>
              <navigator>
                <div class="swiper-item">
                  酒水饮料，周末特惠！2件减13,快来吧!
                </div>
              </navigator>
            </swiper-item>
            <swiper-item>
              <navigator>
                <div class="swiper-item">
                  酒水饮料，周末特惠！2件减13,快来吧!
                </div>
              </navigator>
            </swiper-item>
          </swiper>
        </div>
      </div>
    </section>
    <section id="recommend_two_commodity ">
      <div id="recommends" class="flex justify-center">
        <div class="commodity">
          <navigator>
            <div class="commodity_position relative">
              <image src="@img/海带.png" class="w-[174px] h-[98px]"> </image>
              <text
                class="text-[12px] text-[#ffffff] absolute top-[3.5px] left-[10px]"
                >即食下饭</text
              >
              <text
                class="absolute text-[15px] top-[34px] left-[15px] text-[#d11e54]"
                >优质海带</text
              >
              <text
                class="absolute text-[12px] top-[52px] left-[15px] text-[#d11e54]"
                >独立包装即食</text
              >
            </div>
          </navigator>
        </div>
        <div class="commodity_position">
          <navigator>
            <div class="commodity_position relative">
              <image src="@img/啤酒.png" class="w-[174px] h-[98px]"> </image>
              <text
                class="text-[12px] text-[#ffffff] absolute top-[3.5px] left-[10px]"
                >低浓度</text
              >
              <text
                class="absolute text-[15px] top-[34px] left-[15px] text-[#2551c4]"
                >小麦熟啤酒</text
              >
              <text
                class="absolute text-[12px] top-[52px] left-[15px] text-[#2551c4]"
                >征服你的挑剔胃</text
              >
            </div>
          </navigator>
        </div>
      </div>
    </section>
    <section id="discounts">
      <navigator url="../../screen/discountCoupon/discountCoupon">
        <div class="flex justify-center">
          <image class="w-[346px] h-[98px]" src="@img/优惠购.png"> </image>
        </div>
      </navigator>
    </section>
    <section id="seckill" class="pt-[14px] pb-[7px]">
      <div class="seckill_top flex justify-between items-center h-[42px]">
        <div class="kill_left flex justify-center items-center">
          <div class="kill_text mx-[15px]">
            <text class="text-[16px]">秒杀专场</text>
          </div>
          <div class="count_down">
            <secKill
              :end-time="endTime"
              :text-bgc="'#4a90e2'"
              :unit-color="'black'"
              class="flex justify-around"
            >
            </secKill>
          </div>
        </div>
        <div class="kill_right mr-[15px]">
          <div class="kill_more">
            <navigator
              class="flex justify-center items-center"
              url="../../screen/seckillZone/seckillZone"
            >
              <text class="text-[#999999] text-[12px]">更多</text>
              <uni-icons type="right" size="15"></uni-icons>
            </navigator>
          </div>
        </div>
      </div>
      <div class="seckill_list">
        <scroll-view
          ref="scroll"
          class="ml-[10px] h-[204px]"
          scroll-x="true"
          :scroll-with-animation="true"
          :enhanced="true"
          style="white-space: nowrap; width: calc(100% - 10px)"
        >
          <div
            v-for="(item, index) in seckill"
            :key="index"
            class="commodity_items w-[128px] bg-yellow-100 mr-[11px]"
            style="display: inline-block"
            @click.prevent="
              toGoodsDetail({ id: item._id._value, name: item.name })
            "
          >
            <div class="items_img relative">
              <image class="w-[128px] h-[128px]" :src="item.goods_thumb" />
              <div
                class="absolute items_countdown w-[100%] leading-[25px] h-[25px] bg-[rgba(0,0,0,.25)] bottom-[0px] left-[0px]"
              >
                <secKill
                  :end-time="endTime"
                  :is-default="false"
                  class="flex justify-around"
                >
                  <template #right><div class="text-white">结束</div></template>
                </secKill>
              </div>
            </div>
            <div id="items_info" class="px-[10px] pb-[3px] pt-[6px]">
              <div id="items_name" class="overflow-hidden">
                <text style="white-space: nowrap; font-size: 15px">
                  {{ item.name }}
                </text>
              </div>
              <div id="items_money_buy" class="pt-[5px] flex justify-between">
                <div id="left_money">
                  <div class="money text-[#4a90e2] pt-[6px]">
                    <text class="text-[12px]">￥</text>
                    <text class="text-[16px]">{{
                      item._id['opendb-mall-sku'][0].price
                    }}</text>
                  </div>
                  <div class="money line-through text-[12px] text-[#999999]">
                    <text>￥</text>
                    <text>{{
                      item._id['opendb-mall-sku'][0].market_price
                    }}</text>
                  </div>
                </div>
                <div id="right_buy" class="self-end">
                  <div
                    class="rounded-full border-[1px] border-solid w-[29px] h-[29px] text-center leading-[29px] border-[#4a90e2] text-[#4a90e2]"
                  >
                    抢
                  </div>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
    </section>
    <section id="combo">
      <div id="combo_img">
        <div id="_img_position" class="flex justify-center">
          <navigator class="relative" url="../../screen/combo/combo">
            <image class="w-[355px] h-[128px]" src="@img/组合套餐.png"> </image>
            <text
              class="absolute left-[190px] top-[-5px] text-[14px] text-white p-[10px]"
              >组合套餐</text
            >
            <text
              class="absolute text-[30px] text-white top-[35px] left-[178px]"
              >购买更划算</text
            >
            <text
              class="absolute top-[88px] left-[200px] w-[80px] h-[30px] leading-[30px] text-[#3b8e9f] bg-[rgb(255,255,255)] text-center rounded-[20px]"
              >立即购买</text
            >
          </navigator>
        </div>
      </div>
    </section>
    <section id="pirce" class="px-[10px] pt-[10] pb-[8px]">
      <div class="content_box pt-[10px] mb-[2px] flex bg-white text-[13px]">
        <div class="first context_items" style="width: 47.9%">
          <div
            class="f_img m-[1px]"
            @click.prevent="
              toGoodsDetail({
                id: combo?._id['opendb-mall-goods'][0]._id,
                name: combo?._id['opendb-mall-goods'][0].goods_name,
              })
            "
          >
            <image
              :src="combo?._id['opendb-mall-goods'][0].goods_thumb"
              class="w-[168px] h-[168px]"
              style="border-radius: 5px; border: 1px solid #eeeef3"
            ></image>
          </div>
          <div class="title ellipsis-1 h-[20px] leading-[20px]">
            <text class="ellipsis-1">
              {{ combo?._id['opendb-mall-goods'][0].goods_name }}
            </text>
          </div>
        </div>
        <div class="next_box">
          <div class="flex flex-wrap justify-evenly">
            <div
              v-for="(item, index) in combo?._id['opendb-mall-goods'].slice(
                1,
                5,
              )"
              :key="index"
              class="mt-[3px] mb-[4px]"
              style="margin-left: 2.8%; width: 72px"
            >
              <div>
                <image
                  :src="item.goods_thumb"
                  class="w-[72px] h-[72px]"
                  style="border-radius: 5px; border: 1px solid #eeeef3"
                >
                </image>
              </div>
              <div class="ellipsis-1 mt-[2px]">
                {{ item.goods_name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cross bg-white">
        <div
          class="cross_content py-[7px] px-[10px] flex items-center justify-between"
        >
          <div class="context_left flex items-center">
            <div class="mr-[6px]">套餐价</div>
            <div class="text-[16px] textColor mr-[5px]">
              ￥{{ combo?.discount }}
            </div>
            <div class="square textColor">
              可省￥{{ combo?.price - combo?.discount }}
            </div>
          </div>
          <div class="context_right">
            <button class="btn">立即购买</button>
          </div>
        </div>
      </div>
    </section>
    <section id="z-tabs">
      <z-paging ref="paging" v-model:refresher-status="zPaging.refresherStatus">
        <view>
          <!-- 小程序中直接修改组件style为position: sticky;无效，需要在组件外层套一层view -->
          <view style="z-index: 100; position: sticky; top: 0">
            <!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
            <z-tabs
              ref="tabs"
              :current="current"
              :list="list"
              @change="tabsChange"
            ></z-tabs>
          </view>
          <swiper
            class="swiper1"
            :style="[{ height: zPaging.swiperHeight + 'px' }]"
            :current="current"
            @transition="swiperTransition"
            @animationfinish="animationfinish"
          >
            <swiper-item
              v-for="(item, index) in list"
              :key="item.value"
              class="swiper-item"
            >
              <tabsItem
                :tab-index="index"
                :current-index="current"
                :category-id="item.value"
                @heightChanged="heightChanged"
              ></tabsItem>
            </swiper-item>
          </swiper>
        </view>
      </z-paging>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { TabList } from '@/util/types'
import MyRouter from '@/util/router'
import { getCategoryId } from '@/util/unicloud'
import useTabs from '@/hooks/z-tabs_swiper'
import { useToGoodsDetail } from '@/hooks/useToGoodsDetail'

const { toGoodsDetail } = useToGoodsDetail()
type List = { id: number | string; url: string; name: string }
type ComboData = {
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

interface Images {
  list: List[]
}

const images: Images = reactive({
  list: [
    {
      id: '6442992af5cf3a2df4922bcf',
      url: '../../static/images/日用百货.png',
      name: '日用百货',
    },
    {
      id: '644299aaf5cf3a2df4925133',
      url: '../../static/images/懒人速食.png',
      name: '懒人速食',
    },
    {
      id: '644299e609e29891985120cd',
      url: '../../static/images/休闲零食.png',
      name: '休闲零食',
    },
    {
      id: '644299f9f43e60d7b61b84d8',
      url: '../../static/images/网红零食.png',
      name: '网红零食',
    },
    {
      id: '64429a4df43e60d7b61b9ddf',
      url: '../../static/images/粮油副食.png',
      name: '粮油副食',
    },
    {
      id: '64429a620c801ca878603141',
      url: '../../static/images/膨化食品.png',
      name: '膨化食品',
    },
    {
      id: '64429a6d28064a7587983632',
      url: '../../static/images/酒水饮料.png',
      name: '酒水饮料',
    },
    {
      id: '64429a8c819ce8deeed36bef',
      url: '../../static/images/乳制烘培.png',
      name: '乳制烘培',
    },
    {
      id: '64429aa70c801ca8786044c0',
      url: '../../static/images/雪糕冰棒.png',
      name: '雪糕冰棒',
    },
    {
      id: '64429aba819ce8deeed37885',
      url: '../../static/images/医疗计生.png',
      name: '医疗计生',
    },
  ],
})

const list = ref<TabList[]>([])
const combo = ref<ComboData>()
const seckill = ref<unknown[]>([])
const endTime = ref('2023-06-30')

const zPaging = reactive({
  refresherStatus: 0,
  swiperHeight: 0,
})

const {
  swiperCurrent: current,
  tabs,
  tabsChange,
  swiperTransition,
  swiperAnimationfinish: animationfinish,
} = useTabs()

const toIconsGoods = (query: { id: number | string; name: string }) => {
  const queryStr = encodeURIComponent(JSON.stringify(query))
  MyRouter.to('iconsGoods', queryStr)
}

const heightChanged = (height: number) => {
  // console.log(height, '.b')

  if (height === 0) {
    //默认swiper高度为屏幕可用高度-tabsView高度-slot="top"内view的高度
    height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80)
  }
  zPaging.swiperHeight = height
}

//获取首页全部商品id
// const getCategoryId = async () => {
//   const db = uniCloud.database()
//   await db
//     .collection('opendb-mall-categories')
//     .get()
//     .then((res: any) => {
//       const arr: any[] = []
//       let obj: {
//         [k: string]: any
//       } = {}
//       res.result.data.map((item: any) => {
//         obj = item
//         obj['value'] = item['_id']
//         delete obj['_id']
//         arr.push(obj)
//       })
//       arr.unshift({ value: '0', name: '全部商品' })
//       list.value = arr
//     })
//     .catch((err: ErrorEvent) => {
//       uni.showToast({
//         title: err.message,
//         icon: 'error',
//         duration: 2000,
//       })
//     })
// }

onMounted(async () => {
  const a = getCategoryId()

  const b = uni.$cloud
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
    .orderBy('_id desc')
    .get({ getCount: true, getOne: true })

  const c = uni.$cloud
    .twoFind(
      { dbname: 'opendb-mall-goods', where: { is_seckill: true } },
      { dbname: 'opendb-mall-sku', field: 'goods_id,price,market_price' },
    )
    .skip((1 - 1) * 4)
    .limit(4)
    .get({ getCount: true })

  // const db = uniCloud.database()
  // db.collection('opendb-mall-goods')
  //   .where({ is_seckill: true })
  //   .get()
  //   .then((res) => {
  //     console.log(res, 'get')
  //   })

  await Promise.all([a, b, c])
    .then((res) => {
      // console.log(res[1].result.data, '111111111111111')

      list.value = res[0]
      combo.value = res[1].result.data
      seckill.value = res[2].result.data
    })
    .catch((err: Error) => {
      console.log(err)
    })
  console.log(combo.value)
})
</script>

<style lang="scss" scoped>
.search_bar {
  margin: auto;
  border-radius: 20px;
  border: 4px solid white;
  padding-left: 15px;
  box-sizing: border-box;
}
.btnc {
  background-color: rgb(74, 144, 226);
  font-size: 12px;
  height: 32px;
  border-radius: 16px;
  line-height: 32px;
  width: 56px;
  text-align: center;
}

.select_icons {
  width: 45px;
  height: 45px;
  margin-bottom: 10px;
}

.swiper {
  font-size: 13px;
  .swiper-item {
    height: 54px;
    line-height: 54px;
  }
}
.divider {
  border-right: 1px solid #eee;
  height: 28px;
}
.headline {
  width: 60px;
  padding: 0 14px;
  font-size: 12px;
}

::v-deep.uni-countdown__splitor {
  color: #fff !important;
}

.scroll-Y {
  height: 300rpx;
}
.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}
.scroll-view-item {
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}
.scroll-view-item_H {
  display: inline-block;
  width: 100%;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}

.context_items {
  margin-left: 2.8%;
}

.square {
  padding: 1px 7px;
  border: 1px solid #4a90e2;
}
.btn {
  background: linear-gradient(270deg, rgba(74, 144, 226, 0.7), #4a90e2);
  color: white;
  width: 82px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  border-radius: 24px;
}
.swiper1 {
  height: 100%;
}
</style>
