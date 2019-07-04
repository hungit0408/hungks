$(document).ready(function () {
    var filterDataJs = new FilterDataJS();
    var filter = new FilterDataJS('.dialog-filter-data')
    //Khai báo các đối tượng datePicker
    var starDate = new DatePicker('.startdate .date-picker');
    var endDate = new DatePicker('.enddate .date-picker');
    var inputdate = new DatePicker('.input-date-picker');
})

//lớp dialog
class Dialog {
    /**
     * Hàm khời tạo
     * CreatedBy: NDCong(1/6/2019)
     * @param {string} element Selector elemnet
     * @param {string} title Tiêu đề form
     * @param {number} width Độ rộng
     * @param {number} height Chiều cao
     * @param {Array<JSON>} buttons button
     * @param {any} scope
     */
    constructor(element, title, width, height, buttons, scope, functionBeforeClose) {
        var that = this;
        this.Dialog = $(element).dialog({
            autoOpen: false,
            modal: true,
            resize: false,
            title: title,
            width: width,
            height: height,
            buttons: buttons,
            resizable: false,
            open: function (event, ui) {
                if (typeof (scope) == 'function')
                    scope(that.action);
            },
            beforeClose: function (event, ui) {
                if (typeof (functionBeforeClose) == 'function') {
                    return functionBeforeClose();
                }
            }
        });
    }
    /**
     * get, set action hiện tại của form
     * CreatedBy: NDCong
     * @param {any} action
     */
    Action(action) {
        if (action)
            this.action = action;
        else
            return this.action;
    }
    //đóng dialog
    Close() {
        this.Dialog.dialog('close');
    }
    //mở dialog
    Open() {
        this.Dialog.dialog('open');
        //debugger
        switch (this.action) {
            case 'add':
                this.Dialog.dialog({ title: "Thêm phiếu nhập kho" });
                $('#dialogform .form-button-save').prop('disabled', false);
                $('#dialogform .form-button-edit').prop('disabled', true);
                break;
            case 'edit':
                this.Dialog.dialog({ title: "Sửa phiếu nhập kho" });
                $('#dialogform .form-button-save').prop('disabled', false);
                $('#dialogform .form-button-edit').prop('disabled', true);
                break;
            case 'duplicate':
                this.Dialog.dialog({ title: "Nhân bản phiếu nhập kho" });
                $('#dialogform .form-button-save').prop('disabled', false);
                $('#dialogform .form-button-edit').prop('disabled', true);
                break;
            case 'view':
                this.Dialog.dialog({ title: "Xem phiếu nhập kho" });
                $('#dialogform .form-button-save').prop('disabled', true);
                $('#dialogform .form-button-edit').prop('disabled', false);
                break;
        }

    }

}

/**
 * Lớp datepicker
 * CreatedBy: NDCong(28/5/2019)
 * */
class DatePicker {
    constructor(element) {
        this.DatePicker = $(element).datepicker({
            showOn: "button",
            buttonText: "",
            dateFormat: "dd/mm/yy"
        });
    }
    SetDate(date) {
        this.DatePicker.datepicker("setDate", date);
    }
}

/**
 * Lớp TimePicker
 * CreatedBy: NDCong(21/6/2019)
 * */
class TimePicker {
    constructor(element, button) {
        this.TimePicker = $(element).timepicker({
            'timeFormat': 'H:i',
            'step': 15,
            'minTime': '00:00am',
            'maxTime': '11:45pm',
            'show2400': true,
            getTime: new Date()
        });
        $(button).on('click', function () {
            $(element).focus();
        });
    }
}

/**
 * Lớp chứa event dialog trang nhập kho
 * CreatedBy: NDCong(28/5/2019)
 * */
class EventInwardDialog {
    constructor() {
        /**Hàm xử lý đóng mở hàng hóa con
         *CreatedBy: NDCong(28/05/2019)
         */
        this.ToggleShowChildProduct = () => {
            //Event xử lý đóng mở các hàng hóa con
            //CreatedBy: NDCong(19/05/2019)
            $('.dialogProduct').on('click', '.parent-tree', function (e) {
                //debugger
                var iconStatus = $(this);
                var rowParent = $(this).parents('tr.product-parent');
                var childContainer = rowParent.next('.row-child-container');
                // bật/tắt hiện thị hàng hóa con 
                childContainer.toggle();
                // Thay đổi icon bật/tắt theo trạng thái hiện thị của hàng hóa con
                if (childContainer.css('display') == "none") {
                    iconStatus.addClass('icon-plus');
                    iconStatus.removeClass('icon-minus');
                }
                else {
                    iconStatus.addClass('icon-minus');
                    iconStatus.removeClass('icon-plus');
                }
                e.stopImmediatePropagation();
            })
        }
        /**Hàm xử lý event khi mở dialog thêm phiếu nhập kho
         *CreatedBy: NDCong(28/05/2019)
         */
        this.EventDialogAdd = () => {

            var dialogform = $('#dialogform');
            /**element input số phiếu nhập */
            const voucherCodeInput = dialogform.find('input[name="txtVoucherCode"]');
            /**element input ngày nhập kho */
            const dateInwardInput = dialogform.find('input[name="txtDateInWard"]');
            /**element input giờ nhập kho */
            const timeInwardInput = dialogform.find('input[name="txtTimeInWard"]');

            //Event xử lý tích chọn Điều chuyển từ cửa hàng khác thì mới hiển thị nút Chọn chứng từ điều chuyển
            $('#fromOtherStore').on('click', function () {
                $('.selectVoucher').css('visibility', 'visible');
            });

            $('#other').on('click', function () {
                $('.selectVoucher').css('visibility', 'hidden');
            });


            //Tự động reset về giá trị trước khi xóa trắng hoặc nhập sai định dạng
            //Do số phiếu nhập chưa có hàm xử lý định dạng số phiếu nhập nên truyền vào hàm luôn trả về là true
            ResetValueWhenClear(voucherCodeInput, a => true);
            ResetValueWhenClear(dateInwardInput, isDateFormatddmmyyyy);
            ResetValueWhenClear(timeInwardInput, isTimeFormathhmm);


            //Hiện thị thông báo validate số liệu nhập vào
            //Do số phiếu nhập chưa có hàm xử lý định dạng số phiếu nhập nên truyền vào hàm luôn trả về là true
            ValidateInput(voucherCodeInput, a => true)
            ValidateInput(dateInwardInput, isDateFormatddmmyyyy, 'Định dạng ngày tháng không hợp lệ. Vui lòng nhập đúng định dạng dd/mm/yyyy');
            ValidateInput(timeInwardInput, isTimeFormathhmm, 'Định dạng thời gian không hợp lệ. Vui lòng nhập đúng định dạng hh:mm');

            //Xử lý format đơn giá
            $('#form-add-detail').on('keyup', 'input[name="UnitPrice"]', function () {
                var value = $(this).val();
                value = FormatCurrency(value.replace(/\D/g, ''));
                $(this).val(value);
            })

            //Xử lý xóa hàng hóa trong form thêm mới
            $('#form-add-detail').on('click', 'button.delete-icon', function () {
                event.stopPropagation();
                //xóa xong thì focus vào nút xóa tiếp theo hoặc trước đó nếu không có
                var nextButton = $(this).parents('tr').next('tr.product').find('button.delete-icon');
                var prevButton = $(this).parents('tr').prev('tr.product').find('button.delete-icon');;
                if (nextButton.length != 0) {
                    nextButton.first().focus();
                }
                else if (prevButton.length != 0) {
                    
                    prevButton.first().focus();
                }
                //Nếu không còn button nào thì focus vào ô thêm hàng hóa
                else {
                    $('#dialogform').find('input[name="InventoryItem"]').focus();
                }

                //xóa button
                $(this).parents('tr').remove();
                //update hàng tổng kết
                UpdateSummaryRow();
            })

            //Xử lý cập nhật lại tổng tiền
            $('#form-add-detail').on('change', 'input[name="Quantity"], input[name="UnitPrice"]', function () {
                if ($(this).val() == '')
                    $(this).val(0);
                UpdateAmount(this);
                UpdateSummaryRow();
            });


            /**
             * Cập nhật lại thành tiền của sản phẩm
             * @param {any} input
             */
            function UpdateAmount(input) {
                //debugger
                var row = $(input).parents('tr');
                var quantity = Number(row.find('input[name="Quantity"]').val());
                var unitPrice = row.find('input[name="UnitPrice"]').val();
                var amount = calAmountOfProduct(unitPrice, quantity);
                var rowAmount = row.find('td:nth-child(7)');
                rowAmount.html(FormatCurrency(amount));
            }

            /**Cập nhật lại hàng tổng kết */
            function UpdateSummaryRow() {
                var table = $('#form-add-detail');
                var summaryRow = $('#dialogform .tfoot');
                var totalQuantityRow = summaryRow.find('.total-quantity');
                var totalAmountRow = summaryRow.find('.total-amount');
                var totalRow = summaryRow.find('.number-row');
                var totalQuantity = 0;
                var totalAmount = 0;
                var numberRow = 0;
                var listQuantity = table.find('input[name="Quantity"]');
                var listAmount = table.find('tr.product td:nth-child(7)');
                //Tổng số lượng
                $.each(listQuantity, function (index, item) {
                    totalQuantity += Number($(item).val());
                })
                //Tổng số tiền
                $.each(listAmount, function (index, item) {
                    totalAmount += CurencyToNumber($(item).html());
                })
                numberRow = table.find('tr.product').length;

                totalRow.html(`Số dòng = ${numberRow}`);
                totalAmountRow.html(FormatCurrency(totalAmount));
                totalQuantityRow.html(totalQuantity);

            }

            /**
             * Tính tổng tiền
             * @param {any} unitPrice đơn giá
             * @param {any} quantity số lượng
             */
            function calAmountOfProduct(unitPrice, quantity) {
                unitPrice = Number(unitPrice.replace(/\D/g, ''));
                return unitPrice * quantity;
            }


            /**
             * Hàm xử lý nếu xóa trắng input, hoặc nhập sai định dạng thì tự động reset về giá trị trước
             * CreateBy: NDCong(26/05/2019)
             * @param {string} inputElement query selector của input 
             * @param {Function} isValidate hàm kiểm tra validate input
             */
            function ResetValueWhenClear(inputElement, isValidate) {
                var prevValue = inputElement.val();
                inputElement.on('change', function () {
                    //debugger
                    var newValue = $(this).val();
                    //Nếu bỏ trống hoặc sai định dạng
                    if (newValue == '' || !isValidate(newValue)) {
                        $(this).val(prevValue);
                    }
                    else {
                        prevValue = newValue;
                    }
                })
            }

            /**
             * Hàm hiện thị thông báo khi xóa trắng input hoặc nhập sai định dạng
             * CreatedBy: NDCong(18/05/2019)
             * @param {string} elementSelector input selector
             * @param {function} isValidate hàm kiểm tra validate input
             * @param {string} warningTitle tooltip text cần hiện thị khi người dùng nhập sai định dạng
             */
            function ValidateInput(elementSelector, isValidate, warningTitle) {
                $(elementSelector).on('change keyup', function (e) {
                    var currentVal = $(this).val();
                    //Nếu bỏ trống
                    if ($(this).val() == '') {
                        $(this).css('border-color', 'red');
                        $(this).parent().nextAll('.icon-exclamation').prop('title', 'Trường này không được bỏ trống').show().tooltip({
                            tooltipClass: 'tooltip-warning',
                        });
                    }
                    //Nếu sai định dạng
                    else if (!isValidate(currentVal)) {
                        $(this).css('border-color', 'red');
                        $(this).parent().nextAll('.icon-exclamation').prop('title', warningTitle).show().tooltip({
                            tooltipClass: 'tooltip-warning',
                        });
                    }
                    else {
                        $(this).css('border-color', '');
                        $(this).parent().nextAll('.icon-exclamation').hide();
                    }
                    e.stopImmediatePropagation();
                })
            }

        }
        /**Hàm xử lý event khi mở dialog chọn hàng hóa
         *CreatedBy: NDCong(28/05/2019)
         */
        this.EventDialogSelectProduct = () => {
            //Xử lý đóng mở hàng hóa con
            this.ToggleShowChildProduct();

            //Event xử lý chọn checkbox hàng hóa cha thì chọn tắt cả checkbox hàng hóa con 
            //CreatedBy: NDCong(19/05/2019)
            $('#table-select-product').on('change', 'input[name="cbRowParent"]', function (e) {
                //debugger
                e.stopPropagation();
                var isChecked = $(this).is(':checked');
                $(this).removeClass('check-parent');
                var childCheckBox = $(this).parents('tr').next('tr.row-child-container').find('input[name="cbRowChild"]');
                childCheckBox.prop('checked', isChecked);
            })
            //Event xử lý chọn checkbox hàng hóa con thì cập nhật trạng thái checkbox hàng hóa cha
            //CreatedBy: NDCong(19/05/2019)
            $('#table-select-product').on('change', 'input[name="cbRowChild"]', function (e) {
                //debugger
                e.stopPropagation();
                var childCheckBox = $(this).parents('table').first().find('input[name="cbRowChild"]');
                var parentCheckBox = $(this).parents('tr.row-child-container').prev('tr.product-parent').find('input[name="cbRowParent"]');
                //Nếu checked Full
                if (isFullCheck(childCheckBox) == 1) {
                    parentCheckBox.removeClass('check-parent');
                    parentCheckBox.prop('checked', true);
                }
                //Nếu có check nhưng không full
                else if (isFullCheck(childCheckBox) == 0) {
                    parentCheckBox.prop('checked', false);
                    parentCheckBox.addClass('check-parent');
                }
                //Không check
                else {
                    parentCheckBox.prop('checked', false);
                    parentCheckBox.removeClass('check-parent');
                }
            })


            /**
             * Hàm kiểm tra mảng checkbox truyền vào được check full hay không
             * return {1: checked full, 0: có check nhưng chưa check full, -1: chưa check bất kỳ checkbox nào}
             * @param {Array} arayCheckBoxElement
             */
            function isFullCheck(arayCheckBoxElement) {
                var numberChecked = 0;
                var numberNotChecked = 0;
                $.each(arayCheckBoxElement, function (index, checkbox) {
                    if ($(checkbox).is(':checked')) numberChecked++;
                    else numberNotChecked++
                })
                if (numberNotChecked == 0) {
                    return 1;
                }
                else if (numberChecked == 0) {
                    return -1;
                }
                else
                    return 0;
            }
        }
        /**Hàm xử lý event khi mở dialog xem hàng hóa đã chọn
         *CreatedBy: NDCong(28/05/2019)
         */
        this.EventDialogConfirmProduct = () => {
            var form = $('#dialogConfirmProduct');
            //Đóng mở hàng hóa con
            this.ToggleShowChildProduct();
            //Xóa row
            $('#table-confirm-product').on('click', '.delete-icon', function () {
                var row = $(this).parents('tr').first();
                //Nếu là hàng hóa cha thì xóa tất cả hàng hóa con
                if (row.hasClass('product-parent')) {
                    var rowChildContainer = row.next('.row-child-container');
                    rowChildContainer.remove();
                    row.remove();
                }
                //Nếu là hàng hóa con thì cập nhật lại số lượng hàng hóa của mẫu mã
                else if (row.hasClass('product-child')) {
                    var rowParent = row.parents('tr.row-child-container').prev('tr.product-parent');
                    row.remove();
                    UpdateNumberChild(rowParent);
                }
            })

            //Filter khi thay đổi nhóm hàng hóa
            form.find('select').on('change', function () {
                form.find('button.search-object').trigger('click');
            });

            //Filter dữ liệu khi click button tìm kiếm
            form.find('button.search-object').on('click', function () {
                var itemCategory = form.find('select option:selected').text();
                if (itemCategory == "Tất cả") itemCategory = '';
                var filterSearch = form.find('input[name="filterSearch"]').val();
                itemCategory = itemCategory.toLowerCase();
                filterSearch = filterSearch.toLowerCase();

                filterTable(itemCategory, filterSearch);
                var listRowParent = $("#table-confirm-product tbody tr.product-parent");
                $.each(listRowParent, function (index, item) {
                    UpdateNumberChild($(item));
                });
            });

            /**
             * Hàm filter hàng hóa 
             * @param {any} itemCategory
             * @param {any} filterSearch
             */
            function filterTable(itemCategory, filterSearch) {
                $("#table-confirm-product tbody tr.product-child").filter(function () {
                    $(this).toggle($(this).find('td:nth-child(3)').text().toLowerCase().indexOf(itemCategory) > -1 && $(this).text().toLowerCase().indexOf(filterSearch) > -1);
                });
            }

            /**
             * Cập nhật lại số lượng hàng hóa có trong mẫu mã
             * @param {Element} rowParent element hàng chứa mẫu mã
             */
            function UpdateNumberChild(rowParent) {
                var numberChild = rowParent.next('.row-child-container').find('tr.product-child:visible').length;
                if (numberChild == 0) {
                    rowParent.hide();
                }
                else {
                    var numberChildElement = rowParent.find('.number-child');
                    numberChildElement.html(numberChild);
                    rowParent.show();
                }
            };

        }

        this.EventDialogConfirmDelete = () => {
            //debugger
            var refSelectedArray = $('#inwardtable .row-selected');
            var refdetail = $('span.ref-detail');
            if (refSelectedArray.length <= 0) {
                alert('Vui lòng chọn chứng từ cần xóa');
            }
            else if (refSelectedArray.length == 1) {
                var refType = refSelectedArray.children('td:last-child').text().toLocaleLowerCase();
                var refCode = refSelectedArray.children('td:nth-child(3)').text();
                refdetail.html(`${refType} <span style="color: red; font-weight: bold;">${refCode}</span>`);
            }
            else {
                refdetail.html('các phiếu đã chọn');
            }
        }

        this.EventDialogConfirmGetNewRefNo = () => {
            //debugger
            var refCode = $('#dialogform input[field-data="RefNo"]').val();
            $('#dialogConfirm .detail-confirm').html(`Số phiếu nhập ${refCode} đã tồn tại. Bạn có muốn lưu chứng từ với Số phiếu nhập khác không?`);
        }

        this.EventDialogConfirm = (message) => {
            $('#dialogConfirm .detail-confirm').html(message);
        }
    }
}

/**
 * Lớp filter ngày tháng
 * CreatedBy: LSKy
 * */
class FilterDataJS {
    constructor(elementSelector = 'div.filter-data') {
        this.elementSelector = elementSelector;
        this.initEvent();
        this.setDefaultVvalue();
    }
    setDefaultVvalue() {
        $(this.elementSelector + ' .select-date').val('this month');
        $(this.elementSelector + ' .select-date').trigger('change');

    }
    initEvent() {
        $(document).on('change', this.elementSelector + ' .select-date', this.getDate.bind(this));
    }
    //Hàm xử lý chọn khoảng thời gian thì tự động cập nhật date
    getDate() {
        var infoDate = $(this.elementSelector + " .select-date").val();
        var dd = new Date();
        switch (infoDate) {
            case "today":
                {
                    var date = dd;
                    date = date.formatddMMyyyy();
                    this.bindDateForm(date, date);
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
}