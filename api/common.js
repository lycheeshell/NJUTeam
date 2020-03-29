const app = getApp();
const prefix = "https://www.njuteam.top/";
const wxRequest = (params, url) => {
  let auth = wx.getStorageSync("openid")
  if (auth == '') {
    app.onLogin();
  }
  console.log("auth openid : " + auth);
  wx.request({
    url: prefix + params.url,
    data: params.data || '',
    header: {
      'content-type': params.content_type,
      'authorization': auth
    },
    method: params.method || 'GET',
    success: (res) => {
      params.success && params.success(res);
    },
    fail: (res) => {
      params.fail && params.fail(res);
    },
    complete: (res) => {
      params.complete && params.complete(res);
    }
  })
}

export default wxRequest;