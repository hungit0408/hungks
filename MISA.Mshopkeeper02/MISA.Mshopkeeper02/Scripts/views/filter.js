
$(document).ready(function () {
    var filterDataJs = new FilterDataJS();
    //Khai báo các đối tượng datePicker
    var starDate = new DatePicker('.startdate .date-picker');
    var endDate = new DatePicker('.enddate .date-picker');
    var inputdate = new DatePicker('.input-date-picker');

})

//CreateedBy: NNLam(2/5/2019)
class FilterDataJS {
    constructor(elementSelector = 'div.filter-data') {
        this.elementSelector = elementSelector;
        this.loadFilterDataHtml();
        this.thisMonth();
        this.initEvent();
    }
    //load filter html
    loadFilterDataHtml() {
        var filterDataHtml = '<div style="margin-right: 10px">'
            + '<select id="" class="py-md-1 select-date">'
            + '<option value="today">Hôm nay</option>'
            + '<option value="yesterday">Hôm qua</option>'
            + '<option value="this week">Tuần này</option>'
            + '< option value = "week ago" >Tuần trước</option >'
            + '<option value="this month">Tháng này</option>'
            + '<option value="month ago">Tháng trước</option>'
            + '<option value="this quarter">Quý này</option>'
            + '<option value="quarter ago">Quý trước</option>'
            + '<option value="six months ago">6 tháng trước</option>'
            + '<option value="this year">Năm nay</option>'
            + '<option value="year ago">Năm trước</option>'
            + '<option value="other">Khác</option>'
            + '</select>'
            + '</div>'
            + '</div >'
            + '<span>Từ</span>'
            + '<div class="flex-center rectangle startdate">'
            + '<input type="text" id="startDate" class="date-picker txtStartDate" name="inpdate" value="" />'
            + '</div>'
            + '<span>đến</span>'
            + '<div class="flex-center rectangle enddate">'
            + '<input type="text" id="endDate" class="date-picker txtEndDate" name="inpdate" value="" />'
            + '</div>'
            + '<button class="rectangle getdata startFilterData flex-center">'
            + '<div class="filt-icon "></div>Lấy dữ liệu'
            + '</button>';
        $(this.elementSelector).html(filterDataHtml);
    }

    initEvent() {
        $(document).on('change', this.elementSelector + ' .select-date', this.getDate.bind(this)); //save this of class kho
        $(document).on('change', this.elementSelector + '  input[name="inpdate"]', this.autoDefaulDate);// NNlam
        //$(document).on('click', this.elementSelector + ' .startFilterData', this.filterVoucherData)
    }
    //Hàm xử lý chọn khoảng thời gian thì tự động cập nhật date
    getDate() {
        //debugger
        var infoDate = $(this.elementSelector + " .select-date").val();
        var dd = new Date();
        switch (infoDate) {
            case "today":
                {
                    this.toDayDefault();
                    break;
                }
            case "yesterday":
                {
                    var date = dd;
                    date.setDate(date.getDate() - 1);
                    var yesterday = date.formatddMMyyyy();
                    this.bindDateForm(yesterday, yesterday);
                    break;
                }
            case "this week":
                {
                    var weekNo = dd.getWeek();
                    var yy = dd.getFullYear();
                    var firstDate = this.getDateRangeOfWeek1(weekNo, yy).firstDate;
                    var endDate = this.getDateRangeOfWeek1(weekNo, yy).endDate;
                    this.bindDateForm(firstDate, endDate);
                    break;
                }
            case "week ago":
                {
                    var weekNo = dd.getWeek() - 1;
                    var yy = dd.getFullYear();
                    var firstDate = this.getDateRangeOfWeek1(weekNo, yy).firstDate;
                    var endDate = this.getDateRangeOfWeek1(weekNo, yy).endDate;
                    this.bindDateForm(firstDate, endDate);
                    break;
                }
            case "this month":
                {
                    var firstDate = new Date(dd.getFullYear(), dd.getMonth(), 1).formatddMMyyyy();
                    var endDate = new Date(dd.getFullYear(), dd.getMonth() + 1, 0).formatddMMyyyy();
                    this.bindDateForm(firstDate, endDate);
                    break;
                }
            case "month ago":
                {
                    var date = dd;
                    date.setMonth(date.getMonth() - 1);
                    var firstDate = new Date(dd.getFullYear(), date.getMonth(), 1).formatddMMyyyy();
                    var endDate = new Date(dd.getFullYear(), date.getMonth() + 1, 0).formatddMMyyyy();
                    this.bindDateForm(firstDate, endDate);
                    break;
                }
            case "this quarter":
                {
                    var quarter = this.quarter_of_the_year(dd);
                    var firstDate = new Date(dd.getFullYear(), (quarter - 1) * 3, 1);
                    var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
                    firstDate = firstDate.formatddMMyyyy();
                    endDate = endDate.formatddMMyyyy();
                    this.bindDateForm(firstDate, endDate);
                    break;
                }
            case "quarter ago":
                {
                    var quarter = this.quarter_of_the_year(dd);
                    quarter = (quarter - 2) >= 0 ? quarter - 2 : 0;
                    var firstDate = new Date(dd.getFullYear(), quarter * 3, 1);
                    var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
                    firstDate = firstDate.formatddMMyyyy();
                    endDate = endDate.formatddMMyyyy();
                    this.bindDateForm(firstDate, endDate);
                    break;
                }
            case "six months ago":
                {
                    var endDate = dd.formatddMMyyyy();
                    var date = dd;
                    date.setMonth(dd.getMonth() - 6);
                    var firstDate = date.formatddMMyyyy();
                    this.bindDateForm(firstDate, endDate);
                    break;
                }
            case "this year":
                {
                    var firstDate = new Date(dd.getFullYear(), 0, 1).formatddMMyyyy();
                    var endDate = new Date(dd.getFullYear(), 12, 0).formatddMMyyyy();
                    this.bindDateForm(firstDate, endDate);
                    break;
                }
            case "year ago":
                {
                    var date = dd;
                    date.setFullYear(date.getFullYear() - 1);
                    var firstDate = new Date(date.getFullYear(), 0, 1).formatddMMyyyy();
                    var endDate = new Date(date.getFullYear(), 12, 0).formatddMMyyyy();
                    this.bindDateForm(firstDate, endDate);
                    break;
                }
            case "other":
                {
                    console.log("other"); break;
                }
        }
    }

    //hiện ngay hôm nay khi vào website
    toDayDefault() {
        var dd = new Date();
        var toDay = dd.formatddMMyyyy();
        this.bindDateForm(toDay, toDay);
    }

    thisMonth() {
        var firstDate = new Date(dd.getFullYear(), dd.getMonth(), 1).formatddMMyyyy();
        var endDate = new Date(dd.getFullYear(), dd.getMonth() + 1, 0).formatddMMyyyy();
        this.bindDateForm(firstDate, endDate);
    }
    //khi kích chuột ra ngoài mà input date trống thì auto sét ngày hiện tại- NNLam
    autoDefaulDate() {
        var checkValue = $(this).val();
        if (checkValue === null || checkValue === "") {
            $(this).val(toDay);
        }
    }
    //đưa dữ liệu vào form
    bindDateForm(firstDate, endDate) {
        $(this.elementSelector + " .txtStartDate").val(firstDate);
        $(this.elementSelector + " .txtEndDate").val(endDate);
    }

    //lấy ngày đầu tiên và ngày cuối cùng của tuần
    getDateRangeOfWeek1(weekNo, y) {
        var d1, numOfdaysPastSinceLastMonday;
        d1 = new Date('' + y + '');
        numOfdaysPastSinceLastMonday = d1.getDay() - 1;
        d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
        d1.setDate(d1.getDate() + (7 * (weekNo - d1.getWeek())));

        d1.setMonth(d1.getMonth() + 1)
        var firstDate = (d1.getDate() < 10 ? ('0' + d1.getDate()) : d1.getDate()) + "/" + (d1.getMonth() < 10 ? ('0' + d1.getMonth()) : d1.getMonth()) + "/" + d1.getFullYear();
        d1.setDate(d1.getDate() + 6);
        var endDate = (d1.getDate() < 10 ? ('0' + d1.getDate()) : d1.getDate()) + "/" + (d1.getMonth() < 10 ? ('0' + d1.getMonth()) : d1.getMonth()) + "/" + d1.getFullYear();
        return {
            firstDate: firstDate,
            endDate: endDate
        };
    }

    //lấy số quý trong năm
    quarter_of_the_year(date) {
        var month = date.getMonth() + 1;
        return (Math.ceil(month / 3));
    }

    filterVoucherData() {
        $('#tbodyListVoucher').empty();
        $('#tfootListVoucher').empty();
        $('#tbodyVoucherDetail').html('');
        $('#tfootVoucherDetail').html('');
        $('div[name="loading"]').addClass('loadingPageVoucher');
        $('tfoot#tfootListVoucher').addClass('nonDisplay');
        $('.paging').addClass('nonDisplay');
        $('.fooder-detail').addClass('nonDisplay');
        $('#tbodyListVoucher').css({
            'height': '0px',

        });
        $('#Money_Fund_ID .btn-duplicateVoucher').attr('disabled', true);
        $('#Money_Fund_ID .btn-viewVoucher').attr('disabled', true);
        $('#Money_Fund_ID .btn-editVoucher').attr('disabled', true);
        $('#Money_Fund_ID .btn-deleteVoucher').attr('disabled', true);
        $('#Money_Fund_ID .btn-loadListVoucher').attr('disabled', true);

        var pageNumber = $('input[name = "pageNumber"]').val();
        var numberRow = $('select.numberRow').children("option:selected").val();
        var stDate = $('div.filter-data #startDate').val();
        var edDate = $('div.filter-data #endDate').val();
        var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
        var startDate = stDate.replace(pattern, '$3-$2-$1');
        var endDate = edDate.replace(pattern, '$3-$2-$1');
        var dataRequest = {
            "pageNumber" : pageNumber,
            "numberRow": numberRow,
            "startDate": startDate,
            "endDate": endDate
        }
        debugger
        $.ajax({
            url: '/api/filterVoucherByTime',
            data: dataRequest,
            dataType: 'json',
            type: 'PUT',
            error: function () {
                alert("error!");
            },
            success: function (response) {
                if (response.Success) {
                    var fields = $('#tblMoneyFund thead [fieldData]');
                    var data = response.Data;
                    var MoneyTotail = 0;
                    // buid table hiển thị dư liệu
                    if ($.trim(data)) {
                        debugger
                        $.each(data, function (index, item) {
                            var row = '<tr id="' + index + '"></tr>';
                            var rowTbodyHTML = $(row);
                            $.each(fields, function (index2, field) {
                                var fieldName = $(field).attr("fieldData");
                                var cellTbodyHTML = '';
                                var fieldValue = item[fieldName];
                                var miniHTML = '';
                                if (fieldName === "TotalAmount") {
                                    MoneyTotail += fieldValue;
                                }
                                if (fieldName === "RefNo") {
                                    miniHTML = '<td name="' + fieldName + '" class=" text-align-left cls-hyperlink col';
                                } else {
                                    miniHTML = '<td name="' + fieldName + '" class=" text-align-left eventClick col';
                                }
                                if (fieldName === "CheckBox") {
                                    cellTbodyHTML = '<td class="col' + index2 + '"><input class="filter-input-checkbox" type="checkbox" name="ckbRow" value="" /></td>';
                                }
                                else {
                                    var testDate = new Date(fieldValue);
                                    var test = $.type(testDate);
                                    var typeData = $.type(fieldValue);
                                    if (isValidDate(testDate) && typeData === "string") { typeData = test; }
                                    switch (typeData) {
                                        case "string":
                                            cellTbodyHTML = miniHTML + index2 + '">' + fieldValue + '</td>';
                                            break
                                        case "number":
                                            cellTbodyHTML = '<td class=" text-align-right eventClick col' + index2 + '">' + fieldValue.formatMoney() + '</td>';
                                            break
                                        case "date":
                                            cellTbodyHTML = '<td class=" text-align-center eventClick col' + index2 + '">' + (new Date("" + fieldValue)).formatddMMyyyy() + '</td>';
                                            break
                                        default:
                                            cellTbodyHTML = '<td class="eventClick col' + index2 + '"></td>';
                                            break
                                    }

                                }
                                rowTbodyHTML.append(cellTbodyHTML);
                            });
                            // append cho phần tbody
                            $('#tbodyListVoucher').append(rowTbodyHTML);
                            // set key id cho row
                            $('#tbodyListVoucher tr#' + index).data('id', item.Id);
                            $('#tbodyListVoucher tr').first().addClass('eventClickRow');
                        });
                        var rowTfootHTML = $("<tr></tr>");
                        $.each(fields, function (index3, field) {
                            var fieldName = $(field).attr("fieldData");
                            var cellTfootHTML = '';
                            if (fieldName === "TotalAmount") {
                                cellTfootHTML = '<td class="text-align-right" style="background-color: #e2e2e2; font-weight: bold;">' + MoneyTotail.formatMoney() + '</td>';
                            } else cellTfootHTML = '<td style="background-color: #e2e2e2;"></td>';
                            rowTfootHTML.append(cellTfootHTML);
                        });
                        // append cho phần tfoot
                        $('#tfootListVoucher').append(rowTfootHTML);

                        // gen html cho phần detail
                        var item;
                        if (data[0].BudgetItemName === null) item = '';
                        else item = data[0].BudgetItemName;
                        var rowTbodyHTML = '<tr style="height: 32px">'
                            + '<td class="text-align-left" name="Reason">' + data[0].Description + '</td>'
                            + '<td class="text-align-center" name="MoneyNumber">' + data[0].TotalAmount.formatMoney() + '</td>'
                            + '<td class="text-align-left" name="Item">' + item + '</td></tr >'
                            + '<tr style="height: auto"></tr>';
                        var rowTfootHTML = '<tr class="hightlight" style="height: 32px">'
                            + '<td></td>'
                            + '<td class="text-align-center" style="font-weight: bold;" name="MoneyNumberInTfoot">' + data[0].TotalAmount.formatMoney() + '</td >'
                            + '<td></td></tr>';


                        $('#tbodyVoucherDetail tr').remove('tr');
                        $('#tbodyVoucherDetail').append(rowTbodyHTML);
                        $('#tfootVoucherDetail tr').remove('tr');
                        $('#tfootVoucherDetail').append(rowTfootHTML);
                        $('.nonDisplay').removeClass('nonDisplay');
                        //$('.table-list-voucher').css('height', '435px');
                        $('#tbodyListVoucher').css({
                            'height': '341px',

                        });
                        $('div[name="loading"]').removeClass('loadingPageVoucher');
                        $('#Money_Fund_ID .btn-duplicateVoucher').attr('disabled', false);
                        $('#Money_Fund_ID .btn-viewVoucher').attr('disabled', false);
                        $('#Money_Fund_ID .btn-editVoucher').attr('disabled', false);
                        $('#Money_Fund_ID .btn-deleteVoucher').attr('disabled', false);
                        $('#Money_Fund_ID .btn-loadListVoucher').attr('disabled', false);
                        mapTheadAndTbodyTable();
                    }
                    else {
                        $('div[name="loading"]').removeClass('loadingPageVoucher');
                        $('#Money_Fund_ID .btn-loadListVoucher').attr('disabled', false);
                        alert("không có dữ liệu!");
                    }
                }
                else {
                    alert(response.Message);
                }
            }
        });
    }
}

/*'<div class="rectangle timerange">'*/
            //+ '<div class="timerange-value" > Tháng này</div >'
            //+ '<div class="timerange-arrowdown"></div>'
            //+ '<div class="timerange-container" style="display: none">'
            //+ '<div>Hôm nay</div>'
            //+ '<div>Hôm qua</div>'
            //+ '<div>Tuần này</div>'
            //+ '<div>Tuần trước</div>'
            //+ '<div>Tháng này</div>'
            //+ '<div>Tháng trước</div>'
            //+ '<div>Quý này</div>'
            //+ '<div>Quý trước</div>'
            //+ '<div>6 tháng trước</div>'
            //+ '<div>Năm nay</div>'
            //+ '<div>Năm trước</div>'
            //+ '<div>Khác</div>'
            //+ '</div>'