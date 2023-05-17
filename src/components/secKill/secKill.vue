<template>
  <div class="countDown">
    <div class="box flex items-center">
      <slot name="left"></slot>
      <!-- <div v-html="html"></div> -->
      <div v-if="isDefault">
        <div class="flexCenter" :style="{ color: textColor }">
          <div class="text" :style="{ background: textBgc }">
            {{ zeroFill(times.day) }}
          </div>
          <div class="" :style="{ color: unitColor }">天</div>
          <div class="text" :style="{ background: textBgc }">
            {{ zeroFill(times.hour) }}
          </div>
          <div :style="{ color: unitColor }">:</div>
          <div class="text" :style="{ background: textBgc }">
            {{ zeroFill(times.minute) }}
          </div>
          <div :style="{ color: unitColor }">:</div>
          <div class="text" :style="{ background: textBgc }">
            {{ zeroFill(times.second) }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flexCenter text-white" :style="{ color: textColor }">
          <div class="text1" :style="{ background: textBgc }">
            {{ zeroFill(times.day) }}
          </div>
          <div :style="{ color: unitColor }">天</div>
          <div class="text1" :style="{ background: textBgc }">
            {{ zeroFill(times.hour) }}
          </div>
          <div :style="{ color: unitColor }">:</div>
          <div class="text1" :style="{ background: textBgc }">
            {{ zeroFill(times.minute) }}
          </div>
          <div :style="{ color: unitColor }">:</div>
          <div class="text1" :style="{ background: textBgc }">
            {{ zeroFill(times.second) }}
          </div>
        </div>
      </div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
type Props = {
  textColor?: string
  textBgc?: string
  isDefault?: boolean
  endTime: string | Date
  unitColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  textColor: 'white',
  textBgc: '',
  isDefault: true,
  endTime: '',
  unitColor: '',
})

const endTime = ref(moment(props.endTime))
const time = ref(0)

const times = reactive({
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
})

function countdown() {
  const timer = setInterval(() => {
    const now = moment()

    time.value = endTime.value.diff(now, 'seconds')
    const seconds = time.value

    if (time.value <= 0) {
      clearInterval(timer)
    }

    const second = seconds % 60
    const minutes = (seconds - second) / 60
    const minute = minutes % 60
    const hours = (minutes - minute) / 60
    const hour = hours % 24
    const day = (hours - hour) / 24

    times.day = day
    times.hour = hour
    times.minute = minute
    times.second = second
    // console.log(`${day} 天 ${hour} : ${minute} : ${second} `)

    // const res = ` ${day} 天 ${hour} : ${minute} : ${second} `
  }, 1000)
}

function zeroFill(name: string | number) {
  return String(name).padStart(2, '0')
}
onMounted(() => {
  countdown()
})
</script>

<style scoped lang="scss">
::v-deep.countDown {
  height: 26px;
  line-height: 26px;
}

::v-deep.text {
  margin: 0 3px;
  background-color: hsla(0, 0%, 100%, 0.15);
  border-radius: 4px;
  padding: 0 2px;
}

::v-deep.text1 {
  // margin: 0 3px;
  // border-radius: 4px;
  // padding: 0 2px;
}
</style>
