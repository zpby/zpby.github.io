var vm = new Vue ({
  el: "#app",
  data: {
    productList: [],
    totalMoney: 0,
    checkAllFlag: false,
    delFlag: false,
    curProduct: ''
  },
  filters: {
    formatMoney: function(value) {
      return '￥'+value.toFixed(2)
    }
  },
  mounted: function() {
    // 为了确保vue实例完全插入
    this.$nextTick(function() {
      this.carView();
    })
  },
  methods: {
    carView: function () {
      axios.get("data/cartData.json").then(res=>{
        this.productList = res.data.result.list
        // this.totalMoney = res.data.result.totalMoney
      })
    },
    changeMoney: function(product, way) {
      if (way > 0) {
        product.productQuantity++
      } else {
        product.productQuantity--
        if(product.productQuantity < 1) {
          product.productQuantity = 1
        }
      }
      this.calcTotalPrice()
    },
    selectedProduct: function(item) {
      if (typeof item.checked === "undefined") {
        // 全局注册
        // Vue.set(item, "checked", true)
        // 局部注册
        this.$set(item, "checked", true)
      } else {
        item.checked = !item.checked
      }
      this.checkAllFlag = this.productList.every((val)=>{
        return val.checked == true
      })
      console.log(item.checked)
      this.calcTotalPrice()
    },
    checkAll: function(flag) {
      this.checkAllFlag = flag
      // var _this = this.checkAllFlag
      // this.productList.forEach(function(item, index) {
      //   if (item.checked === "undefined") {
      //     this.$set(item, "checked", _this)
      //   } else {
      //     item.checked = _this
      //   }
      // })
      this.productList.forEach((item, index) => {
        if (item.checked === "undefined") {
            this.$set(item, "checked", flag)
        } else {
          item.checked = flag
        }
      })
      this.calcTotalPrice()
    },
    calcTotalPrice: function() {
      this.totalMoney = 0
      this.productList.forEach((item, index) => {
        if(item.checked) {
          this.totalMoney += item.productQuantity * item.productPrice
          // console.log()
        }
      })
    },
    delConfirm: function(item) {
      this.delFlag = true
      this.curProduct = item
    },
    delProduct: function() {
      var index = this.productList.indexOf(this.curProduct)
      this.productList.splice(index, 1)
      this.delFlag = false
    }
  },
})


Vue.filter ("money", function(value, type) {
  return '￥'+value.toFixed(2)+type
})
