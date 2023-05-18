<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
  // 小程序密钥  d55577bd1e902e393a43716926dd3ff4
})
</script>
<style lang="scss">
// :root {
//   --likeColor: red;
// }

image {
  display: block !important;
}

page {
  font-size: 12px;

  background-color: #f5f5f5 !important;
}

.ellipsis-1 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.textColor {
  color: #4a90e2;
}

.flexCenter {
  display: flex;
  align-items: center;
}

.ellipsis-2 {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  font-size: 14px;
  height: 34px;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

//checkbox
checkbox.round .wx-checkbox-input,
checkbox.round .uni-checkbox-input {
  border-radius: 50%;
}

// checkbox背景色
checkbox.red[checked] .wx-checkbox-input,
checkbox.red.checked .uni-checkbox-input {
  background-color: #e54d42 !important;
  border-color: #e54d42 !important;
  color: #ffffff !important;
}
</style>
