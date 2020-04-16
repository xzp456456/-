const formatTime = (date, type = "d") => {
  if (!date) return "";
  date = new Date(date * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  if (type == "d") {
    return [year, month, day].map(formatNumber).join("-");
  } else if (type == "dt") {
    return [year, month, day].map(formatNumber).join("-") + " " + [hour, minute, second].map(formatNumber).join(":");
  } else if (type == "dm") {
    return [year, month, day].map(formatNumber).join("-") + " " + [hour, minute].map(formatNumber).join(":");
  }
}

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

const getCurrDate = (type = "d") => {
  return formatTime(new Date().getTime() / 1000, type);
}

const showToast = (title, icon = "none", success = () => { }, duration = 2000, mask = true) => {
  return wx.showToast({
    title,
    icon,
    mask,
    duration,
    success
  })
}

const showLoading = (title = "加载中...", mask = true) => {
  return wx.showLoading({
    title,
    mask
  })
}

const showModal = (content, success = () => { }, showCancel = true, cancelText = "取消", confirmText = "确定", title = "提示", confirmColor = "#fdd400") => {
  return wx.showModal({
    title,
    content,
    showCancel,
    cancelText,
    confirmText,
    confirmColor,
    success
  })
}

const checkLogin = (fn) => {
  let mpToken = wx.getStorageSync("mpSessionId");
  if (!mpToken) {
    wx.navigateTo({
      url: "/pagesUser/login/login"
    });
  } else {
    fn && fn();
  }
}

module.exports = {
  formatTime,
  getCurrDate,
  showToast,
  showLoading,
  showModal,
  checkLogin
}
