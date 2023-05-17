<!-- eslint-disable vue/no-unused-vars -->
<template>
  <!-- 我的收藏 -->
  <div class="container">
    <unicloud-db
      ref="udb"
      v-slot="{ data, pagination, loading, hasMore, error, options }"
      :collection="collectionList"
    >
      <view v-if="error">{{ error.message }} </view>
      <view v-else-if="data">
        <uni-list>
          <uni-list-item v-for="(item, index) in data" :key="index">
            <template #body>
              <unicloud-db
                v-slot="{ data: data1 }"
                collection="opendb-mall-sku"
                field="_id,goods_id,price,market_price,is_seckill"
                :where="`goods_id=='${item.goods_id[0]._id}'`"
              >
                <view>
                  <div class="goods_box flex items-center">
                    <div class="box_left">
                      <image
                        lazy-load
                        class="w-[92px] h-[92px]"
                        :src="item.goods_id[0].goods_thumb"
                      >
                      </image>
                    </div>
                    <div class="goods_right">
                      <div
                        class="content flex justify-between flex-wrap h-[92px]"
                      >
                        <div
                          class="cont_top ellipsis-2 leading-[1.2] text-[14px] pl-[9px] pt-[2px]"
                        >
                          {{ item.goods_id[0].name }}
                        </div>
                        <div
                          class="cont_bottom pl-[9px] flex items-center justify-between w-[100%]"
                        >
                          <div
                            v-if="data1[0]"
                            class="price_box text-[15px] textColor"
                          >
                            ￥{{ data1[0].market_price }}
                          </div>
                          <div
                            class="seckill"
                            @click.prevent="handleDelete(item._id)"
                          >
                            取消收藏
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </view>
              </unicloud-db>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
      <uni-load-more
        :status="loading ? 'loading' : hasMore ? 'more' : 'noMore'"
      ></uni-load-more
    ></unicloud-db>
  </div>
</template>

<script setup lang="ts">
const udb = ref()
const db = uniCloud.database()
const collectionList = ref([
  db
    .collection('user-like')
    .where(`user_id=='${uni.$userData._id}'`)
    .field('goods_id')
    .getTemp(),
  db
    .collection('opendb-mall-goods')
    .field(
      '_id,category_id,name,goods_thumb,remain_count,month_sell_count,total_sell_count,comment_count,is_real,is_best,is_new,is_hot,add_date',
    )
    .getTemp(),
])

const handleDelete = (id: string) => {
  udb.value.remove(id)
}
</script>

<style scoped lang="scss">
.box_left > image {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
