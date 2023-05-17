import MyRouter from '@/util/router'
export const useToGoodsDetail = () => {
  const toGoodsDetail = (query: { id: number; name: string }) => {
    const queryStr = encodeURIComponent(JSON.stringify(query))
    MyRouter.to('goodsDetail', queryStr)
  }
  return { toGoodsDetail }
}
