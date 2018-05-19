new Vue({
  el: '.container',
  data: {
    addressList: [],
    limitedNumber: 3,
    currentIndex: 0,
    shoppingMethods: 1,
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getAddressList()
    })
  },
  computed: {
    filterAddress: function() {
      return this.addressList.slice(0, this.limitedNumber)
    }
  },
  methods: {
    getAddressList: function () {
      var _this = this
      axios.get("data/address.json").then(function (response) {
        var res = response.data
        if(res.status == '0') {
          _this.addressList = res.result
        }
      })
    },
    loadMore: function () {
      this.limitedNumber = this.addressList.length
    },
    setDefault: function (addressId) {
      this.addressList.forEach(function(address, index) {
        if(address.addressId == addressId) {
          address.isDefault = true
        }else {
          address.isDefault = false
        }
      })
    }
  }
})
