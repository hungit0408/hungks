//CreatedBy: NDCong 29/04/2019
//UpdatedBy : NNLam 01/05/2019
$(document).ready(function () {

    //dropdown 
    $('.common-icon-drop-down').click(function () {
        $(this).next().toggleClass('active');
    });
    $('.common-dropdown-item').click(function () {
        let value = $(this).text();
        console.log(value);
        $(this).parent().prev().prev().val(value);
        $(this).parent().removeClass('active');
    });
    //Hàm xử lý có/không chọn trường trong bảng
    //CreatedBy: NDCong (03/05/2019)
    //ModifiedBy: NDCong(10/05/2019)
    //Cập nhật thêm chức năng dùng phím Shift
    $('table tbody').on('click', 'tr', function (e) {
        //Nhấn Ctrl 
        if (e.ctrlKey) {
            //debugger
            $(this).addClass('row-selected');
            //
            $('btn-Edit').removeClass('btn');
            $('btn-Edit').removeClass('disabled');
        }
        //Nhấn Shift
        if (e.shiftKey) {
            //lấy tbody của tr click
            var tbody = $(this).parents('tbody');
            var rowFirst = tbody.children('tr.row-selected').first().index();
            var rowLast = tbody.children('tr.row-selected').last().index();
            var rowClick = $(this).index();

            var rowStart, rowEnd;
            if (rowClick > rowFirst) {
                rowStart = rowFirst;
                rowEnd = rowClick;
            }
            else {
                rowStart = rowClick;
                rowEnd = rowLast;
            }
            tbody.children('tr').removeClass('row-selected');
            for (var i = rowStart; i <= rowEnd; i++) {
                $($(tbody).children('tr')[i]).addClass('row-selected');
            }
        }
        else if (!e.ctrlKey && !e.shiftKey) {
            $(this).addClass('row-selected');
            $(this).parent().children('tr').not(this).removeClass('row-selected');
        }
        $(this).trigger('changeselectedrow');
    });
    //Khai báo các đối tượng filter chọn ngày
    var datepicker = new DatePicker('.date-picker');
    //Hàm xử lý đóng mở chọn loại filter so sánh
    //CreatedBy: NDCong (30/4/2019)
    //ModifiedBy : PDXuan(30/4/2019)

    $(document).on('click', function () {
        $('.filt-compare .filt-compare-container').hide();
    });

    $('.filt-compare-value').on('click', function () {
        event.stopPropagation();
        $(this).next().toggle();
    });
    //Hàm xử lý chọn loại so sánh của filter
    //CreatedBy: NDCong (30/4/2019)
    //ModifiedBy : PDXuan(30/4/2019)

    $('.filt-compare-container div').on('click', function () {
        event.stopPropagation();
        var value = $(this).children('span').html();
        $(this).parents('.filt-compare').children('.filt-compare-value').html(value);
        $(this).parent().hide();
    });

    $(".tbDisplaydata tr").click(function () {
        var selected = $(this).hasClass("highlight");
        $(".tbDisplaydata tr").removeClass("highlight");
        if (!selected)
            $(this).addClass("highlight");
    });

    //hàm xử lý check tất cả checkbox bằng checkbox ở table head
    //CreatedBy: NDCong(01/05/2019)
    //UpdatedBy: NNLam(10/05/2019)
    var ckbRoot = $('#ckbRoot');
    ckbRoot.on('change', function () {
        //debugger
        var isChecked = ckbRoot.is(':checked');
        $('input[name|="ckbRow"]').not(ckbRoot).prop("checked", isChecked);
        rowsbody = $(this).parents('table').children('tbody').children('tr');
        $.each(rowsbody, function () {
            UpdateSelectedRow($(this));
        });
        $(this).trigger('changeselectedrow');
    });
    //Hàm xử lý check checkbox cho mỗi row
    //CreatedBy: NDCong(01/05/2019)
    $('tbody').on('change', 'input[name|="ckbRow"]', function (e) {
        e.stopPropagation();
        UpdateSelectedRow($(this).parents('tbody').children('tr'));
        $(this).trigger('changeselectedrow');
    });

    //Hàm xử lý hiện thị trạng thái check của row thông qua check radio
    //CreatedBy: NDCong(20/6/2019)
    $('table').on('change', 'input[type="radio"]', function () {
        //debugger

        $(this).parents('tr').addClass('row-selected');
    })
    $('#table-select-object, #table-select-voucher').on('click', 'tbody tr', function (e) {
        e.stopPropagation();
        $(this).find('input[type="radio"]').prop('checked', true);
        $(this).find('input[type="radio"]').trigger('change');
    })
    //CreatedBy: KYLS(13/5/2019)
    var event = new TableOutward();
    event.initEvent();
});


//Hàm cập nhật trạng thái row được chọn hay không qua kiểm tra checkbox
function UpdateSelectedRow(rowElement) {
    $.each(rowElement, function () {
        var isChecked = $(this).children('td:first-child').find('input[name|="ckbRow"]').is(':checked');
        if (isChecked)
            $(this).addClass('row-selected');
        else {
            $(this).removeClass('row-selected');
        }
    });
}

//--------------------------------------------------------------Create NNLam 10/05/2019------------------------------------------------------
//khi resize col của table thì các col map theo
$("#tblMoneyFund thead th").on('resize', function () {
    mapTheadAndTbodyTable();
});
//map size col tbody theo thead
function mapTheadAndTbodyTable() {
    var ths = $("#tblMoneyFund thead ").find('th');
    $.each(ths, function (index, item) {
        var sel = '.col' + index;
        var width = $(this).css('width');
        if (width === "undefined") width = $(item).css('width');
        $(sel).css('width', width);
    });
}
//window.addEventListener('opendevtools', function () {
//    mapTheadAndTbodyTable();
//    debugger
//})
window.addEventListener('resize', function () {
    mapTheadAndTbodyTable();
});
//hiển thị gird chọn đối tượng
$('input[name="imp-objectType"], #imp-objectTypeId').on('click', function () {
    $('table.tb-ObjectType').addClass('show');
});
//dóng gird khi kích ra ngoài hoặc chọn
$(window).on('click', function (event) {
    if (!event.target.matches('input[name="imp-objectType"], #imp-objectTypeId')) {
        $('table.tb-ObjectType').removeClass('show');
    }
});
//hiển thị tên đối tượng dc chọn vào input
$('table.tb-ObjectType tbody tr').on('click', function () {
    var tenNCC = $(this).closest('.onRow').find('td:nth-child(2)').text();
    $('input[name="imp-objectType"]').val(tenNCC);
    $('input[name="payNumber"]').removeAttr("disabled");

});

//lấy ra tên thẻ input cần thao tác check all
var ckbRowName;
function getCkbRowName(name) {
    this.ckbRowName = name;
    return ckbRowName;
}
//thực hiện check or uncheck all khi đã có danh sách các thẻ cần
$('#select-all').click(function (event) {
    var input = 'input[name="' + ckbRowName + '"]';
    if (this.checked) {
        // Iterate each checkbox
        $(input).each(function () {
            this.checked = true;
        });
    } else {
        $(input).each(function () {
            this.checked = false;
        });
    }
});

//CreatedBy: KYLS(13/5/2019)
class TableOutward {
    constructor() {
        this.outward = new OutWard();
    }
    //CreatedBy: KYLS(13/5/2019)
    initEvent() {
        //repeat load data
        $(document).on('click', '.btnLoad', this.repeatLoadData.bind(this));
        //delete row on table outward
        $(document).on('click', '.btnDelete', this.WarningDelete.bind(this));

        //filter column
        $(document).on('input', '#table-outward thead th input:text', this.filterValue.bind(this));

        //click mouse right
        $(document).on('contextmenu', '#table-outward tbody tr', this.clickMouseRight.bind(this));
        $(document).on('mouseup', this.closePopup.bind(this));

        //option page table
        $(document).on('click', '.arrow-left-double:not(.disable)', { sthis: 'first' }, this.optionPage.bind(this));
        $(document).on('click', '.arrow-left-single:not(.disable)', { sthis: 'back' }, this.optionPage.bind(this));
        $(document).on('click', '.arrow-right-single:not(.disable)', { sthis: 'next' }, this.optionPage.bind(this));
        $(document).on('click', '.arrow-right-double:not(.disable)', { sthis: 'end' }, this.optionPage.bind(this));
        $(document).on('click', '.load-data-icon', { sthis: 'reload' }, this.optionPage.bind(this));
        $(document).on('change', 'select.pageNumber', this.getNumberRow.bind(this));

        //validate input page
        $(document).on('blur', '.table-master .curent-page input[name="page-curent"]', this.ValidateInput.bind(this));

    }

    //CreatedBy: KYLS(23/5/2019)
    //repeat load data
    repeatLoadData() {
        this.outward.bindDataMaster();
    }

    //CreateBy: KYLS(20/06/2019)
    //show popup warning for user when click delete
    WarningDelete() {
        var eventOutward = new EventOutward();
        var e = {
            data: {
                title: 'MISA Mshop',
                width: 400,
                height: 200,
                id: '#warning-delete-dialog'
            }
        }

        eventOutward.openDialogs(e);
        $(".warning-foot .agree").focus();
        $(document).on("click", ".warning-foot .agree", {event: "agree", sthis: eventOutward}, this.DeleteRow.bind(this));
        $(document).on("click", ".warning-foot .cancel", { event: "cancel", sthis: eventOutward }, this.DeleteRow.bind(this));
    }

    //CreateBy: KYLS(20/06/2019)
    //delete row in table outward
    DeleteRow(e) {
        var check = false;
        if (e.data.event == "agree") {
            check = true;
            var fields = $('#table-outward tr.row-selected td a');
            for(let field of fields) {
                var path = "/outwardkyls/delete/";
                var personCode = field.text;
                path += personCode;
                this.outward.deleteData(path);
                $($(field).parents("tr")).remove();
            }
        }
        e.data.sthis.closeDialogChildren.Close();
        if (check) {
            this.outward.bindDataMaster();
        }
        e.stopImmediatePropagation();
        //e.stopPropagation();
    }

    //CreatedBy: KYLS(13/5/2019)
    //event filter
    filterValue(e) {
        //var pos = $(e.target).closest('tr').find(':input').index(e.target);
        var td = $(e.target).parents('th')
        var pos = td.parent().children().index(td);
        var nameClass = "outwardCol" + pos;
        $("table#table-outward td."+ nameClass +":contains('" + e.target.value + "')").parent().show();
        $("table#table-outward td." + nameClass + ":not(:contains('" + e.target.value + "'))").parent().hide();
        UpdateCol();//outward.js
    }

    //CreatedBy: KYLS(13/5/2019)
    //event click mouse right
    clickMouseRight(e) {
        if (e.button == 2) {
            // debugger
            e.preventDefault();
            var wMonitor = $(document).width();
            var x = e.pageX - 107;
            if (x + 260 > wMonitor) {
                var excess = x + 260 - wMonitor;
                x = x - excess;//đo bằng cơm
                // alert(x);
            }
            $("#right-mouse").css("top", (e.pageY - 138));
            $("#right-mouse").css("left", x);
            $("#right-mouse").show();
        }
    }

    //CreatedBy: KYLS(13/5/2019)
    //close popup when click any monitor
    closePopup(e) {
        var popup = $("#right-mouse");
        if (!popup.is(e.target) // if the target of the click isn't the container...
            && popup.has(e.target).length === 0) // ... nor a descendant of the container
        {
            popup.hide();
        }
    }

    //CreatedBy: KYLS(13/5/2019)
    //event when click option page table
    optionPage(e) {
        // debugger
        var totalPage = Number($(".table-master .curent-page span.total-page").text());
        var num = Number($('.table-master .curent-page input[name="page-curent"]').val());
        switch (e.data.sthis) {
            case 'first':
                {
                    $('.table-master .curent-page input[name="page-curent"]').val(1);
                    $(".table-master .left-arrow span.arrow-left-double").addClass('disable');
                    $(".table-master .left-arrow span.arrow-left-single").addClass('disable');
                    $(".table-master .right-arrow span.arrow-right-single").removeClass('disable');
                    $(".table-master .right-arrow span.arrow-right-double").removeClass('disable');
                    break;
                }
            case 'back':
                {
                    if (num > 1 && num-1 == 1) {
                        $('.table-master .curent-page input[name="page-curent"]').val(1);
                        $(".table-master .left-arrow span.arrow-left-double").addClass('disable');
                        $(".table-master .left-arrow span.arrow-left-single").addClass('disable');
                        $(".table-master .right-arrow span.arrow-right-single").removeClass('disable');
                        $(".table-master .right-arrow span.arrow-right-double").removeClass('disable');
                    } else if(num == totalPage){
                        $('.table-master .curent-page input[name="page-curent"]').val(num - 1);
                        $(".table-master .right-arrow span.arrow-right-single").removeClass('disable');
                        $(".table-master .right-arrow span.arrow-right-double").removeClass('disable');
                    } else {
                        $('.table-master .curent-page input[name="page-curent"]').val(num - 1);
                    }
                    break;
                }
            case 'next':
                {
                    if (num < totalPage && num + 1 == totalPage) {
                        $('.table-master .curent-page input[name="page-curent"]').val(totalPage);
                        $(".table-master .left-arrow span.arrow-left-double").removeClass('disable');
                        $(".table-master .left-arrow span.arrow-left-single").removeClass('disable');
                        $(".table-master .right-arrow span.arrow-right-single").addClass('disable');
                        $(".table-master .right-arrow span.arrow-right-double").addClass('disable');
                    } else if(num == 1){
                        $('.table-master .curent-page input[name="page-curent"]').val(num + 1);
                        $(".table-master .left-arrow span.arrow-left-double").removeClass('disable');
                        $(".table-master .left-arrow span.arrow-left-single").removeClass('disable');
                    } else {
                        $('.table-master .curent-page input[name="page-curent"]').val(num + 1);
                    }
                    break;
                }
            case 'end':
                {
                    $('.table-master .curent-page input[name="page-curent"]').val(totalPage);
                    $(".table-master .left-arrow span.arrow-left-double").removeClass('disable');
                    $(".table-master .left-arrow span.arrow-left-single").removeClass('disable');
                    $(".table-master .right-arrow span.arrow-right-single").addClass('disable');
                    $(".table-master .right-arrow span.arrow-right-double").addClass('disable');
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

    //
    getNumberRow(e) {
        var num = e.target.value;
        alert(num);
    }

    //validate input page
    ValidateInput(e) {
        var num = Number(e.target.value);
        var totalPage = Number($(".table-master .curent-page span.total-page").text());
        //$(".table-master .curent-page span.total-page").text(3);
        if (num > totalPage || num < 1) {
            $(e.target).val(1);
        } else {
            console.log("load data");
            //repeat get value input page
            num = Number(e.target.value);
            if (num > 1 && num < totalPage) {
                $(".table-master .left-arrow span.arrow-left-double").removeClass('disable')
                $(".table-master .left-arrow span.arrow-left-single").removeClass('disable');
                $(".table-master .right-arrow span.arrow-right-single").removeClass('disable');
                $(".table-master .right-arrow span.arrow-right-double").removeClass('disable');
            } else if(num == 1){
                $(".table-master .left-arrow span.arrow-left-double").addClass('disable');
                $(".table-master .left-arrow span.arrow-left-double").addClass('disable');
                $(".table-master .right-arrow span.arrow-right-single").removeClass('disable');
                $(".table-master .right-arrow span.arrow-right-double").removeClass('disable');
            } else if (num == totalPage) {
                $(".table-master .left-arrow span.arrow-left-double").removeClass('disable');
                $(".table-master .left-arrow span.arrow-left-single").removeClass('disable');
                $(".table-master .right-arrow span.arrow-right-single").addClass('disable');
                $(".table-master .right-arrow span.arrow-right-double").addClass('disable');
            }
            
        }

        
    }
}

