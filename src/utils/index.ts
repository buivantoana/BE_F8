export function convertToVND(amount:any) {
    // Chuyển đổi số tiền thành chuỗi và thêm dấu phân tách hàng nghìn
    let formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Thêm ký hiệu tiền tệ "₫" vào cuối
    return formattedAmount + " ₫";
  }