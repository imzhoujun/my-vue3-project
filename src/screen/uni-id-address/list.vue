<!-- eslint-disable vue/v-on-event-hyphenation -->
<!-- eslint-disable vue/no-unused-vars -->
<template>
  <view class="container">
    <unicloud-db
      ref="udb"
      v-slot="{ data, pagination, loading, hasMore, error }"
      :collection="collectionList"
    >
      <view v-if="error">{{ error.message }}</view>
      <view v-else-if="data">
        <div class="list">
          <div
            v-for="(item, index) in data"
            :key="index"
            class="list-item"
            :clickable="true"
          >
            <div class="content w-full mb-[10px]">
              <div
                class="user_address_list bg-white rounded-[10px]"
                style="padding: 15px 10px"
              >
                <div class="address_box bg-white rounded-[10px]">
                  <div class="box_top flexCenter justify-between">
                    <div class="top_left">
                      <div class="name">{{ item.name }}</div>
                    </div>
                    <div class="top_right">
                      <div class="phone">{{ item.mobile }}</div>
                    </div>
                  </div>
                  <div class="box_center mt-[14px] mb-[20px]">
                    <div class="user_address">
                      <text>{{ item.area_name }}{{ item.address }}</text>
                    </div>
                  </div>
                  <div class="box_bottom flexCenter justify-between">
                    <div class="b_left">
                      <div v-if="item.is_default">默认地址</div>
                    </div>
                    <div class="b_right flexCenter">
                      <div
                        class="mr-[30px] text-[gray]"
                        @click="handleUpdate(item._id, data.length)"
                      >
                        编辑
                      </div>
                      <div
                        class="mr-[15px] text-[gray]"
                        @click="handleDelete(item._id)"
                      >
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </view>
      <uni-load-more
        :status="loading ? 'loading' : hasMore ? 'more' : 'noMore'"
      ></uni-load-more>
      <uni-fab
        ref="fab"
        horizontal="right"
        vertical="bottom"
        :pop-menu="false"
        @fabClick="fabClick(data.length)"
      />
    </unicloud-db>
  </view>
</template>

<script lang="ts" setup>
const udb = ref()

const db = uniCloud.database()
const collectionList = ref([
  db
    .collection('uni-id-address')
    .where('user_id=="64532023e766bb0085032f8b"')
    .field(
      'user_id,name,mobile,province_code,city_code,area_code,address,is_default,area_name',
    )
    .getTemp(),
  db
    .collection('opendb-city-china')
    .field('code, name as text, eq(type, 2) as isleaf')
    .getTemp(),
])

// const loadMore = ref({
//   contentdown: '',
//   contentrefresh: '',
//   contentnomore: '',
// })

const handleUpdate = (id: string, length: number) => {
  // 打开修改页面
  uni.navigateTo({
    url: `./edit?id=${id}&length=${length}`,
    events: {
      // 监听修改页面成功修改数据后, 刷新当前页面数据
      refreshData: () => {
        udb.value.loadData({
          clear: true,
        })
      },
    },
  })
}

const handleDelete = (id: string) => {
  udb.value.remove(id)
}

const fabClick = (length: number) => {
  // 打开新增页面
  uni.navigateTo({
    url: `./add?length=${length}`,
    events: {
      // 监听新增数据成功后, 刷新当前页面数据
      refreshData: () => {
        console.log('刷新数据')

        udb.value.loadData({
          clear: true,
        })
      },
    },
  })
}

onPullDownRefresh(() => {
  udb.value.loadData(
    {
      clear: true,
    },
    () => {
      uni.stopPullDownRefresh()
    },
  )
})
onReachBottom(() => {
  udb.value.loadMore()
})
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
}
::v-deep .uni-list-item__container {
  padding: 0;
  font-size: 12px;
}
</style>
