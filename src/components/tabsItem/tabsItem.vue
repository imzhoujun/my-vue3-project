<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <view class="content">
    <!-- 这里设置了z-paging加载时禁止自动调用reload方法，自行控制何时reload（懒加载）-->
    <z-paging
      ref="paging"
      v-model="dataList"
      :auto="tabIndex == 0"
      :refresher-enabled="false"
      :auto-clean-list-when-reload="false"
      @query="queryList"
      @contentHeightChanged="contentHeightChanged"
    >
      <!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
      <div class="box px-[15px] pb-[15px] box-border">
        <div class="pt-[15px] flex justify-between flex-wrap">
          <div
            v-for="item in dataList"
            :key="item._id._value"
            class="w-[164px] bg-white rounded-[6px] mb-[20px]"
            @click="toGoodsDetail({ id: item._id._value, name: item.name })"
          >
            <div class="img-box w-[164px] h-[164px]">
              <image class="w-[164px] h-[164px]" :src="item.goods_thumb">
              </image>
            </div>
            <div class="content_box px-[10px] pb-[10px]">
              <div class="title">
                <view class="ellipsis-2 pt-[6px]">
                  {{ item.name }}
                </view>
              </div>
              <div class="price_buy flexCenter justify-between pt-[6px]">
                <div class="left text-[#4a90e2] flexCenter">
                  <div class="self-end">￥</div>
                  <div class="text-[18px]">
                    {{ item._id['opendb-mall-sku'][0].market_price }}
                  </div>
                </div>
                <div class="right">
                  <uni-icons type="cart" size="24" color="#4a90e2"></uni-icons>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </z-paging>
  </view>
</template>

<script setup lang="ts">
import { useToGoodsDetail } from '@/hooks/useToGoodsDetail'
type List = {
  [key: string]: any
}
const dataList = ref<List[]>([])
const paging = ref()
const emits = defineEmits<{
  (e: 'heightChanged', value: number): void
}>()
const props = withDefaults(
  defineProps<{
    currentIndex: number
    tabIndex: number
    categoryId: number
  }>(),
  {
    currentIndex: 0,
    tabIndex: 0,
    categoryId: 0,
  },
)

const { toGoodsDetail } = useToGoodsDetail()

watch(
  () => props.currentIndex,
  (newV, oldV) => {
    // console.log(newV, oldV)
    if (newV === props.tabIndex) {
      //懒加载，当滑动到当前的item时，才去加载
      if (dataList.value.length == 0) {
        setTimeout(() => {
          paging.value.reload()
        }, 100)
      }
    }
  },
)

const queryList = (pageNo: number, pageSize: number) => {
  if (props.categoryId == 0) {
    getAllGoods(pageNo, pageSize)
  } else {
    category(pageNo, pageSize)
  }
}

const getAllGoods = async (pageNo: number, pageSize: number) => {
  const file = `_id  ,category_id  ,last_modify_date,add_date,name,_id,month_sell_count,total_sell_count,comment_count,is_hot,goods_thumb,remain_count,is_real,is_on_sale,is_alone_sale,is_new,is_best`
  const db = uniCloud.database()
  const shangpingleibie = db
    .collection('opendb-mall-categories')
    .field('_id')
    .getTemp()
  const goods = db.collection('opendb-mall-goods').field(file).getTemp()
  const sku = db
    .collection('opendb-mall-sku')
    .field('goods_id,market_price,_id')
    .getTemp()
  await db
    .collection(goods, sku, shangpingleibie)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .get()
    .then((res) => {
      paging.value.complete(res.result.data)
      console.log(res, 'bbb')
      // nextTick(() => {
      //   console.log(dataList.value)
      // })
    })
    .catch((err) => {
      console.error(err)
    })
}

const category = async (pageNo: number, pageSize: number) => {
  const db = uniCloud.database()

  const goods = db
    .collection('opendb-mall-goods')
    .where(`category_id=="${props.categoryId}"`)
    .getTemp()
  const sku = db
    .collection('opendb-mall-sku')
    .field('goods_id,market_price,_id')
    .getTemp()

  const res = await db
    .collection(goods, sku)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .get()
    .then((res) => {
      console.log('00000000', res.result.data)
      paging.value.complete(res.result.data)
    })
}

//当列表高度改变时，通知页面的swiper同步更改高度
const contentHeightChanged = (height: number) => {
  const finalHeight = dataList.value.length ? height : 0
  emits('heightChanged', finalHeight)
}

onMounted(() => {})
</script>

<style scoped>
.content {
  height: 100%;
}

.item {
  position: relative;
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rpx 30rpx;
}
</style>
