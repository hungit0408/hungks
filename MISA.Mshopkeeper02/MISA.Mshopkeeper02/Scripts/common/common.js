
//NNLam format date -> MM/dd/yyyy
Date.prototype.formatMMddyyyy = function () {
    var day = this.getDate();
    var month = this.getMonth() + 1;
    var year = this.getFullYear();
    return month + '-' + day + '-' + year;
}

// NNLam format date -> yyyy/MM/dd
Date.prototype.formatyyyyMMdd = function () {
    var day = this.getDate();
    var month = this.getMonth() + 1;
    var year = this.getFullYear();
    return year + '-' + month + '-' + day;
}

// NNLam format tiền
Number.prototype.formatMoney = function () {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

//kyls========
Date.prototype.formatddMMyyyy = function () {
    var day = this.getDate() < 10 ? '0' + this.getDate() : this.getDate();
    var month = this.getMonth() + 1 < 10 ? '0' + (this.getMonth() + 1) : this.getMonth() + 1;
    var year = this.getFullYear();
    var today = day + '/' + month + '/' + year;
    return today;
}

Date.prototype.formatHHmm = function () {
    var hours = this.getHours() < 10 ? '0' + this.getHours() : this.getHours();
    var minutes = this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes();
    var time = hours + ":" + minutes;
    return time;
}

/**
 * Hàm format string dạng dd/mm/yy hh:mm to date
 * CreatedBy: NDCong(21/6/2019)
 * */
String.prototype.formatddMMyyyhhmmToDate = function() {
    var date = new Date();
    var dateString = this.split(' ')[0];
    var timeString = this.split(' ')[1];
    var day = dateString.split('/')[0];
    var month = dateString.split('/')[1];
    var year = dateString.split('/')[2];
    var hour = timeString.split(':')[0] || 0;
    var min = timeString.split(':')[1] || 0;
    date.setUTCDate(day);
    date.setUTCMonth(+month - 1);
    date.setUTCFullYear(year);
    date.setUTCHours(hour);
    date.setUTCMinutes(min);
    return date;
}

/**
 * Format dd/MM/yyy to mm-dd-yyyy chuẩn trong DB
 * CreatedBy: NDCong(24/6/2019)
 * */
String.prototype.formatMMddyyy = function () {
    if (this == '')
        return '';
    else {
        var arr = this.split('/');
        return arr[1] + '/' + arr[0] + '/' + arr[2];
    }   
}

/**
 * Hàm format tiền tệ
 * 1000000 => 1.000.000
 * CreatedBy: NDCong(20/5/2019)
 * @param {any} currency
 */
function FormatCurrency(currency) {
    //debugger
    //Biểu thức chính quy định dạng tiền tệ
    var currencyRegex = /(\d)(?=(\d{3})+(?!\d))/g;
    //Chuyển về kiểu string
    if (typeof (currency) != "string") currency = String(currency);
    return currency.replace(currencyRegex, "$1.");
}

/**
 * Format tiền tệ đã format thành số
 * 1.000.000 => 1000000
 * @param {any} currency
 */
function CurencyToNumber(currency) {
    return Number(currency.replace(/\./g, ''));
}


/**
 * Hàm format số điện thoại 
 * 0342 702 777
 * CreatedBy: PDXuan(23/5/2019)
 * @param {any} phonenumber
 */
function FormatPhoneNumber(phone) {
    //xóa các ký tự thừa  
    phone = phone.replace(/[^\d]/g, "");
    //kiểm tra xem số điện thoại có chiều dài = 10 
   
        //format và trả về chuối cần hiển thị
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    
}

//lấy số tuần trong năm
Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
//kyls==========
/**
* Hàm hiện thị thời gian ở dạng hh:mm
* CreatedBy: NDCong(13/5/2019)
* @param {number} hours
* @param {number} min
*/
function showHoursAndMinute(hours, min) {
    hours = (hours < 10) ? ('0' + hours) : hours;
    min = (min < 10) ? ('0' + min) : min;
    return hours + ":" + min;
}

//check validate ngày
function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
/**
 * Hàm kiểm tra định dạng thời gian hh:mm
 * CreatedBy: NDCong(18/5/2019)
 * @param {string} time
 */
function isTimeFormathhmm(time) {
    //Sử dụng biểu thức chính quy
    var timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time) && time != "";
}
/**
 * Hàm kiểm tra ngày tháng có theo định dạng dd/mm/yyyy
 * CreateBy:NDCong(18/05/2019)
 * @param {string} date
 */
function isDateFormatddmmyyyy(date) {
    //Biểu thức chính quy xác thực ngày trong định dạng dd/mm/yyy   
    var dateRegExp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return dateRegExp.test(date);
}

/**
 * Hàm resizeale với thanh resize
 * resizeBar: slector đến thanh resize
 * firtElement: selector đến phần tử đầu tiên
 * seconElement: selector đến phần tử thứ hai
 * dimemtion: nếu truyền vào "vertical" thì resize theo chiều dọc (mặc định), nếu khác thì theo chiều ngang.
 * CreatedBy: NDCong(24/05/2019)
 * @param {string} resizeBar
 * @param {string} firstElement
 * @param {string} secondElement
 * @param {string} dimention
 */
function resizeElementsWithResizeBar(resizeBar, firstElement, secondElement, dimention = "vertical") {
    var dragBar = $(resizeBar);
    var firstElement = $(firstElement);
    var secondElement = $(secondElement);
    var containerElement = firstElement.parent();
    var firstPercentage;
    var dimCSS;
    var isMouseDown = false;

    if (dimention == "vertical") {
        dimCSS = 'height';
        dragBar.css('cursor', 'row-resize');
    }
    else {
        dimCSS = 'width';
        dragBar.css('cursor', 'col-resize');
    }

    $(document).on('mousedown', resizeBar, function () {
        isMouseDown = true;
    })
    $(document).on('mouseup', function () {
        isMouseDown = false;
    })
    $(document).on('mousemove', function (event) {
        event.stopPropagation();
        if (isMouseDown) {
            var offset = containerElement.offset();
            //Tính độ rộng/độ cao của phần tử thứ nhất theo %
            if (dimention == "vertical") {
                firstPercentage = ((event.pageY - offset.top) / heightToNumber(containerElement.css('height'))) * 100;
            }
            else {
                firstPercentage = ((event.pageX - offset.left) / heightToNumber(containerElement.css('width'))) * 100;
            }
            //Cập nhật độ rộng/chiều cao
            firstElement.css(dimCSS, firstPercentage + '%');
            secondElement.css(dimCSS, (100 - firstPercentage) + "%");
            $(document).trigger('layoutresize');
        }
    })
    /**
     * chuyển từ chuỗi đơn vị đo có đơn vị px sang số
     * "100px" => 100
     * @param {any} height
     */
    function heightToNumber(height) {
        height = height.replace("px", "");
        return +height;
    }
}
