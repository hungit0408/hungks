
//lớp dialog
class Dialog {
    constructor(element, title, width, height, buttons, scope) {
        this.Dialog = $(element).dialog({
            autoOpen: false,
            modal: true,
            resize: false,
            title: title,
            width: width,
            height: height,
            buttons: buttons,
            open: function (event, ui) {
                if (!!scope) scope();
            },
            
            close: function (event, ui) {
                var form = $(event.target).find('form');
                form.trigger('reset');
                form.find('input.warning').removeClass('warning');
                form.find('.icon-exclamation').removeClass('icon-exclamation');
                $('#dialogform input').prop('disabled', false);
                $("div#dialogform .table-form-detail #form-add-detail tbody.tbodyData").html("");
                $('#form-add-detail').removeClass('disabeled');

                var tbody = $('#dialogform tbody');
                tbody.html(`<tr class="row-search">
                            <td>
                                <div class="input-container right-icon">
                                    <input type="text" name="" value="" placeholder="Tìm mã hoặc tên" />
                                    <span class="arow-down-line"></span>
                                    <span class="search-icon" id="open-selectproduct"></span>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row-add" style="height: 100%">
                            <td colspan="8"></td>
                        </tr>`);
                
            }
        });
    }

   
    //đóng dialog
    close() {
        this.Dialog.dialog('close');
        
    }
    //mở dialog
    open() {
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



