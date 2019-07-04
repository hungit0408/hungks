/**
 * Hàm gọi Api chung sử dụng Promise
 * created date: 18/06/2019
 * @param {string} enpoint địa chỉ gửi request
 * @param {string} type giao thức
 * @param {object} data dữ liệu gửi lên server
 * @param {function} success callback khi thành công
 * @param {function} error callback gọi lại khi thất bại
 * @author PDXuan
 */


var callApi = (methodType,enpoint, data, callback) => {
    return new Promise( function (resolve, reject) {
        // Thực thi các tác vụ bất đồng bộ ở đây, và gọi `resolve(result)` khi tác
        // vụ hoàn thành. Nếu xảy ra lỗi, gọi đến `reject(error)`.
        $.ajax({          
            type: methodType,
            url: "http://localhost:2344/" + enpoint,
            data: data ? JSON.stringify(data) : '',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                resolve(callback(res)); 
                return res;
            },
            err: function () {
                reject(new Error("oops lỗi rồi !"));
            }
        })

    })
}
