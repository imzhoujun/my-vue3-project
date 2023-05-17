<template>
  <div class="content">
    <nav id="nav">
      <div
        class="ul flex ml-[10px]"
        :style="{
          transition: isT ? 'transfrom .5s' : '',
          transform: `translateX(${transform}px)`,
        }"
        @touchstart="start"
        @touchend="end"
        @touchmove="move"
      >
        <div v-for="(item, index) in 14" :key="index" class="li">{{ item }}</div>
      </div>
    </nav>
  </div>
</template>

<!-- <script setup lang="ts">
const { windowWidth } = uni.getSystemInfoSync()

const scl = reactive({
  tranNum: 0,
  startX: 0, //刚触碰到屏幕的时的手指信息
  centerX: 0, // 用来记录每次触摸时上一次的偏移距离
})
const maxRight = 50 // 设定一个最大向右滑动的距离
const list = ref()
const translateX = ref(0)
const maxLeft = -(650 - 375 + 50)
const maxLeftBounce = 0
const isB = ref(false)
const getDom = (domName: string, cb: Function) => {
  const q = uni.createSelectorQuery()
  q.select(domName)
    .boundingClientRect((res) => {
      cb(res)
    })
    .exec()
}

const move = (e: TouchEvent) => {
  // 获取差值
  const dx = e.changedTouches[0].clientX - scl.startX
  // 上次的滑动距离加上本次的滑动距离
  let temX = scl.centerX + dx

  if (temX > maxRight) {
    // 直接让偏移的值 等于这个设定值
    temX = maxRight
  } else if (temX < maxLeft) {
    temX = maxLeft
  }
  //偏移
  scl.tranNum = temX
}

// 记录手指在 x 轴上的落点距离可视距离
const moveStart = (e: TouchEvent) => {
  scl.startX = e.changedTouches[0].clientX
}
const moveEnd = (e: TouchEvent) => {
  // 获取差值
  const dx = e.changedTouches[0].clientY - scl.startX
  // 记录移动的距离
  scl.centerX = scl.centerX + dx

  if (scl.centerX > maxLeftBounce) {
    isB.value = true
    scl.centerX = maxLeftBounce
    //偏移
    scl.tranNum = scl.centerX
    isB.value = false
  }
}

onMounted(() => {})



</script> -->

<script lang="ts" setup>
const across = reactive({
  startX: 0,
  centerX: -50,
  maxLeft: 0,
  maxRight: -(600 - 375 + 0),
  maxLeftSlide: -50,
  maxRightSlide: -(600 - 375 - 50),
})
const isT = ref(false)
const transform = ref(0)
function start(e: TouchEvent) {
  e.preventDefault()
  isT.value = false
  across.startX = e.changedTouches[0].clientX
}
function move(e: TouchEvent) {
  e.preventDefault()

  const dx = e.changedTouches[0].clientX - across.startX
  let tempX = across.centerX + dx

  if (tempX > across.maxLeft) {
    tempX = across.maxLeft
  } else if (tempX < across.maxRight) {
    tempX = across.maxRight
  }
  transform.value = tempX
}
function end(e: TouchEvent) {
  e.preventDefault()

  const dx = e.changedTouches[0].clientX - across.startX
  across.centerX = across.centerX + dx
  if (across.centerX > across.maxLeftSlide) {
    across.centerX = across.maxLeftSlide
  } else if (across.centerX < across.maxRightSlide) {
    across.centerX = across.maxRightSlide
  }

  isT.value = true
  transform.value = across.centerX
}
</script>

<style scoped lang="scss">
#nav {
  width: 100%;
  overflow: hidden;
}

#nav::after {
  content: '';
  display: block;
  visibility: hidden;
  height: 0;
  clear: both;
}

.ul {
	width: 375px;
  float: left;
  white-space: nowrap;
  background: #1062ac;
  color: #cccccc;
  padding: 0 60px;
  transform: translateX(-50px);
}

.ul > .li {
  display: inline-block;
  padding: 10px;
}
</style>
