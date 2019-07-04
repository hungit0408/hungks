$(document).ready(function () {

    $('.dialogProduct').on('click', '.parent-tree', function (e) {
        var rowParent = $(this).parents('tr.product-parent');
        var childContainer = rowParent.next('.row-child-container');
        // bật/tắt hiện thị hàng hóa con 
        childContainer.toggle();
        if (childContainer.css('display') == "none") {
            $(this).addClass('icon-plus');
            $(this).removeClass('icon-minus');
        }
        else {
            $(this).addClass('icon-minus');
            $(this).removeClass('icon-plus');
        }
        e.stopImmediatePropagation();
    })


    $('#table-select-product').on('change', 'input[name="cbRowParent"]', function (e) {
        //debugger
        e.stopPropagation();
        var isChecked = $(this).is(':checked');
        $(this).removeClass('check-parent');
        var childCheckBox = $(this).parents('tr').next('tr.row-child-container').find('input[name="cbRowChild"]');
        childCheckBox.prop('checked', isChecked);
    })
    //Event xử lý chọn checkbox hàng hóa con thì cập nhật trạng thái checkbox hàng hóa cha
    
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

})

