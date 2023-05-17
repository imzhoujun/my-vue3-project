type Router = {
  to(url: st, query: st, page: string): void
  closeTo(url: st): void
  closeAllTo(url: st): void
  toTabs(url: st): void
  back(num: number): void
}

class MyRouter implements Router {
  //保留当前页面，跳转到应用内的某个页面
  to(url: string, query = '', page = 'screen'): void {
    uni.navigateTo({
      url: `/${page}/${url}/${url}?query=${query}`,
    })
  }

  //关闭当前页面，跳转到应用内的某个页面
  closeTo(url: string): void {
    uni.redirectTo({
      url: `/pages/${url}/${url}`,
    })
  }

  // 关闭所有页面，打开到应用内的某个页面。
  closeAllTo(url: string): void {
    uni.reLaunch({
      url: `/pages/${url}/${url}`,
    })
  }

  //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  toTabs(url: string): void {
    uni.switchTab({
      url: `/pages/${url}/${url}`,
    })
  }

  //关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
  back(num = 1): void {
    uni.navigateBack({
      delta: num,
    })
  }
}

export default new MyRouter()
