const useTabs = () => {
  const swiperCurrent = ref(0)
  const tabs = ref()
  const swiperHeight = ref(0)
  const tabsChange = (index: number) => {
    swiperCurrent.value = index
  }

  const swiperTransition = (e: any) => {
    tabs.value.setDx(e.detail.dx)
  }

  const swiperAnimationfinish = (e: any) => {
    swiperCurrent.value = e.detail.current
    tabs.value.unlockDx()
  }
  return {
    swiperCurrent,
    tabs,
    swiperHeight,
    tabsChange,
    swiperTransition,
    swiperAnimationfinish,
  }
}

export default useTabs
