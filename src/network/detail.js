import { request } from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: { iid }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 商品数据的构造
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}

// 商品店铺数据的构造
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

// 商品参数数据的构造
export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0]:''
    this.protuct_key = info.key
    this.set = info.set
    this.size_key = rule.key
    this.size = rule.tables
  }
}
