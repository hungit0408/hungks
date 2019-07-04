$(document).ready(function () {
    // Load toolbar cho trang:
    var toolBarJs = new ToolBarJS();
    toolBarJs.loadToolBarHtml();
    toolBarJs.initEvent();
})
class ToolBarJS {
    constructor() {
    }
    loadToolBarHtml() {
        var element = document.getElementsByClassName("misa-toolbar");
        var toolbarId;
        var functionPage;
        var elemntId = $(element).attr('id');
        if (elemntId == "Money_Fund_ID") {
            toolbarId = "btn-AddVouchers";
            //functionPage = 'onclick="myDropdownAdd()"';
        } else if (elemntId == "inventoryId") {
            toolbarId = "";
        }

        var toolbarHtml = '<div class="toolbar-item" id="' + toolbarId + '" > '
            + '<div class="toolbar-item-img btn-add"></div>'
            + '<div class="toolbar-item-title">Thêm mới</div>'
            + '<div class="dropdown-add" id="aaaa">'
            + '<div class="add-vouchers" >Phiếu chi tiền</div >'
            + '<div class="add-receipts">Phiếu thu tiền</div>'
            + '</div >'
            + '</div>'
            + '<div class="toolbar-item btn-duplicateVoucher">'
            + '<div class="toolbar-item-img btn-duplicate"></div>'
            + '<div class="toolbar-item-title">Nhân bản</div>'
            + '</div>'
            + '<div class="toolbar-item btn-viewVoucher">'
            + '<div class="toolbar-item-img btn-view"></div>'
            + '<div class="toolbar-item-title">Xem</div>'
            + '</div>'
            + '<div class="toolbar-item btn-editVoucher">'
            + '<div class="toolbar-item-img btn-edit"></div>'
            + '<div class="toolbar-item-title">Sửa</div>'
            + '</div>'
            + '<div class="toolbar-item btn-deleteVoucher">'
            + '<div class="toolbar-item-img btn-delete"></div>'
            + '<div class="toolbar-item-title">Xóa</div>'
            + '</div>'
            + '<div class="toolbar-item btn-loadListVoucher">'
            + '<div class="toolbar-item-img btn-load"></div>'
            + '<div class="toolbar-item-title">Nạp</div>'
            + ' </div>'
            
            ;
        $('.conntent div.misa-toolbar').html('');
        $('.conntent div.misa-toolbar').append(toolbarHtml);

    }
    initEvent() {
    };
}

