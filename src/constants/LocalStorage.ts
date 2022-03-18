const LocalStorage: any = {

  setItem: function (cname: any, cvalue: any, expDate: any) {
    localStorage.setItem(cname, cvalue)
    localStorage.setItem("expires", expDate)
  },

  getItem: function (cname: any) {
    return localStorage.getItem(cname)
  },

  clearStore: function () {
    localStorage.setItem('expires','Thu, 01 Jan 1970 00:00:00 GMT')
  }

}

export default LocalStorage;