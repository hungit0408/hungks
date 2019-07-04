//đối tượng quản lý event các dialog
var eventDialog = new EventInwardDialog();

$(document).ready(function () {
    //gán các sự kiện cho trang
    inward.initEvent();
})

/**
 * Lớp quản lý trang nhập kho
 * CretedBy: NDCong(10/5/2019)
 * 
 * */
class Inward {
    constructor() {
        var that = this;

        //prop xác định thay đổi form chính
        this.changeForm = false;

        //button dialog chọn chứng từ
        this.buttonsDialogSelectVoucher = [
            {
                html: '<span class="button-icon"></span><span class="button-title">Chọn</span>',
                class: "one-button select",
                click: function () {
                    //debugger
                    var table = $('#table-select-voucher');
                    var refID = table.find('tr.row-selected').data("ID");
                    var storeTran = table.find('tr.row-selected').find('td:nth-child(4)').html();
                    $(this).dialog('close');
                    var promiseRef = that.GetRefDetail(refID, '#dialogform');
                    var promiseProductInRef = that.GetProductInRef(refID, '#dialogform');
                    Promise.all([promiseRef, promiseProductInRef])
                        .then(async function (value) {
                            var refDetail = value[0];
                            var productInRef = value[1];
                            //bind dữ liệu chứng từ vào form
                            that.bindRefDataToForm(refDetail, productInRef);
                            //Thêm diễn giải
                            $('#dialogform').find('input[field-data="Description"]').val(`Điều chuyển từ ${storeTran}`);
                            //bind dữ liệu hiện tại
                            that.bindCurrentInforToForm();
                            //bind số phiếu nhập mới
                            var newRefNo = await AjaxRequest(`/api/inward/new`, 'GET', '', '', '#dialogform');
                            $('#dialogform').find('input[field-data="RefNo"]').val(newRefNo);
                        })
                }
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
        //button cho dialog chọn đối tượng
        this.buttonsDialogSelectObject = [
            {
                html: '<span class="button-icon"></span ><span class="button-title">Chọn</span>',
                class: "one-button select",
                click: function () {
                    var objectFormTable = $('#table-select-object');
                    var rowSelected = objectFormTable.find('tr.row-selected');
                    var objectType = rowSelected.data("type");
                    var acountObjectID = rowSelected.data("ID");
                    that.bindObjectSelectedToMainFormByID(objectType, acountObjectID);
                    $(this).dialog('close');
                }
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
        //button cho dialog chọn hàng hóa
        this.buttonsDialogSelectProduct = [
            {
                html: '<span class="button-icon"></span ><span class="button-title">Chọn</span>',
                class: "one-button select",
                click: function () {
                    //bind hàng hóa đã chọn vào table xem hàng hóa đã chọn
                    var listSelectedItem = that.getListSelectedItemOnFormSelectProduct();
                    if (listSelectedItem.length > 0) {
                        that.dialogConfirmProduct.Open();
                        that.bindListSelectedItemToFormConfirm(listSelectedItem);
                    }
                    else {
                        var dialogConfirm = new Dialog('#dialogConfirm', 'MShopKeeper', 400, 160, that.buttonsConfirm, eventDialog.EventDialogConfirm("Bạn chưa chọn hàng hóa nào"));
                        dialogConfirm.Open();
                    }
                }
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
        //button cho dialog xem hàng hóa đã chọn
        this.buttonsConfirmProductDialog = [
            {
                html: '<span class="button-icon"></span ><span class="button-title">Chọn</span>',
                class: "one-button select",
                click: function () {

                    var listInventoryItemID = that.getListInventoryItemIDOnFormConfirmProduct();
                    if (listInventoryItemID.length > 0) {
                        that.bindListInventoryToTabeFormAdd(listInventoryItemID);
                        $(this).dialog('close');
                        that.dialogSelectProduct.Close();
                    }
                    else {
                        var dialogConfirm = new Dialog('#dialogConfirm', 'MShopKeeper', 400, 160, that.buttonsConfirm, eventDialog.EventDialogConfirm("Bạn chưa chọn hàng hóa nào"));
                        dialogConfirm.Open();
                    }
                }
            },
            {
                html: '<span class="button-icon"></span ><span class="button-title">Quay lại</span>',
                class: "one-button back",
                click: function () {
                    that.clearSelectedItemOnFormSelectProduct();
                    $(this).dialog('close');
                }
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
        //button dialog xác nhận xóa chứng từ
        this.buttonsDialogConfirmDelete = [
            {
                html: '<span class="button-icon"></span ><span class="button-title">Xóa</span>',
                class: "one-button delete",
                click: function () {
                    //debugger
                    inward.DeleteVoucher();
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

        //button dialog xác nhận đóng form
        this.buttonsDialogConfirmClose = [
            {
                html: '<span class="button-icon"></span ><span class="button-title">Lưu</span>',
                class: "one-button save",
                click: function () {
                    $('#dialogform .form-button-save').trigger('click');
                    //that.dialogForm.Close();
                    that.changeForm = false;
                    $(this).dialog('close');

                }
            },
            {
                html: '<span class="button-icon"></span ><span class="button-title">Không lưu</span>',
                class: "one-button not-save",
                click: function () {
                    that.changeForm = false;
                    that.dialogForm.Close();
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
        this.buttonsConfirmGetNewRefNo = [
            {
                html: '<span class="button-title">Có</span>',
                class: "one-button save",
                click: async function () {
                    var newRefNo = await AjaxRequest(`/api/inward/new`, 'GET', '', '', '#dialogform');
                    $('#dialogform').find('input[field-data="RefNo"]').val(newRefNo);
                    $(this).dialog('close');
                }
            },
            {
                html: '<span class="button-title">Không</span>',
                class: "one-button save",
                click: function () {
                    $(this).dialog('close');
                }
            },
        ];

        this.buttonsConfirmReturnOldRefNo = [
            {
                html: '<span class="button-title">Có</span>',
                class: "one-button save",
                click: function () {
                    var oldRefNo = $('#dialogform').find('input[field-data="RefNo"]').data("oldRefNo");
                    $('#dialogform').find('input[field-data="RefNo"]').val(oldRefNo);
                    $(this).dialog('close');
                }
            },
            {
                html: '<span class="button-title">Không</span>',
                class: "one-button save",
                click: function () {
                    $(this).dialog('close');
                }
            },
        ]

        this.buttonsConfirm = [
            {
                html: '<span class="button-title">OK</span>',
                class: "one-button save",
                click: async function () {
                    $(this).dialog('close');
                }
            }
        ]

        //Khai báo các dialog
        this.dialogForm = new Dialog('#dialogform', 'Thêm phiếu nhập kho', 960, 600, {}, eventDialog.EventDialogAdd(), this.handleBeforeCloseMainForm.bind(this));
        this.dialogSelectVoucher = new Dialog('#dialgoSelectVoucher', "Chọn chứng từ nhập kho điều chuyển", 800, 500, this.buttonsDialogSelectVoucher);
        this.dialogSelectObject = new Dialog('#dialogSelectObject', "Chọn đối tượng", 650, 400, this.buttonsDialogSelectObject);
        this.dialogSelectProduct = new Dialog('#dialogSelectProduct', "Chọn hàng hóa", 900, 600, this.buttonsDialogSelectProduct, eventDialog.EventDialogSelectProduct);
        this.dialogConfirmProduct = new Dialog('#dialogConfirmProduct', "Hàng hóa đã chọn", 900, 600, this.buttonsConfirmProductDialog, eventDialog.EventDialogConfirmProduct);
        this.dialogConfirmDelete = new Dialog('#dialogConfirmDelete', "Xóa dữ liệu", 400, 160, this.buttonsDialogConfirmDelete, eventDialog.EventDialogConfirmDelete);
        this.dialogConfirmClose = new Dialog('#dialogConfirmClose', "MShopkeeper", 400, 160, this.buttonsDialogConfirmClose);
        //Custom tilte của dialog xem hàng hóa đã chọn
        $('div[aria-describedby="dialogConfirmProduct"]').find('.ui-dialog-title').prepend('<span class="icon-back"></span>');
        //Khai báo đối tượng filter của dialog chọn chứng từ
        this.dialogSelectedVoucherFilter = new FilterDataJS('#dialgoSelectVoucher .dialog-filter-data');
        //Khai báo đối tượng timepicker
        this.timePicker = new TimePicker('#dialogform input[name="txtTimeInWard"]', 'button.icon-time');
    }
    /**
     * Hàm xử lý các sự kiện cho trang nhập kho
     * CreatedBy: NDCong(10/5/2019)
     * */
    initEvent() {
        //Xử lý các phím tắt
        this.setShortcutKey()
        //format input các trường cần thiết
        this.setInputFormat();
        //Phần tổng kết table chính
        this.setSummaryRow();
        //Set tooltip trang
        this.setToolTip();
        //Cập nhật trạng thái toolbar theo số lượng chứng từ được chọn
        this.setStatusToolbarButton();
        //Lấy các phiếu nhập kho
        this.GetListVoucher();
        //Khi thay đổi các trường filter lấy dữ liệu
        this.onChangeConditionGet();
        //Phân trang
        this.setPaging();
        //Chọn chứng từ đầu tiên
        this.selectFirstRow();
        //Hiện thị hàng hóa ở table detail khi chọn chứng từ
        this.ShowRefProductWhenSelectVoucher();
        //Xử lý khi người dùng muốn xem chứng từ
        this.onViewRef();
        //Phần menu chuột phải
        this.setRightClickMenu();
        //Nạp lại chứng từ
        this.reloadVoucher();
        //Xử lý khi người dùng click phím thêm
        this.onClickButtonAdd();
        //Xử lý khi người dùng click phím nhân bản
        this.onClickButtonDuplicate();
        //Xử lý khi người dùng click phím xem
        this.onClickButtonView();
        //Xử lý khi người dùng click phím sửa
        this.onClickButtonEdit();
        //Xử lý khi người dùng click phím xóa
        this.onClickButtonDelete();
        //Xử lý autoComplete trong form chính
        this.setAutoComplete();
        //Xử lý khi người dùng click phím lưu trong form chính
        this.onSubmitForm();
        //Set mở form
        this.setFormOpen();
        // Set đóng form
        this.setFormClose();

        resizeElementsWithResizeBar('.dragbar', '.table-master', '.table-detail');
    }
    /**
     * Hàm lấy tất cả các phiếu nhập hàng từ server
     * CreatedBy: NDCong(16/05/2019)
     * Modifield: NDCong(20/5/2019) thêm chức năng filter
     * */
    GetListVoucher() {
        //debugger
        var self = this;
        //Khởi tạo đối tượng chứa điều kiện lấy dữ liệu
        var refCondition = {};
        try {
            refCondition.PageNumber = Number($('input[name="PageNumber"]').val());
            refCondition.NumberRow = Number($('select[name="NumberRow"]').val());
            refCondition.DateFrom = $('#startDate').val().formatMMddyyy();
            refCondition.DateTo = $('#endDate').val().formatMMddyyy();
            refCondition.RefDate = $('input[field-data="RefDate"]').val().formatMMddyyy();
            refCondition.RefNo = $('input[field-data="RefNo"]').val();
            refCondition.AccountObjectName = $('input[field-data="AccountObjectName"]').val();
            refCondition.TotalAmount = CurencyToNumber($('input[field-data="TotalAmount"]').val());
            refCondition.CompareTotalAmountType = $('select[field-data="CompareTotalAmountType"]').val();
            refCondition.Description = $('input[field-data="Description"]').val();
            refCondition.RefType = $('select[field-data="RefType"]').val();

            Object.keys(refCondition).forEach(function (item) {
                if (refCondition[item] == '') {
                    refCondition[item] = undefined;
                }
            });
            var url = (`/api/inward/get`);
            //Gọi service lấy dữ liệu
            AjaxRequest(url, "POST", refCondition, function (listRef) {
                //debugger
                self.bindRefDatafToTableMaster(listRef);
                self.selectFirstRow();
                $(document).trigger('changedata');
            }, '.table-master tbody');
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * Thêm phiếu nhập kho 
     * CreatedBy: NDCong(22/6/2019)
     * ModifieldBy: NDCong(25/6/2019) thêm chức năng kiểm tra số phiếu có trùng không
     */
    async AddVoucher() {
        //debugger
        var self = this;
        var ref = {};
        var productInRef = [];
        //lấy dữ liệu trong form
        ref = self.GetRefDetailFromForm();
        //lấy thông tin chi tiết phiếu
        productInRef = self.GetProductInRefFromForm();

        //built thành một object
        ref.RefDetails = productInRef;

        //Gọi service kiểm tra xem có trùng mã phiếu không
        var isDuplicateRefNo = await AjaxRequest(`/api/inward/duplicate/${ref.RefNo}`, 'POST', '', '', '#dialogform');
        if (isDuplicateRefNo) {
            var dialogConfirmGetNewRefNo = new Dialog('#dialogConfirm', 'MShopKeeper', 400, 160, self.buttonsConfirmGetNewRefNo, eventDialog.EventDialogConfirmGetNewRefNo());
            dialogConfirmGetNewRefNo.Open();

            return false;
        }

        //gọi service thêm chứng từ và load lại dữ liệu
        var newRefID = await AjaxRequest(`/api/inward`, 'POST', ref, '', '.table-master');
        return newRefID;
    }
    /**
     * Xóa chứng từ nhập kho
     * CreatedBy: NDCong(17/6/2019)
     */
    DeleteVoucher() {
        //debugger
        var self = this;
        var refIDArray = self.GetArrayRefIdOfRowSelected();
        var promiseArray = [];
        refIDArray.forEach(function (refID, index) {
            var url = `/api/inward/${refID}`;
            var promise = AjaxRequest(url, 'DELETE', {}, '', '.table-master');
            promiseArray.push(promise);
        })
        Promise.all(promiseArray)
            .then(function () {
                self.GetListVoucher();
            })
            .catch(function () {
                toastr.error("Không tìm thấy phiếu được chọn!");
            })

    }
    /**
     * Sửa phiếu nhập kho
     * CreatedBy: NDCong(26/6/2019)
     * Đang thực hiện
     * */
    async EditVoucher() {
        var self = this;
        var ref = {};
        var productInRef = [];
        try {
            var newRefNo = $('#dialogform').find('input[field-data="RefNo"]').val();
            var oldRefNo = $('#dialogform').find('input[field-data="RefNo"]').data('oldRefNo');
            if (newRefNo != oldRefNo) {
                var isDuplicateRefNo = await AjaxRequest(`/api/inward/duplicate/${newRefNo}`, 'POST', '', '', '#dialogform');
                if (isDuplicateRefNo) {
                    //mở form xác nhận quay lại số phiếu cũ
                    var dialogConfirm = new Dialog('#dialogConfirm', 'MShopKeeper', 400, 160, self.buttonsConfirmReturnOldRefNo,
                        eventDialog.EventDialogConfirm(`Số phiếu nhập ${newRefNo} đã tồn tại. Bạn có muốn quay lại số phiếu nhập cũ không?`));
                    dialogConfirm.Open();
                    return false;
                }
            }
            //Lấy thông tin phiếu
            ref = self.GetRefDetailFromForm();
            //lấy thông tin chi tiết phiếu
            productInRef = self.GetProductInRefFromForm();

            //built thành một object
            ref.RefDetails = productInRef;
        }
        catch (e) {
            console.error(e);
        }

        //Gọi sevice sửa phiếu nhập kho
        var result = await AjaxRequest(`/api/inward/${ref.RefID}`, 'PUT', ref, '', '.table-master');
        return result;
    }


    /**
     * Set css cho tooltip của trang
     * CreatedBy: NDCong
     * */
    setToolTip() {
        try {
            $('.misa-toolbar').tooltip({
                classes: {
                    "ui-tooltip": "tooltip-default"
                }
            })
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Lấy ID của chứng từ được chọn
     * Chỉ trả về một ID đầu tiên nếu có nhiều chứng từ được chọn
     * CreatedBy: NDCong(10/6/2019)
     * */
    GetRefIdOfRowSelected() {
        try {
            var tbody = $('#inwardtable tbody');
            var rowSelected = tbody.find('.row-selected').first();
            var refID = rowSelected.data('ID');
            return refID;
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Lấy thông tin các chi tiết chứng từ có trong form và trả về mảng đối tượng chi tiết chứng từ
     * CreatedBy: NDCong(22/6/2019)
     * */
    GetProductInRefFromForm() {
        try {
            var productsInRef = [];
            //debugger
            var listProductRow = $('#form-add-detail').find('tr.product');

            $.each(listProductRow, function (index, productRow) {
                var refDetail = {};
                refDetail.RefID = $('#dialogform').data("ID");
                //dựng thành các đối tượng chi tiết phiếu
                refDetail.InventoryItemID = $(productRow).data("ID");
                refDetail.Quantity = Number($(productRow).find('input[name="Quantity"]').val());
                refDetail.UnitPrice = CurencyToNumber($(productRow).find('input[name="UnitPrice"]').val());

                //Thêm vào mảng chi tiết phiếu
                productsInRef.push(refDetail);
            })

            return productsInRef;
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Lấy mảng ID của chứng từ được chọn
     * CreatedBy: NDCong(17/6/2019)
     * */
    GetArrayRefIdOfRowSelected() {
        try {
            var rowSelectedArray = $('#inwardtable .row-selected');
            var refIDArray = [];
            rowSelectedArray.each(function (index, item) {
                var refID = $(item).data('ID');
                refIDArray.push(refID);
            });
            return refIDArray;
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Cài đặt menu chuột phải
     * CreatedBy: NDCong(10/6/2019)
     * */
    setRightClickMenu() {
        try {
            var tbody = '#inwardtable tbody';
            var menu = $('.menu-rightclick');
            //Hàm xử lý chức năng chuột phải thì mở menu
            $(document).on('contextmenu', tbody, function (e) {
                //debugger
                e.preventDefault();
                var menuWidth = +(menu.css('width').replace('px', ''));
                var menuLeft = e.pageX;
                var menuTop = e.pageY;
                if (window.innerWidth < e.pageX + menuWidth) {
                    menuLeft = e.pageX - menuWidth;
                };
                $('.menu-rightclick').show().css({
                    top: menuTop + "px",
                    left: menuLeft + "px"
                });
            });
            //Ẩn menu chuột phải khi click chọn hoặc click ra ngoài
            $(document).on('click', function (e) {
                menu.hide();
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Xử lý sự kiện nạp chứng từ 
     * CreatedBy: NDCong(17/6/2019)
     * */
    reloadVoucher() {
        var self = this;
        $(document).on('click', '.toolbar-load', function () {
            self.GetListVoucher();
        })

        //Nếu button lấy dữ liệu được chọn
        $('.filter-data .startFilterData').on('click', function () {
            event.stopPropagation();
            // quay lại trang 1
            $('input[name="PageNumber"]').val(1);
            // lấy danh sách phiếu
            self.GetListVoucher();
        })
    }

    /**
     * Hiện thị chi tiết hàng hóa của chứng từ khi chọn chứng từ
     * CreatedBy: NDCong(17/6/2019)
     * */
    ShowRefProductWhenSelectVoucher() {
        var self = this;
        $('#inwardtable tbody').on('click', ' tr', async function () {
            //debugger
            var refID = self.GetRefIdOfRowSelected();
            if (refID == undefined) {
                return 0;
            }
            else {
                var refProduct = await self.GetProductInRef(refID, '.table-detail');
                self.bindRefProductToTableDetail(refProduct);
            }
        })
    }

    /**
     * Lấy thông tin của chứng từ 
     * CreatedBy: NDCong
     * @param {string} refID ID chứng từ
     * @param {string} elementModal selector của element chứa modal
     */
    GetRefDetail(refID, elementModal) {
        var refDetail = AjaxRequest(`/api/inward/${refID}`, 'GET', {}, '', elementModal);
        return refDetail;
    }

    /**
     * Lấy thông tin các hàng hóa trong phiếu
     * CreatedBy: NDCong
     * @param {any} refID ID phiếu cần lấy thông tin
     * @param {any} elementModal slector đến element chứa modal
     */
    GetProductInRef(refID, elementModal) {
        var refProduct = AjaxRequest(`/api/inward/product/${refID}`, 'GET', {}, '', elementModal);
        return refProduct;
    }

    /**
     * Lấy thông tin chứng từ ở form
     * trả về chứng từ ở dạng object
     * CreatedBy: NDCong(18/6/2019)
     * */
    GetRefDetailFromForm() {
        //debugger
        var ref = {};
        var form = $('#dialogform');
        ref.RefID = form.data("ID");
        var listInput = form.find('input');
        $.each(listInput, function (index, input) {
            //Lấy các thông tin
            var fieldName = $(input).attr('field-data');
            //lấy ID đối tượng và loại đối tượng
            if (fieldName == "AccountObjectCode") {
                ref.AccountObjectID = $(input).data("ID");
                ref.ObjectType = $(input).data("type");
            }
            else if (fieldName != undefined) {
                ref[fieldName] = $(input).val();
            }

        })
        //Lấy thông tin loại phiếu
        //Nếu tích chọn điều chuyển từ cửa hàng khác thì loại phiếu là "Phiếu nhập kho điều chuyển"
        if (form.find('input[name="rdtypeVoucher"]:checked').val() == "fromOtherStore") {
            ref.RefType = 4;
        }
        //Nếu không thì loại phiếu là "Phiếu nhập kho khác"
        else {
            ref.RefType = 6;
        }

        ref.StoreID = '599D5195-6277-AB33-C7BD-24D16A85E2D3';
        ref.RefDate = String(`${ref.RefDate} ${ref.RefTime}`).formatddMMyyyhhmmToDate();
        return ref;
    }

    /**
     * Xử lý khi người dùng thao tác với phân trang
     * CreatedBy: NDCong(17/6/2019)
     */
    setPaging() {
        var self = this;
        //Khai báo các biến
        try {
            var next = $('.table-master .arrow-right-single');
            var nextAll = $('.table-master .arrow-right-double');
            var prev = $('.table-master .arrow-left-single');
            var prevAll = $('.table-master .arrow-left-double');
            var reload = $('.table-master .load-data-icon');
            var pageNumber = $('.table-master input[name="PageNumber"]');
            var pageTotal = Number($('.show-option .total-page').html());
            var prevPageNumberValue = Number(pageNumber.val());
        }
        catch (err) {
            console.error(err)
        }
        finally {
            $(document).on('changedata', function () {
                pageTotal = Number($('.show-option .total-page').html());
            })

            //Xử lý các sự kiện người dùng
            reload.on('click', function () {
                self.GetListVoucher();
            })

            next.on('click', function () {
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
                var newValue = +(prevPageNumberValue) - 1;
                pageNumber.val(newValue);
                pageNumber.trigger('change');
            })

            prevAll.on('click', function () {
                var newValue = 1;
                pageNumber.val(newValue);
                pageNumber.trigger('change');
            })

            //Khi các trường liên quan đến phân trang thay đổi giá trị thì gọi lại service lấy thông tin các phiếu
            $('.table-master .paging').on('change', function () {
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

                //Hiện thị lại danh sách phiếu nhập kho lên màn hình
                self.GetListVoucher();
            });
        }
    }

    /**
     * Hiện thi thông tin phân trang lên màn hình
     * CreatedBy: NDCong
     * @param {Number} rowFrom
     * @param {Number} rowTo
     * @param {Number} numberRow
     * @param {Number} totalRow
     */
    showPagingInfor(rowFrom, rowTo, totalRow, numberRow) {
        var pageTotal = Math.ceil(totalRow / numberRow);
        $('.total-page').html(pageTotal);
        var optionRightHTML = `${rowFrom} - ${rowTo} trong ${totalRow} kết quả`;
        $('.option-right').html(optionRightHTML);
    }

    /**
     * Hàm cập nhật lại trạng thái disable của button điều hướng phân trang
     * CreatedBy: NDCong
     * @param {Number} pageTotal tổng số trang hiện có
     */
    updateStatusButtonPaging(pageTotal) {
        //debugger
        try {
            var next = $('.table-master .arrow-right-single');
            var nextAll = $('.table-master .arrow-right-double');
            var prev = $('.table-master .arrow-left-single');
            var prevAll = $('.table-master .arrow-left-double');
            var pageNumber = $('.table-master input[name="PageNumber"]');
        }
        catch (err) {
            console.error(err)
        }
        finally {
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
    }

    /**
     * Xử lý khi người dùng thay đổi các trường lọc dữ liệu
     * CreatedBy: NDCong
     * */
    onChangeConditionGet() {
        var self = this;
        try {
            var table = $('#inwardtable');

            table.find('input[field-data], select[field-data]').on('change', function () {
                $('input[name="PageNumber"]').val(1);
                self.GetListVoucher();

            });
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Set các sự kiện xem chứng từ 
     * CreatedBy: NDCong
     * */
    onViewRef() {
        try {
            $(document).on('click', '.table-master tr a', function () {
                $('#btn-view').trigger('click');
                event.stopPropagation();
            });
            $(document).on('dblclick', '.table-master tbody tr', function () {
                event.stopImmediatePropagation();
                $('#btn-view').trigger('click');
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Xử lý khi click button thêm thì mở form thêm phiếu
     * CreatedBy: NDCong
     * */
    onClickButtonAdd() {
        var self = this;
        $(document).on('click', '.toolbar-add', async function () {
            //debugger
            self.dialogForm.Action('add');
            self.dialogForm.Open();
            await self.bindCurrentInforToForm();
            self.onChangeFormMain();
        })
    }
    /**
     * Xử lý khi click button nhân bản thì mở form nhân bản 
     * CreatedBy: NDCong
     * */
    onClickButtonDuplicate() {
        var self = this
        try {
            $(document).on('click', '.toolbar-duplicate', async function () {
                //Mở form
                self.dialogForm.Action('duplicate');
                self.dialogForm.Open();
                //lấy ID phiếu được chọn để nhân bản
                var refID = self.GetRefIdOfRowSelected();

                //lấy thông tin của phiếu
                var promiseRefDetail = self.GetRefDetail(refID, '#dialogform');
                //lấy danh sách hàng hóa trong phiếu
                var promiseProductInRef = self.GetProductInRef(refID, '#dialogform');
                //Lấy mã phiếu mới
                var promiseNewRefNo = AjaxRequest(`/api/inward/new`, 'GET', '', '', '#dialogform');

                //Sử dụng promise all để lấy thông tin
                Promise.all([promiseRefDetail, promiseProductInRef, promiseNewRefNo])
                    .then(function ([refDetail, productInRef, newRefNo]) {
                        //Đổi lại mã phiếu cũ thành mã phiếu mới
                        refDetail.RefNo = newRefNo;
                        //bind dữ liệu của phiết lên form
                        self.bindRefDataToForm(refDetail, productInRef);
                        self.changeForm = true;
                    })
                    .catch(function () {
                        toastr.error(`Có lỗi xảy ra vui lòng liên hệ Misa để được giải đáp.`);
                    })
            });
        }
        catch (err) {
            console.error(err);
        }
    }
    /**
     * Xử lý khi click button xem thì mở form xem
     * CreatedBy: NDCong
     * */
    onClickButtonView() {
        var self = this;
        try {
            $(document).on('click', '.toolbar-view', async function () {
                //Mở form
                self.dialogForm.Action('view');
                self.dialogForm.Open();
                //bind dữ liệu vào form
                var refID = await self.GetRefIdOfRowSelected();
                var refDetail = self.GetRefDetail(refID, '#dialogform');
                var refProduct = self.GetProductInRef(refID, '#dialogform');
                //Sử dụng promise all do hai promise trên độc lập với nhau
                Promise.all([refDetail, refProduct])
                    .then(function (value) {
                        //debugger
                        //bind dữ liệu vào form
                        self.bindRefDataToForm(value[0], value[1]);
                        //disable một số trường cần thiết
                        self.disableFieldWhenViewVoucher();
                    });
                $('.form-button-edit').on('click', function () {
                    self.dialogForm.action = 'edit';
                    self.onChangeFormMain();
                    //Bỏ disable button lưu
                    $('.form-button-save').prop('disabled', false);
                    //Disable button sửa
                    $('.form-button-edit').prop('disabled', true);
                    //Bỏ gán các trường disable được sửa
                    $('#dialogform input').not('[type=radio]').prop('disabled', false);
                    $('#dialogform button.delete-icon').prop('disabled', false);
                    $('#dialogform select').prop('disabled', false);
                })
            });
        }
        catch (err) {
            console.error(err);
        }
    }
    /**
     * Xử lý khi click button sửa chứng từ 
     * CreatedBy: NDCong
     * */
    onClickButtonEdit() {
        var self = this
        try {
            $(document).on('click', '.toolbar-edit', async function () {
                //mở form
                self.dialogForm.Action('edit');
                self.dialogForm.Open();
                //bind dữ liệu vào form
                var refID = self.GetRefIdOfRowSelected();
                var refDetail = self.GetRefDetail(refID, '#dialogform');
                var productInRef = self.GetProductInRef(refID, '#dialogform');
                Promise.all([refDetail, productInRef])
                    .then(function (value) {
                        self.bindRefDataToForm(value[0], value[1]);
                    })
                    //Disable radio chọn chứng từ điều chuyển vì không cho sửa loại phiếu
                    .then(function () {
                        $('#dialogform').find('input[name="rdtypeVoucher"]').prop('disabled', true);

                        //Xác định thay đổi form
                        self.onChangeFormMain();
                    });
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Xử lý khi click button xóa chứng từ 
     * CreatedBy: NDCong
     * */
    onClickButtonDelete() {
        var self = this;
        //Mở form xác nhận xóa
        $('.toolbar-delete').on('click', function () {
            event.preventDefault();
            self.dialogConfirmDelete.Open();
        });
    }

    /**
     * Xử lý các trường autocomplete
     * CreatedBy: NDCong(26/6/2019)
     * */
    setAutoComplete() {
        var self = this;
        var form = $('#dialogform');
        //Trường input chọn đối tượng
        $('input[field-data="AccountObjectCode"]').autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/api/inward/object?objectType=0",
                    dataType: "json",
                    data: {
                        objectFilter: request.term
                    },
                    success: function (data) {
                        response(data);
                    }
                });
            },

            minLength: 1,
            select: function (event, ui) {
                form.find('input[field-data="AccountObjectCode"]')
                    .val(ui.item.AccountObjectCode)
                    .data("ID", ui.item.AccountObjectID).data("type", ui.item.ObjectType);
                form.find('input[field-data="AccountObjectName"]')
                    .val(ui.item.AccountObjectName)
                    .prop('title', ui.item.AccountObjectName);
                return false;
            },

        })
            .autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + item.AccountObjectCode + " " + item.AccountObjectName + "</div>")
                    .appendTo(ul);
            };
        //Trường input chọn hàng hóa
        $('input[name="InventoryItem"]').autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/api/inward/itemspecify",
                    dataType: "json",
                    data: {
                        filterSearch: request.term
                    },
                    success: function (data) {
                        response(data);
                    }
                });
            },

            minLength: 1,
            select: function (event, ui) {
                var tbody = form.find('#form-add-detail tbody.tbodyData');
                var rowHTML = $(`<tr class="product"></tr>`).data("ID", ui.item.InventoryItemID);
                var rowData =
                    `<td>${ui.item.SKUCode}</td>
                    <td>${ui.item.IventoryItemName}</td>
                    <td>${ui.item.StockName}</td>
                    <td>${ui.item.UnitName}</td>
                    <td>
                        <input type="text" name="UnitPrice" value="${FormatCurrency(ui.item.UnitPrice)}">
                    </td>
                    <td>
                        <input type="number" name="Quantity" value="1" min="0" max="999"/>
                    </td>
                    <td></td>
                    <td><button class="delete-icon"></button></td>`;
                rowHTML.html(rowData);
                tbody.append(rowHTML);
                rowHTML.find('input[name="Quantity"]').focus();
                form.find('#form-add-detail input').trigger('change');
                self.setInputFormat();
                return false;
            },

        })
            .autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + item.SKUCode + " " + item.IventoryItemName + "</div>")
                    .appendTo(ul);
            };

        $('.information').on('click', '.arow-down-line', function () {
            event.stopPropagation();
            $('#ui-id-8').show();
        })

        $('tr.row-search').on('click', '.arow-down-line', function () {
            event.stopPropagation();
            $('#ui-id-9').show();
        })

    }

    /**
     * Xác định thay đổi form chính
     * CreatedBy: NDCong(1/7/2019)
     * */
    onChangeFormMain() {
        var self = this;
        $('#dialogform').on('change', function () {
            self.changeForm = true;
        });
        //Thay đổi khi các input trong form thay đổi
        $('#dialogform input').on('change', function () {
            $('#dialogform').trigger('change');
        })
        //Thay đổi khi xóa hàng hóa trong form
        $('#dialogform').on('click', 'button.delete-icon', function () {
            $('#dialogform').trigger('change');
        })
    }

    /**
     * Xử lý khi click button lưu ở toolbar form chính 
     * CreatedBy: NDCong
     * */
    onSubmitForm() {
        var self = this;
        $(document).on('click', '.form-button-save', async function () {
            var action = self.dialogForm.Action();
            switch (action) {
                case 'add':
                    //Nếu thỏa mãn các điều kiện của chứng từ thì thêm chứng từ
                    if (self.isValidNewRef()) {
                        var result = await self.AddVoucher();
                        if (result) {
                            self.dialogForm.Action('confirm');
                            self.dialogForm.Close();
                            self.GetListVoucher();
                        }
                    }
                    break;
                case 'duplicate':
                    if (self.isValidNewRef()) {
                        var result = await self.AddVoucher();
                        if (result) {
                            self.dialogForm.Action('confirm');
                            self.dialogForm.Close();
                            self.GetListVoucher();
                        }
                    }
                    break;
                case 'edit':
                    if (self.isValidNewRef()) {
                        var result = await self.EditVoucher();
                        if (result) {
                            self.dialogForm.Action('confirm');
                            self.dialogForm.Close();
                            self.GetListVoucher();
                        }
                    }
                    break;
            }

        })
    }

    /**
     * Kiểm tra xem chứng từ được nhập trong form có thỏa mãn không
     * CreatedBy: NDCong
     * */
    isValidNewRef() {
        var self = this;
        try {
            //Validate các trường thông tin phiếu
            var form = $('#dialogform');
            var inputObject = form.find('input[field-data="AccountObjectCode"]');
            var inputRefNo = form.find('input[name="txtVoucherCode"]');
            var inputRefDate = form.find('input[name="txtDateInWard"]');
            var inputRefTime = form.find('input[name="txtTimeInWard"]');
            if (inputObject.data("ID") == undefined || inputObject.val().trim() == '') {
                cautionConfirm('Bạn chưa nhập đối tượng', inputObject);
                return false;
            }
            else if (inputRefNo.val().trim() == '') {
                cautionConfirm('Bạn chưa nhập số phiếu', inputRefNo);
                return false;
            }
            else if (inputRefDate.val().trim() == '') {
                cautionConfirm('Bạn chưa nhập ngày nhập kho', inputRefDate);
                return false;
            }
            else if (inputRefTime.val().trim() == '') {
                cautionConfirm('Bạn chưa nhập giờ nhập kho', inputRefTime);
                return false;
            }

            //Validate chi tiết phiếu

            //Nếu chưa chọn hàng hóa
            var listProduct = form.find('tr.product');
            if (listProduct.length == 0) {
                cautionConfirm('Bạn phải chọn ít nhất một hàng hóa', form.find('input[name="InventoryItem"]'));
                return false;
            }

            var listQuantityInput = form.find('input[name="Quantity"]');
            //Đặt biến index kiểm tra input do $.each trong jquery chỉ break khi return false
            var indexQuantityInputNotValid = listQuantityInput.length;
            $.each(listQuantityInput, function (index, item) {
                if (Number($(item).val()) == 0 || isNaN(Number($(item).val()))) {
                    indexQuantityInputNotValid = index
                    return false;
                }
            });
            //Nếu có trường invalid thì biến 'indexQuantityInputNotValid' có giá trị bằng index của trường input lỗi
            if (indexQuantityInputNotValid < listQuantityInput.length) {
                cautionConfirm('Hàng hóa phải có số lượng lớn hơn 0', $(listQuantityInput[indexQuantityInputNotValid]));
                return false;
            }
        }
        catch (err) {
            console.error(err);
        }

        /**
         * Hiện thị thông báo lỗi
         * CreatedBy: NDCong
         * @param {string} message
         * @param {Element} inputFocus
         */
        function cautionConfirm(message, inputFocus) {
            var dialogConfirm = new Dialog('#dialogConfirm', 'MShopKeeper', 400, 160, self.buttonsConfirm, eventDialog.EventDialogConfirm(`${message}`));
            dialogConfirm.Dialog.dialog({
                close: function () {
                    if (!!inputFocus)
                        $(inputFocus).focus();
                }
            });
            dialogConfirm.Open();
        }
        return true;
    }

    /**
     * Xử lý trạng thái của các button toolbar
     * CreatedBy: NDCong
     * */
    setStatusToolbarButton() {
        var NumberRowSelectedAvaiable = {
            '.toolbar-duplicate': 1,
            '.toolbar-view': 1,
            '.toolbar-edit': 1
        };


        var NumberRowSelectedNotAvaiale = {
            '.toolbar-delete': 0
        };

        $(document).ready(function () {
            updateStatusToolbarButton();
        })

        $(document).ajaxComplete(function () {
            updateStatusToolbarButton();
        })

        $(document).on('changeselectedrow', '#inwardtable', function () {
            updateStatusToolbarButton();
        })

        /**
         * Hàm cập nhật trạng thái của toolbar button 
         * CreatedBy: NDCong
         * */
        function updateStatusToolbarButton() {
            var numberRowSelected = $('#inwardtable tbody tr.row-selected').length;
            Object.keys(NumberRowSelectedAvaiable).forEach(function (item) {
                var button = $(item);
                (NumberRowSelectedAvaiable[item] == numberRowSelected) ? button.prop('disabled', false) : button.prop('disabled', true);
            })
            Object.keys(NumberRowSelectedNotAvaiale).forEach(function (item) {
                var button = $(item);
                (NumberRowSelectedNotAvaiale[item] == numberRowSelected) ? button.prop('disabled', true) : button.prop('disabled', false);
            })
        }
    }

    /**
     * Xử lý các phím tắt trên trang
     * CreatedBy: NDCong(27/6/2019)
     * */
    setShortcutKey() {
        //phím tắt khi ở màn hình chính
        $(document).on('keydown', function (event) {
            // phím tắt chức năng thêm chứng từ
            if (event.ctrlKey && event.key == 1) {
                // loại bỏ sự kiện quay lại tab 1 mặc định của trình duyệt
                event.preventDefault();
                $('#btn-Add').trigger('click');
            }

            //phím tắt chức năng sửa chứng từ
            else if (event.ctrlKey && event.key == 'e') {
                // loại bỏ sự kiện search của trình duyệt
                event.preventDefault();
                $('#btn-edit').trigger('click');
            }
            // phím tắt chức năng xóa chứng từ
            else if (event.ctrlKey && event.key == 'd') {
                event.preventDefault();
                $('#btn-delete').trigger('click');
            }
            // phím tắt chức năng nạp chứng từ
            else if (event.ctrlKey && event.key == 'y') {
                event.preventDefault();
                $('#btn-load').trigger('click')
            }

        });

        // phím tắt khi đang ở trong form chính
        $('#dialogform').on('keydown', function (event) {
            if (event.ctrlKey && event.key == 's') {
                event.preventDefault();
                $('button.form-button-save').trigger('click');
            }
        })
    }

    /**
     * Cài đặt format các trường input
     * CreatedBy: NDCong
     * */
    setInputFormat() {
        try {
            //Thêm mask vào các ô input date, slector bằng cách thêm thuộc tính data-type="date"
            $('input[data-type="date"]').mask('00/00/0000');
            $('input[data-type="time"]').mask('00:00');
            $('input[data-type="currency"]').mask('#.##0', { reverse: true });
        }
        catch (err) {
            console.error(err);
        }

    }

    /**
     * Xử lý hàng tổng kết table chính
     * CreatedBy: NDCong
     * */
    setSummaryRow() {
        $(document).ready(function () {
            UpdateSummaryWitdhCol();
            UpdateTfootWitdhCol();
        })
        $(document).ajaxComplete(function () {
            UpdateSummaryWitdhCol();
            UpdateTfootWitdhCol();
        })
        $(window).resize(function () {
            UpdateSummaryWitdhCol();
            UpdateTfootWitdhCol();
        });
        $(document).on('layoutresize', function () {
            UpdateSummaryWitdhCol();
        });

        UpdateTfootWitdhCol();

        /**Hàm đồng nhất độ rộng các cột của element .summary với độ rộng các cột trong bảng master */
        //CreadtedBy: NDCong(03/05/2019)
        function UpdateSummaryWitdhCol() {
            try {
                var numbercol = $('.summary div').length;
                for (var i = 0; i < numbercol; i++) {
                    //Lấy độ rộng của cột thead
                    var widthcol = $($('.table-container table thead tr:first-child th')[i]).css("width");
                    //Set độ rộng cột tương ứng
                    var colfoot = $('.summary div:nth-child(' + (i + 1) + ')')
                    colfoot.css("width", (i == 0) ? (+(widthcol.replace('px', '')) - 1) : widthcol);
                }
            }
            catch (err) {
                console.error(err);
            }
        }

        function UpdateTfootWitdhCol() {
            try {
                var numbercol = $('.tfoot div').length;
                for (var i = 0; i < numbercol; i++) {
                    //Lấy độ rộng của cột thead
                    var widthcol = $($('#form-add-detail thead tr:first-child th')[i]).css("width");
                    //Set độ rộng cột tương ứng
                    var colfoot = $('.tfoot div:nth-child(' + (i + 1) + ')')
                    colfoot.css("width", (i == 0) ? (+(widthcol.replace('px', '')) - 1) : widthcol);
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    /**
     * Chọn hàng đầu tiên khi tải trang
     * CreatedBy: NDCong(17/6/2019)
     * */
    selectFirstRow() {
        //debugger
        try {
            var tbody = $('#inwardtable tbody');
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
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Xử lý mở form
     * CreatedBy: NDCong
     * */
    setFormOpen() {
        var that = this;
        try {
            //Mở form chọn chứng từ điều chuyển
            $('.selectVoucher').on('click', function () {
                event.preventDefault();
                that.dialogSelectVoucher.Open();
                that.setFormSelectVoucher();
            })

            //Mở form chọn đối tượng
            $('#select-object').on('click', async function () {
                event.preventDefault();
                that.dialogSelectObject.Open();
                that.setSelectObjectForm();
            })

            //Mở from chọn hàng hóa
            $('#form-add-detail').on('click', '.open-selectproduct', function () {
                event.stopPropagation();
                that.dialogSelectProduct.Open();
                that.setSelectProductForm();
            });
        }
        catch (err) {
            console.error(err);
        }
    }


    /**
     * Xử lý hiện thị các chứng từ ở cửa hàng khác vào form chọn chứng từ
     * CreatedBy: NDCong
     * */
    setFormSelectVoucher() {
        var self = this;
        try {
            var form = $('#dialgoSelectVoucher');

            form.find('.startFilterData').on('click', function () {
                getListOtherStoreVoucherAndBindToForm();
            })

            getListOtherStoreVoucherAndBindToForm();

            async function getListOtherStoreVoucherAndBindToForm() {
                //fixed storeID là cửa hàng Cầu Giấy trong DB
                var storeID = '599D5195-6277-AB33-C7BD-24D16A85E2D3';
                var dateFrom = form.find('input.txtStartDate').val().formatMMddyyy();
                var dateTo = form.find('input.txtEndDate').val().formatMMddyyy();
                var listRef = await AjaxRequest(`/api/inward/other?storeID=${storeID}&dateForm=${dateFrom}&dateTo=${dateTo}`, 'GET', '', '', '#dialgoSelectVoucher');
                self.bindListRefToFormSelectVoucher(listRef);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Hiện thị các phiếu nhập kho vào form chọn chứng từ từ cửa hàng khác
     * CreatedBy: NDCong
     * @param {JSON} listRef
     */
    bindListRefToFormSelectVoucher(listRef) {
        try {
            var table = $('#table-select-voucher');
            var tbody = table.find('tbody');

            tbody.html('');

            listRef.forEach(function (item, index) {
                item.RefDate = new Date(item.RefDate).formatddMMyyyy();
                var rowHTML = $(`<tr class="store-select"></tr>`).data("ID", item.RefID);
                var rowData =
                    `<td>
                    <label class="misa-radio">
                        <input type="radio" name="ckbRow-voucher" value="" />
                        <span class="radio-circle"></span>
                    </label>
                </td>
                <td>${item.RefDate}</td>
                <td>${item.RefNo}</td>
                <td>${item.StoreName}</td>`;
                rowHTML.html(rowData);
                if (index == 0) {
                    rowHTML.find('input[type="radio"]').prop('checked', true);
                    rowHTML.addClass('row-selected');
                }
                tbody.append(rowHTML);
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Xử lý hiện thị các đối tượng trong form chọn đối tượng
     * CreatedBy: NDCong
     * */
    setSelectObjectForm() {
        var self = this;
        try {
            var form = $('#dialogSelectObject');
            form.find('button.search-object').on('click', function () {
                GetListObjectAndBindToForm();
            })

            GetListObjectAndBindToForm()

            $('select.objectType').on('change', function () {
                GetListObjectAndBindToForm();
            })

            /**
             * Lấy thông tin các đối tượng và hiện thị dữ liệu vào table form theo loại đối tượng và từ khóa search
             * CreatedBy: NDCong
             * */
            async function GetListObjectAndBindToForm() {
                //Lấy dữ liệu filter
                var objectType = Number(form.find('select.objectType').val());
                var objectFilter = form.find('input[name="objectFilter"]').val();
                var url = `/api/inward/object?objectType=${objectType}&objectFilter=${objectFilter}`;
                //
                var listObject = await AjaxRequest(url, 'GET', '', '', '#dialogSelectObject');
                self.bindListObjectToObjectForm(listObject);
            };
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Xử lý hiện thi dữ liệu form chọn hàng hóa
     * CreatedBy: NDCong
     * */
    async setSelectProductForm() {
        var self = this;
        try {
            var form = $('#dialogSelectProduct');

            var select = $('.dialogProduct select[field-data="InventoryItemCategoryID"]');

            //Lấy tất cả nhóm hàng hóa có trong DB
            AjaxRequest(`/api/inward/itemcategoty`, 'GET', '', '', '#dialogSelectProduct')
                //Hiện thị danh sách nhóm hàng hóa vào select element
                .then(function (listInventoryItemCategory) {
                    listInventoryItemCategory.forEach(function (inventoryItemCategory) {
                        var optionHTML = $(`<option value="${inventoryItemCategory.InventoryItemCategoryID}">${inventoryItemCategory.ItemCategoryName}</option>`);
                        select.append(optionHTML);
                    });
                })
                //Thực hiện lấy các hàng hóa theo nhóm hàng hóa và filter search
                .then(function () {
                    GetListInventoryItemtAndBindToForm()
                })

            $('select[field-data="InventoryItemCategoryID"]').on('change', function () {
                GetListInventoryItemtAndBindToForm();
            })

            form.find('button.search-object').on('click', function () {
                GetListInventoryItemtAndBindToForm();
            })
        }
        catch (err) {
            console.error(err);
        }


        /**
         * Lấy thông tin các hàng hóa và hiện thị vào form table theo nhóm hàng hóa và từ khóa search
         * CreatedBy: NDCong
         * */
        async function GetListInventoryItemtAndBindToForm() {
            try {
                //Lấy dữ liệu filter
                var inventoryItemCategoryID = form.find('select[field-data="InventoryItemCategoryID"]').val();

                inventoryItemCategoryID = (inventoryItemCategoryID == "") ? undefined : inventoryItemCategoryID;

                var filterSearch = form.find('input[name="filterSearch"]').val();

                var url = `/api/inward/item?inventoryItemCategoryID=${inventoryItemCategoryID}&filterSearch=${filterSearch}`;

                var listInventory = await AjaxRequest(url, 'GET', '', '', '#dialogSelectProduct');
            }
            catch (err) {
                console.error(err);
            }
            finally {
                //bind dữ liệu vào form
                self.bindListInventoryToFormSelectProduct(listInventory);
            }
        };

    }

    /**
     * Xử lý đóng form
     * CreatedBy: NDCong
     * */
    setFormClose() {
        var that = this;
        try {
            //Đóng form thêm phiếu nhập kho điều chuyển
            $('#close-dialogAdd').on('click', function () {
                that.dialogForm.Close();
            });
        }
        catch (err) {
            console.error(err);
        }
    }
    /**
     * Disable các trường nhập dữ liệu vì người dùng chỉ có thể xem mà không sửa được
     * CreatedBy: NDCong
     * */
    disableFieldWhenViewVoucher() {
        try {
            $('#dialogform input').prop('disabled', true);
            $('#dialogform button.delete-icon').prop('disabled', true);
            $('#dialogform select').prop('disabled', true);
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Xóa các tích chọn hàng hóa ở form chọn hàng hóa
     * CreatedBy: NDCong(1/7/2019)
     * */
    clearSelectedItemOnFormSelectProduct() {
        //debugger
        try {
            var selectProductForm = $('#dialogSelectProduct');
            var listCheckbox = selectProductForm.find('input[type="checkbox"]');

            listCheckbox.prop('checked', false);
        }
        catch (err) {
            console.error(err);
        }
    }


    /**
     * Hiện thị các chứng từ lên table master
     * CreateBy: NDCong(1/6/2019)
     * @param {Array<JSON>} listRef danh sách thông tin các chứng từ ở dạng json
     */
    bindRefDatafToTableMaster(listRef) {
        try {
            var numberRow = Number($('select[name="NumberRow"]').val());
            var tableBody = $('#inwardtable tbody');
            tableBody.html('');
            var totalMoney = 0;
            var rowIndexArray = [];
            var rowFrom = 0;
            var rowTo = 0;
            var totalRow = 0;
            if (listRef.length != 0) {
                listRef.forEach(function (ref) {
                    // Lấy dữ liệu để phân trang
                    rowIndexArray.push(ref.RowIndex);
                    totalRow = ref.TotalRow;
                    totalMoney += ref.TotalAmount;
                    //Format dữ liệu
                    ref.RefDate = new Date(ref.RefDate).formatddMMyyyy();
                    ref.TotalAmount = FormatCurrency(ref.TotalAmount);
                    var rowHtml = $(`<tr></tr>`);
                    rowHtml.data("ID", ref.RefID);
                    var rowData = `<td class="text-align-center">
                            <label class="misa-checkbox">
                                <input type="checkbox" name="ckbRow" value="" />
                                <span class="checkbox-square"></span>
                            </label>
                        </td>
                        <td>${ref.RefDate}</td>
                        <td><a href="javascript:void(0)">${ref.RefNo}</a></td>
                        <td title="${ref.AccountObjectName}">${ref.AccountObjectName}</td>
                        <td>${ref.TotalAmount}</td>
                        <td title="${ref.Description}">${ref.Description}</td>
                        <td>${ref.RefTypeName}</td>`;
                    rowHtml.html(rowData);
                    tableBody.append(rowHtml);
                })
                // Xử lý thông tin phân trang
                rowFrom = Math.min(...rowIndexArray);
                rowTo = Math.max(...rowIndexArray);
            }
            var numberRow = Number($('select[name="NumberRow"]').val());
            var pageTotal = Number(Math.ceil(totalRow / numberRow)) || 1;
            //Hiện thị thông tin lên phân trang
            this.showPagingInfor(rowFrom, rowTo, totalRow, numberRow)
            // update trạng thái button phân trang
            this.updateStatusButtonPaging(pageTotal);
            //Update lại tổng tiền
            $('.summary .total-money').html(FormatCurrency(totalMoney));
        }
        catch (err) {
            console.error(err);
        }
    }
    /**
     * Hiện thị hàng hóa của chứng từ lên table detail 
     * CreatedBy: NDCong(17/6/2019)
     * @param {Array<JSON>} refDetails thông tin chứng từ ở dạng json
     */
    bindRefProductToTableDetail(refDetails) {
        if (refDetails == undefined) {
            return 0;
        }
        try {
            var tbody = $('#inward-table-detail tbody');
            tbody.html('');
            refDetails.forEach(function (item, index) {
                //debugger
                //Format dữ liệu
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
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Hiện thị thông tin chứng từ lên form chính
     * CreatedBy: NDCong(18/6/2019)
     * @param {JSON} refDetail thông tin chứng từ
     * @param {JSON} refProduct danh sách hàng hóa trong chứng từ
     */
    bindRefDataToForm(refDetail, refProduct) {
        //debugger
        try {
            var form = $('#dialogform');
            //bind thông tin của phiếu
            form.data("ID", refDetail.RefID);
            //Format lại các dữ liệu
            refDetail.RefTime = new Date(refDetail.RefDate).formatHHmm();
            refDetail.RefDate = new Date(refDetail.RefDate).formatddMMyyyy();
            Object.keys(refDetail).forEach(function (field, index) {
                //debugger
                var fieldValue = refDetail[field];
                form.find(`input[field-data="${field}"]`).val(fieldValue);
                //Nếu là trường mã đối tượng thì bind ID và loại đối tượng và data
                if (field == "AccountObjectID") {
                    form.find(`input[field-data="AccountObjectCode"]`).data("ID", fieldValue);
                }
                if (field == "ObjectType") {
                    form.find(`input[field-data="AccountObjectCode"]`).data("type", fieldValue);
                }
                //Thên data vào số chứng từ dùng để kiểm tra xem người dùng có thay đổi số phiếu nhập không khi sửa
                if (field == "RefNo") {
                    form.find(`input[field-data="RefNo"]`).data("oldRefNo", fieldValue);
                }
            });
            //bind thông tin hàng hóa của phiếu
            var tbody = form.find('#form-add-detail tbody.tbodyData');
            tbody.html('');
            refProduct.forEach(function (item, index) {
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
            });
            //kích hoạt sự kiện thay đổi cho các ô input

            $('#dialogform input:not([type="radio"])').trigger('change');
            this.changeForm = false;
            this.setSummaryRow();
            this.setInputFormat();
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Hiện thị số chứng từ thích hợp, ngày nhập, thời gian nhập hiện tại lên form 
     * */
    async bindCurrentInforToForm() {
        try {
            var dialogform = $('#dialogform');
            var date = new Date();
            //Gọi server lấy số phiếu hợp lệ tiếp theo
            var VoucherCode = await AjaxRequest(`/api/inward/new`, 'GET', '', '', '#dialogform');

            /**element input số phiếu nhập */
            var voucherCodeInput = dialogform.find('input[name="txtVoucherCode"]');
            /**element input ngày nhập kho */
            var dateInwardInput = dialogform.find('input[name="txtDateInWard"]');
            /**element input giờ nhập kho */
            var timeInwardInput = dialogform.find('input[name="txtTimeInWard"]');

            //Xử lý hiện thị thông tin vào các input
            //CreatedBy: NDCong(13/5/2019)
            voucherCodeInput.val(VoucherCode);
            dateInwardInput.val(date.formatddMMyyyy());
            timeInwardInput.val(date.formatHHmm());
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Hiện thị các đối tượng vào form chọn đối tượng
     * CreatedBy: NDCong
     * @param {any} listObject
     */
    bindListObjectToObjectForm(listObject) {
        //debugger
        try {
            var tbody = $('#table-select-object tbody');
            tbody.html('');
            listObject.forEach(function (object) {
                var rowHTML = $(`<tr class="object-select"></tr>`);
                rowHTML.data("ID", object.AccountObjectID);
                rowHTML.data("type", object.ObjectType);
                var rowData =
                    `<td>
                    <label class="misa-radio">
                        <input type="radio" name="ckbRow-Object" value="" />
                        <span class="radio-circle"></span>
                    </label>
                </td>
                <td>${object.AccountObjectCode}</td>
                <td>${object.AccountObjectName}</td>
                <td>${object.ObjectTypeName}</td>
                <td>${object.AccountObjectAddress || ""}</td>`;
                rowHTML.html(rowData);
                tbody.append(rowHTML);
            })
            tbody.append(`<tr class="row-template">
                        <td colspan="5"></td>
                    </tr>`);
            tbody.find('tr:first-child input[name="ckbRow-Object"]').trigger('click');
        }
        catch (err) {
            console.error(err);
        }

    }

    /**
     * Hiện thị dữ liệu vào table chọn hàng hóa
     * CreatedBy: NDCong
     * @param {any} listInventoryItem
     */
    bindListInventoryToFormSelectProduct(listInventoryItem) {
        try {
            var table = $('#table-select-product');
            var tbody = table.find('tbody').first();
            tbody.html('');
            listInventoryItem.forEach(function (item) {
                if (item.InventoryItemDetails.length > 0) {
                    //Thêm row chứa các mẫu mã sản phẩm
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
                    //Thêm row chứa các sản phẩm chi tiết
                    var childContainer =
                        $(`<tr class="row-child-container" style="display: none;">
                    <td colspan="4">
                        <table>
                        </table>
                    </td>
                </tr>`);
                    var tableChild = childContainer.find('table').first();
                    item.InventoryItemDetails.forEach(function (childItem) {
                        var rowChild = $(`<tr class="row-product product-child"></tr>`).data("ID", childItem.InventoryItemID);
                        var rowChildData =
                            `<td>
                        <div class="flex-center">
                            <label class="misa-checkbox">
                                <input type="checkbox" name="cbRowChild" value="" />
                                <span class="checkbox-square"></span>
                            </label>
                            <div class="product-code">${childItem.SKUCode}</div>
                        </div>
                    </td>
                    <td>${childItem.IventoryItemName}</td>
                    <td>${childItem.ItemCategoryName}</td>
                    <td>${childItem.UnitName}</td>`;
                        rowChild.html(rowChildData);
                        tableChild.append(rowChild);
                    })
                }
                tbody.append(childContainer);
            });
        }
        catch (err) {
            console.error(err);
        }

    }

    /**
     * Hiện thị thông tin của đối tượng được chọn lên form thêm mới
     * CreatedBy: NDCong
     * @param {string} acountObjectID
     */
    async bindObjectSelectedToMainFormByID(objectType, accountObjectID) {
        try {
            //debugger
            var objectDetail = await AjaxRequest(`/api/inward/object/${objectType}/${accountObjectID}`, 'GET', '', '', "#dialogform");
            var dialog = $('#dialogform');
            var inputObjectCode = dialog.find('input[field-data="AccountObjectCode"]');
            var inputObjectName = dialog.find('input[field-data="AccountObjectName"]');
            //gán data vào input mã đối tượng
            inputObjectCode.data("ID", accountObjectID);
            inputObjectCode.data("type", objectType);
            inputObjectCode.val(objectDetail.AccountObjectCode);
            inputObjectName.val(objectDetail.AccountObjectName);

            $('#dialogform').trigger('change');
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * lấy các hàng hóa được chọn ở form chọn hàng hóa
     * trả về mảng object chứa ID mẫu mã và ID hàng hóa chi tiết
     * CreatedBy: NDCong(25/6/2019)
     * */
    getListSelectedItemOnFormSelectProduct() {
        try {
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
        }
        catch (err) {
            console.error(err);
        }

        /**
         * Kiểm tra trường có có chọn hay không
         * @param {any} row
         */
        function isCheckedRow(row) {
            try {
                var input = $(row).find('input[type="checkbox"]')
                var isChecked = input.is(":checked") || input.hasClass('check-parent');
                return isChecked;
            }
            catch (err) {
                console.error(err);
            }
        }
    };

    /**
     * Lấy danh sách các hàng hóa được chọn trong form xem hàng hóa
     * CreatedBy: NDCong(25/6/2019)
     * Trả về mảng ID hàng hóa
     * */
    getListInventoryItemIDOnFormConfirmProduct() {
        try {
            var listInventoryItemID = [];

            var table = $('#table-confirm-product');

            var listRowChild = table.find('tr.product-child:visible');

            $.each(listRowChild, function (index, item) {
                var inventoryItemID = $(item).data("ID")
                listInventoryItemID.push(inventoryItemID);
            });
            return listInventoryItemID;
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * bind dữ liệu hàng hóa vào table thêm hàng hóa
     * CreatedBy: NDCong(25/6/2019)
     * @param {any} listInventoryItemID mảng các ID hàng hóa cần thêm
     */
    bindListInventoryToTabeFormAdd(listInventoryItemID) {
        var self = this;
        try {
            var tbody = $("#form-add-detail tbody.tbodyData");

            listInventoryItemID.forEach(async function (item) {
                var inventoryItem = await AjaxRequest(`/api/inward/item/${item}`, 'GET', '', '', '#dialogform');

                var rowHTML = $(`<tr class="product"></tr>`).data("ID", inventoryItem.InventoryItemID);
                var rowData =
                    `<td>${inventoryItem.SKUCode}</td>
                <td>${inventoryItem.IventoryItemName}</td>
                <td>${inventoryItem.StockName}</td>
                <td>${inventoryItem.UnitName}</td>
                <td>
                    <input type="string" name="UnitPrice" value="${FormatCurrency(inventoryItem.UnitPrice)}">
                </td>
                <td>
                    <input type="number" name="Quantity" value="1" min="0" max="999999"/>
                </td>
                <td></td>
                <td><button class="delete-icon"></button></td>`;
                rowHTML.html(rowData);
                tbody.append(rowHTML);
                $('#form-add-detail').find('input').trigger('change');
            });
            self.setInputFormat();
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Hiện thị hàng hóa được chọn vào form xem hàng hóa
     * CreatedBy: NDCong(26/06/2019)
     * */
    async bindListSelectedItemToFormConfirm(listIventoryItem) {
        try {
            var tbody = $('#table-confirm-product').find('tbody').first();
            tbody.html('');
            listIventoryItem.forEach(async function (item) {
                var itemParent = await AjaxRequest(`/api/inward/item/${item.InventoryItemID}`, 'GET', '', '', '#dialogConfirmProduct');
                var rowParent = $(`<tr class="row-product product-parent"></tr>`).data("ID", item.InventoryItemID);
                var rowParentData =
                    `<td>
                    <div class="flex-center">
                        <button class="parent-tree icon-minus"></button>
                        <div class="product-code">${itemParent.SKUCode}</div>
                        <div class="number-child">${item.InventoryItemDetails.length}</div>
                    </div>
                </td>
                <td>${itemParent.IventoryItemName}</td>
                <td>${itemParent.ItemCategoryName}</td>
                <td>${itemParent.UnitName}</td>
                <td>
                    <div class="flex-center">
                        <button class="delete-icon"></button>
                    </div>
                </td>`;
                rowParent.html(rowParentData);
                tbody.append(rowParent);

                var rowChildContainer = $(`<tr class="row-child-container"><td colspan="5"><table></table></td>`);
                var tableChild = rowChildContainer.find('table');

                item.InventoryItemDetails.forEach(async function (itemDetail) {
                    var itemChild = await AjaxRequest(`/api/inward/item/${itemDetail}`, 'GET', '', '', '#dialogConfirmProduct');
                    var rowChild = $(`<tr class="row-product product-child"></tr>`).data("ID", itemChild.InventoryItemID);
                    var rowChildData =
                        `<td>
                        <div class="flex-center">
                            <div class="product-code">${itemChild.SKUCode}</div>
                        </div>
                    </td>
                    <td>${itemChild.IventoryItemName}</td>
                    <td>${itemChild.ItemCategoryName}</td>
                    <td>${itemChild.UnitName}</td>
                    <td>
                        <div class="flex-center">
                            <button class="delete-icon"></button>
                        </div>
                    </td>`;
                    rowChild.html(rowChildData);
                    tableChild.append(rowChild);
                });
                tbody.append(rowChildContainer);
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Xử lý khi đóng form chính
     * CreatedBy: NDCong
     * @param {any} event
     */
    handleBeforeCloseMainForm(event) {
        var self = this;
        // mở dialog xác nhận đóng form 
        if (!self.dialogConfirmClose.Dialog.dialog('isOpen') && !!self.changeForm && self.dialogForm.action != 'view' && self.dialogForm.action != 'confirm') {
            self.dialogConfirmClose.Open();
            return false;
        }
        else {
            try {
                self.changeForm = false;
                $('#dialogform').data("ID", null);
                var tbody = $('#dialogform tbody.tbodyData');
                var tfoot = $('#dialogform table tfoot');
                //reset lại form khi đóng
                $('#other').trigger('click');
                //Bỏ gán data
                $('#dialogform').find('input').val('').removeData();
                //Bỏ các trường disable
                $('#dialogform input').prop('disabled', false);
                $('#dialogform button.delete-icon').prop('disabled', false);
                $('#dialogform select').prop('disabled', false);
                //Đặt lại tbody
                tbody.html('');
                //Đặt lại tfoot 
                tfoot.find('td.number-row').html('Số dòng = 0');
                tfoot.find('td.total-quantity').html(0);
                tfoot.find('td.total-amount').html(0);
                self.changeForm = false;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                return true;
            }
        }
    }
}
//Khai báo đối tượng quản lý trang
var inward = new Inward();


/**
 * Hàm gọi ajax sử dụng dữ liệu json
 * CreatedBy: NDCong (22/05/2019)
 * Modifield: Thêm Promise xử lý bất đồng bộ
 * @param {any} url đường dẫn API
 * @param {any} methodType Loại giao thức
 * @param {any} data Dữ liệu truyền lên
 * @param {any} callback Hàm xử lý khi respone trả về
 * @param {any} selectorLoadingContainer element chứa modal loading
 */
function AjaxRequest(url, methodType, data, callback, selectorLoadingContainer) {
    if (!!selectorLoadingContainer) {
        //chú ý: loadingContainer nên có position là relative
        var loadingContainer = $(selectorLoadingContainer);
        var loading = $(`<div class="icon-loading"></div>`);

        function modalWhenAjaxStart() {
            loadingContainer.find(loading).remove();
            loadingContainer.append(loading);
        }
        function modalWhenAjaxComplete() {
            loadingContainer.find(loading).remove();
        }
    }
    var promise = new Promise(function (resolve, reject) {
        $.ajax({
            type: methodType,
            url: url,
            data: data ? JSON.stringify(data) : '',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (typeof (callback) == 'function') {
                    resolve(callback(result));
                }
                else {
                    resolve(result);
                }
            },
            error: function (message) {
                reject(message);
            },
            beforeSend: function (xhr) {
                if (!!modalWhenAjaxStart)
                    modalWhenAjaxStart();
            },
            complete: function () {
                if (!!modalWhenAjaxComplete)
                    modalWhenAjaxComplete();
            },
        });
    })
    return promise.catch(function () {
        toastr.error('Có lỗi xảy ra vui lòng liên hệ MISA để được hỗ trợ!');
    });

}