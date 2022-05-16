// @ts-nocheck
var firebase = require("firebase-admin");
// var admin = require("firebase-admin");

var serviceAccount = require("./banking-transaction-29880-firebase-adminsdk-y1j6a-2435499bd1.json");
// var serviceAccount = require("path/to/serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://banking-transaction-29880-default-rtdb.asia-southeast1.firebasedatabase.app"
});

var db = firebase.database();
// var ref = db.ref("banking_transaction/notification");
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log("snapshot : ", snapshot.val());
});

var usersRef = ref.child("Promotion");
usersRef.set({
  khuyenmai1: {
    time: "June 23, 2022",
    title: "Khuyến mãi 70% tiền nạp điện thoại2",
    desc: "Sau khi đã chọn được khuyến mãi từ ví điện tử mong muốn thì nạp thẻ luôn trong ngày khuyến mãi 20% từ các nhà mạng. Như vậy ngoài 20% ưu đãi từ các nhà mạng, bạn sẽ được hưởng thêm đến 50% khuyến mãi từ ví điện tử nữa."
  },
  khuyenmai2: {
    time: "April 13, 2022",
    title: "Lấy mã khuyến mãi giảm giá hoá đơn tiền điện phí",
    desc: "Hoàn tiền 20% giá trị thanh toán cho 01 giao dịch thanh toán tiền điện trong tháng đầu tiên (tối đa 50.000 đồng/Tháng)."
  }
});

var usersRef = ref.child("GuideInformation");
usersRef.set({
  huongdan1: {
    time: "June 23, 1912",
    postTitle: "Hướng dẫn thanh toán ngân hàng",
    content: "Content đã thay đổi."
  },
  huongdan2: {
    time: "December 9, 1906",
    postTitle: "Hướng dẫn đăng nhập ngân hàng",
    content: "1 Chọn Đăng ký Tại màn hình Đăng nhập, chọn Đăng ký        2 Nhập số điện thoại. Nhập số điện thoại đăng ký, sau đó nhấn Tiếp tục. ...        3 Nhập các thông tin yêu cầu, sau đó nhấn Tiếp tục.        4 Nhập mã OTP. ...        5 Cài đặt mã pin cho Soft OTP.        6 Cài đặt mã pin cho Soft OTP thành công.        7 Đồng ý định danh và liên kết ngân hàng. ...        8 Liên kết tài khoản/thẻ"
  }
});