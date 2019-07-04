// lấy ra và formart ngày hiện tại theo type: dd/mm/yyyy
var dd = new Date();
var toDay = dd.formatddMMyyyy();
var saveOrEdit = 0;
var isPay = 0;
// hàm set mặc định check hay k check radio ở phần dialog
// nếu đã check thì lần sau sẽ hiển thị lại giá trị đã checked
// và set một vài giá trị mặc định
//Created NNLam (10/05/2019)
$(document).ready(function () {
    var _voucherPage = new VoucherPage();
    var _settingPage = new SettingPage();
    var code = _settingPage.getRandCode();
    var _voucherDialog = new VoucherDialog();
    _voucherPage.initEvent();
    _voucherPage.loadListVoucherInfo();
    _voucherDialog.initEventOfDialog();
    _settingPage.settingInputDefaul(code);
    _settingPage.initEventForInput();

})


// enven khi click btn-add-voucher
//Create: NNLam (11/05/2019)
class VoucherPage {
    constructor() { };
    initEvent() {
        // action append class khi chọn row
        $('#tbodyListVoucher').on('click', 'tr', this.appendClassForRowAndEvenClick);
        // action view khi kích vào hyperlink
        $('#tbodyListVoucher').on('click', 'td.cls-hyperlink', this.showDialogWhenClickHyperlink);
        // action view in ở thanh tool bar page
        $('.conntent div.misa-toolbar').on('click', '.btn-viewVoucher', this.showDialogWhenClickBtnView);
        // action edit in ở thanh tool bar page
        $('.conntent div.misa-toolbar').on('click', '.btn-editVoucher', this.showDialogWhenClickBtnEdit);
        // action nhân bản ở thanh tool bar page
        $('.conntent div.misa-toolbar').on('click', '.btn-duplicateVoucher', this.showDialogWhenClickBtnDuplicate);
        // action xóa ở thanh tool bar page
        $('.conntent div.misa-toolbar').on('click', '.btn-deleteVoucher', this.showDialogNotification);
        $('.filter-data').on('click', '.startFilterData', this.loadListVoucherInfo);
        // action add
        $('div#btn-AddVouchers').on('click', function (e) {
            document.getElementById("aaaa").classList.toggle("show");
            $('.action-isdisable').css({
                'background': '',
                'pointer-events': ''
            });
            $('.action-isdisable button').css({
                'background': '',
            });
        });
        // action reload
        $('.conntent div.misa-toolbar').on('click', '.btn-loadListVoucher', this.reloadVoucherPage);
        // action filter voucher
        $('#tblMoneyFund .filterPage').on('change', this.loadListVoucherInfo);
        // action next page single
        $('.grid .arrow-right-single').on('click', this.nexPageSingle);
        // action pre page single
        $('.grid .arrow-left-single').on('click', this.prePageSingle);
        // action next page Double
        $('.grid .arrow-right-double').on('click', this.nexPageDouble);
        // action pre page Double
        $('.grid .arrow-left-double').on('click', this.prePageDouble);
        $('.gird.selectNumberRowData').on('change', this.selectRowPage)
    }

    //thêm class cho row, nếu click vào row nào thì hiển thị detail của voucher đó
    appendClassForRowAndEvenClick() {
        $('#tbodyListVoucher tr.eventClickRow').removeClass('eventClickRow');
        var eml = $(this).addClass('eventClickRow');
        $('.loading-detail').addClass('loading');
        //$('.moneyFundDetail').addClass('nonDisplay');
        debugger
        var id = $(eml).data('id');
        var _ajaxCallApi = new AjaxCallApi();
        _ajaxCallApi.ajaxGetDetailVoucher(id, function (ouput) {
            var item;
            if (ouput.BudgetItemName === null) item = '';
            else item = ouput.BudgetItemName;
            $('#tbodyVoucherDetail td[name="Reason"]').html(ouput.Description);
            $('#tbodyVoucherDetail td[name="MoneyNumber"]').html(ouput.TotalAmount.formatMoney());
            $('#tbodyVoucherDetail td[name="Item"]').html(item);
            $('#tfootVoucherDetail td[name="MoneyNumberInTfoot"]').html(ouput.TotalAmount.formatMoney());
            
        });
        $('.loading-detail').removeClass('loading');
        //$('.moneyFundDetail').removeClass('nonDisplay');
    }
    // action view khi kích vào hyperlink
    showDialogWhenClickHyperlink() {
        var id = $(this).parent('tr').data('id');
        var _voucherPage = new VoucherPage();
        _voucherPage.showDialogVoucherDetail(id, true);
    }
    // action view khi kích vào btn view
    showDialogWhenClickBtnView() {
        saveOrEdit = 0;
        var id = $('#tbodyListVoucher tr.eventClickRow').data('id');
        var _voucherPage = new VoucherPage();
        _voucherPage.showDialogVoucherDetail(id, true);
    }
    // action view khi kích vào btn edit
    showDialogWhenClickBtnEdit() {
        saveOrEdit = 1;
        var id = $('#tbodyListVoucher tr.eventClickRow:last').data('id');
        var _voucherPage = new VoucherPage();
        _voucherPage.showDialogVoucherDetail(id, false);
    }
    // action view khi kích vào btn duplicate
    showDialogWhenClickBtnDuplicate() {
        saveOrEdit = 0;
        var id = $('#tbodyListVoucher tr.eventClickRow:last').data('id');
        var _voucherPage = new VoucherPage();
        _voucherPage.showDialogVoucherDetail(id, false);
        $('.btn-editOfDialog').attr('disabled', false);
    }
    // hiển thị thông báo khi thực hiện hành động xóa
    // Create NNLam (20/06/2018)
    showDialogNotification() {
        var voucherType = $('#tbodyListVoucher tr.eventClickRow:last td[name="RefTypeName"]').html();
        var voucherCode = $('#tbodyListVoucher tr.eventClickRow:last td[name="RefNo"]').html();
        debugger
        $('.conntent-notifi').html('Bạn có chắc chắn muốn xóa '
            + voucherType + '<p style="font-weight: bold;"> ' + voucherCode + '</p><p style = "margin-top: -33px; margin-left: 67px;"> không?</p>');
        dialogDeleteVoucher.Open();
        debugger
    }
    // event next page
    // create NNLam (26/06/2019)
    nexPageSingle() {
        var pageNumber = new Number($('input[name = "pageNumber"]').val());
        var number = pageNumber + 1;
        $('input[name = "pageNumber"]').val(number);
        var _voucherPage = new VoucherPage();
        _voucherPage.loadListVoucherInfo();
    }
    // event pre page
    prePageSingle() {
        var pageNumber = new Number($('input[name = "pageNumber"]').val());
        var number = pageNumber - 1;
        $('input[name = "pageNumber"]').val(number);
        var _voucherPage = new VoucherPage();
        _voucherPage.loadListVoucherInfo();
    }
    prePageDouble() {
        $('input[name = "pageNumber"]').val("1");
        var _voucherPage = new VoucherPage();
        _voucherPage.loadListVoucherInfo();
    }
    nexPageDouble() {
        $('input[name = "pageNumber"]').val($('span[name="pageINT"]').html());
        var _voucherPage = new VoucherPage();
        _voucherPage.loadListVoucherInfo();
    }
    selectRowPage

    // load list VoucherInfo
    //Create: NNLam (10/05/2019)
    loadListVoucherInfo() {
        $('#tbodyListVoucher').html('');
        $('#tbodyVoucherDetail').html('');
        $('#tfootVoucherDetail').html('');
        $('#tfootListVoucher').html('');
        $('tbody#tbodyListVoucher').addClass('loadingPageVoucher');
        $('.loading-detail').addClass('loadingPageVoucher');
        
        $('tfoot#tfootListVoucher').addClass('nonDisplay');
        //$('.paging').addClass('nonDisplay');
        $('.th-moneyFunDetail').addClass('nonDisplay');
        //$('.fooder-detail').addClass('nonDisplay');
        //$('#tbodyListVoucher').css({
        //    'height': '0px',
            
        //});
        $('#Money_Fund_ID .btn-duplicateVoucher').attr('disabled', true);
        $('#Money_Fund_ID .btn-viewVoucher').attr('disabled', true);
        $('#Money_Fund_ID .btn-editVoucher').attr('disabled', true);
        $('#Money_Fund_ID .btn-deleteVoucher').attr('disabled', true);
        $('#Money_Fund_ID .btn-loadListVoucher').attr('disabled', true);

        var pageNumber = $('input[name = "pageNumber"]').val();
        var numberRow = $('select.numberRow').children("option:selected").val();
        var dateForm = $('.filter-data input#startDate').val();
        var dateTo = $('.filter-data input#endDate').val();
        var filterVoucherRequest = {
            PageNumber: pageNumber,
            NumberRow: numberRow,
            DateFrom: dateForm.replace(/^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/, "$2$1$3"),
            DateTo: dateTo.replace(/^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/, "$2$1$3"),
            RefDate: $('input.refDate').val().replace(/^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/, "$2$1$3"),
            RefNo: $('input[name="inpFilterRefName"]').val(),
            AccountObjectName: $('input[name="inpFilterAccountObjectName"]').val(),
            TotalAmount: $('input[name="inpFilterTotalAmount"]').val(),
            CompareTotalAmountType: $('.filt-compare-value').html(),
            Description: $('#ReasonId').val(),
            RefType: $('#DocumentTypes').children("option:selected").val()
        }
        $.ajax({
            url: '/api/vouchers',
            data: filterVoucherRequest,
            dataType: 'json',
            type: 'POST',
            error: function () {
                alert("error!");
            },
            success: function (response) {
                if (response.Success && response.Data.length != 0) {
                    //var pageInt = (response.Data[0].TotalRow)/(response.Data.length());
                    var numberRow = response.Data[0].TotalRow;
                    var row = response.Data.length;
                    var sbc = $('select.selectNumberRowData').children("option:selected").val();
                    var page = Math.ceil(numberRow / sbc);
                    debugger
                    var fields = $('#tblMoneyFund thead [fieldData]');
                    var data = response.Data;
                    var MoneyTotail = 0;
                    // buid table hiển thị dư liệu
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
                                miniHTML = '<td name="' + fieldName+'" class=" text-align-left cls-hyperlink col';
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
                        $('#tbodyListVoucher tr#' + index).data('id', item.RefID);
                        $('#tbodyListVoucher tr').first().addClass('eventClickRow');
                    });
                    $('tbody#tbodyListVoucher').removeClass('loadingPageVoucher');
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
                    if (data[0].BudgetItemName === null || data[0].BudgetItemName == "") item = '';
                    else item = data[0].BudgetItemName;
                    debugger
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
                    $('.loading-detail').removeClass('loadingPageVoucher');
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
                    $('span[name="pageINT"]').html(page);
                    $('span[name="rowINT"]').html(row);
                    $('span[name="selectRowINT"]').html($('select.selectNumberRowData').children("option:selected").val());
                    $('span[name="totalRowINT"]').html(numberRow);
                    var thisNumberPage = $('input[name="pageNumber"]').val();
                    debugger
                    if (page > thisNumberPage) {
                        //0088c278
                        $('.grid .arrow-right-single').css({
                            'border': '1px solid #026b97',
                            'pointer-events': ''
                        });
                        $('.grid .arrow-right-double').css({
                            'border': '1px solid #026b97',
                            'pointer-events': ''
                        })
                    }
                    else {
                        $('.grid .arrow-right-double').css({
                            'border': '1px solid #0088c278',
                            'pointer-events': 'none'
                        });
                        $('.grid .arrow-right-single').css({
                            'border': '1px solid #0088c278',
                            'pointer-events': 'none'
                        });
                    }
                    if (thisNumberPage == 1) {
                        $('.grid .arrow-left-single').css({
                            'border': '1px solid #0088c278',
                            'pointer-events': 'none'
                        });
                        $('.grid .arrow-left-double').css({
                            'border': '1px solid #0088c278',
                            'pointer-events': 'none'
                        })
                        debugger
                    } else {
                        $('.grid .arrow-left-single').css({
                            'border': '1px solid #026b97',
                            'pointer-events': ''
                        });
                        $('.grid .arrow-left-double').css({
                            'border': '1px solid #026b97',
                            'pointer-events': ''
                        })
                        debugger
                    }
                }
                else {
                    $('tbody#tbodyListVoucher').removeClass('loadingPageVoucher');
                    $('.loading-detail').removeClass('loadingPageVoucher');
                    $('.nonDisplay').removeClass('nonDisplay');
                    alert("Không có dữ liệu");
                }
            }
        });
    };
    //load lại trang vouchers
    reloadVoucherPage() {
        $('#tbodyListVoucher').empty();
        $('#tfootListVoucher').empty();
        $('#tbodyVoucherDetail td').html('');
        $('#tfootVoucherDetail td').html('');
        var _voucherPage = new VoucherPage();
        _voucherPage.loadListVoucherInfo();
    }
    // show Dialog Voucher Detail
    //Create: NNLam (10/05/2019)
    showDialogVoucherDetail(id, isDisable) {
        var _ajaxCallApi = new AjaxCallApi();
        var _settingPage = new SettingPage();
        _ajaxCallApi.ajaxGetListReckoningByVoucherId(id, function (ouput) {
            if (ouput.VoucherType.substring(0, 9) === "Phiếu thu") {
                isPay = 1;
                $('#dialogform dialog-vouchers').removeClass('dialog-vouchers')
                $('#dialogform').addClass('dialog-receipts');
                var dialogAddReceipts = new Dialog('.dialog-receipts', 'Thêm phiếu thu tiền', 960, 600);
                _settingPage.settingDialogFrom('nhận', 'thu', 'thu nợ');
                dialogAddReceipts.Open();
                var listReckoning = ouput.reckonings;
                var fields = $('#tbReckoningDetail thead [fieldData]');
                $('#tbReckoningDetail tbody tr').remove('tr');
                var PayableNumber = 0;
                var UnpaidNumber = 0;
                var PayNumber = 0;
                $.each(listReckoning, function (index, item) {
                    var row = '<tr style="height: 27px;"></tr>';
                    var rowTbodyHTML = $(row);
                    $.each(fields, function (index2, field) {
                        var fieldName = $(field).attr("fieldData");
                        var cellTbodyHTML = '';
                        var fieldValue = item[fieldName];
                        if (fieldName === "Debit") {
                            PayableNumber += fieldValue;
                        }
                        if (fieldName === "PaidNumber") {
                            UnpaidNumber += fieldValue;
                        }
                        if (fieldName === "Pay") {
                            PayNumber += fieldValue;
                        }
                        var testDate = new Date(fieldValue);
                        var test = $.type(testDate);
                        var typeData = $.type(fieldValue);
                        if (isValidDate(testDate) && typeData === "string") { typeData = test; }
                        switch (typeData) {
                            case "string":
                                cellTbodyHTML = '<td class="text-align-left">' + fieldValue + '</td>';
                                break
                            case "number":
                                cellTbodyHTML = '<td class=" text-align-right">' + fieldValue.formatMoney() + '</td>';
                                break
                            case "date":
                                cellTbodyHTML = '<td class=" text-align-center">' + fieldValue + '</td>';
                                break
                            default:
                                cellTbodyHTML = '<td></td>';
                                break
                        }
                        rowTbodyHTML.append(cellTbodyHTML);
                    })
                    $('#tbReckoningDetail tbody').append(rowTbodyHTML);
                    $('#tbReckoningDetail tbody').append('<tr style="height: auto"></tr>');
                })
                $('td[name="tdTfootDebit"').html(PayableNumber.formatMoney());
                $('td[name="tdTfootPaidNumber"').html(UnpaidNumber.formatMoney());
                $('td[name="tdTfootPay"').html(PayNumber.formatMoney());

            } else {
                isPay = 0;
                $('#dialogform dialog-receipts').removeClass('dialog-receipts')
                $('#dialogform').addClass('dialog-vouchers');
                var dialogAddVouchers = new Dialog('.dialog-vouchers', 'Thêm phiếu chi tiền', 960, 600);
                _settingPage.settingDialogFrom('nộp', 'chi', 'trả nợ');
                dialogAddVouchers.Open();
            }

            if (ouput.Marked) {
                $('input#moneyFundOther').prop("checked", true);
                $('input#moneyFundPay').prop("checked", false);
                $('.selectVoucher').css('visibility', 'hidden');
                _settingPage.settingDisplay(false);
            } else {
                $('input#moneyFundOther').prop("checked", false);
                $('input#moneyFundPay').prop("checked", true);

                _settingPage.settingDisplay(true);
            }
            $('input[name="inpVoucherNumber"]').val(ouput.VoucherCode);
            $('input[name="inpObjCode"]').val(ouput.ObjectCode);
            $('input[name="inpObjName"]').val(ouput.ObjectName);
            if (ouput.ActionPerson != null) {
                $('input[name="inpPersonAction"]').val(ouput.ActionPerson);
            }
            if (ouput.AddressOfObject != null) {
                $('input[name="inpAddressOfObject"]').val(ouput.AddressOfObject);
            }
            if (ouput.Reason != null) {
                $('input[name="inpReason"]').val(ouput.Reason);
            }
            //face
            //if (ouput.EmployeeAction != null) {
            $('input[name="inpEmployeeRoleAction"]').val("Quản Lý");
            $('input[name="inpEmployeeNameAction"]').val("Nguyễn Huy Thông");
            //}
            $('input#VoucherCreatedDate').val(ouput.Created);
            if (ouput.Item != null) {
                $('input[name="inpItem"]').val(ouput.Item);
                $('td[name="tdItem"]').html(ouput.Item);
            }
            $('td[name="tdMoney"]').html(ouput.MoneyNumber);
        });
        if (isDisable) {
            $('#dialogform input').attr('disabled', true);
            $('.btn-editOfDialog').attr('disabled', false);
            $('.btn-saveOfDialog').attr('disabled', false);
            $('.btn-delete').attr('disabled', false);
            $('#dialogform div.input-container').css('background-color', '#ebebe4');
            $('.selectVoucher').css({
                'visibility': 'visible',
                'opacity': '0.3',
                'pointer-events': 'none'
            });
            $('.action-isdisable').css({
                'background': '#ccc',
                'pointer-events': 'none'
            });
            $('.action-isdisable button').css({
                'background': '#ccc',
            });
            
        }
        else {
            $('#dialogform input').attr('disabled', false);
            $('.btn-editOfDialog').attr('disabled', true);
            $('.btn-saveOfDialog').attr('disabled', false);
            //$('.btn-deleteOfDialog').attr('disabled', false);
            $('#dialogform div.input-container').css('background-color', '#fff');
            $('.selectVoucher').css({
                'visibility': 'visible',
                'opacity': '1',
                'pointer-events': 'all'
            });
            $('.action-isdisable').css({
                'background': '',
                'pointer-events': ''
            });
            $('.action-isdisable button').css({
                'background': '',
            });
        }
    }
    // xóa voucher
    deleteVoucher() {
        var id = $('#tbodyListVoucher tr.eventClickRow:last').data('id');
        var _ajaxCallApi = new AjaxCallApi();
        _ajaxCallApi.ajaxDeleteVoucher(id);
        $('#tbodyListVoucher').empty();
        $('#tfootListVoucher').empty();
        $('#tbodyVoucherDetail td').html('');
        $('#tfootVoucherDetail td').html('');
        var _voucherPage = new VoucherPage();
        _voucherPage.loadListVoucherInfo();
    }
}
// class voucherDialog
// created: NNLam
class VoucherDialog {
    // tất cả các sự kiện của voucher dialog
    initEventOfDialog() {
        //action show dialog
        $('.add-vouchers:not(.disable)').on('click', this.showDialogVoucher);
        //action show dialog
        $('.add-receipts:not(.disable)').on('click', this.showDialogReceipts);
        // action save in tool bar
        $('#dialogform div.misa-toolbar').on('click', '.btn-saveOfDialog', this.saveVoucher);
        // action edit in tool bar
        $('#dialogform div.misa-toolbar').on('click', '.btn-editOfDialog', this.editVoucher);
        $('#dialogform .object-select-data').on('click', '.selectObj', this.selectObj);
        $('#dialogSelectObject').on('click', '.search-object', this.searchObj);
        $('#dialogform .employee-select-data').on('click', '.select-employee', this.selectEmployee);
        $('#dialogSelectEmployee').on('click', '.search-employee', this.searchEmployee);
        $('#dialogSelectObject').on('click', 'button.dialogSelectObj', this.selectObjectOk);
        $('#imp-objectTypeId').on('click', this.showNCC)
    }
    //save voucher
    // created NNLam 21/05/2019
    saveVoucher() {
        var url;
        var type;
        var refVoucherID = "";
        var refType = 0;
        var purpose = true;
        var CreateRefDate = "";
        var kq = $('#moneyFundPay').is(":checked");
        //var kq = true;
        //var kq2 = $('.add-receipts').prop('disabled');
        if (isPay == 1 && kq) {
            refType = 14;
            debugger
        }
        else if (isPay == 1 && !kq){
            refType = 15;
            debugger
        }
        if (isPay == 0 && kq) {
            refType = 17;
            debugger
        }
        else if (isPay == 0 && !kq){
            refType = 18;
            debugger
        }
        var refDetails2 = [];
        if (kq) {
            debugger
            purpose = 'false';
            var date = "25/06/2019";
            CreateRefDate = date.replace(/^(\d{1,2}\-)(\d{1,2}\-)(\d{4})$/, "$3$2$1");
            debugger
            $('tbody.ListReckoning tr').each(function () {
                var refDetail = {
                    RefNo: $(this).find('td[name = "RefNo"]').html(),
                    Amount: $(this).find('td[name = "RefNo"]').html(),
                    PaidNumber: $(this).find('td[name = "RefNo"]').html(),
                    Pay: $(this).find('td[name = "RefNo"]').html(),
                };
                refDetails2.push(refDetail);
                debugger
            });
        } else {
            
            purpose = true;
            var CreateRefDate = $('input#VoucherCreatedDate').val();
            CreateRefDate = "06/25/2019";
            //CreateRefDate = createRefDate.replace(/^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/, "$3$2$1");
            var refDetail = {
                RefNo: $('input[name = "inpVoucherNumber"]').val(),
                Amount: $('input[name = "tfootAmount2"]').val(),
                PaidNumber: 0,
                Pay: 0
            };
            debugger;
            refDetails2.push(refDetail);
        }
        if (saveOrEdit == 0) {
            url = '/api/refVoucherNew';
            type = 'POST';
        } else {
            url = '/api/editRefVoucher';
            type = 'PUT';
            refVoucherID = ""+ $('#tbodyListVoucher tr.eventClickRow').data('id');
        }
        var refVoucher2 = {
            RefID : refVoucherID,
            RefNo : $('input[name = "inpVoucherNumber"]').val(),
            RefType : refType,
            AccountObjectID: "" + $('.object-select-data').data('objectID'),
            ObjectType: "" + $('.object-select-data').data('objectType'),
            EmployeeID: "" + $('.employee-select-data').data('employeeID'),
            Purpose : purpose,
            Address : $('input[name = "inpAddressOfObject"]').val(),
            BudgetItemName : $('td[name = "tdItem"]').val(),
            ContactName : $('input[name = "inpPersonAction"]').val(),
            Description : $('input[name = "inpReason"]').val(),
        };
        debugger
        var data = {
            refVoucher : refVoucher2,
            refDetails: refDetails2,
            createRefDate: CreateRefDate
        }
        debugger
        var _ajaxCallApi = new AjaxCallApi();
        _ajaxCallApi.ajaxSaveVoucher(data, url, type, CreateRefDate);
        $('#dialogform input').attr('disabled', true);
        $('.btn-editOfDialog').attr('disabled', false);
        $('.btn-saveOfDialog').attr('disabled', false);
        $('.btn-delete').attr('disabled', false);
        $('#dialogform div.input-container').css('background-color', '#ebebe4');
        $('.selectVoucher').css({
            'visibility': 'visible',
            'opacity': '0.3',
            'pointer-events': 'none'
        });
        $('.action-isdisable').css({
            'background': '#ccc',
            'pointer-events': 'none'
        });
        $('.action-isdisable button').css({
            'background': '#ccc',
        });
    }
    //edit voucher
    // created NNLam 21/05/2019
    editVoucher() {
        saveOrEdit = 1;
        $('#dialogform input').attr('disabled', false);
        $('.btn-editOfDialog').attr('disabled', true);
        $('.btn-saveOfDialog').attr('disabled', false);
        //$('.btn-deleteOfDialog').attr('disabled', false);
        $('#dialogform div.input-container').css('background-color', '#fff');
        if ($('input#moneyFundPay').prop('disabled')) {
            $('.selectVoucher').css({
                'visibility': 'visible',
                'opacity': '1',
                'pointer-events': 'all'
            });
            debugger
        }
        $('.action-isdisable').css({
            'background': '',
            'pointer-events': ''
        });
        $('.action-isdisable button').css({
            'background': '',
        });
        
    }
    searchObj() {
        var dataRequest = {
            objectType: $('select.select-obj').children("option:selected").val(),
            objectFilter: $('#dialogSelectObject input[name = "inpAccountObjectName"]').val()
        }
        debugger
        $('tbody.accountObject').html('');
        $('tbody.accountObject').addClass('loadingPageVoucher');
        $.ajax({
            url: '/api/listObjects',
            data: dataRequest,
            dataType: 'json',
            type: 'PUT',
            error: function () {
                alert("error!");
            },
            success: function (response) {
                debugger
                if (response.Success) {
                    $.each(response.Data, function (index, item) {
                        debugger
                        var trHTML = '<tr id="object' + index + '" class="object-select">'
                            + '<td> <input type="radio" name="ckbObject"  value=""/></td>'
                            + '<td name="accountObjectCode" style="text-align: left">' + item.AccountObjectCode + '</td>'
                            + '<td name="accountObjectName" style="text-align: left">' + item.AccountObjectName + '</td>'
                            + '<td name="objectTypeName" style="text-align: left">' + item.ObjectTypeName + '</td>'
                            + '<td name="accountObjectAddress" style="text-align: left">' + item.AccountObjectAddress + '</td></tr>';
                        $('tbody.accountObject').append(trHTML);
                        $('tbody.accountObject tr#object' + index).data('id', item.AccountObjectID);
                        debugger
                    });
                    $('tbody.accountObject').removeClass('loadingPageVoucher');
                }
                else {
                    alert(response.Message);
                }
            }
        });
    }
    searchEmployee() {
        var dataRequest = {
            objectType: 4,
            objectFilter: $('input[name = "inpAccountEmployeeName"]').val()
        }
        debugger
        $('tbody.accountEmployee').html('');
        $('tbody.accountEmployee').addClass('loadingPageVoucher');
        $.ajax({
            url: '/api/listObjects',
            data: dataRequest,
            dataType: 'json',
            type: 'PUT',
            error: function () {
                alert("error!");
            },
            success: function (response) {
                debugger
                if (response.Success) {
                    $.each(response.Data, function (index, item) {
                        debugger
                        var trHTML = '<tr id="employee' + index + '" class="employee-select">'
                            + '<td> <input type="radio" name="rdStore" style="text-align: left;" value="" checked /></td>'
                            + '<td name="accountObjectCode" style="text-align: left">' + item.AccountObjectCode + '</td>'
                            + '<td name="accountObjectName" style="text-align: left">' + item.AccountObjectName + '</td>'
                            + '<td name="accountObjectRole" style="text-align: left">Quản lý</td>'
                            + '<td name="accountObjectAddress" style="text-align: left">' + item.AccountObjectAddress + '</td></tr>';
                        $('tbody.accountEmployee').append(trHTML);
                        $('.employee-select tr#employee' + index).data('id', item.AccountObjectID);
                        debugger
                    });
                    $('tbody.accountEmployee').removeClass('loadingPageVoucher');
                }
                else {
                    alert(response.Message);
                }
            }
        });
    }
    selectObj() {
        var dataRequest = {
            objectType: 1,
            objectFilter: ''
        }
        $('tbody.accountObject').addClass('loadingPageVoucher');
        $.ajax({
            url: '/api/listObjects',
            data: dataRequest,
            dataType: 'json',
            type: 'PUT',
            error: function () {
                alert("error!");
            },
            success: function (response) {
                debugger
                if (response.Success) {
                    $.each(response.Data, function (index, item) {
                        debugger
                        var trHTML = '<tr id="object' + index + '" class="object-select">'
                            + '<td> <input type="radio" name="ckbObject" value="" /></td>'
                            + '<td name="accountObjectCode" style="text-align: left">' + item.AccountObjectCode + '</td>'
                            + '<td name="accountObjectName" style="text-align: left">' + item.AccountObjectName + '</td>'
                            + '<td name="objectTypeName" style="text-align: left">' + item.ObjectTypeName + '</td>'
                            + '<td name="accountObjectAddress" style="text-align: left">' + item.AccountObjectAddress + '</td></tr>';
                        $('tbody.accountObject').append(trHTML);
                        $('tbody.accountObject tr#object' + index).data('id', item.AccountObjectID);
                        debugger
                    });
                    $('tbody.accountObject').removeClass('loadingPageVoucher');
                }
                else {
                    alert(response.Message);
                }
            }
        });
    }
    selectObjectOk() {
        var i = -1;
        var objectID = '';
        $('input[name="ckbObject"]').each(function () {
            i++;
            if (this.checked) {
                objectID = $('tbody.accountObject tr#object' + i).data('id');
                $('.object-select-data').data('objectID', objectID);
                $('.object-select-data').data('objectType', $('select.select-obj').children("option:selected").val());
                $('input[name="inpObjCode"]').val("" + $('.accountObject tr#object' + i + ' td[name="accountObjectCode"]').html());
                $('input[name="inpObjName"]').val("" + $('.accountObject tr#object' + i + ' td[name="accountObjectName"]').html());
            }
        });
        //var elm = $('accountObject .object-select').is(":checked");
        //var objectID = $(elm).data('id');
        
        
    }
    selectEmployeeOk() {
        var i = -1;
        var employeeID = '';
        $('input[name="ckbEmployee"]').each(function () {
            i++;
            if (this.checked) {
                employeeID = $('tbody.accountEmployee tr#employee' + i).data('id');
                $('.employee-select-data').data('employeeID', employeeID);
                $('input[name="inpEmployeeRoleAction"]').val("Quản lý");
                $('input[name="inpEmployeeNameAction"]').val("" + $('.accountEmployee tr#employee' + i + ' td[name="accountObjectName"]').html());
                debugger
            }
            debugger
        });
        //var elm = $('accountObject .object-select').is(":checked");
        //var objectID = $(elm).data('id');
        
        debugger
    }
    selectEmployee() {
        var dataRequest = {
            objectType: 4,
            objectFilter: ''
        }
        $('tbody.accountEmployee').addClass('loadingPageVoucher');
        $.ajax({
            url: '/api/listObjects',
            data: dataRequest,
            dataType: 'json',
            type: 'PUT',
            error: function () {
                alert("error!");
            },
            success: function (response) {
                debugger
                if (response.Success) {
                    $.each(response.Data, function (index, item) {
                        debugger
                        var trHTML = '<tr id="employee' + index + '" class="employee-select">'
                            + '<td> <input type="radio" name="ckbEmployee" style="text-align: left" value=""/></td>'
                            + '<td name="accountObjectCode" style="text-align: left">' + item.AccountObjectCode + '</td>'
                            + '<td name="accountObjectName" style="text-align: left">' + item.AccountObjectName + '</td>'
                            + '<td name="accountObjectRole" style="text-align: left">Quản lý</td>'
                            + '<td name="accountObjectAddress" style="text-align: left">' + item.AccountObjectAddress + '</td></tr>';
                        $('tbody.accountEmployee').append(trHTML);
                        $('tbody.accountEmployee tr#employee' + index).data('id', item.AccountObjectID);
                        debugger
                    });
                    $('tbody.accountEmployee').removeClass('loadingPageVoucher');
                }
                else {
                    alert(response.Message);
                }
            }
        });
    }
    showNCC() {
        var dataRequest = {
            objectType: 1,
            objectFilter: ''
        }
        $.ajax({
            url: '/api/listObjects',
            data: dataRequest,
            dataType: 'json',
            type: 'PUT',
            error: function () {
                alert("error!");
            },
            success: function (response) {
                debugger
                if (response.Success) {
                    $.each(response.Data, function (index, item) {
                        debugger
                        var trHTML = '<tr id="object' + index + '" class="object-select">'
                            + '<td> <input type="radio" name="ckbObject" value="" /></td>'
                            + '<td name="accountObjectCode" style="text-align: left">' + item.AccountObjectCode + '</td>'
                            + '<td name="accountObjectName" style="text-align: left">' + item.AccountObjectName + '</td>'
                            + '<td name="objectTypeName" style="text-align: left">' + item.ObjectTypeName + '</td>'
                            + '<td name="accountObjectAddress" style="text-align: left">' + item.AccountObjectAddress + '</td></tr>';
                        $('tbody.accountObject').append(trHTML);
                        $('tbody.accountObject tr#object' + index).data('id', item.AccountObjectID);
                        debugger
                    });
                    $('tbody.accountObject').removeClass('loadingPageVoucher');
                }
                else {
                    alert(response.Message);
                }
            }
        });
    }
    //open dialog voucher
    //created: NNLam (10/05/2019)
    showDialogVoucher() {
        isPay = 0;
        $('.action-isdisable').css({
            'background': '',
            'pointer-events': ''
        });
        var _settingPage = new SettingPage();
        var code = _settingPage.getRandCode();
        var valueCheck = _settingPage.getCookie("rdMoneyFund");
        $('#dialogform input[type="text"]').val('');
        $('#dialogform input[type="number"]').val('0');
        $('#dialogform td input').val('');
        //set code cho input 
        $('input[name="inpVoucherNumber"]').val(code);
        //set ngày hiện tại cho input 
        $('#dialogform input#VoucherCreatedDate').val(toDay);
        $('#dialogform .dialog-receipts').removeClass('dialog-receipts');
        $('#dialogform').addClass('dialog-vouchers');
        _settingPage.settingDialogFrom('nộp', 'chi', 'trả nợ');
        //dialog thêm phiếu chi tiền
        var dialogAddVouchers = new Dialog('.dialog-vouchers', 'Thêm phiếu chi tiền', 960, 600);
        dialogAddVouchers.Open();
        $('#dialogform input').attr('disabled', false);
        $('.btn-editOfDialog').attr('disabled', true);
        $('.btn-saveOfDialog').attr('disabled', false);
        $('#dialogform div.input-container').css('background-color', '#fff');
        
        if (valueCheck == 'moneyFundOther') {
          
            $('#moneyFundOther').prop("checked", true);
            //disable input with id employeeSpend
            document.getElementById("employeeSpend").disabled = true;
            $('.documentNumber').css('visibility', 'visible');
            $('.isDisabled').attr('disabled', false);
            $('input[name="inpItem"]').val('Công nợ');
            document.getElementById("employeeSpend").disabled = true;
            // đổi text
            //$('div.changeObj').html('Đối tượng');
            // setting on/off các trường khi chọn radio button other/pay
            _settingPage.settingDisplay(false);
        }
        else {
            $('#moneyFundPay').prop("checked", true);
            //radiobtn = document.getElementById("moneyFundPay");
            //radiobtn.checked = true;
            $('.selectVoucher').css({
                'visibility': 'visible',
                'opacity': '1',
                'pointer-events': 'all'
            });
            $('.documentNumber').css('visibility', 'hidden');
            $('.isDisabled').attr('disabled', true);
            $('input.isDisabled').val('');
            // đổi text
            //$('div.changeObj').html('Nhà cung cấp');
            // setting on/off các trường khi chọn radio button other/pay
            _settingPage.settingDisplay(true);
        }
    }
    //open dialog receipts
    //Create: NNLam (16/05/2019)
    showDialogReceipts() {
        isPay = 1;
        $('.action-isdisable').css({
            'background': '',
            'pointer-events': ''
        });
        var _settingPage = new SettingPage();
        var _settingPage = new SettingPage();
        var code = _settingPage.getRandCode();
        var valueCheck = _settingPage.getCookie("rdMoneyFund");
        $('#dialogform .dialog-vouchers').removeClass('dialog-vouchers');
        $('#dialogform').addClass('dialog-receipts');
        $('#dialogform input[type="text"]').val('');
        $('#dialogform input[type="number"]').val('0');
        $('#dialogform td input').val('');
        //set code cho input 
        $('input[name="inpVoucherNumber"]').val(code);
        //set ngày hiện tại cho input 
        $('#dialogform input#VoucherCreatedDate').val(toDay);
        $('input[name="inpItem"]').val('Công nợ');
        _settingPage.settingDialogFrom('nhận', 'thu', 'thu nợ');
        //dialog thêm phiếu thu tiền
        var dialogAddReceipts = new Dialog('.dialog-receipts', 'Thêm phiếu thu tiền', 960, 600);
        dialogAddReceipts.Open();
        $('#dialogform input').attr('disabled', false);
        $('.btn-editOfDialog').attr('disabled', true);
        $('.btn-saveOfDialog').attr('disabled', false);
        $('#dialogform div.input-container').css('background-color', '#fff');

        if (valueCheck == 'moneyFundOther') {

            $('#moneyFundOther').prop("checked", true);
            //disable input with id employeeSpend
            document.getElementById("employeeSpend").disabled = true;
            $('.documentNumber').css('visibility', 'visible');
            $('.isDisabled').attr('disabled', false);
            $('input[name="inpItem"]').val('Công nợ');
            document.getElementById("employeeSpend").disabled = true;
            // đổi text
            //$('div.changeObj').html('Đối tượng');
            // setting on/off các trường khi chọn radio button other/pay
            _settingPage.settingDisplay(false);
        }
        else {
            $('#moneyFundPay').prop("checked", true);
            //radiobtn = document.getElementById("moneyFundPay");
            //radiobtn.checked = true;
            $('.selectVoucher').css({
                'visibility': 'visible',
                'opacity': '1',
                'pointer-events': 'all'
            });
            $('.documentNumber').css('visibility', 'hidden');
            $('.isDisabled').attr('disabled', true);
            $('input.isDisabled').val('');
            // đổi text
            //$('div.changeObj').html('Nhà cung cấp');
            // setting on/off các trường khi chọn radio button other/pay
            _settingPage.settingDisplay(true);
        }
    }
}
class AjaxCallApi {
    constructor() { };
    // call api/getDetailVoucher in controler
    //Create: NNLam (18/05/2019)
    ajaxGetDetailVoucher(id, handleData) {
        $.ajax({
            // call api get all post
            url: '/api/VoucherInfo/' + id,
            dataType: 'json',
            type: 'GET',
            error: function () {
                alert("erroraaaaa!");
            },
            success: function (response) {
                if (response.Success) {
                    var data = response.Data;
                    handleData(data);
                }
                else {
                    alert(response.Message);
                }
            }
        });
    }
    // call api/getListReckoningByVoucherId in controler
    //Create: NNLam (18/05/2019)
    ajaxGetListReckoningByVoucherId(id, handleData2) {
        $.ajax({
            // call api get all post
            url: '/api/getListReckoningByVoucherId/' + id,
            dataType: 'json',
            type: 'GET',
            error: function () {
                alert("error!");
            },
            success: function (response) {
                if (response.Success) {
                    var data = response.Data;
                    handleData2(data);
                }
                else {
                    alert(response.Message);
                }
            }
        });
    }
    // call api/deleteVoucher in controler
    //Create: NNLam (19/05/2019)
    ajaxDeleteVoucher(refID) {
        $.ajax({
            // call api get all post
            url: '/api/refVoucherRemove/' + refID,
            dataType: 'json',
            type: 'DELETE',
            error: function () {
                alert("error!");
            },
            success: function (response) {
                if (response.Success) {
                    alert(response.Message);
                }
                else {
                    alert(response.Message);
                }
            }
        });
    }
    // call api/saveVoucher in controler
    //Create: NNLam (19/05/2019)
    ajaxSaveVoucher(dataSend,urlLink,typeSend) {
        $.ajax({
            url: urlLink,
            data: dataSend,
            dataType: 'json',
            type: typeSend,
            error: function () {
                alert("error!");
            },
            success: function (response) {
                if (response.Success) {
                    alert(response.Message);
                }
                else {
                    alert(response.Message);
                }
            }
        });
    }
}
class SettingPage {
    constructor() { };
    initEventForInput() {
        // select all focus
        //Create NNLam (20/05/2019)
        $("input").focus(function () {
            $(this).select();
        });
        //Hàm xử lý tích chọn trả nợ thì mới hiển thị nút Chọn hóa đơn trả nợ
        //Create: NNLam (16/05/2019)
        $('input[name="rdMoneyFund"]').on('change', function () {
            var value = $(this).val();
            var _settingPage = new SettingPage();
            _settingPage.setCookie("rdMoneyFund", value, 2);
            if (value == 'moneyFundPay') {
                $('.selectVoucher').css('visibility', 'visible');
                $('.documentNumber').css('visibility', 'hidden');
                $('.obj-when-disable div').css('display', 'block');
                //disable false input with id employeeSpend
                $('.isDisabled').attr('disabled', true);
                $('input.isDisabled').val('');
                // đổi text
                //$('div.changeObj').html('Nhà cung cấp');
                // setting on/off các trường khi chọn radio button other/pay
                _settingPage.settingDisplay(true);
            }
            else {
                $('.selectVoucher').css('visibility', 'hidden');
                $('.documentNumber').css('visibility', 'visible');
                //disable input with id employeeSpend
                $('.isDisabled').attr('disabled', false);
                document.getElementById("employeeSpend").disabled = true;
                // đổi text
                //$('div.changeObj').html('Đối tượng');
                // setting on/off các trường khi chọn radio button other/pay
                _settingPage.settingDisplay(false);
            }
        })
        // nếu sửa input mà sau khi out ra input trống thì mặc định hiển thị ngày hiện tại
        //Create: NNLam (16/05/2019)
        $('input[name="inpdate"]').on('change', function () {
            var checkValue = $(this).val();
            if (checkValue === null || checkValue === "") {
                $(this).val(toDay);
            }
        })
        // khi thay đổi giá trị trong input số tiền thì auto check === true
        //Create: NNLam (16/05/2019)
        $('input[name="inpMoneyInVoucher"]').on('change', function () {
            var checkValue = $(this).val();
            if (checkValue > 0) {
                $(this).parents('tr').find('input[name="ckbVoucher"]').prop("checked", true);
            }
        })
        // khi nhập số trong input số tiền thì auto format
        //Create: NNLam (16/05/2019)
        $('input[type="number"]').on('keypress', function () {
            var value = $('input[type="number"]').val();
            $('input[type="number"]').val(value.formatMoney());
        })
        //even khi close dialog
        //Create: NNLam (17/05/2019)
        $('button').on('click', '.ui-dialog-titlebar-close', function () {
            $('#dialogform .ui-container input').val('');
        })
    }
    // set cookie ( ở đây đang dùng cho check radio nhưng hoàn toàn có thể dùng cho những việc lưu cookie khác)
    //Create: NNLam (09/05/2019)
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    //lấy giá trị cookie lưu
    //Create: NNLam (09/05/2019)
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    // hàm sinh mã ngẫu nhiên
    //Create: NNLam (09/05/2019)
    getRandCode() {
        var code = ""
        var boxText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var boxInt = "1234567890"
        for (var i = 0; i < 2; i++) {
            var value = boxText[Math.floor(Math.random() * 26)];
            code = code + "" + value;
        }
        for (var j = 0; j < 8; j++) {
            code = code + "" + boxInt[Math.floor(Math.random() * 10)];
        }
        return code;
    }
    //hàm đổi text ( các trường trong dialog)
    //Create: NNLam (10/05/2019)
    changeTxt(textNew, className) {
        var text = '<p>' + textNew + '</p>';
        selOld = 'div.' + className + ' p';
        selNew = 'div.' + className
        $(selOld).remove();
        $(selNew).append(text);
    }
    // hàm bật tắt các trường thay phiên nhau khi chọn radio button other/pay
    //Create: NNLam (10/05/2019)
    settingDisplay(bool) {
        if (bool) {
            // hiện bảng chi tiết của MoneyFundPay
            $('.table-form-detail').css('display', 'block');
            // ẩn bảng chi tiết của MoneyFundOther
            $('.table-OtherDetail').css('display', 'none');
            // ẩn icon nếu chọn MoneyFundOther
            $('.obj-when-disable div').css('display', 'none');
        } else {
            // ẩn bảng chi tiết của MoneyFundPay
            $('.table-form-detail').css('display', 'none');
            // hiện bảng chi tiết của MoneyFundOther
            $('.table-OtherDetail').css('display', 'block');
            // hiển thị icon nếu chọn MoneyFundOther
            $('.obj-when-disable div').css('display', 'block');
        }
    }
    //setting dialog from
    //Create: NNLam (10/05/2019)
    settingDialogFrom(actionOne, actionTwo, actionThree) {
        //actionOne: nộp/nhận
        //actionTwo: chi/thu
        //actionThree: trả/thu nợ
        $('div.changeObj').html('Đối tượng ' + actionOne);
        $('div[name="Marked"]').html('Mục đích ' + actionTwo);
        $('lable[name="actionMoney"]').html(actionThree);
        $('div[name="selectVoucher"]').html('Chọn hóa đơn ' + actionThree);
        $('div[name="personAction"]').html('Người ' + actionOne);
        $('div[name="reason"]').html('Lý do ' + actionTwo);
        $('div[name="employeeAction"]').html('Nhân viên ' + actionTwo);
        $('div[name="divVoucherNumber"]').html('Số phiếu ' + actionTwo);
        $('div[name="divVoucherDate"]').html('Ngày ' + actionTwo);
        $('div[name="divVoucherDate"]').html('Ngày ' + actionTwo);
        $('th[name="item"]').html('Mục ' + actionTwo);
        $('th[name="payableNumber"]').html('Số phải ' + actionTwo);
        $('th[name="unpaidNumber"]').html('Số chưa ' + actionTwo);
        $('th[name="payNumber"]').html('Số ' + actionTwo);
    }
    settingInputDefaul(code) {
        //set ngày hiện tại cho input 
        $('input[name="inpdate"]').val(toDay);
        //set code cho input 
        $('input[name="inpVoucherNumber"]').val(code);
        // nếu sửa input mà sau khi out ra input trống thì mặc định hiển thị ngày hiện tại
        $('input[name="inpVoucherNumber"]').on('change', function () {
            var checkValue = $('input[name="inpVoucherNumber"]').val();
            if (checkValue == null || checkValue == "") {
                $('input[name="inpVoucherNumber"]').val(code);
            }
        })
    }
}
