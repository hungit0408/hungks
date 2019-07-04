$(document).ready(function () {

    outwardjs.initEvent();

    //Hàm xử lý ẩn hiện menu-right khi mouseover và mouseout
    $('.menu-rightclick').mouseover(function () {
        $(this).css('visibility', 'visible')
    })
    $('.menu-rightclick').mouseout(function () {
        $(this).css('visibility', 'hidden')
    })

    $('input').focus(function () {
        this.select();
    });


});
var date = new Date();
var hour = date.getHours();
var min = date.getMinutes();

/**element input số phiếu nhập */
var voucherCodeInput = $('input[name="RefNo"]');
/**element input ngày nhập kho */
var dateOutwardInput = $('input[name="RefDate"]');
/**element input giờ nhập kho */
var timeOutwardInput = $('input[name="RefTime"]');
var currentState = 'add';

class outwardJS {
    constructor() {

        //button cho dialog chọn đối tượng
        var buttonsDialogSelectObject = [
            {
                html: '<span class="button-icon"></span ><span class="button-title">Chọn</span>',
                class: "one-button select",
                click: function () {
                    //debugger
                    this.onSelectObjectByID();
                }.bind(this)
            },
            {
                html: '<span class="button-icon"></span><span class="button-title">Hủy bỏ</span>',
                class: "one-button cancel",
                click: function () {
                    $(this).dialog('close');
                }
            }
        ];
        var buttonsWarning = [
            {
                html: '<span class="button-icon"></span><span class="button-title">Có</span>',
                class: 'one-button select',
                click: function () {
                    var self = this;
                    //debugger
                    if (currentState == "add") {
                        this.warningDialog.Dialog.dialog('close');
                    }
                    else (currentState == "delete")
                    {
                        this.deleteOutward();
                    }
                    

                }.bind(this)
            },
            {
                html: '<span class="button-icon"></span><span class="button-title">Không</span>',
                class: 'one-button cancel',
                click: function () { $(this).dialog('close'); }
            }
        ];
        var buttonsDialogSelectProduct = [
            {
                html: '<span class="button-icon"></span ><span class="button-title">Chọn</span>',
                class: "one-button select",
                click: function () {
                    debugger
                    this.onOpenDialogConfirmProduct();
                    var listSelectedItem = this.GetListInventoryItemFromDialogSelectProducts();
                    $.each(listSelectedItem, function (index, item) {
                        debugger
                        //bind cha 
                        this.bindListSelectItemToDialogConfirm(item.InventoryItemID);
                        // bind con
                        $.each(item.InventoryItemDetails, function (i, itemDetail) {
                            this.bindListChildSelectItemToDialogConfirm(itemDetail);
                        }.bind(this));
                    }.bind(this))


                }.bind(this)
            },
            {
                html: '<span class="button-icon"></span><span class="button-title">Hủy bỏ</span>',
                class: "one-button cancel",
                click: function () {
                    //debugger
                    
                    $(this).dialog('close');

                }
            },
            {
                html: '<span class="button-icon"></span><span class="button-title">Trợ giúp</span>',
                class: "one-button help",
                click: function () {

                }
            }
        ];
        var buttonsDialogConfirmClose = [
            {
                html: '<span class="button-icon"></span ><span class="button-title">Lưu</span>',
                class: "one-button save",
                click: function () {
                    $('#dialogform .form-button-save').trigger('click');
                    this.outwardDialog.Close();

                }
            },
            {
                html: '<span class="button-icon"></span ><span class="button-title">Không lưu</span>',
                class: "one-button not-save",
                click: function () {
                    this.outwardDialog.Close();
                    $(this).dialog('close');
                }
            },
            {
                html: '<span class="button-icon"></span ><span class="button-title">Hủy bỏ</span>',
                class: "one-button cancel",
                click: function () {
                    $(this).dialog('close');
                }
            }
        ];
        var buttonsConfirmProductDialog = [
            {
                html: '<span class="button-icon"></span ><span class="button-title">Chọn</span>',
                class: "one-button select",
                click: function () {

                    $(this).dialog('close');

                }
            },
            {
                html: '<span class="button-icon"></span ><span class="button-title">Quay lại</span>',
                class: "one-button back",
                click: function () {
                    $('#table-confirm-product tbody').html('');
                    $(this).dialog('close');
                }
            },
            {
                html: '<span class="button-icon"></span><span class="button-title">Hủy bỏ</span>',
                class: "one-button cancel",
                click: function () {
                    $(this).dialog('close');
                }
            },
            {
                html: '<span class="button-icon"></span><span class="button-title">Trợ giúp</span>',
                class: "one-button help",
                click: function () {

                }
            }
        ];

        this.outwardDialog = new Dialog('#dialogform', 'Thêm phiếu xuất kho', 1060, 600, {}, this.handleBeforeCloseMainForm);
        this.dialogSelectObject = new Dialog('#dialogSelectObject', "Chọn đối tượng", 800, 500, buttonsDialogSelectObject);
        this.warningDialog = new Dialog('#frmWarnings', 'MShopKeeper', 400, 156, buttonsWarning);
        this.dialogSelectProduct = new Dialog('#dialogSelectProduct', "Chọn hàng hóa", 900, 600, buttonsDialogSelectProduct);
        this.dialogConfirmClose = new Dialog('#dialogConfirmClose', "Dữ liệu chưa được lưu", 400, 160, buttonsDialogConfirmClose);
        this.dialogConfirmProduct = new Dialog('#dialogConfirmProduct', "Hàng hóa đã chọn", 900, 600, buttonsConfirmProductDialog);
    }




    initEvent() {
        this.resize_column();
        this.resize_table();
        this.loadData();
        this.selectFirstRow();
        this.onChangeConditionGet();
        this.setPaging();
        this.tranferToAnotherStore();
        this.validate();
        this.menuRightClick();
        this.timepicker();
        this.setSummaryRow();
        this.setTableFixed();

        //hàm xử lí click thêm mới phiếu xuất kho
        $('#btn-Add:not(.disable), #btn-Add').on('click', this.onAddOutward.bind(this));
        //hàm xử lí click mở dialog sửa phiếu xuất kho
        $('#btn-Edit:not(.disable), #menu-btn-Edit').on('click', this.onClickEditOutward.bind(this));
        //Hàm xử lí click nhân bản phiếu xuất kho
        $(document).on('click', '#btn-duplicate', this.onClickDuplicateOutward.bind(this));
        //Hàm xử lí click xem phiếu xuất kho
        $(document).on('click', '#btn-view', this.onClickViewOutward.bind(this));
        //Hàm xử lí click xóa phiếu xuất kho
        $(document).on('click', '#btn-delete', this.onDeleteOutward.bind(this));
        //hàm xử lí click mở dialog chọn đối tưởng
        $(document).on('click', "#select-object", this.onViewSelectObject.bind(this));
        //Hàm xử lí click dropdown hiển thị danh sách đối tượng
        $(document).on('click', '.information-row .arow-down-line', this.onViewObject.bind(this));
        //Hàm xử lí click tr trong table view chi tiết phiếu 
        $(document).on('click', '#outward-table tbody tr', this.onloadDataRefDetail.bind(this));
        //Lưu phiếu xuất kho
        $(document).on('click', "#btn-save", this.saveOutward.bind(this));
        //Hàm xử lí dbclick table xem phiếu xuất kho
        $(document).on('dblclick', "#outward-table tbody tr", this.onClickViewOutward.bind(this));
        //Hàm xử lí click Số phiếu xuất để xem phiếu xuất kho
        $(document).on('click', " #outward-table tbody tr a", this.onClickViewOutward.bind(this));
        //Hàm xử lí close dialog khi click button đóng
        $('#close-dialogAdd').click(function () {
            this.outwardDialog.close();
        }.bind(this));
        //hàm xử lí reload data
        $(document).on('click', ".load-data-icon, #btn-load, .getdata ", this.onReloadData.bind(this));
        //Hàm xử lí click chọn sản phẩm 
        $(document).on('click', '.open-selectproduct', this.onClickSelectProduct.bind(this));
        //hàm xử lí khi click select thay dổi đối tượng
        $('select.objectType').on('change', function () {
            this.onSelectObject();
        }.bind(this));
        //Hàm xử lí khi click tìm kiếm đối tượng trong dialog chọn đối tượng
        $(document).on('click', '#dialogSelectObject .search-object', this.onSelectObject.bind(this));



    }

    //Event xử lý tích chọn Điều chuyển từ cửa hàng khác thì mới hiển thị nút Chọn chứng từ điều chuyển
    //Created by:PMDUC(24/05/2019)
    tranferToAnotherStore() {
        $('input[name="rdtypeVoucher"]').on('change', function () {
            var value = $(this).val();
            if (value == 'fromOtherStore') {
                $('.other-shop').css('visibility', 'visible');
            }
            else {
                $('.other-shop').css('visibility', 'hidden');
            }
        })
    }
    // Xử lí sự kiện menu chuột phải
    //Created by: PMDUC
    menuRightClick() {
        $(document).on('contextmenu', '#outward-table tbody tr', function (e) {
            e.preventDefault();
            $('.menu-rightclick').css({
                visibility: "visible",
                display: "block",
                left: e.pageX,
                top: e.pageY
            })
        })

    }
    //Xử lí sự kiện click view danh sách đối tượng 
    //Created by: PMDUC
    viewObject() {
        $('.show-Object').toggle();
    }

    /**
     * Xử lý khi người dùng thay đổi các trường lọc dữ liệu
     * */
    onChangeConditionGet() {
        var outwardjs = this;
        var table = $('#outward-table');
        table.find('input[field-data], select[field-data="RefType"]').on('change', function () {
            outwardjs.loadData();
        });
    }

    //gửi yêu cầu loadData lên server
    //Created by: PMDuc

    loadData() {
        //debugger
        var url = '/outwards/getDb';
        var refCondition = {};
        refCondition.PageNumber = Number($('input[name="PageNumber"]').val());
        refCondition.NumberRow = Number($('select[name="NumberRow"]').val());
        refCondition.DateFrom = $('#startDate').val().formatMMddyyy();
        refCondition.DateTo = $('#endDate').val().formatMMddyyy();
        refCondition.RefDate = $('input[field-data="RefDate"]').val().formatMMddyyy();
        refCondition.RefNo = $('input[field-data="RefNo"]').val();
        refCondition.AccountObjectName = $('input[field-data="AccountObjectName"]').val();
        refCondition.TotalAmount = $('input[field-data="TotalAmount"]').val();
        refCondition.CompareTotalAmountType = $('select[field-data="CompareTotalAmountType"]').val();
        refCondition.Description = $('input[field-data="Description"]').val();
        refCondition.RefType = $('select[field-data="RefType"]').val();
        Object.keys(refCondition).forEach(function (item) {
            if (refCondition[item] == '') {
                refCondition[item] = undefined;
            }
        })
        var preloader =
            '<div class="preloader" id="outward-loader"> \
            <div class="loader-container"> \
                <img src="/Contents/images/loading1.gif" /> \
                <div>Đang lấy dữ liệu...</div> \
            </div> \
        </div>';
        $('.master-table').prepend(preloader);
        ajaxAPI(url, 'POST', refCondition, this.bindData.bind(this), this.notifyError, true);


    }
    //binddata vào bảng và xóa loader
    //Created by: PMDUC
    bindData(listRefOutward) {
        //debugger
        var numberRow = Number($('select[name="NumberRow"]').val());
        var rowIndexArray = [];
        var rowFrom = 0;
        var rowTo = 0;
        var totalRow = 0;
        $('div.table-container #outward-table tbody').html('');
        if (listRefOutward.length != 0) {
            //debugger
            var data = listRefOutward;
            var totalMoney = 0;
            $.each(data, function (index, item) {
                var rowHtml = $('<tr></tr>');
                var dateDisplay = new Date(item.RefDate).formatddMMyyyy();
                rowIndexArray.push(item.RowIndex);
                totalRow = item.TotalRow;
                totalMoney += item.TotalAmount;
                var rowData =
                    `<td class="text-align-center">
                            <label class="misa-checkbox">
                                <input type="checkbox" name="ckbRow" value="" />
                                <span class="checkbox-square"></span>
                            </label>
                        </td>
                        <td>${dateDisplay}</td>
                        <td><a href="#">${item.RefNo}</a></td>
                        <td>${item.AccountObjectName}</td>
                        <td>${FormatCurrency(item.TotalAmount)}</td>
                        <td>${item.Description}</td>
                        <td>${item.RefTypeName}</td>`;
                rowHtml.html(rowData);
                $('#outward-table tbody').append(rowHtml);
                rowHtml.data('refID', item.RefID);
            });
            $('.summary .total-money').html(FormatCurrency(totalMoney));
            // Xử lí thông tin phân trang
            rowFrom = Math.min(...rowIndexArray);//Lấy row nhỏ nhất
            rowTo = Math.max(...rowIndexArray);//lấy row lớn nhất
        }
        if ($('#outward-loader'))
            $('#outward-loader').remove();
        var numberRow = Number($('select[name="NumberRow"]').val());
        var pageTotal = Number(Math.ceil(totalRow / numberRow)) || 1;
        //Hiển thị thông tin phân trang
        this.showPagingInfor(rowFrom, rowTo, totalRow, numberRow);
        this.selectFirstRow();
        $(document).trigger('changedata');
        // update trạng thái button phân trang
        this.updateStatusButtonPaging(pageTotal);
        //this.onloadDataRefDetail();


    }

    //Hiển thị thông tin phân trang lên màn hình
    showPagingInfor(rowFrom, rowTo, totalRow, numberRow) {
        var pageTotal = Math.ceil(totalRow / numberRow);
        $('.totalPage').html(pageTotal);
        var optionRightHTML = `${rowFrom} - ${rowTo} trong ${totalRow} kết quả`;
        $('.option-right').html(optionRightHTML);
    }
    /**
     * Hàm cập nhật lại trạng thái disable của button điều hướng phân trang
     * @param {Number} pageTotal tổng số trang hiện có
     */
    updateStatusButtonPaging(pageTotal) {
        //debugger
        var next = $('.master-table .arrow-right-single');
        var nextAll = $('.master-table .arrow-right-double');
        var prev = $('.master-table .arrow-left-single')
        var prevAll = $('.master-table .arrow-left-double');
        var pageNumber = $('.master-table input[name="PageNumber"]');
        //debugger
        if (+pageNumber.val() <= 1) {
            prev.prop("disabled", true);
            prevAll.prop("disabled", true);
        }

        else {
            prev.prop("disabled", false);
            prevAll.prop("disabled", false);
        }

        if (+pageNumber.val() >= pageTotal) {
            next.prop("disabled", true);
            nextAll.prop("disabled", true);
        }
        else {
            next.prop("disabled", false);
            nextAll.prop("disabled", false);
        }
    }
    //Gọi api load chi tiết phiếu xuất kho
    onloadDataRefDetail() {
        //debugger
        var refID = $('div.table-container #outward-table tr.row-selected').data('refID');
        var url = "/outwards/products/" + refID;
        if (refID == undefined) {
            return 0;
        } else {
            var preloader =
                '<div class="preloader" id="outward-loader"> \
            <div class="loader-container"> \
                <img src="/Contents/images/loading1.gif" /> \
                <div>Đang lấy dữ liệu...</div> \
            </div> \
        </div>';
            $('.table-detail').prepend(preloader);
            ajaxAPI(url, "GET", '', this.binDataRefDetail.bind(this), this.notifyError, true);
        }


    }
    //Bind dữ liệu lên table detail
    binDataRefDetail(listRefDetail) {
        //debugger
        var tbody = $('#outward-table-detail tbody');
        tbody.html('');
        var data = listRefDetail;
        if (listRefDetail.length != 0) {
            $.each(data, function (index, item) {
                item.Amount = FormatCurrency(item.Amount);
                item.UnitPrice = FormatCurrency(item.UnitPrice);
                var rowHTML = $(`<tr></tr>`);
                rowHTML.data("ID", item.RefInwardID);
                var rowData = `<td>${item.SKUCode}</td>
                           <td>${item.IventoryItemName}</td>
                           <td>${item.StockName}</td>
                           <td>${item.UnitName}</td>
                           <td>${item.UnitPrice}</td>
                           <td>${item.Quantity}</td>
                           <td>${item.Amount}</td>`
                rowHTML.html(rowData);
                tbody.append(rowHTML);
            });

        }
        if (listRefDetail == undefined) {
            if ($('#outward-loader'))
                $('#outward-loader').remove();
            return 0;
        }

        if ($('#outward-loader'))
            $('#outward-loader').remove();


    }
    //Bind dữ liệu lên table hàng hóa trong dialog
    binDataRefDetailTodialog(listRefDetail) {
        //debugger
        var form = $('#dialogform');
        var tbody = form.find('#form-add-detail tbody.tbodyData');
        tbody.html('');
        listRefDetail.forEach(function (item, index) {
            //Format dữ liệu
            item.UnitPrice = FormatCurrency(item.UnitPrice);
            item.Amount = FormatCurrency(item.Amount);
            var rowHTML = $(`<tr class="product"></tr>`);
            rowHTML.data("ID", item.InventoryItemID);
            //debugger
            var rowData =
                `<td>${item.SKUCode}</td>
                <td>${item.IventoryItemName}</td>
                <td>${item.StockName}</td>
                <td>${item.UnitName}</td>
                <td>
                    <input type="string" name="UnitPrice" value="${item.UnitPrice}"/>
                </td>
                <td>
                    <input type="number" name="Quantity" value="${item.Quantity}" min="0" max="999"/>
                </td>
                <td>${item.Amount}</td>
                <td><button class="delete-icon"></button></td>`;
            rowHTML.html(rowData);
            tbody.append(rowHTML);

        })
        tbody.append(`<tr style="height: 100%"><td colspan="8"></td></tr>`);
        this.UpdateSummaryRow();
        if (currentState == "view") {
            this.disableFieldWhenViewVoucher();
            $('#form-add-detail').addClass('disabeled');
        }


    }

    //Hàm resize column table
    //Created by: PMDUC (28/05/2019)
    resize_column() {
        $.each($(".master-table table th.table-resizeable"), function (index, value) {
            $(value).resizable({
                handles: "e",
                helper: "resize",
                maxWidth: $(value).attr("maxWidth"),
                minWidth: $(value).attr("minWidth")
            })
        });
    }
    //Hàm resize table theo chiều dọc
    //Created by: PMDUC (28/05/2019)
    resize_table() {
        $(".master-table.resizable-s").resizable({
            handles: "s",
            maxHeight: 600
        });
    }
    //Hàm xử lí validate input form
    //Created by: PMDUC (30/05/2019)
    validateInputForm(element, isValidate, warningTitle) {

        $(element).on('change keyup', function (e) {
            var currentVal = $(this).val();
            if ($(this).val() == '') {
                $(this).addClass("warning");
                $(this).parent().nextAll('.icon-exclamation').prop('title', 'Trường này không được để trống').show().tooltip({
                    tooltipClass: 'tooltip-warning',
                });
            }
            //Nếu sai định dạng
            else if (!isValidate(currentVal)) {
                $(this).addClass("warning");
                $(this).parent().nextAll('.icon-exclamation').prop('title', warningTitle).show().tooltip({
                    tooltipClass: 'tooltip-warning',
                });
            }
            else {
                $(this).removeClass("warning");
                //$(this).parent('.input-container').css('border-color', '#8fb0e7');
                $(this).parent().nextAll('.icon-exclamation').hide();
            }
            e.stopImmediatePropagation();

        });


    }
    //Hàm xử lí họn thời gian ở form dialog
    //Created by: PMDUC(15/06/2019)
    timepicker() {
        $('.timepicker').timepicker({
            'timeFormat': 'H:i'
        });

        $(document).on('click', '.icon-time', function () {
            $('.timepicker').timepicker('show');
        });
    }
    //focusInput() {
    //    $(document).on('focus', 'input').css('border-color', '#8fb0e7');
    //}

    validate() {
        this.validateInputForm(voucherCodeInput, a => true, '');
        this.validateInputForm(dateOutwardInput, isDateFormatddmmyyyy, 'Định dạng ngày tháng không hợp lệ. Vui lòng nhập đúng định dạng dd/mm/yyyy');
        this.validateInputForm(timeOutwardInput, isTimeFormathhmm, 'Định dạng thời gian không hợp lệ. Vui lòng nhập đúng định dạng hh:mm');
    }


    //Hàm mở dialog thêm mới phiếu xuất kho
    onAddOutward() {
        currentState = 'add';
        var url = '/outwards/newOutwardRefNo';
        var data = {
            prefix: "XK"
        }
        ajaxAPI(url, 'GET', data, this.onbindNewVoucherCode.bind(this), this.notifyError, true);

    }
    //Nếu lấy dữ liệu thành công bind dữa liệu vào dialog
    //dữ liệu là mã nhà cung cấp mới
    onbindNewVoucherCode(newOutwardRefNo) {
        //debugger
        if (currentState == 'add') {
            $("div#dialogform .txt-form-outward").val("");
            $("div#dialogform #txtVoucherCode").val(newOutwardRefNo);
            $('#dialogform').dialog('option', 'title', 'Thêm phiếu xuất kho');
            dateOutwardInput.val(date.formatddMMyyyy());
            timeOutwardInput.val(date.formatHHmm());
            this.outwardDialog.open();
        } else if (currentState == 'duplicate') {
            $("div#dialogform #txtVoucherCode").val(newOutwardRefNo);
            dateOutwardInput.val(date.formatddMMyyyy());
            timeOutwardInput.val(date.formatHHmm());
        }

        //else {
        //    alert("Lỗi");
        //}

    }

    onClickSelectProduct() {
        debugger
        this.openDialogSelectProduct();
        var url = '/outwards/itemcategory';
        ajaxAPI(url, "GET", '', this.bindListInventoryItemCategory.bind(this), this.notifyError, true);

    }
    /**
     * bind dữ liệu danh sách nhóm hàng hóa
     * @param {any} listInventoryItemCategory list nhóm hàng hóa trả về từ server
     */
    bindListInventoryItemCategory(listInventoryItemCategory) {
        var select = $('#dialogSelectProduct select[field-data="InventoryItemCategoryID"]');
        listInventoryItemCategory.forEach(function (inventoryItemCategory) {
            var optionHTML = `<option value="${inventoryItemCategory.InventoryItemCategoryID}">${inventoryItemCategory.ItemCategoryName}</option>`;
            select.append(optionHTML);
        })
        this.GetListInventoryItem();
    }
    //Lấy danh sách hàng hóa theo ID nhóm hàng hóa
    GetListInventoryItem() {
        var url = '/outwards/item';
        var InventoryItemCategoryID = $('#dialogSelectProduct select[field-data="InventoryItemCategoryID"]').val();
        var filterSearch = $('#dialogSelectProduct input[name="filterSearch"]').val();
        var data = {
            InventoryItemCategoryID: InventoryItemCategoryID,
            filterSearch: filterSearch
        }
        ajaxAPI(url, 'GET', data, this.bindListInventoryItem, this.notifyError, true);
    }
    //bind dữ liệu danh sách hàng hóa
    bindListInventoryItem(listInventoryItem) {
        var table = $('#table-select-product');
        var tbody = table.find('tbody').first();
        tbody.html('');
        listInventoryItem.forEach(function (item) {
            var rowParent = $(`<tr class="row-product product-parent"></tr>`).data("ID", item.InventoryItemID);
            var rowParentData =
                `<td>
                    <div class="flex-center">
                        <button class="parent-tree icon-plus"></button>
                        <label class="misa-checkbox">
                            <input type="checkbox" name="cbRowParent" value="" />
                            <span class="checkbox-square"></span>
                        </label>
                        <div class="product-code">${item.SKUCode}</div>
                        <div class="number-child">${item.InventoryItemDetails.length}</div>
                    </div>
                </td>
                <td>${item.IventoryItemName}</td>
                <td>${item.ItemCategoryName}</td>
                <td>${item.UnitName}</td>`;
            rowParent.html(rowParentData);
            tbody.append(rowParent);
            //
            var childContainer = $(`<tr class="row-child-container" style="display:none;">
                                        <td colspan="4">
                                            <table></table>
                                        </td>
                                    </tr>`);
            item.InventoryItemDetails.forEach(function (invenItem) {
                var tableChild = childContainer.find('table')
                var rowChild = $(`<tr class="row-product product-child" ></tr>`).data("ID", invenItem.InventoryItemID);
                var rowChildData =
                    `<td>
                    <div class="flex-center">
                        <label class="misa-checkbox">
                            <input type="checkbox" name="cbRowChild" value="" />
                            <span class="checkbox-square"></span>
                        </label>
                        <div class="product-code">${invenItem.SKUCode}</div>
                        
                    </div>
                </td>
                <td>${invenItem.IventoryItemName}</td>
                <td>${invenItem.ItemCategoryName}</td>
                <td>${invenItem.UnitName}</td>`;
                rowChild.html(rowChildData);
                tableChild.append(rowChild);
            })
            tbody.append(childContainer);
        })
        tbody.append(`<tr class="row-template">
                            <td colspan="4"></td>
                        </tr>`);


    }

    //Lấy danh sách hàng hóa được chọn ở dialog chọn hàng hóa
    GetListInventoryItemFromDialogSelectProducts() {
        debugger
        var listSelectedItem = [];
        var listRowParent = $('#table-select-product').find('tr.product-parent');

        $.each(listRowParent, function (index, rowParent) {
            if (isCheckedRow(rowParent)) {
                var inventoryItem = {};
                inventoryItem.InventoryItemID = $(rowParent).data("ID");
                inventoryItem.InventoryItemDetails = [];

                var listRowChild = $(rowParent).next('tr.row-child-container').find('tr.product-child');

                $.each(listRowChild, function (index, rowChild) {
                    if (isCheckedRow(rowChild)) {
                        inventoryItem.InventoryItemDetails.push($(rowChild).data("ID"));
                    }
                })

                listSelectedItem.push(inventoryItem);
            }
        })

        return listSelectedItem;


        /**
         * Kiểm tra trường có có chọn hay không
         * @param {any} row
         */
        function isCheckedRow(row) {
            var input = $(row).find('input[type="checkbox"]')
            var isChecked = input.is(":checked") || input.hasClass('check-parent');
            return isChecked;
        }

    }
    //Gọi api lấy thông tin những hàng hóa được chọn 

    bindListSelectItemToDialogConfirm(inventoryItemID) {
        var self = this;
        var url = '/outwards/item/' + inventoryItemID;
        ajaxAPI(url, 'GET', '', self.binDataListSelectItemToDialogConfirm, self.notifyError, true);
    }
    //bind dữ liệu iventoryitemdetail
    bindListChildSelectItemToDialogConfirm(itemDetail) {
        var self = this;
        var url = '/outwards/item/' + itemDetail;
        ajaxAPI(url, 'GET', '', self.bindDataListChildSelectItemToDialogConfirm, self.notifyError, true)
    }
    //Bind dữ liệu hàng hóa vào dialog xác nhận hàng hóa
    binDataListSelectItemToDialogConfirm(inventoryItem) {
        debugger
        var tbody = $('#table-confirm-product').find('tbody').first();
        //tbody.html('');
        var rowParent = $(`<tr class="row-product product-parent"></tr>`).data("ID", inventoryItem.InventoryItemID);
        var rowParentData =
            `<td>
                    <div class="flex-center">
                        <div class="parent-tree icon-minus"></div>
                        <div class="product-code">${inventoryItem.SKUCode}</div>
                    </div>
                </td>
                <td>${inventoryItem.IventoryItemName}</td>
                <td>${inventoryItem.ItemCategoryName}</td>
                <td>${inventoryItem.UnitName}</td>
                <td>
                    <div class="flex-center">
                        <button class="delete-icon"></button>
                    </div>
                </td>`;
        rowParent.append(rowParentData);
        tbody.append(rowParent);

    }
    //bindata dữ liệu hàng hóa chi tiết
    bindDataListChildSelectItemToDialogConfirm(inventoryItem) {
        var tbody = $('#table-confirm-product').find('tbody').first();
        var rowChildContainer = $(`<tr class="row-child-container"><td colspan="5"><table></table></td></tr>`);
        var tableChild = rowChildContainer.find('table');
        var rowChild = $(`<tr class="row-product product-child"></tr>`).data("ID", inventoryItem.InventoryItemID);
        var rowChildData =
            `<td>
                        <div class="flex-center">
                            <div class="product-code">${inventoryItem.SKUCode}</div>
                        </div>
                    </td>
                    <td>${inventoryItem.IventoryItemName}</td>
                    <td>${inventoryItem.ItemCategoryName}</td>
                    <td>${inventoryItem.UnitName}</td>
                    <td>
                        <div class="flex-center">
                            <button class="delete-icon"></button>
                        </div>
                    </td>`;
        rowChild.append(rowChildData);
        tableChild.append(rowChild);
        tbody.append(rowChildContainer);
    }

    //Lấy dữ liệu và hiển thị lên bảng khi click dropdown
    onViewObject() {
        //debugger
        currentState = "viewobj";
        this.onSelectObject();
        this.viewObject();

    }
    //Lấy dữ liệu và hiển thị lên dialog chọn đối tượng khi click tìm kiếm
    onViewSelectObject() {
        currentState = "selectobj";
        this.onOpenDialogSelectObject();
        this.onSelectObject();

    }

    //Hàm gọi api lấy dữ liệu đối tượng
    //Created by: PMDUC (21/06/2019)
    onSelectObject() {
        debugger
        var objectType = Number($('#dialogSelectObject select.objectType').val());
        var objectFilter = $('#dialogSelectObject input[name="objectFilter"]').val();
        var url = `/outwards/objects?objectType=${objectType}&objectFilter=${objectFilter}`;

        ajaxAPI(url, 'GET', '', this.onbindObject.bind(this), this.notifyError, true);
    }
    //Bind dữ liệu vào dialog chọn đối tượng và mở dialog
    //Created by: PMDUC(21/06/2019)
    onbindObject(listObject) {
        if (currentState == "selectobj") {
            var tbody = $('#table-select-object tbody');

            tbody.html('');
            var data = listObject;
            $.each(data, function (index, item) {
                var rowHTML = $(`<tr class="object-select"></tr>`);
                rowHTML.data("accountObjectID", item.AccountObjectID);
                rowHTML.data("objectType", item.ObjectType);
                var rowData =
                    `<td>
                    <label class="misa-radio">
                        <input type="radio" name="ckbRow-Object" value="" />
                        <span class="radio-circle"></span>
                    </label>
                </td>
                <td>${item.AccountObjectCode}</td>
                <td>${item.AccountObjectName}</td>
                <td>${item.ObjectTypeName}</td>
                <td>${item.AccountObjectAddress || ""}</td>`;

                rowHTML.html(rowData);
                tbody.append(rowHTML);

            });
        } else if (currentState == "viewobj") {
            var tbodyView = $('.show-Object tbody');
            tbodyView.html('');
            $.each(data, function (index, item) {
                var rowHTML = $(`<tr class="object-select"></tr>`);
                rowHTML.data("accountObjectID", item.AccountObjectID);
                rowHTML.data("objectType", item.ObjectType);
                var rowData =
                    `<td>${item.AccountObjectCode}</td>
                <td>${item.AccountObjectName}</td>
                <td>${item.ObjectTypeName}</td>`;

                rowHTML.html(rowData);
                tbodyView.append(rowHTML);
            });
        }

    }
    //Hàm lấy dữ liệu một đối tượng từ DB
    //Created by: PMDUC(21/06/2019)
    onSelectObjectByID() {

        var url = "/outwards/objects";
        var objectFormTable = $('#table-select-object');
        var rowSelected = objectFormTable.find('tr.row-selected');
        var accountObjectID = rowSelected.data("accountObjectID");
        var objectType = rowSelected.data("objectType");
        var data = {
            accountObjectID: accountObjectID,
            objectType: objectType
        }
        ajaxAPI(url, "GET", data, this.bindObjectToform.bind(this), this.notifyError, true);

    }
    //Hàm bind dữ liệu đối tượng vào form chính
    //Created by :PMDUC(21/06/2019)
    bindObjectToform(objectDetail) {
        var inputObjectCode = $('#dialogform input[name="AccountObjectCode"]');
        var inputObjectName = $('#dialogform input[name="AccountObjectName"]');
        inputObjectCode.val(objectDetail.AccountObjectCode);
        inputObjectName.val(objectDetail.AccountObjectName);
        inputObjectCode.data('accountObjectID', objectDetail.AccountObjectID);
        inputObjectCode.data('objectType', objectDetail.ObjectType);
        this.dialogSelectObject.Dialog.dialog("close");
    }

    //Lấy dữ liệu từ form dialog
    getDataFormOutward() {
        debugger
        var outward = {};
        var dataInput = $("#dialogform div.row-container input[name]");
        var totalMoney = $('div.sumdialog .totalMoney');
        var inputObjectCode = $('#dialogform input[name="AccountObjectCode"]');
        var accountObjectID = inputObjectCode.data('accountObjectID');
        var objectType = inputObjectCode.data('objectType');
        outward[$('#dialogform input[name="AccountObjectCode"]').attr('field-data')] = accountObjectID;
        outward[$('#dialogform input[name="AccountObjectCode"]').attr('field-type')] = objectType;
        outward[$(totalMoney).attr('name')] = $(totalMoney).val();
        $.each(dataInput, function (index, item) {
            if ($(item).attr('data-type') == 'date') {
                var date = $(item).datepicker('getDate');
                outward[$(item).attr('name')] = date.formatMMddyyyy();
            } else if ($(item).attr('name') == 'rdtypeVoucher') {
                if ($('#other').is(":checked")) {
                    var refType = 13;
                    outward[$(item).attr('field-data')] = refType;
                }
                else {
                    var refType = 12;
                    outward[$(item).attr('field-data')] = refType;
                }
            } else
                outward[$(item).attr('name')] = $(item).val();

        });
        return outward;
    }
    //Lưu thông tin phiếu xuất kho lên serve
    saveOutward() {
        //debugger
        this.validate();
        if (currentState == 'edit') {
            this.editOutward.apply(this);
        } else if (currentState == 'add') {
            var url = '/outwards/checkDuplicateCode/' + $('#txtVoucherCode').val();
            ajaxAPI(url, 'GET', '', this.checkDuplicateVoucherCode.bind(this), this.notifyError, true);
        } else if (currentState == 'duplicate') {
            var url = '/outwards/checkDuplicateCode/' + $('#txtVoucherCode').val();
            ajaxAPI(url, 'GET', '', this.checkDuplicateVoucherCode.bind(this), this.notifyError, true);
        }



    }
    //Check trùng số phiếu xuất 
    checkDuplicateVoucherCode(result) {

        if (result <= 0) {
            if (currentState == 'add' || currentState == 'duplicate') {
                this.addOutward.apply(this);
            } else if (currentState == 'edit') {
                this.editOutward.apply(this);
            }
        }
        else {
            $('div.dialog-confirm .icon-container img').attr('src', "/Contents/images/icon-popup.png");
            $('#frmWarnings .content-container').html("Mã thẻ đã bị trùng vui lòng kiểm tra lại");
            $('#frmWarnings').dialog('option', 'title', 'MShopKeeper');
            this.warningDialog.open();

        }


    }

    //Lấy dữ liệu phiếu xuất kho từ form gửi lên server

    addOutward() {
        var outward = this.getDataFormOutward();
        var url = '/outwards/new';
        ajaxAPI(url, 'POST', JSON.stringify(outward), this.saveOutwardCallback.bind(this), this.notifyError, true, 'application/json; charset=utf-8');
    }

    //Gọi lại khi lưu outward thành công
    saveOutwardCallback() {
        this.outwardDialog.close();
        this.loadData();
        console.log("Thêm thành công");

    }
    //Hàm xử lí khi click vào button Edit
    //Created by: PMDUC
    onClickEditOutward() {
        //debugger
        this.onEditOutward();
        this.getRefOutwardDetail();
        this.onOpenDialogEdit();

    }
    //Hàm xử lí click nhân bản
    onClickDuplicateOutward() {
        //debugger
        currentState = 'duplicate';
        this.onClickViewOutward();
        this.onDuplicateOutward();
        $('#dialogform').dialog('option', 'title', 'Nhân bản xuất kho');
        $('#dialogform input').prop('disabled', false);
        this.outwardDialog.open();

    }
    //lấy mã phiếu xuất mới và thêm vào dialog
    onDuplicateOutward() {
        currentState = 'duplicate';
        var url = '/outwards/newOutwardRefNo';
        var data = {
            prefix: "XK"
        }
        ajaxAPI(url, 'GET', data, this.onbindNewVoucherCode.bind(this), this.notifyError, true);
    }
    // gọi api lấy dữ liệu chi tiết phiếu xuất kho và bind dữ liệu vào dialog
    getRefOutwardDetail() {
        //debugger
        var refID = $('div.table-container #outward-table tr.row-selected').data('refID');
        var url = "/outwards/products/" + refID;
        ajaxAPI(url, "GET", '', this.binDataRefDetailTodialog.bind(this), this.notifyError, true);
    }
    //Sửa phiếu xuất kho
    //Created By: PMDUC
    onEditOutward() {
        //debugger
        currentState = 'edit';
        var refID = $('div.table-container #outward-table tr.row-selected').data('refID');
        this.outwardDialog.Dialog.data('refID', refID);
        if (refID) {
            var url = '/outwards/' + refID;
            var data = {
                refID: refID
            }
            ajaxAPI(url, 'GET', data, this.onReceiveOutwardData.bind(this), this.notifyError, true);
        }


    }
    // Hàm xử lí khi click button view
    //Created by: PMDUC
    onClickViewOutward() {
        //debugger
        currentState = "view";
        var refID = $('div.table-container #outward-table tr.row-selected').data('refID');
        var url = '/outwards/' + refID;
        var data = {
            refID: refID
        }
        ajaxAPI(url, 'GET', data, this.onReceiveOutwardData.bind(this), this.notifyError, true);
        this.getRefOutwardDetail();
        this.disableFieldWhenViewVoucher();
        this.onOpenDialogView();

    }
    /**
     * Created by: PMDUC
     * Thêm dữ liệu vào dialog, Hiển thị dialog nếu có dữ liệu
     * @param {any} refOutward
     */
    onReceiveOutwardData(refOutward) {
        //debugger
        var inputObjectCode = $('#dialogform input[name="AccountObjectCode"]');
        if (refOutward != null) {
            var outward = refOutward;
            var dataName = $('#dialogform input[name]');
            var totalMoney = $('div.sumdialog .totalMoney');
            $(totalMoney).val(outward[$(totalMoney).attr('name')]);
            inputObjectCode.data('accountObjectID', refOutward.AccountObjectID);
            inputObjectCode.data('objectType', refOutward.ObjectType);
            $.each(dataName, function (index, element) {
                var dataType = $(element).attr('data-type');
                if (dataType == 'date') {
                    var date = new Date(outward[$(element).attr('name')]);
                    $(element).val(date.formatddMMyyyy());
                }
                else if (dataType == 'time') {
                    var date = new Date(refOutward.RefDate);
                    $(element).val(date.formatHHmm());
                }
                else {
                    var fieldName = $(element).attr('name');
                    $.each(outward, function (key, value) {
                        if (fieldName == key) {
                            $(element).val(value);
                        }
                        return;
                    })

                }

            })

        }
    }

    editOutward() {
        //debugger
        var refID = this.outwardDialog.Dialog.data('refID');
        var outward = this.getDataFormOutward();
        var url = '/outwards/edit/' + refID;
        ajaxAPI(url, 'PUT', JSON.stringify(outward), this.saveOutwardCallback.bind(this), this.notifyError, true, 'application/json; charset=utf-8')
    }

    onDeleteOutward() {
        $('div.dialog-confirm .icon-container img').attr('src', "/Contents/images/icon-popup.png");
        $('#frmWarnings .content-container').html('Bạn có chắc chắn muốn xóa');
        $('#frmWarnings').dialog('option', 'title', 'MShopKeeper');
        this.warningDialog.open();
    }

    deleteOutward() {
        //debugger
        var refID = $('div.table-container #outward-table tr.row-selected').data('refID');
        var url = '/outwards/Delete/' + refID;
        ajaxAPI(url, 'DELETE', '', this.onDeleteCallback.bind(this), this.notifyError, true);
    }
    onDeleteCallback(result) {
        if (result != 0) {
            this.warningDialog.Dialog.dialog('close');
            this.loadData();
        }
    }
    checkChangeOutwardData(event) {
        event.preventDefault();
        this.dialogConfirmClose.Dialog.dialog('open');
    }

    notifyError() {
        console.log("lỗi");
    }
    // Xử lí update hàng summary

    UpdateSummaryRow() {
        //debugger
        var table = $('#form-add-detail');
        var summaryRow = table.children('tfoot');
        var totalQuantityRow = summaryRow.find('.total-quantity');
        var totalAmountRow = summaryRow.find('.total-amount');
        var totalRow = summaryRow.find('.number-row');
        var totalQuantity = 0;
        var totalAmount = 0;
        var numberRow = 0;
        var listQuantity = table.find('input[name="Quantity"]');
        var listAmount = table.find('tr.product td:nth-child(7)');

        $.each(listQuantity, function (index, item) {
            totalQuantity += Number($(item).val());
        })
        $.each(listAmount, function (index, item) {
            totalAmount += CurencyToNumber($(item).html());
        })
        numberRow = table.find('tr.product').length;

        totalRow.html(`Số dòng = ${numberRow}`);
        totalAmountRow.html(FormatCurrency(totalAmount));
        totalQuantityRow.html(totalQuantity);

    }
    /**
     * Xử lý hàng tổng kết table chính
     * */
    setSummaryRow() {
        $(document).ready(function () {
            UpdateSummaryWitdhCol();
        })
        $(document).ajaxComplete(function () {
            UpdateSummaryWitdhCol();
        })
        $(window).resize(function () {
            UpdateSummaryWitdhCol();
        });
        $(document).on('layoutresize', function () {
            UpdateSummaryWitdhCol();
        })
        /**Hàm đồng nhất độ rộng các cột của element .summary với độ rộng các cột trong bảng master */
        //CreadtedBy: NDCong(03/05/2019)
        function UpdateSummaryWitdhCol() {
            var numbercol = $('.summary div').length;
            for (var i = 0; i < numbercol; i++) {
                //Lấy độ rộng của cột thead
                var widthcol = $($('.table-container table thead tr:first-child th')[i]).css("width");
                //Set độ rộng cột tương ứng
                var colfoot = $('.summary div:nth-child(' + (i + 1) + ')')
                colfoot.css("width", (i == 0) ? (+(widthcol.replace('px', '')) - (-1)) : widthcol);
            }
        }
    }
    /**
 * Disable các trường nhập dữ liệu vì người dùng chỉ có thể xem mà không sửa được
 * */
    disableFieldWhenViewVoucher() {
        disableElement('#dialogform input');
        /**
         * disable element
         * @param {string} element query selector của element
         */
        function disableElement(element) {
            $(element).prop('disabled', true);
        }
    }
    //
    setTableFixed() {
        $('#form-add-detail').tableHeadFixer({
            head: true,
            foot: true
        });
    }
    /**
 * Chọn hàng đầu tiên khi tải trang
 * */
    selectFirstRow() {
        //debugger
        var tbody = $('#outward-table tbody');
        var firstRow = tbody.find('tr:first-child');
        if (firstRow.length != 0) {
            firstRow.not('.row-selected').trigger('click');
        }
        else {
            $('.table-detail table tbody').html('');
        }
        //Bỏ checked ở checkroot nếu đang check
        $('#ckbRoot').prop('checked', false);
    }
    //Phân trang
    setPaging() {
        //debugger
        var next = $('.master-table .arrow-right-single');
        var nextAll = $('.master-table .arrow-right-double');
        var prev = $('.master-table .arrow-left-single')
        var prevAll = $('.master-table .arrow-left-double');
        var pageNumber = $('.master-table input[name="PageNumber"]');
        var pageTotal = Number($('.totalPage').html());
        var prevPageNumberValue = Number(pageNumber.val());

        $(document).on('changedata', function () {
            pageTotal = Number($('.show-option .totalPage').html());
        })

        next.on('click', function () {
            debugger
            var newValue = +(prevPageNumberValue) + 1;
            pageNumber.val(newValue);
            pageNumber.trigger('change');
        })

        nextAll.on('click', function () {
            var newValue = pageTotal;
            pageNumber.val(newValue);
            pageNumber.trigger('change');
        })

        prev.on("click", function () {
            debugger
            var newValue = +(prevPageNumberValue) - 1;
            pageNumber.val(newValue);
            pageNumber.trigger('change');
        })

        prevAll.on('click', function () {
            var newValue = 1;
            pageNumber.val(newValue);
            pageNumber.trigger('change');
        })
        $('.master-table .paging').on('change', function () {
            //debugger
            //Kiểm tra trang hiện tại có thỏa mãn hay không
            var valueOfPageNumber = +pageNumber.val();
            if (valueOfPageNumber > pageTotal || valueOfPageNumber < 1 || isNaN(valueOfPageNumber)) {

                pageNumber.val(prevPageNumberValue);
                return 0;
            }

            else {
                prevPageNumberValue = pageNumber.val();
            }

            //Nếu là chỉnh lại số dòng trong một trang thì quay lại trang thứ 1
            if (event.target.name == "NumberRow") {
                pageNumber.val(1);
                prevPageNumberValue = 1;
            }

            this.loadData();
        }.bind(this))
    }

    //open dialog chọn đối tượng
    onOpenDialogSelectObject() {
        this.dialogSelectObject.open();

    }
    //Hàm open dialog sửa phiếu xuất kho
    onOpenDialogEdit() {
        //debugger
        $('#dialogform').dialog('option', 'title', 'Sửa phiếu xuất kho');
        this.outwardDialog.open();
    }
    onOpenDialogView() {
        $('#dialogform').dialog('option', 'title', 'Xem phiếu xuất kho');
        this.outwardDialog.open();
    }
    onOpenDialogAdd() {
        this.outwardDialog.open();
    }
    //Hàm open Reload Data
    onReloadData() {
        this.loadData();
    }
    //Mở dialogselectProducts
    openDialogSelectProduct() {
        this.dialogSelectProduct.open();
    }
    //Open dialogconfirmProducts
    onOpenDialogConfirmProduct() {
        this.dialogConfirmProduct.open();
    }


}
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
    //lấy ngày hôm nay
    toDayDefault() {
        var dd = new Date();
        var toDay = dd.formatddMMyyyy();
        this.bindDateForm(toDay, toDay);
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



var outwardjs = new outwardJS();

var filterDataJS = new FilterDataJS();