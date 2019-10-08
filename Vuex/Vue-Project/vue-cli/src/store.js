// 第一步：引入Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//第二步：创建一个store
//第三步：将store暴露
export default new Vuex.Store({
  state: {   //数据初始化
    //存放数据
    carPanelData: [],
    receiveInfo: [{
      'name': '王某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际西6号楼319室',
      'default': true,
      'checked': true
    },{
      'name': '李某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际东6号楼350室',
      'default': false,
      'checked': false
    }],
    provisionalOrder: [],
    orderData: [],
    maxOff: false,
    carShow: false,
    ball: {
      show: false,
      el: null,
      img: ''
    }
  },
  getters: {
    //计算
    //数量
    totleCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count; 
      })
  	  return count
    },
    //价格计算
  	totlePrice (state) {
  	  let total = 0
  	  state.carPanelData.forEach((goods) => {
  	    total += goods.price * goods.count
  	  })
      return total
    },
    checkedCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        if(goods.checked)
        count += goods.count;
      })
      return count
    },
    checkedPrice (state) {
      let total = 0
      state.carPanelData.forEach((goods) => {
        if(goods.checked)
        total += goods.price * goods.count
      })
      return total
    },
    checkedCarPanelData (state) {
      let checkedCarPanelData = []
      state.carPanelData.forEach((goods) => {
        if(goods.checked)
        checkedCarPanelData.push(goods);
      })
      return checkedCarPanelData
    },
    //全选
    allChecked (state) {
      let allChecked = true
      state.carPanelData.forEach((goods) => {
        if(!goods.checked){
          allChecked = false
          return
        }
      })
      return allChecked
    },
    //最大数量
    maxCount (state) {
      let maxOff = false  
      state.carPanelData.forEach((goods) => {
        if(goods.count>goods.limit_num){
          goods.count--
        }
      })
      return maxOff
    }
  },
  mutations: {
    addCarPanelData (state,data) {
  	  let bOff = true   //bOff 是判断购物车是否添加过
  	  state.carPanelData.forEach((goods) => {//遍历所有商品
        //遍历添加的商品ID与购物车中的数据的ID是否相等
  	    if(goods.sku_id === data[0].sku_id){
  	      goods.count += data[1]   //商品ID如果相等，购物车数量直接加1
  	      if(goods.count>goods.limit_num){ 
  	        goods.count -= data[1]
  	        state.maxOff = true
  	        bOff = false  
  	        return
  	      }
          state.ball.el = event.path[0]
          state.ball.show = true
          state.ball.img = data[0].ali_image
  	      bOff = false
  	      state.carShow = true
  	    }
  	  })
  	  if(bOff){
  	    let goodsData = data[0]   //获取数据
  	    Vue.set(goodsData,'count',data[1])  
  	    Vue.set(goodsData,'checked',true)
  	    state.carPanelData.push(goodsData)  //将商品添加存放到state的carpanelData中
  	    state.carShow = true
        state.ball.el = event.path[0]
        state.ball.show = true
        state.ball.img = data[0].ali_image
  	  }
    },
    //添加购物车商品
    plusCarPanelData (state,id) {
      state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          if(goods.count === goods.limit_num) return
          goods.count ++
          return
        }
      })
    },
    //每次减少一个购物车商品
  	subCarPanelData (state,id) {
  	  state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          if(goods.count === 1) return
          goods.count --
          return
        }
      })
    },
    //删除购物车商品
  	delCarPanelData (state,id) {
  	  state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          state.carPanelData.splice(index,1)
          return
        }
      })
    },
    //被选中的购物车商品
    checkGoods (state,id) {
      state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          goods.checked = !goods.checked
        }
      })
    },
    //选中所有购物车商品
    allGoodsCheck (state,checked) {
      if(checked){
        state.carPanelData.forEach((goods,index) => {
          goods.checked = false
        })
      }else{
        state.carPanelData.forEach((goods,index) => {
          goods.checked = true
        })
      }
    },
    delCheckGoods (state) {
      let i = state.carPanelData.length
      while(i--){
        if(state.carPanelData[i].checked){
          state.carPanelData.splice(i,1)
        }
      }
    },
    submitOrder (state,data) {
      let i = state.carPanelData.length
      while(i--){
        if(state.carPanelData[i].checked){
          state.carPanelData.splice(i,1)
        }
      }
      state.orderData.unshift(data)
      state.receiveInfo.forEach((receive) => {
        receive.checked = receive.default
      })
    },
    payNow (state,id) {
      state.orderData.forEach((order,index) => {
        if(order.orderId === id){
          order.isPay = true
          return
        }
      })
    },
    alertPrompt (state) {
      state.maxOff = true
    },
    closePrompt (state) {
      state.maxOff = false
    },
    showCar (state) {
      state.carShow = true
    },
    hideCar (state) {
      state.carShow = false
    },
    checkDefault (state,data) {
      state.receiveInfo.forEach((receive,index) => {
        if (receive==data) {
          receive.default = true
//        state.receiveInfo.unshift(state.receiveInfo.splice(index,1)[0])
        } else {
          receive.default = false
        }
      })
    },
    checkOut (state,data) {
      state.provisionalOrder = data
    },
    submitReceive (state,data) {
      if(data[0].default){
        state.receiveInfo.forEach((receive,index) => {
          receive.default = false
          receive.checked = false
        })
//      state.receiveInfo.unshift(data)
//      return
      }
      if(data[1]==null){
        state.receiveInfo.push(data[0])
      }else{
        console.log(data[0])
        state.receiveInfo[data[1]] = data[0]
      }
    }
  },
  actions: {

  }
})
