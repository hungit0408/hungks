$(document).ready(function () {
    var store = new OutWard();
    store.bindDataMaster();
    store.initEvent();
    UpdateCol();
})

//CreatedBy: KYLS(13/5/2019)
class OutWard {
    //constructor() {       
    //    this.bindDataMaster();
    //    this.initEvent();
    //}

    //CreatedBy: KYLS(13/5/2019)
    //load data from server
    loadData(path) {   
        var data;
        $.ajax({
            url: path,
            method: "GET",
            dataType: "JSON",
            async: false,
            success: function (response) {
                data = response;
                $('.outwardloading').hide();
            },
            error: function (res) {
                console.log(res);
                alert('Đã có lỗi xảy ra');
            }
        });
        return data;
    }

    //CreatedBy: KYLS(13/5/2019)
    //push data to server
    pushData(path, infoData) {
        var feekback;
        $.ajax({
            url: path,
            method: 'POST',
            data: JSON.stringify(infoData),
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            success: function (res) {
                feekback = res;
            },
            error: function (res) {
                console.log(res)
                alert('Đã có lỗi xảy ra');
            }
        })
        return feekback;
    }

    //CreateBy: KYLS
    //delete data
    deleteData(path) {
        var feekback;
        $.ajax({
            url: path,
            method: 'DELETE',
            success: function (res) {
                feekback = res;
            },
            error: function (res) {
                console.log(res);
            }
        })
        return feekback;
    }

    //CreatedBy: KYLS(13/5/2019)
    //bind data on table master
    bindDataMaster() {
        var path = "/outwardkyls";
        $('#table-outward tbody').html("");//reset row
        var fields = $('.misa-column');
        $('.outwardloading').show();
        var data = this.loadData(path);
        var total_money = 0;
        //var datadetail
        var count = 0;
        $.each(data, function (index, item) {
            ++count;
            var rowHtml = '<tr>';
            rowHtml += '<td class = "text-center"><input class="filter-input-checkbox" type="checkbox" name="ckbRow" value="" /></td>';
            var num = 1;
            
            $.each(fields, function (i, field) {
                var numColumn = "outwardCol" + num++;
                var dataName = $(field).attr('fieldData');
                var dataType = $(field).attr('dataType');
                dataType = dataType ? dataType.toLowerCase() : null;
                var value = item[dataName] ? item[dataName] : "";
                // debugger
                switch (dataType) {
                    case "date":
                        {
                            rowHtml += '<td class="text-center '+ numColumn + '">' + new Date(value).formatddMMyyyy() + '</td>';
                            break;
                        }
                    case "number":
                        {
                            total_money += value;
                            rowHtml += '<td class="text-right ' + numColumn + '">' + value.formatMoney() + '</td>';
                            break;
                        }
                    default:
                        {
                            if (dataName === "VoucherCode") {
                                rowHtml += '<td class="text-left ' + numColumn + '"><a href="#">' + value + '</a></td>';
                            } else {
                                rowHtml += '<td class="text-left ' + numColumn + '">' + value + '</td>';
                            }
                        }
                }
            })
            rowHtml += '</tr>';
            $('#table-outward tbody').append(rowHtml);
        })
        $('#total-money').text(total_money.formatMoney());
        $('.option-right .page-total').text(count);
        this.selectFirstRow();
        this.bindDataDetail()
    }

    //CreatedBy: KYLS(13/5/2019)
    //choose first tr to highlight
    selectFirstRow() {
        $('table tbody tr:first').addClass('row-selected');
        if ($('#table-outward tbody tr.row-selected').length >= 1) {
            this.removeDisableForFunction();
        }          
    }

    //remove class disable on toolbar for functions
    //createby: kyls(03/07/2019)
    removeDisableForFunction() {
        $('.misa-toolbar .btnDuplicate').removeClass('disable');
        $('.misa-toolbar .btnView').removeClass('disable');
        $('.misa-toolbar .btnEdit').removeClass('disable');
        $('.misa-toolbar .btnDelete').removeClass('disable');
        $('.misa-toolbar .btnLoad').removeClass('disable');
    }

    //CreatedBy: KYLS(13/5/2019)
    //show rows on table detail when row table master clicked
    bindDataDetail() {
        var voucherCode = $('#table-outward tr.row-selected').closest('tr').find('td:eq(2)').text();
        var path = "/outwarddetail/" + voucherCode;
        var data = this.loadData(path);
        $('#table-detail tbody').html('');
        var fields = $('.table-detail table thead tr th');
        $.each(data, function (index, item) {
            var rowHtml = '<tr>';
            $.each(fields, function (i, field) {
                var dataName = $(field).attr('fieldData');
                var dataType = $(field).attr('dataType');
                dataType = dataType ? dataType.toLowerCase() : null;
                var value = item[dataName] ? item[dataName] : "";
                if (dataType === "number") {
                    rowHtml += '<td class="text-right">' + value.formatMoney() + '</td>';
                } else {
                    rowHtml += '<td class="text-left ">' + value + '</td>';
                }
            })
            rowHtml += '</tr>';
            $('#table-detail tbody').append(rowHtml);
        })
    }
    
    //CreatedBy: KYLS(13/5/2019)
    initEvent() {
        //click mouse left tr
        $(document).on('click', '#table-outward tbody tr', this.bindDataDetail.bind(this));
        //click mouse right
        $(document).on('contextmenu', '#table-outward tbody tr', this.clickMouseRight.bind(this));
        $(document).on('mouseup', this.closePopup.bind(this));
        //option page table
        $(document).on('click', '.previous-first:not(.disable)', { sthis: 'first' }, this.optionPage.bind(this))
        $(document).on('click', '.previous-back:not(.disable)', { sthis: 'back' }, this.optionPage.bind(this))
        $(document).on('click', '.next-page:not(.disable)', { sthis: 'next' }, this.optionPage.bind(this))
        $(document).on('click', '.next-end-page:not(.disable)', { sthis: 'end' }, this.optionPage.bind(this))
        $(document).on('click', '.page-reload', { sthis: 'reload' }, this.optionPage.bind(this))

    }

    //click right mouse in table tbody
    //CreatedBy: KYLS(13/5/2019)
    clickMouseRight(e) {
        if (e.button === 2) {
            // debugger
            e.preventDefault();
            var wMonitor = $(document).width();
            var x = e.pageX - 107;
            if (x + 260 > wMonitor) {
                var du = x + 260 - wMonitor;
                x = x - du;//đo bằng cơm
                // alert(x);
            }
            $("#right-mouse").css("top", (e.pageY - 138));
            $("#right-mouse").css("left", x);
            $("#right-mouse").show();

        }
    }
    //CreatedBy: KYLS(13/5/2019)
    closePopup(e) {
        var popup = $("#right-mouse");
        if (!popup.is(e.target) // if the target of the click isn't the container...
            && popup.has(e.target).length === 0) // ... nor a descendant of the container
        {
            popup.hide();
        }
    }
    //CreatedBy: KYLS(13/5/2019)
    optionPage(e) {
        // debugger
        switch (e.data.sthis) {
            case 'first':
                {
                    alert(1);
                    break;
                }
            case 'back':
                {
                    alert(2);
                    break;
                }
            case 'next':
                {
                    alert(3);
                    break;
                }
            case 'end':
                {
                    alert(4);
                    break;
                }
            case 'reload':
                {
                    alert(5);
                    break;
                }

            default:
                alert('23');

        }
    }

}


//CreatedBy: KYLS(13/5/2019)
function UpdateCol() {
    // debugger
    var numbercol = $('.summary div').length;
    for (i = 0; i < numbercol; i++) {
        //Lấy độ rộng của cột thead
        widthcol = $($('.table-container table thead tr:first-child th')[i]).css("width");
        //Set độ rộng cột tương ứng
        var colfoot = $('.summary div:nth-child(' + (i + 1) + ')');
        colfoot.css("width", widthcol);

    }
}


//Hàm xử lý khi thay đổi kích cỡ màn hình
$(window).resize(function () {
    //update lại độ rộng các cột trong phần tổng kết bảng
    UpdateCol();
});

//table index > chua hover div
$('#focusguard-2').on('focus', function () {
    $('#firstTab').focus();
});

$('#focusguard-1').on('focus', function () {
    $('#time-departure').focus();
});
