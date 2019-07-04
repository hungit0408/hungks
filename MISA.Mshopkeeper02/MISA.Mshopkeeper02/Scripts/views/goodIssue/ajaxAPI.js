/**
 * ajaxAPI 
 * created date: 24/05/2019
 * @desc giao diện chung cơ bản cho ajax
 * @param {string} url địa chỉ gửi request
 * @param {string} type giao thức
 * @param {object} data dữ liệu gửi lên server
 * @param {function} success callback khi thành công
 * @param {function} error callback gọi lại khi thất bại
 * @param {boolean} async bất đồng bộ
 * @param {string} contentType loại dữ liệu gửi lên server
 * @param {string} dataType loại dữ liệu server gửi về
 * @author PMDUC
 */
var ajaxAPI = function (url, type, data, success, error, async, contentType, dataType) {
    $.ajax({
        url: url ? url : '',
        type: type ? type : 'GET',
        data: data ? data : '',
        async: async ? async : false,
        contentType: contentType ? contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: dataType ? dataType : 'json',
        success: success ? success : function () { },
        error: error ? error : function () { }
    });
}