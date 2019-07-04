//kyls add
$(document).ready(function () {
    var eventOutward = new EventOutward();
    eventOutward.initEvent();
})

//lớp dialog
class Dialog {
    /**
     * Hàm khời tạo
     * @param {string} element Selector elemnet
     * @param {string} title Tiêu đề form
     * @param {number} width Độ rộng
     * @param {number} height Chiều cao
     * @param {Array<JSON>} buttons button
     * @param {any} scope
     */
    constructor(element, title, width, height, buttons, scope, functionBeforeClose) {
        this.Dialog = $(element).dialog({
            autoOpen: false,
            modal: true,
            resize: false,
            title: title,
            width: width,
            height: height,
            buttons: buttons,
            open: function (event, ui) {
                if (typeof (scope) == 'function')
                    scope();
            },
            beforeClose: function (event, ui) {
                if (typeof (functionBeforeClose) == 'function')
                    functionBeforeClose(event);
            }
        });
    }
    /**
     * get, set action hiện tại của form
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
    }

}

//Lớp datepicker
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

//CreatedBy: KYLS(13/5/2019)
//all event affect to dialog outward
class EventOutward {
    constructor() {
        this.outward = new OutWard();
        this.quatityMax = 10;
        this.codeSkuOld = "";
    }

    //CreatedBy: KYLS(13/5/2019)
    //capture event
    initEvent() {
        //start open dialog
        $(document).on('click', '.btnAdd', { title: 'Thêm phiếu xuất kho', event: 'add', width: 960, height: 600, id: '#dialogform' }, this.openDialogs.bind(this));
        $(document).on('click', '.btnEdit', { title: 'Sửa phiếu xuất kho', event: 'edit', width: 960, height: 600, id: '#dialogform' }, this.openDialogs.bind(this));
        $(document).on('click', '.btnDuplicate', { title: 'Nhân bản phiếu xuất kho', event: 'duplicate', width: 960, height: 600, id: '#dialogform' }, this.openDialogs.bind(this));
        $(document).on('click', '.btnView', { title: 'Thông tin phiếu xuất kho', event: 'view', width: 960, height: 600, id: '#dialogform' }, this.openDialogs.bind(this));
        $(document).on('dblclick', '#table-outward tbody tr', { title: 'Thông tin phiếu xuất kho', event: 'view', width: 960, height: 600, id: '#dialogform' }, this.openDialogs.bind(this));

        //save data dialog
        $(document).on('click', '.btnSave', this.saveData.bind(this));

        //close dialog
        $(document).on('click', '.btn-Close', { sthis: 'father' }, this.closeDialogs.bind(this));

        //close dialog
        //$(document).on('dialogbeforeclose', 'div#dialogform', this.closeDialog.bind);

        //icon search inside diglog new add
        $(document).on('click', '#select-person-search', { title: 'Chọn đối tượng nhận', event: 'personSearch', width: 800, height: 500, id: '#icon-search-person' }, this.openDialogs.bind(this));
        $(document).on('click', '#select-sku-search', { title: 'Chọn hàng hóa', event: 'skuSearch', width: 800, height: 500, id: '#icon-search-sku' }, this.openDialogs.bind(this));

        //show rbutton select
        $(document).on('click', '#dialogform .iconrButtonDown', { sthis: 'rbuttonSelect' }, this.showPopup.bind(this));

        // start rbutton
        $(document).on('change', '.rButton', this.changRbutton.bind(this));

        //get value branch
        $(document).on('click', '#select-rbutton .ligh-timer', this.getBranch.bind(this));

        //focus row add class row-focus to up-down quatity
        $(document).on('mouseover', '#table-add-detail tbody tr', this.rowMouseOver.bind(this));
        $(document).on('mouseout', '#table-add-detail tbody tr', this.rowMouseOut.bind(this));

        //start detect change input > person
        $(document).on('input', '#select-person-input', { sthis: 'arowDownPerson' }, this.showPopup.bind(this));

        // start icon arow down inside diglog > person
        $(document).on('click', '#select-person-arow', { sthis: 'arowDownPerson' }, this.showPopup.bind(this));

        //start detect change input > sku
        $(document).on('input', '.row-focus input.select-sku-input', { sthis: 'arowDownSku' }, this.showPopup.bind(this));

        // start icon arow down inside diglog > sku
        $(document).on('click', '#select-sku-arow', { sthis: 'arowDownSku' }, this.showPopup.bind(this));

        //start icon timer inside diglog
        $(document).on('click', '.ui-container i.timer-picker', { sthis: 'timer' }, this.showPopup.bind(this));
        $(document).on('click', '#icon-timer .ligh-timer', this.getTimer.bind(this));

        //close when click outside > arrow down & timer
        $(document).on('mouseup', this.closePopup.bind(this));

        // start number quatity up down in detail
        $(document).on('click', '#table-add-detail tbody tr i.fa-sort-up', { sthis: 'up' }, this.quantityUpDown.bind(this));
        $(document).on('click', '#table-add-detail tbody tr i.fa-sort-down', { sthis: 'down' }, this.quantityUpDown.bind(this));

        //remove row
        $(document).on('click', 'tr .delete-icon', this.removeRow.bind(this));

        //slect object person
        $(document).on('click', '#arow-down-person .row-ligh', this.getObjectPerson.bind(this));

        //select sku
        $(document).on('click', '#arow-down-sku .row-ligh', this.getProductSku.bind(this));

        //validate input
        $(document).on('blur', '.flex.row-container .voucher input', this.ValidateInput.bind(this));

        //change date input departure
        $(document).on('input', '#date-departure', { sthis: 'date' }, this.ValidateData.bind(this));

        //change date input
        $(document).on('input', '#time-departure', { sthis: 'timer' }, this.ValidateData.bind(this));

        //close dialog object person and object sku
        $(document).on('click', '.search-footer .cancel', { sthis: 'children' }, this.closeDialogs.bind(this));

        //click agree to get row object person and object sku
        $(document).on('click', '#icon-search-person .search-footer .agree', { id: "#icon-search-person" }, this.getProductPerson.bind(this));
        $(document).on('click', '#icon-search-sku .search-footer .agree', { id: "#icon-search-sku" }, this.getProductPerson.bind(this));

    }

    //OPEN DIALOGs
    //CreatedBy: KYLS(13/5/2019)
    openDialogs(e) {
        $("#right-mouse").hide();
        var dialog = new Dialog(e.data.id, e.data.title, e.data.width, e.data.height);

        switch (e.data.event) {
            case 'add':
                {
                    this.cleanDialog();
                    var dd = new Date();
                    $('#date-departure').val(dd.formatddMMyyyy());
                    $('#time-departure').val(dd.formatHHmm());
                    //get voucher code
                    var path = "/getvouchercode";
                    var vouchercode = this.outward.pushData(path, {});
                    $('#txtVoucherCode').val(vouchercode);
                    this.closeDialog = dialog;
                    this.eventSave = "addNew";
                    break;
                }
            case 'edit':
                {
                    this.closeDialog = dialog;
                    var newHas = false;
                    this.dialogEdit(newHas);
                    break;
                }
            case 'duplicate': {
                this.closeDialog = dialog;
                var newHas = true;
                var voucherCode = this.dialogEdit(newHas);
                //get voucher code
                var path = "/getvouchercode";
                var vouchercode = this.outward.pushData(path, {});
                $('#txtVoucherCode').val(vouchercode);
                this.eventSave = "addNew";
                break;
            }
            case 'view': {
                var newHas = false;
                this.closeDialog = dialog;
                this.dialogEdit(newHas);
                $('#dialogform .btnSave').addClass('disable');
                break;
            }
            case 'personSearch':
                {
                    //clear html
                    var path_url = "/objectperson";
                    var path_field = "#icon-search-person table thead tr th";
                    var path_append = "#icon-search-person table tbody";
                    $(path_append).html("");//clear data
                    this.bindDataPersonAndSku(path_url, path_field, path_append, "iconSearch");
                    $('#icon-search-person table tbody tr:first').addClass('row-selected');
                    break;
                }
            case 'skuSearch':
                {
                    //clear html
                    var path_url = "/skuproduct";
                    var path_field = "#icon-search-sku table thead tr th";
                    var path_append = "#icon-search-sku table tbody";
                    $(path_append).html("");//clear data
                    this.bindDataPersonAndSku(path_url, path_field, path_append, "iconSearch");
                    $('#icon-search-sku table tbody tr:first').addClass('row-selected');
                    break;
                }
        }
        dialog.Open();
        this.closeDialogChildren = dialog; //những dialog con được mở trong dialog cha
        this.detectPresentScroll();
    }

    //CLOSE DIALOG
    //CreatedBy: KYLS(23/5/2019)
    closeDialogs(e) {
        switch (e.data.sthis) {
            case 'father':
                {
                    this.closeDialog.Close();
                    break;
                }
            case 'children':
                {
                    this.closeDialogChildren.Close();
                    break;
                }
        }
    }


    //clean input text
    //CreatedBy: KYLS(13/5/2019)
    cleanDialog() {
        $('#dialogform .row-container input:text').val("");
        $('#dialogform .row-container input:text').parent().removeClass("border-red");
        var $radito = $('#dialogform .misa-radio input:radio');
        $radito.attr("disabled", false);
        $radito.filter('[value=other-store]').prop('checked', true);
        $('#dialogform .select-branch').addClass('area-hide');
        $('#taget-person').attr("disabled", false);
        $('#table-add-detail tbody tr.product').remove();
        $('#dialogform .total-money').text(0);
        $('#dialogform  .total-quantity').text(0);
        $('#table-add-detail tfoot span.count-row').text(0);
        $('#dialogform .btnSave').removeClass('disable');
    }

    //bind data for dialog edit
    //createby: kyls(03/07/2019)
    dialogEdit(newHas) {
        this.cleanDialog();
        var voucherCode = $('#table-outward tr.row-selected').closest('tr').find('td:eq(2)').text();
        $('#txtVoucherCode').val(voucherCode)
        $("input.rButton").attr("disabled", true);
        this.bindDataForm(voucherCode);
        var path = "/outwarddetail/" + voucherCode;
        var data = this.outward.loadData(path);

        //set flag to update or insert
        
        this.bindDataTableDetail(data, newHas);
        this.eventSave = "update";
        return voucherCode;
    }
    //CreatedBy: KYLS(23/6/2019)
    //bind data into form when open dialog edit
    bindDataForm(voucherCode) {
        var path = "/outwardkyls/" + voucherCode;
        var result = this.outward.loadData(path);
        $('#select-person-input').val(result[0]["ObjectCode"]);
        $('#taget-person').val(result[0]["ObjectName"]);
        $('#txtdeliver').val(result[0]["Deliver"]);
        $('#txtexplain').val(result[0]["Description"]);
        $('#date-departure').val(new Date(result[0]["DateOutward"]).formatddMMyyyy());
        $('#time-departure').val(result[0]["TimeOutward"].substr(0, 5));
        var $radito = $('#dialogform .misa-radio input:radio');
        if (result[0]["Purpose"] != "khác") {
            $radito.filter('[value=tranfer-store]').prop('checked', true);
            $('#dialogform .select-branch').removeClass('area-hide');
            $('.select-branch input:text').val(result[0]["Purpose"]);
        } else {
            $radito.filter('[value=other-store]').prop('checked', true);
        }
    }
    //CreatedBy: KYLS(13/5/2019)
    //save data in dialog
    saveData() {
        var listInfo = {};
        var path = "";
        var date = $('#date-departure').val().split("/");
        debugger
        listInfo = {
            Purpose: ($('.purpose-select input[name="tranferStore"]:checked').val() == "other-store" ? "khác" : $('.select-branch input:text').val()),
            ObjectCode: $('#select-person-input').val(),
            Deliver: $('#txtdeliver').val(),
            Description: $('#txtexplain').val(),
            VoucherCode: $('#txtVoucherCode').val(),
            DateOutward: new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0])+1),
            TimeOutward: $('#time-departure').val(),
            TypeVoucher: 1,
            TotalMoney: $('#table-add-detail .total-money').text().split('.').join('')
        }
        //push listInfo on server
        if (this.eventSave == 'addNew') {
            path = "/outwardkyls/newoutward";
        } else {
            path = "/outwardkyls/updateoutward";
        }
        this.outward.pushData(path, listInfo);

        var fields_body = $("#table-add-detail tbody tr.product");
        var sthis = this.outward;
        $.each(fields_body, function (index, field) {
            var list = {
                VoucherCode: $('#txtVoucherCode').val(),
                SkuCode: $(field).children()[0].textContent,
                Quatity: $(field).children()[5].textContent,
                Money: $(field).children()[6].textContent.split('.').join('')
            }
            
            if ($(field).attr("newHas") == "new") {
                path = "/outwarddetail/outwarddetail";
            } else {
                var iddetail = $(field).attr("iddetail");
                list["id"] = iddetail;
                path = "/outwarddetail/updateoutwarddetail";
            }
            //push list on server
            sthis.pushData(path, list);
        })
        this.closeDialog.Close();
        this.outward.bindDataMaster();
    }

    //CreatedBy: KYLS(13/5/2019)
    //inside diglog have arrowDown and filter
    showPopup(e) {
        switch (e.data.sthis) {
            case 'rbuttonSelect':
                {
                    $('#select-rbutton').show();
                    break;
                }
            case 'arowDownPerson':
                {
                    $('#arow-down-person div.row-ligh').remove();//clean data
                    var path_url = "/objectperson";
                    var path_field = "#arow-down-person div.arrow-header div";
                    var path_append = "#arow-down-person div.icon-arow-down";
                    this.bindDataPersonAndSku(path_url, path_field, path_append, "iconDown");
                    $("#arow-down-person").show();
                    break;
                }
            case 'arowDownSku':
                {
                    $('#arow-down-sku div.row-ligh').remove();//clean data
                    var path_url = "/skuproduct";
                    var path_field = "#arow-down-sku div.arrow-header div";
                    var path_append = "#arow-down-sku div.icon-arow-down";
                    this.bindDataPersonAndSku(path_url, path_field, path_append, "iconDown");
                    $("#arow-down-sku").show();
                    $('#arow-down-sku').offset({ top: $(e.currentTarget).offset().top - 306 });
                    break;
                }
            case 'timer':
                {
                    $("#icon-timer").show();
                    break;
                }
        }
    }

    //CreatedBy: KYLS(13/5/2019)
    //click outside object
    closePopup(e) {

        var tablePerson = $("#arow-down-person");
        if (!tablePerson.is(e.target) // if the target of the click isn't the container...
            && tablePerson.has(e.target).length === 0) // ... nor a descendant of the container
        {
            tablePerson.hide();
        }

        var tableSku = $("#arow-down-sku");
        if (!tableSku.is(e.target) // if the target of the click isn't the container...
            && tableSku.has(e.target).length === 0) // ... nor a descendant of the container
        {
            tableSku.hide();
        }

        var timers = $("#icon-timer");
        if (!timers.is(e.target) // if the target of the click isn't the container...
            && timers.has(e.target).length === 0) // ... nor a descendant of the container
        {
            timers.hide();
        }

        var rbutton = $("#select-rbutton");
        if (!timers.is(e.target) // if the target of the click isn't the container...
            && timers.has(e.target).length === 0) // ... nor a descendant of the container
        {
            rbutton.hide();
        }
    }

    //CreatedBy: KYLS(13/5/2019)
    //get time on combobox timer
    getTimer(e) {
        $('#time-departure').val($(e.target).text());
        $("#icon-timer").hide();
    }

    //CreatedBy: KYLS(13/5/2019)
    //GET brach when click select form rbutton
    getBranch(e) {
        $('.select-branch input').val($(e.target).text());
        $("#select-rbutton").hide();
    }

    //CreatedBy: KYLS(13/5/2019)
    //get value when change rbutton
    changRbutton(e) {
        //debugger
        if (e.target.value == 'other-store') {
            $('#dialogform .select-branch').addClass('area-hide');
        }
        else if (e.target.value == 'tranfer-store') {
            $('#dialogform .select-branch').removeClass('area-hide');
            $('.select-branch input:text').val('Thời trang MM cầu giấy');
        }
        //$(e.target).addClass('tambay');
    }

    //CreatedBy: KYLS(13/5/2019)
    //add class when mouse move into tag tr
    rowMouseOver(e) {
        $(e.currentTarget).addClass('row-focus');
    }

    //CreatedBy: KYLS(13/5/2019)
    //remove class when mouse out tag tr
    rowMouseOut(e) {
        $(e.currentTarget).removeClass('row-focus');
    }

    //CreatedBy: KYLS(13/5/2019)
    //calulator quantity when click icon up | icon down
    quantityUpDown(e) {        
        // debugger;
        //this.quatityMax get from server
        var codeSku = $($(e.target).parents("tr")).children().first().text();
        //when codeSku same so not sent request to server to get Quatity
        if (codeSku != this.codeSkuOld) {
            //var path = "/skuproduct/" + codeSku;
            //var data = this.outward.loadData(path);
            //this.quatityMax = data[0]["Quatity"];
            this.quatityMax = Number($($(e.target).parents('td')).attr('currentQuatity'));
            this.codeSkuOld = codeSku;
        } 
        $('#table-add-detail tbody tr span.col-numbers').removeClass('quantity');
        $('#table-add-detail tbody .row-focus span.col-numbers').addClass('quantity');

        var start_n = Number($('#table-add-detail tbody .row-focus span.quantity').text());
        var price = $('#table-add-detail tbody .row-focus td.price').text();
        // debugger
        if (e.data.sthis == 'up') {
            if (start_n < this.quatityMax) {
                start_n += 1;
                this.totalMoneyDialog(start_n, price);
            } else {
                alert('quatity limited up');
            }
        } else if (e.data.sthis == 'down') {
            if (start_n > 0) {
                start_n -= 1;
                this.totalMoneyDialog(start_n, price);
            } else {
                alert('quatity limited down');
            }
        }
        e.stopPropagation();
    }

    //CreatedBy: KYLS(13/5/2019)
    //caculator total money change each click icon up | icon down
    totalMoneyDialog(start_n, price) {
        var int_price = start_n * Number(price.split('.').join(''));
        $('#table-add-detail tbody .row-focus span.quantity').text(start_n);
        $('#table-add-detail tbody .row-focus td.number-money').text(int_price.formatMoney());
        //can use async ?
        this.totalQuatityMoney();
        //end async
    }

    totalQuatityMoney() {
        //total quatity
        var getAllMoney = $('#table-add-detail tbody td.number-money');
        var totalMoney = 0;
        $.each(getAllMoney, function (index, item) {
            var str = $(item).text();           
            totalMoney += Number(str.split('.').join(''));
        })
        $('#dialogform .total-money').text(totalMoney.formatMoney());
        //total money
        var getAllQuantity = $('#table-add-detail tbody td span.col-numbers');
        var totalQuantity = 0;
        $.each(getAllQuantity, function (index, item) {
            totalQuantity += Number($(item).text());
        })
        $('#dialogform  .total-quantity').text(totalQuantity);
    }

    //CreatedBy: KYLS(13/5/2019)
    //total number row table detail
    totalRow() {
        var num = $('#table-add-detail tbody tr');
        $('#table-add-detail tfoot span.count-row').text(num.length - 1);
    }

    //CreatedBy: KYLS(13/5/2019)
    //remove tr when click icon delete in
    removeRow(e) {
        if (this.eventSave = "update") {
            var idDetail = $($(e.target).parents("tr")).attr("iddetail");
            if (idDetail != null) {
                var path = "/outwarddetail/delete/" + idDetail;
                this.outward.deleteData(path);
            }           
        }
        $('tbody tr.row-focus').remove();
        this.totalRow();
        this.totalQuatityMoney();
        this.detectPresentScroll();//check scroll present
    }

    //CreatedBy: KYLS(13/5/2019)
    //bind data object person
    bindDataPersonAndSku(path_url, path_field, path_append, group) {
        var path = path_url;
        var data = this.outward.loadData(path);
        var fields = $(path_field);
        $.each(data, function (index, item) {
            var rowHtml = "";
            if (group == "iconDown") {
                rowHtml = '<div class="row-ligh">';
            } else {
                //iconSearh
                rowHtml = "<tr>";
                if (path_url == "/skuproduct") {
                    rowHtml += '<td class="text-right" style="border-right: none"><input type="checkbox"></td>'
                } else {
                    rowHtml += '<td class="text-center"><input type="radio" name="person"></td>';
                }
            }
            $.each(fields, function (i, field) {
                var dataName = $(field).attr('fieldData');
                var dataType = $(field).attr('dataType');
                dataType = dataType ? dataType.toLowerCase() : null;
                var value = item[dataName] ? item[dataName] : "";
                if (dataName) {//nếu tồn tại dataName
                    if (group == "iconDown") {
                        rowHtml += '<div>' + value + '</div>';
                    } else {
                        if (dataName == "Quatity" || dataName == "UnitPrice") {
                            rowHtml += '<td class="text-right">' + value.formatMoney() + '</td>';
                        } else {
                            rowHtml += '<td>' + value + '</td>';
                        }
                        
                    }                
                }
                
            })

            if (group == "iconDown") {
                rowHtml += '</div">';
            } else {
                rowHtml += "</tr>";
            }
            $(path_append).append(rowHtml);
        })
    }

    //CreatedBy: KYLS(13/5/2019)
    //get object person code and name
    getObjectPerson(e) {
        var codePerson = $($(e.target).parent()).children('div:nth-child(1)').text();
        var namePerson = $($(e.target).parent()).children('div:nth-child(2)').text();
        $('#select-person-input').val(codePerson);
        $('#taget-person').val(namePerson);
        $("#arow-down-person").hide();
    }

    //CreatedBy: KYLS(13/5/2019)
    //get code sku when click table code sku
    getProductSku(e) {
        var codeSku = $($(e.target).parent()).children('div:nth-child(1)').text();
        var path = "/skuproduct/" + codeSku;
        var data = this.outward.loadData(path);
        //set flag to update or insert
        var newHas = true;
        this.bindDataTableDetail(data, newHas);
        $("#arow-down-sku").hide();
    }

    //CreatedBy: KYLS(13/5/2019)
    //get code sku and person object  when click agree in dialog product and person 
    getProductPerson(e) {
        var fields = $(e.data.id + " table tbody tr.row-selected");
        for(let field of fields) {
            if (e.data.id == "#icon-search-person") {
                var codePerson = $(field).children("td:nth(1)").text();
                var namePerson = $(field).children("td:nth(2)").text();
                $('#select-person-input').val(codePerson);
                $('#taget-person').val(namePerson);
                break;
            } else if (e.data.id == "#icon-search-sku") {
                var codeSku = $(field).children("td:nth(1)").text();
                var path = "/skuproduct/" + codeSku;
                var data = this.outward.loadData(path);
                //set flag to update or insert
                var newHas = true;
                this.bindDataTableDetail(data, newHas);
            }
        }
        this.closeDialogChildren.Close();
    }

    //CreatedBy: KYLS(23/6/2019)
    //bind data on table detail
    bindDataTableDetail(datas, newHas) {
        var fields = $('#table-add-detail thead tr td');
        var rowHtml = '';
        //set flag to update or insert
        for(let data of datas) {
            if (newHas) {
                rowHtml = '<tr class="product" newHas="new">';
            } else {
                rowHtml = '<tr class="product" newHas="old" iddetail="' + data["id"] + '">';
            }
            var quatity = 0;
            var price = 0;
            var totalQuatity = 0;
            $.each(fields, function (i, field) {
                var dataName = $(field).attr('fieldData');
                var dataType = $(field).attr('dataType');
                dataType = dataType ? dataType.toLowerCase() : null;
                var value = data[dataName] ? data[dataName] : "";
                if (dataType == "number") {
                    switch (dataName) {
                        case 'UnitPrice':
                            {
                                price = value;
                                rowHtml += '<td class="text-right price">' + value.formatMoney() + '</td>'; 
                                break;
                            }
                        case 'Quatity':
                            {                                
                                quatity = value;
                                if (!newHas) {
                                    totalQuatity = data['TotalQuatity'] + quatity;

                                } else {
                                    totalQuatity = quatity;
                                }
                                rowHtml += '<td fieldData="quatity" currentQuatity="' + totalQuatity + '">'
                                        + '<span class="pr-sm-1 text-right col-numbers">' + value + '</span>'
                                        + '<span class="icon-up-down">'
                                            + '<i class="fas fa-sort-up"></i>'
                                            + '<i class="fas fa-sort-down"></i>'
                                        + '</span>'
                                        + '</td>';
                                break;
                            }
                        case 'Money':
                            {
                                rowHtml += '<td class="text-right number-money" fieldData="money">'+(value != "" ? value.formatMoney() : (quatity*price).formatMoney())+'</td>';
                                break;
                            }
                        default: alert('error kia!');
                    }

                    
                } else {
                    if (dataName != null)//colum del avoid add over col
                        rowHtml += '<td class="text-left ">' + value + '</td>';
                }
            })
            rowHtml += '<td><div class="delete-icon"></div></td>'
                    + '</tr>';
            $('#table-add-detail tr.row-search').before(rowHtml);
            this.totalRow();
            this.totalQuatityMoney();
            this.detectPresentScroll();//check scroll present
        }
    }

    //CreatedBy: KYLS(13/5/2019)
    //check validate for input when forcusout that not value or value fail > back to new value true
    ValidateInput(e) {
        var dd = new Date();
        var valueInput = e.target.value;   
        //check data input timer departure     
        if ($(e.target).is('#time-departure')) {
            var check = isTimeFormathhmm(valueInput);
            if (!check || valueInput == "") {
                $('#time-departure').val(dd.formatHHmm());
            }
        }
        //check data input date departure
        if ($(e.target).is('#date-departure')) {
            var check = isDateFormatddmmyyyy(valueInput);
            if (!check || valueInput == "") {
                $('#date-departure').val(dd.formatddMMyyyy());               
            }
        }
        this.ShowWaringTooltip("hide", e, "");
        $(e.target).parent().removeClass("border-red");       
    }

    //CreatedBy: KYLS(13/5/2019)
    //check validate change input date and time  departure
    ValidateData(e) {
        var check;
        var content = "";
        switch (e.data.sthis) {
            case 'date':
                {
                    check = isDateFormatddmmyyyy(e.target.value);
                    content = "sai định dạng dd/mm/yyyy";
                    break;
                }
            case 'timer':
                {
                    check = isTimeFormathhmm(e.target.value);
                    content = "sai định dạng hh:mm"
                    break;
                }
        }

        if (check) {
            $(e.target).parent().removeClass("border-red");
            this.ShowWaringTooltip("hide", e, "");
        } else {
            $(e.target).parent().addClass("border-red");
            this.ShowWaringTooltip("show", e, content);
        }
    }

    //CreatedBy: KYLS(13/5/2019)
    //show tooltip warning
    ShowWaringTooltip(event, cthis, content) {
        if (event === 'show') {
            $(cthis.target).parent().nextAll('.icon-exclamation').prop('title', content).show().tooltip({
                tooltipClass: 'tooltip-warning',
            });
        } else {
            $(cthis.target).parent().nextAll('.icon-exclamation').hide();
        }
    }

    //CreatedBy: KYLS(13/5/2019)
    //Detect overflow change to scroll in table tbody
    detectPresentScroll() {
        $(function () {
            if ($('#table-add-detail tbody').hasScrollBar()) {
                $("#table-add-detail thead, #table-add-detail tfoot").css("width", "calc(100% - 17px)");
            } else {
                $("#table-add-detail thead, #table-add-detail tfoot").css("width", "");
            }
        });

        (function ($) {
            $.fn.hasScrollBar = function () {
                return this.get(0).scrollHeight > this.height();
            }
        })(jQuery);
    }

}
