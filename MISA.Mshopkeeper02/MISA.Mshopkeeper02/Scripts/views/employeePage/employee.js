//Khai báo biến toàn cục
//CreatedBy : PDXuan(14/06/2019)

//Khai báo tag để check onchange cho validate
var changed = false;
var err = false;
//Button cho add dialog
const buttonAddDialog = [
    {
        html: '<span class="button-icon"></span ><span class="button-title">Lưu</span>',
        class: "one-button save",
        click: function () {
            
            employeeJS.saveEmployeeNewHandler();
        }
    },
    {
        html: '<span class="button-icon"></span ><span class="button-title">Lưu và thêm mới</span>',
        class: "one-button add-duplicate",
        click: function () {
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
    },
]

//button cho edit dialog
const buttonEditDialog = [
    {
        html: '<span class="button-icon"></span ><span class="button-title">Lưu</span>',
        class: "one-button save",
        click: function () {
            employeeJS.editEmployeeHandler();
        }
    },
    {
        html: '<span class="button-icon"></span ><span class="button-title">Lưu và thêm mới</span>',
        class: "one-button add-duplicate",
        click: function () {
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
    },
]

//buttons cho sub dialog khi click vào chọn vai trò nhân viên
const buttonRoleChoiceDialog = [
    {
        html: '<span class="button-icon"></span ><span class="button-title">Đồng ý</span>',
        class: "one-button select",
        click: function () {
            employeeJS.alowSubDialogHandler();
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
    },
]

//button cho confirm dialog
const buttonConfirmDialog = [
    {
        html: '<span class="button-icon"></span ><span class="button-title">Lưu</span>',
        class: "one-button save",
        click: function () {
            employeeJS.saveEmployeeNewHandler();
            $(this).dialog('close');
        }
    },
    {
        html: '<span class="button-icon"></span><span class="button-title">Không lưu</span>',
        class: "one-button not-save",
        click: function () {
            $(this).dialog('close');
            location.reload();
        }
    },

    {
        html: '<span class="button-icon"></span><span class="button-title">Hủy bỏ</span>',
        class: "one-button cancel",
        click: function () {
            $(this).dialog('close');
        }
    }
   
]

// button cho confirm Edit dialog
const buttonConfirmEditDialog = [
    {
        html: '<span class="button-icon"></span ><span class="button-title">Lưu</span>',
        class: "one-button save",
        click: function () {
            employeeJS.editEmployeeHandler();
            $(this).dialog('close');
        }
    },
    {
        html: '<span class="button-icon"></span><span class="button-title">Không lưu</span>',
        class: "one-button not-save",
        click: function () {
            $(this).dialog('close');
            location.reload();
        }
    },

    {
        html: '<span class="button-icon"></span><span class="button-title">Hủy bỏ</span>',
        class: "one-button cancel",
        click: function () {
            $(this).dialog('close');
        }
    }

]

//buttons cho delete dialog
const buttonDeleteDialog = [
    {
        html: '<span class="button-icon"></span ><span class="button-title">Xóa</span>',
        class: "one-button delete",
        click: function () {
            employeeJS.deleteEmployeeHandler();
        }
    },

    {
        html: '<span class="button-icon"></span><span class="button-title">Hủy bỏ</span>',
        class: "one-button cancel",
        click: function () {
            $(this).dialog('close');
        }
    }
]


//Hàm xử lý khi browser load xong data
$(document).ready(function () {
    employeeJS.loadData();

});

//Class Base để khởi tạo hàm load dữ liệu
//CreatedBy : PDXuan(4/5/2019)
class Base {
    //Hàm khởi tạo của lớp Base
    constructor() {
        
    }

    //createdBy : PDXuan(4/5/2019)
    //Load dữ liệu khi broser đã load xong
    loadData = () => {
        //employeeJS.getEmployeePagination(curentPage, pageSize);
        var objectFilter = employeeJS.getFilterObject();
        employeeJS.getEmployeeByFilter(objectFilter);
    }
}

class Employee extends Base {
    //Hàm khởi tạo của lớp
    //CreatedBy: PDXuan(4/05/2019)
    constructor() {
        super();
        this.initEvents();
    }

    //Hàm khởi tạo các event cho trang
    //ceratedBy : PDXuan(4/5/2019)   
    initEvents = () => {
        //Gọi hàm khởi tạo các xử lý ui
        this.componentUiHandler();
        //xử lý sự kiện click cho add button
        $('.toolbar-item.add ,.popup-item.btn-add').click(this.addButtonToolbarHandler.bind(this))
        //xử lý sự kiện click cho duplicate button
        $(' .popup-item.btn-dublicate ,.misa-toolbar .toolbar-item.dublicate').click(this.duplicateButtonToolbarHandler.bind(this))
        //xử  lý sự kiện click cho edit button
        $('.popup-item.btn-edit ,.misa-toolbar .toolbar-item.edit').click(this.editButtonToolbarHandler.bind(this))
        //xử lý sự kiện click cho delete button
        $(document).on('click', '.misa-toolbar .toolbar-item.delete , .popup-item.btn-delete', this.deleteButtonToolbarHandler.bind(this));
        //xử lý sự kiện click để show sub dialog
        $('.choice-icon-dropdown').click(this.showRoleDialogHandler.bind(this));
        $(".tr-header .filter-feature input#datepickerFilter").val("");
        this.onChangeEmployeeRow();
        this.fileUpload();
        //Gọi hàm xử lý phân trang
        this.getEmployeePaginationHander();
        //Gọi hàm xử lý lấy dữ liệu một row table
        this.getEmployeeId();
        //Hàm check thay đổi input
        this.onChangeInputDialog();
        this.pageNumberInputSubmit();
        //Hàm check validate
        this.validateFormAdd();

    }

    //Các hàm callback gọi trong initEvents

    //Hàm callback khi click button Thêm mới trên toolbar
    //CreatedBy: PDXuan(15/06/2019) 
    addButtonToolbarHandler = () => {
        //Gọi API lấy id của nhân viên mới
        var EmployeeDialog = new Dialog('#dialog', 'Thêm mới nhân viên', 816, 650, buttonAddDialog, this);
        EmployeeDialog.Open();
        this.showLoading();
        this.clearDataInput();
        setTimeout(() => {
            callApi("GET", 'employees/new/NV', '', (employeeNewCode) => {
                this.hideLoading();
                $('input[dataField = "allowUseSoftWare"').addClass("active");
                //Xử lý trước khi đóng form nếu thay đổi thì hiển thị dialog confirm
                EmployeeDialog.Dialog.dialog({
                    beforeClose: function (event) {
                        if (changed == true) {
                            event.preventDefault();
                            let ConFirmDialog = new Dialog('#dialog-question', 'Dữ liệu chưa được lưu', 400, 170, buttonConfirmDialog, this);
                            ConFirmDialog.Open();
                        }
                    }
                })
                $('input[dataField = "employeeCode"').val(employeeNewCode.Data);
                $('input[dataField = "workingStatus"').val("Chính thức");
            })
        }, 300)
    }

    //Hàm xử lý sự kiện thay đổi pageNumber
    //CreatedBy: PDXuan(24/06/2019)
    pageNumberInputSubmit = () => {
        let that = this;
        let objectFilter = this.getFilterObject();
        $('input#pageNumber').keyup(function (event) {
            if (event.which == 13) {
                let value = $(this).val();
                let pageCouter = $(".pageCounter").text();
                if (isNaN(value) || value < 1 || value*1 > pageCouter*1) {
                    $(this).val(1);
                }
                objectFilter.PageNumber = $(this).val();
                that.getEmployeeByFilter(objectFilter);
            }
        });

        $('input#pageNumber').blur(function () {
            let value = $(this).val();
            let pageCouter = $(".pageCounter").text();
            if (isNaN(value) || value < 1 || value * 1 > pageCouter * 1) {
                $(this).val(1);
            }
            objectFilter.PageNumber = $(this).val();
            that.getEmployeeByFilter(objectFilter);
        })
    }

   

    //Hàm xử lý logic phân trang
    //CreatedBy: PDXuan(22/06/2019)
    getEmployeePaginationHander = () => {
        //Lấy giá trị pageNumber và pageSize
        $('.arrow-icon.arrow-right-single').click(() => {
            let objectFilter = this.getFilterObject();
            let pageSize = $('#pageSize :selected').text();
            let pageNumber = $("input#pageNumber").val();
            $('input#pageNumber').val(pageNumber*1 + 1);
            objectFilter.PageNumber = pageNumber*1 +1;
            objectFilter.PageSize = pageSize;
            //Gọi hàm xử lý Api để lấy dũ liệu về hiển tị
            this.getEmployeeByFilter(objectFilter);
        })

        $('.arrow-icon.arrow-left-single').click(() => {
            let objectFilter = this.getFilterObject();
            let pageNumber = $("input#pageNumber").val();
            $('input#pageNumber').val(pageNumber -1);
            let pageSize = $('#pageSize :selected').text();
            objectFilter.PageNumber--;
            //Gọi hàm xử lý Api để lấy dũ liệu về hiển tị
            objectFilter.PageSize = pageSize;
            this.getEmployeeByFilter(objectFilter);
        })

        $('.arrow-icon.arrow-right-double').click(() => {
            let objectFilter = this.getFilterObject();
            let pageSize = $('#pageSize :selected').text();
            let pageCouter = $(".pageCounter").text();
            $('input#pageNumber').val(pageCouter);
            objectFilter.PageNumber = pageCouter;
            objectFilter.PageSize = pageSize;
            //Gọi hàm xử lý Api để lấy dũ liệu về hiển tị
            this.getEmployeeByFilter(objectFilter);
        })

        $('.arrow-icon.arrow-left-double').click(() => {
            let objectFilter = this.getFilterObject();
            let pageSize = $('#pageSize :selected').text();
            $('input#pageNumber').val(1);
            objectFilter.PageNumber = 1;
            objectFilter.PageSize = pageSize;
            //Gọi hàm xử lý Api để lấy dũ liệu về hiển tị
            this.getEmployeeByFilter(objectFilter);
        })
    }


    onChangeEmployeeRow = () => {
        const that = this;
        $('#pageSize').on('change',  () =>{
            let objecFilter = this.getFilterObject();
            let pageCounter = $(".pageCounter").val();
            if (objecFilter.PageNumber > pageCounter) {
                objecFilter.PageNumber = 1;
                $("input#pageNumber").val(objecFilter.PageNumber)
            }
            that.getEmployeeByFilter(objecFilter);
        });

        $("#filterGender").on("change", () => {
            let objecFilter = this.getFilterObject();
            that.getEmployeeByFilter(objecFilter);
        })

        $("#datepickerFilter").on("change", () => {
            let objecFilter = this.getFilterObject();
            that.getEmployeeByFilter(objecFilter);
        })

        $("#workingStatusFilter").on("change", () => {
            let objectFilter = that.getFilterObject();
            that.getEmployeeByFilter(objectFilter);
        })

        $('input#datepickerFilter').keyup(function (event) {
            let objectFilter = that.getFilterObject();
            console.log(event.which)
            if (event.which == 13) {
                that.getEmployeeByFilter(objectFilter);
            }
        });
      
        $('input#EmployeeCodeFilter').keyup(function (event) {
            let objectFilter = that.getFilterObject();
            if (event.which == 13) {
                that.getEmployeeByFilter(objectFilter);
            }
        });

        $('input#mobileFilter').keyup(function (event) {
            let objectFilter = that.getFilterObject();
            if (event.which == 13) {
                that.getEmployeeByFilter(objectFilter);
            }
        });

        $('input#EmployeeNameFilter').keyup(function (event) {
            let objectFilter = that.getFilterObject();
            if (event.which == 13) {
                that.getEmployeeByFilter(objectFilter);
            }
        });
    }

    //Hàm filter theo giới tính
    //CreatedBy: PDXuan(22/06/2019)
    getEmployeeByFilter = (filterObject) => {
        const url = 'employees/all';
        let that = this;
        $('tbody.employee-list').html('');
        let pageNumber = filterObject.PageNumber;
        let pageSize = filterObject.PageSize;
        $(".tr-header").hide();
        callApi("POST", "employees", filterObject, (totalEmployee) => {
            return totalEmployee.Data;
        }).then((totalEmployee) => {
            callApi("POST", url, filterObject, (employees) => {
                if (employees.Data.length > 0) {
                    $(".toolbar-item.dublicate").removeClass("disable");
                    $(".toolbar-item.edit").removeClass("disable");
                    $(".toolbar-item.delete").removeClass("disable");
                    this.tableDataBinding(employees.Data);
                }
                $(".employee-table thead .tr-header").show();
                $(".employee-table tbody.employee-list tr:first-child").trigger("click");
            }) 
            return totalEmployee;
        }).then((totalEmployee) => {
            const startCounter = (pageNumber - 1) * pageSize + 1;
            const endCounter = (pageNumber) * pageSize;
            $(".firstRowCount").text(startCounter);
            $(".lastRowCount").text(endCounter);
            let pageCounter = Math.ceil(totalEmployee / pageSize);
            $("span.pageCounter").text(pageCounter);
            $("span.totalRow").text(totalEmployee);
            this.arowDisable(pageNumber, pageCounter, totalEmployee);
            $(".tr-header").show();
            $('.overlay-loader').hide();
            })
    }

    //Hàm disaple pagination
    //CreatedBy: PDXuan(22/06/2019)
    arowDisable = (pageNumber, pageCounter,total) => {
        if (pageNumber == 1) {
            $(".left-arrow").children().addClass("disable");
        } else {
            $(".left-arrow").children().removeClass("disable");
        }

        if (pageNumber == pageCounter) {
            $(".arrow-icon.arrow-right-single").addClass("disable");
            $(".arrow-icon.arrow-right-double").addClass("disable");
            $(".lastRowCount").text(total);
        } else {
            $(".arrow-icon.arrow-right-single").removeClass("disable");
            $(".arrow-icon.arrow-right-double").removeClass("disable");
        }

    }

    //Hàm binding dữ liệu lên table master
    //CreatedBy: PDXuan(22/06/2019) 
    tableDataBinding = (employees) => {
            $.each(employees, function (index, employee) {
                let BirthDate = new Date(employee.BirthDate);
                let rowHtml = $('<tr></tr>');
                let rowData = '<td style="text-align:center">' +
                    '<button class="checkbox-icon"></button>' +
                    '</td>' +
                    '<td>' + employee.EmployeeCode + '</td>' +
                    '<td>' + employee.EmployeeName + '</td>' +
                    '<td>' + employee.GenderName + '</td>' +
                    '<td class="text-center-format">' + BirthDate.formatddMMyyyy() + '</td>' +
                    '<td>' + FormatPhoneNumber(employee.Mobile) + '</td>' +
                    '<td>' + employee.WorkSateDisplay + '</td>';
                rowHtml.append(rowData);
                rowHtml.data("employee", employee);
                $('tbody.employee-list').append(rowHtml);
            })
    }

    //Hàm xử lý khi ấn lưu trong thêm mới nhân viên Dialog
    //CreatedBy : PDXuan(17/05/2019)
    saveEmployeeNewHandler = () => {
        //Lấy giá trị của input
        $("#dialog input").blur();
        if ($(".first-tab input").hasClass("warning")) {
        } else {
            var data = new FormData();
            var files = $("#avatar-input").get(0).files;
            if (files.length > 0) {
                data.append("UploadedImage", files[0]);
            }
            let that = this;
            let newEmployee = this.tempEmployee();
            $.ajax({
                method: "POST",
                url: "http://localhost:2344/employees/avatar/upload",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {

                },
                fail: function (response) {
                    alert(response.Message);
                }
            }).done(() => {
                //Gọi api để thêm mới nhân viên
                callApi("POST", "employees/new", newEmployee, (res) => {
                    res = res.Data
                    return res;
                }).then((employeeId) => {
                    let workSchedule = that.getWorkSchedule(employeeId);
                    callApi("POST","employees/new/schedule", workSchedule, function (res) {
                        console.log(res.Data);
                        location.reload();
                    })
                })
            })

        }
       
    }

    getWorkSchedule = (employeeID) => {
        let Monday = null;
        let Tuesday = null;
        let Wednesday = null;
        let Thursday = null;
        let Friday = null;
        let Saturday = null;
        let Sunday = null;
        if ($(".one-row.monday .checkbox-icon").hasClass("active")) {
            let mondayStartTime = $(".one-row.monday .time-picker-input.time-start").val();
            let mondayEndTime = $(".one-row.monday .time-picker-input.time-end").val();
            Monday = mondayStartTime + '-' + mondayEndTime;
        };
        if ($(".one-row.Tuesday .checkbox-icon").hasClass("active")) {
            let TuesdayStartTime = $(".one-row.Tuesday .time-picker-input.time-start").val();
            let TuesdayEndTime = $(".one-row.Tuesday .time-picker-input.time-end").val();
            Tuesday = TuesdayStartTime + '-' + TuesdayEndTime;
        };
        if ($(".one-row.Wednesday .checkbox-icon").hasClass("active")) {
            let WednesdayStartTime = $(".one-row.Wednesday .time-picker-input.time-start").val();
            let WednesdayEndTime = $(".one-row.Wednesday .time-picker-input.time-end").val();
            Wednesday = WednesdayStartTime + '-' + WednesdayEndTime;
        };
        if ($(".one-row.Thursday .checkbox-icon").hasClass("active")) {
            let ThursdayStartTime = $(".one-row.Thursday .time-picker-input.time-start").val();
            let ThursdayEndTime = $(".one-row.Thursday .time-picker-input.time-end").val();
            Thursday = ThursdayStartTime + '-' + ThursdayEndTime;
        };
        if ($(".one-row.Friday .checkbox-icon").hasClass("active")) {
            let FridayStartTime = $(".one-row.Friday .time-picker-input.time-start").val();
            let FridayEndTime = $(".one-row.Friday .time-picker-input.time-end").val();
            Friday = FridayStartTime + '-' + FridayEndTime;
        };
        if ($(".one-row.Saturday .checkbox-icon").hasClass("active")) {
            let SaturdayStartTime = $(".one-row.Saturday .time-picker-input.time-start").val();
            let SaturdayEndTime = $(".one-row.Saturday .time-picker-input.time-end").val();
            Saturday = SaturdayStartTime + '-' + SaturdayEndTime;
        };
        if ($(".one-row.Sunday .checkbox-icon").hasClass("active")) {
            let SundayStartTime = $(".one-row.Sunday .time-picker-input.time-start").val();
            let SundayEndTime = $(".one-row.Sunday .time-picker-input.time-end").val();
            Sunday = SundayStartTime + '-' + SundayEndTime;
        };


        let workShedule = {
            EmployeeID: employeeID,
            Monday: Monday,
            Tuesday: Tuesday,
            Wednesday: Wednesday,
            Thursday: Thursday,
            Friday: Friday,
            Saturday: Saturday,
            Sunday: Sunday
        }
        return workShedule;
    }

    //Hàm callback khi click button Nhân bản trên thanh toolbar
    //CreatedBy: PDXuan(15/06/2019)   
    duplicateButtonToolbarHandler = () => {
        var EmployeeDialog = new Dialog('#dialog', 'Thêm mới nhân viên', 816, 700, buttonAddDialog, this);
        this.clearDataInput();
        this.validateFormAdd();
        this.showLoading();
        this.employeeBindingData(EmployeeDialog);
        setTimeout(() => {
            callApi("GET", 'employees/new/NV', '', (employeeNewCode) => {
                employeeNewCode = employeeNewCode.Data;
                this.hideLoading();
                $('input[dataField = "allowUseSoftWare"').addClass("active");
                //Xử lý trước khi đóng form nếu thay đổi thì hiển thị dialog confirm
                EmployeeDialog.Dialog.dialog({
                    beforeClose: function (event) {
                        if (changed == true) {
                            ebugger
                            event.preventDefault();
                            let ConFirmDialog = new Dialog('#dialog-question', 'Dữ liệu chưa được lưu', 400, 170, buttonConfirmDialog, this);
                            ConFirmDialog.Open();
                        }
                    }
                })
                $('input[dataField=employeeCode]').val(employeeNewCode);
                $('input[dataField=password]').val('');
            })
        })
    }

    //Hàm callback khi click button Sửa trên thanh toolbar
    //CreatedBy: PDXuan(15/06/2019)   
    editButtonToolbarHandler = () => {
        var EditDialog = new Dialog('#dialog', 'Sửa nhân viên', 816, 700, buttonEditDialog, this);
        this.clearDataInput();
        this.validateFormAdd();
        this.showLoading();
        this.employeeBindingData(EditDialog);
        EditDialog.Dialog.dialog({
            beforeClose: function (event) {
                if (changed == true) {
                    event.preventDefault();
                    let ConFirmDialog = new Dialog('#dialog-question-edit', 'Dữ liệu chưa được lưu', 400, 170, buttonConfirmEditDialog, this);
                    ConFirmDialog.Open();
                }
            }
        })

    }

    //Hàm sử lý khi ấn lưu ở edit dialog
    //CreatedBy : PDXuan(20/05/2019)
    editEmployeeHandler = () => {
        //get employeeId from row data
        var data = new FormData();
        var files = $("#avatar-input").get(0).files;
        if (files == undefined) {

        }
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }
        let newEmployee = this.tempEmployee();
        let employeeId = $('.row-selected').data("employee").EmployeeID;
        newEmployee.EmployeeID = employeeId;
        
        $.ajax({
            method: "POST",
            url: "http://localhost:2344/employees/avatar/upload",
            data: data,
            contentType: false,
            processData: false,
            success: function (response) {

            },
            fail: function (response) {
                alert(response.Message);
            }
        }).done(() => {
            //Gọi api để thêm mới nhân viên
            callApi("PUT", "employees/update", newEmployee, function (res) {
            }).then(() => {
                let workSchedule = this.getWorkSchedule(employeeId);
                callApi("PUT", "employees/update/schedule", workSchedule, function (res) {
                    location.reload();
                })
            })
        })
    }

    //Hàm callback xử lý xóa trong Dialog xóa nhân viên
    //creted by : PDXuan(11/05/2019)
    deleteButtonToolbarHandler = () => {
        //Lấy customerId
        if ($('.row-selected').data("employee") === undefined) {
            alert("Bạn chưa chọn nhân viên để xóa!");
            return;
        }
        let employeeName = $('.row-selected').data("employee").EmployeeName;
        $('.row-content-dialog').text(employeeName);
        const DeleteDialog = new Dialog('#dialog-delete', 'Xóa dữ liệu', 400, 170, buttonDeleteDialog, this);
        DeleteDialog.Open();
    }

    //Hàm callback xử lý khi ấn xóa trong Dialog xóa nhân viên
    //createdBy: PDXuan(11/05/2019)
    deleteEmployeeHandler = () => {
        //get EmployeeId 
        //Call API detete employee with pram : employeeId
        let checkAlert = 0;
        if ($('.row-selected').data("employee") === undefined) {
            alert("Bạn chưa chọn nhân viên để xóa!");
            return;
        }
        let employeeId = $('.row-selected').data("employee").EmployeeID;
        let url = `employees/${employeeId}`;
        callApi("DELETE", url, '', (res) => {
            checkAlert = 1;
            location.reload();
        });
    }


    //Hàm callback xử lý hiện dialog chọn vai trò nhân viên trong cửa hàng
    //CreatedBy: PDXuan(15/06/2019)  
    showRoleDialogHandler = () => {
        //get tags content from add lidalog
        //compare with check box title and match to trigger checkbox
        $("#subdialog .checkbox-component .checkbox-icon.active").removeClass("active");
        let tagsContent = $('.tag-label');
        let checkboxTitle = $('#subdialog .checkbox-text');
        checkboxTitle.each(function (index, item) {
            tagsContent.each(function (index, item2) {
                if ($(item).text() == $(item2).text()) {
                    $(item).prev().addClass('active');
                }
            })
        })
        //debuger
        AddEmployeeSubDialog.Open();
    }


    //Hàm xử lý khi ấn đồng ý của subdialog
    //CreatedBy: PDXuan(20/05/2019)
    alowSubDialogHandler = () => {
        var listTag = $("#subdialog .checkbox-component .checkbox-icon.active");
        if (listTag.length == 0) {
            alert("Bạn phải chọn ít nhất một vai trò !");
            return;
        }
        $(".wrap-tags .tag-label").remove();
        $.each(listTag, function (index, item) {
            let role = $(item).next().text();
            let taghtml = '<span class="tag-label">' + role + '<span class="delete-tag"></span></span>';
            $(".wrap-tags").prepend(taghtml);
        })
        $("#subdialog .checkbox-component .checkbox-icon.active").removeClass("active");
        AddEmployeeSubDialog.Close();

    }

    //xử lý preview ảnh avatar
    //createdBy :PDXuan(7/5/2019) 
    fileUpload = () => {
        $(".add-avatar").click(function () {
            $("#avatar-input").click();
        })
        $(".delete-avatar").click(function () {
            $(".add-avatar , .delete-avatar").removeClass("show");
            $('.upload-image').removeClass("change");
            $(".button-positon").removeClass("hide");
            $(".upload-image").css("background-image", "url('../../../Contents/icons/Product.png')");
        })
        $("#avatar-input").change(function (e) {
            $(".add-avatar , .delete-avatar").addClass("show");
            $('.upload-image').addClass("change");
            $(".button-positon").addClass("hide");
            $('.upload-image').css("background-image", "url(" + URL.createObjectURL(e.target.files[0])) + ")";
        })
    }



    /**
    * Hàm xử lý validate dữ liệu cho input
    * CreatedBy: PDXuan(20/05/2019)
    * @param {string} inputName  tên của input truyền vào
    * @param {string} meessage message hiển thị cho người dùng
    */
    validateCommonInput = (inputName, message) => {
        //Lấy giá trị của input
        //Nếu rỗng thì hiển thị warning

        $(`input[dataField = ${inputName} ]`).blur(function () {
            let value = $(this).val();
            if (value === '') {
                $(this).addClass("warning");
                $(this).next().css("display", "flex");
                $(this).next().children().next().text(message);
                err = true;
            }
        })

        $(`input[dataField = ${inputName} ]`).keyup(function () {
            let value = $(this).val();
            let array = value.split("");

            if (array.length > 0) {
                $(this).removeClass("warning");
                $(this).next().css("display", "none");
                $(this).next().children().next().text(message);
                if (inputName === 'empoyeeMobile' || inputName === 'Salary' ) {
                    let employeeCoe = $(`input[dataField = employeeCode ]`).val();
                    if ($.isNumeric(value) == false) {
                        let message1 = "Giá trị nhập liệu không hợp lệ !";
                        $(this).next().show();
                        $(this).addClass('warning');
                        $(this).next().children().next().text(message1);
                        err = true;
                    } else if (value == employeeCoe) {
                        let message1 = "Số điện thoại không được trùng với mã nhân viên !";
                        $(this).next().show();
                        $(this).addClass('warning');
                        $(this).next().children().next().text(message1);
                        err = true;
                    }
                   
                } else if (inputName === 'employeeCode' && array.length > 25) {
                    let message1 = "Mã nhân viên tối đa 25 ký tự!";
                    $(this).next().show();
                    $(this).addClass('warning');
                    $(this).next().children().next().text(message1);
                    err = true;
                } else if (inputName == "passwordConfirm") {
                    let password = $("input[dataField=password]").val();
                    if ($(this).val() !== password) {
                        let message1 = "Mật khẩu không khớp!";
                        $(this).next().css("display", "flex");
                        $(this).next().show();
                        $(this).addClass('warning');
                        $(this).next().children().next().text(message1);
                        err = true;
                    }
                }
            }
        })
    }

    //Hàm validate Mã nhân viên
    //CreatedBy: PDXuan(20/06/2019)
    validateEmployeeCode = (inputName, message) => {
        $(`input[dataField = ${inputName} ]`).keyup(function () {
            let value = $(this).val();
            let array = value.split("");
            $.each(array,  (index, item) => {
                if (item.charCodeAt() < 48 && item.charCodeAt() !== 45 && item.charCodeAt() !== 46)  {
                    console.log(item.charCodeAt())
                    $(this).addClass("warning");
                    $(this).next().css("display", "flex");
                    $(this).next().children().next().text(message);
                } 
                else if (item.charCodeAt() > 58 && item.charCodeAt() < 64) {
                    $(this).addClass("warning");
                    $(this).next().css("display", "flex");
                    $(this).next().children().next().text(message);
                } else if (item.charCodeAt() > 90 && item.charCodeAt() < 97 && item.charCodeAt() != 95) {
                    $(this).addClass("warning");
                    $(this).next().css("display", "flex");
                    $(this).next().children().next().text(message);
                } else if (item.charCodeAt() > 123) {
                    $(this).addClass("warning");
                    $(this).next().css("display", "flex");
                    $(this).next().children().next().text(message);
                }
            })

        })
    }

    //Hàm validate EmployeeName
    validateEmployeeName = (inputName, message) => {
        $(`input[dataField = ${inputName} ]`).keyup(function (event) {
            let value = $(this).val();
            let array = value.split("");
            $.each(array, (index, item) => {
                if (item.charCodeAt() < 38 && item.charCodeAt()!== 32) {
                    console.log(item.charCodeAt())
                    $(this).addClass("warning");
                    $(this).next().css("display", "flex");
                    $(this).next().children().next().text(message);
                }
                else if (item.charCodeAt() > 58 && item.charCodeAt() < 65) {
                    $(this).addClass("warning");
                    $(this).next().css("display", "flex");
                    $(this).next().children().next().text(message);
                } else if (item.charCodeAt() > 90 && item.charCodeAt() < 97) {
                    $(this).addClass("warning");
                    $(this).next().css("display", "flex");
                    $(this).next().children().next().text(message);
                } else if (item.charCodeAt() > 123 && item.charCodeAt() <126) {
                    $(this).addClass("warning");
                    $(this).next().css("display", "flex");
                    $(this).next().children().next().text(message);
                }
            })
        })
    }

    /**
   * Hàm xử lý validate dữ liệu cho input password
   * CreatedBy: PDXuan(20/05/2019)
   * @param {string} inputName  tên của input truyền vào
   * @param {string} meessage message hiển thị cho người dùng
   */
    validatePassword = (inputName, message) => {
        $("input[dataField=password]").focus(function () {
            $(this).css("border", "1px solid #41a7d1")
        })

        $("input[dataField=password]").blur(function () {
            let value = $(this).val();
            if (value === '') {
                $(this).addClass("warning");
                $(this).next().css("display", "flex");
                $('.password-componet .eye-show-pass').css("right", "24px");
                $(this).next().children().next().text(message);
            }
        })
        $("input[dataField=password]").keyup(function () {
            let value = $(this).val();
            let array = value.split("");
            let lowerTextTag = false;
            let uperTextTag = false;
            let numberTag = false;
            let symbolTag = false;
            for (let i = 0; i < array.length; i++) {
                if (array[i].charCodeAt() >= 97 && array[i].charCodeAt() <= 122) {
                    lowerTextTag = true;
                } else if (array[i].charCodeAt() >= 65 && array[i].charCodeAt() <= 90) {
                    uperTextTag = true;
                }
                else if (array[i].charCodeAt() >= 48 && array[i].charCodeAt() <= 57) {
                    numberTag = true;
                } else if ((array[i].charCodeAt() >= 33 && array[i].charCodeAt() <= 47) || (array[i].charCodeAt() == 64)) {
                    symbolTag = true;
                }
            }
            console.log(array.length)
            if (array.length === 0) {
                $('.checkSecurity').removeClass("weak");
                $('.checkSecurity').removeClass("high");
                $('.checkSecurity').removeClass("medium");
            } else if (array.length < 6 && array.length >= 1) {
                $(this).addClass("warning");
                $(this).next().css("display", "flex");
                $(this).next().children().next().text("Mật khẩu phải có 8 bao gồm in hoa, thường, số và ký tự đặc biệt");
                $('.password-componet .eye-show-pass').css("right", "24px");
                $('.checkSecurity').removeClass("high");
                $('.checkSecurity').removeClass("medium");
                $('.checkSecurity').addClass("weak");
                $('.checkSecurity').text("Bảo mật yếu");


            } else if (array.length >= 6) {
                if ((lowerTextTag && uperTextTag && numberTag) || (lowerTextTag && uperTextTag && symbolTag) || (lowerTextTag && numberTag && symbolTag) || (uperTextTag && numberTag && symbolTag)) {
                    $('.checkSecurity').removeClass("medium");
                    $('.checkSecurity').removeClass("weak");
                    $('.checkSecurity').addClass("high");
                    $('.checkSecurity').text("Bảo mật cao");
                    $(this).removeClass("warning");
                    $(this).next().css("display", "none");
                    $('.password-componet .eye-show-pass').css("right", "8px");

                } else if ((lowerTextTag && uperTextTag) || (lowerTextTag && numberTag) || (lowerTextTag && symbolTag) || (uperTextTag && numberTag) || (uperTextTag && symbolTag) || (numberTag && symbolTag)) {
                    $('.checkSecurity').removeClass("high");
                    $('.checkSecurity').removeClass("weak");
                    $('.checkSecurity').addClass("medium");
                    $('.checkSecurity').text("Bảo mật vừa");
                }
                else {
                    $('.checkSecurity').removeClass("high");
                    $('.checkSecurity').removeClass("medium");
                    $('.checkSecurity').addClass("weak");
                    $('.checkSecurity').text("Bảo mật yếu");
                    $('.password-componet .eye-show-pass').css("right", "24px");
                }
            }
        })
    }


    /**
     * Hàm binding dữ liệu lên form sửa
     * CreatedBy : PDXuan(20/05/2109)
     * @param {any} Dialog 
     * chứa form
     */
    employeeBindingData = (EditDialog) => {
        if ($('.row-selected').data("employee") === undefined) {
            alert("Bạn chưa chọn nhân viên sửa");
            return;
        }
        EditDialog.Open();
        let employeeId = $('.row-selected').data("employee").EmployeeID;
        //Gọi Api lấy dũ liệu của  employee 
        //Gọi Api lấy vai trò của nhân viên để bind vào
        setTimeout(() => {
            callApi("GET", '/employees/' + employeeId, '', (res) => {
                res = res.Data;
                this.hideLoading();
                let BirthDate = new Date(res.BirthDate);
                let IdentityCarDateProvider = new Date(res.IdentityCarDateProvider);
                let JobtrialDate = new Date(res.JobtrialDate);
                let JobOfficicalDate = new Date(res.JobOfficicalDate);
                $('input[dataField=employeeCode]').val(res.EmployeeCode);
                $('input[dataField=employeeName]').val(res.EmployeeName);
                $('input[dataField=empoyeeMobile]').val(res.Mobile);
                $('input[dataField=identityCard]').val(res.IdentityCard);
                $('input[dataField=identityCardDateProvider]').val(IdentityCarDateProvider.formatddMMyyyy());
                $('input[dataField=identityCardProvider]').val(res.IdentityCardProvider);
                $(`div.radio-choice[dataField=employeeGender] .radio-box .radio-box-icon`).removeClass('active');
                $('input[dataField=birthday]').val(BirthDate.formatddMMyyyy());
                $('input[dataField=workingStatus]').val(res.WorkSateDisplay);
                $('input[dataField=password]').val(res.Password);
                $('input[dataField=Phone]').val(res.Phone);
                $('input[dataField=Email]').val(res.Email);
                $('input[dataField=NativeAddress]').val(res.NativeAddress);
                $('input[dataField=NativeCountry]').val(res.NativeCountry);
                $('input[dataField=NativeProvince]').val(res.NativeProvince);
                $('input[dataField=NativeDistrict]').val(res.NativeDistrict);
                $('input[dataField=NativeVillage]').val(res.NativeVillage);
                $('input[dataField=CurrentAddress]').val(res.CurrentAddress);
                $('input[dataField=CurrentCountry]').val(res.CurrentCountry);
                $('input[dataField=CurrentProvince]').val(res.CurrentProvince);
                $('input[dataField=CurrentDistrict]').val(res.CurrentDistrict);
                $('input[dataField=CurrentVillage]').val(res.CurrentVillage);
                $('input[dataField=OriginalDocumentation]').val(res.OriginalDocumentation);
                $('input[dataField=JobtrialDate]').val(JobtrialDate.formatddMMyyyy());
                $('input[dataField=JobOfficicalDate]').val(JobOfficicalDate.formatddMMyyyy());
                $('input[dataField=DownPayment]').val(res.DownPayment);
                $('input[dataField=Salary]').val(res.Salary);
                if (res.Avatar === null) {
                    $(".delete-avatar").click();
                } else {
                    $('.upload-image').css("background-image", "url(../../../UploadedImage/" + res.Avatar + ")");
                    $(".add-avatar , .delete-avatar").addClass("show");
                    $('.upload-image').addClass("change");
                    $(".button-positon").addClass("hide");                }

                if (res.AllowUseSoftWare) {
                    $('input[dataField=allowUseSoftWare]').addClass("active");
                }
                if (res.Admin) {
                    $('input[dataField=isAmin]').addClass("active");
                    $('.row-flex.role-pickder').hide();
                } else {
                    $('input[dataField=isAmin]').removeClass("active");
                    $('.row-flex.role-pickder').show();
                }
                if (res.Gender) {
                    $('div[dataField = employeeGender] .radio-box button.radio-box-icon').removeClass("active");
                    $('div[dataField = employeeGender] .radio-box button.radio-box-icon.male').addClass("active");
                } else if (res.Gender === false) {
                    $('div[dataField = employeeGender] .radio-box button.radio-box-icon').removeClass("active");
                    $('div[dataField = employeeGender] .radio-box button.radio-box-icon.female').addClass("active");
                }
                if (res.TypeAcess) {
                    $('div[dataField = acessType] .radio-box button.radio-box-icon').removeClass("active");
                    $('div[dataField = acessType] .radio-box button.radio-box-icon.folow-time-slot').addClass("active");
                    $('div[dataField = acessType] .radio-box button.radio-box-icon.folow-time-slot').click();

                } else if (res.TypeAcess === false) {
                    $('div[dataField = acessType] .radio-box button.radio-box-icon').removeClass("active");
                    $('div[dataField = acessType] .radio-box button.radio-box-icon.free-acess').addClass("active");
                }

                if (res.MaritalStatus) {
                    $('div[dataField = maritalStatus] .radio-box button.radio-box-icon.married').removeClass("active");
                    $('div[dataField = maritalStatus] .radio-box button.radio-box-icon.single').addClass("active");
                } else if (res.MaritalStatus === false) {
                    $('div[dataField = maritalStatus] .radio-box button.radio-box-icon.married').addClass("active");
                    $('div[dataField = maritalStatus] .radio-box button.radio-box-icon.single').removeClass("active");
                }

            }).then(() => {
                callApi("GET", 'employees/role/' + employeeId, '', function (res) {
                    res = res.Data;
                    $('.tag-label').remove();
                    $.each(res, function (index, role) {
                            let taghtml = '<span class="tag-label">' + role.RoleName + '<span class="delete-tag"></span></span>';
                            $(".wrap-tags").prepend(taghtml);
                        })
                    })
                }).then(() => {
                    let uri = "employees/schedule/" + employeeId;
                    callApi("GET", uri, '', function (res) {
                        res = res.Data;
                        console.log(res)
                        if (res.Monday != null) {
                            let time = res.Monday.split("-");
                            let mondayStartTime = time[0];
                            let mondayEndTime = time[1];
                            $(".one-row.monday .checkbox-icon").addClass("active");
                            $(".one-row.monday .time-picker-input.time-start").val(mondayStartTime);
                            $(".one-row.monday .time-picker-input.time-end").val(mondayEndTime);
                        }
                        if (res.Tuesday != null) {
                           let  time = res.Monday.split("-");
                            $(".one-row.Tuesday .checkbox-icon").addClass("active");
                            let tuesdayStartTime = time[0];
                            let tuesdayEndTime = time[1];
                            $(".one-row.Tuesday .time-picker-input.time-start").val(tuesdayStartTime);
                            $(".one-row.Tuesday .time-picker-input.time-end").val(tuesdayEndTime);
                        }
                        if (res.Wednesday != null) {
                           let  time = res.Monday.split("-");
                            $(".one-row.Wednesday .checkbox-icon").addClass("active");
                            let wednesdayStartTime = time[0];
                            let wednesdayEndTime = time[1];
                            $(".one-row.Wednesday .time-picker-input.time-start").val(wednesdayStartTime);
                            $(".one-row.Wednesday .time-picker-input.time-end").val(wednesdayEndTime);
                        }
                        if (res.Thursday != null) {
                            let time = res.Monday.split("-");
                            $(".one-row.Thursday .checkbox-icon").addClass("active");
                            let thursdayStartTime = time[0];
                            let thursdayEndTime = time[1];
                            $(".one-row.Thursday .time-picker-input.time-start").val(thursdayStartTime);
                            $(".one-row.Thursday .time-picker-input.time-end").val(thursdayEndTime);
                        }
                        if (res.Friday != null) {
                            let time = res.Monday.split("-");
                            $(".one-row.Friday .checkbox-icon").addClass("active");
                            let FridayStartTime = time[0];
                            let FridayEndTime = time[1];
                            $(".one-row.Friday .time-picker-input.time-start").val(FridayStartTime);
                            $(".one-row.Friday .time-picker-input.time-end").val(FridayEndTime);
                        }
                        if (res.Saturday != null) {
                            let time = res.Monday.split("-");
                            $(".one-row.Saturday .checkbox-icon").addClass("active");
                            let SaturdayStartTime = time[0];
                            let SaturdayEndTime = time[1];
                            $(".one-row.Saturday .time-picker-input.time-start").val(SaturdayStartTime);
                            $(".one-row.Saturday .time-picker-input.time-end").val(SaturdayEndTime);
                        }
                        if (res.Sunday != null) {
                            let time = res.Monday.split("-");
                            $(".one-row.Sunday .checkbox-icon").addClass("active");
                            let SundayStartTime = time[0];
                            let SundayEndTime = time[1];
                            $(".one-row.Sunday .time-picker-input.time-start").val(SundayStartTime);
                            $(".one-row.Sunday .time-picker-input.time-end").val(SundayEndTime);
                        }

                    })
                })
        }, 200)

    }

    //Hàm trả về ngày giờ 
    //CreatedBy: PDXuan(25/06/2019)
    timeAcessResult = (time) => {
        let hour = Math.floor(time / 60);
        let minute = time % 60;

        return hour + ":" + minute;
    } 

    //Hàm biến đổi thời gian hiển thị thành số để truyền lên db
    //CreatedBy: PDXuan(25/06/2019)
    timeAcessFormat = (time) => {
        let arr = time.split(":");


    }


    /**
     * Hàm xử lý blur input
     * CreatedBy : PDXuan(20/05/2109)
     * @param {any} inputName tên của input
     */
    blurInputHandler = (inputName) => {
        $(`input[dataField = ${inputName} ]`).blur();
        $(`input[name = ${inputName} ]`).blur();
    }

    //Hàm clear form input
    //CreatedBy : PDXuan(20/05/2019)
    clearDataInput = () => {
        $('#dialog input[type = "text"]').val('');
        $('#dialog input[type = "password"]').val('');
        $('.warning').removeClass('warning');
        $('.warning-message-wrap').hide();
        $('.tag-label').remove();
    }

    //Hàm xử lý validate addForm
    //CreatedBy : PDXuan(18/05/2019)
    validateFormAdd = () => {
        this.validateCommonInput('employeeCode', 'Mã nhân viên không được để trống !');
        this.validateCommonInput('employeeName', 'Tên nhân viên không được để trống !');
        this.validateCommonInput('empoyeeMobile', 'Số điện thoại không được để trống!');
        this.validateCommonInput('Salary', 'Số điện thoại không được để trống!');
        this.validatePassword('password', 'Mật khẩu không được để trống!');
        this.validateCommonInput('passwordConfirm', "Nhập lại mật khẩu !");
        this.validateEmployeeCode("employeeCode", "Mã nhân viên bảo gồm chữ , số và kí tự  . _  - @  ");
        this.validateEmployeeName('employeeName', 'Tên nhân viên bảo gồm chữ cái và số ');

    }

    // Lấy EmployeeID
    // createdBy : PDXuan(11/05/2019)
    getEmployeeId = () => {
        $("tbody.employee-list").on('click', 'tr', function () {
            $('tr').removeClass('row-selected');
            $(this).addClass('row-selected');
            $('.checkbox-icon').removeClass('active');
            $(this).children().children().addClass('active');
            let employeeId = $('.row-selected').data("employee").EmployeeID;
            $('.tab-container .overlay-loader').show();
            setTimeout(function () {
                const url = 'employees/' + employeeId;
                callApi("GET", url, '', function (res) {
                    res = res.Data;
                    $('tbody.detail').html('');
                    $('.tab-container .overlay-loader').hide();
                    $('.employeeName-row').text(res.EmployeeName);
                    $('.employeeMobile-row').text(res.Mobile);
                    $('.employeeEmail-row').text(res.Email);
                    $('.employeePhone-row').text(res.Phone);
                    $('.employeeNativeAddress-row').text(res.NativeAddress);
                    return res;
                })
               .then((result) => {
                        if (result.Admin) {
                            let rowHtml = $('<tr></tr>');
                            let rowData = '<td>' + "Quản trị viên" + '</td>' +
                                '<td>' + "Có tất cả các quyền" + '</td>'
                            rowHtml.append(rowData);
                            $('tbody.detail').append(rowHtml);
                            return;
                        }
                        callApi("GET", 'employees/role/' + employeeId, '', function (res) {
                            res = res.Data;
                            $.each(res, function (index, role) {
                                let rowHtml = $('<tr></tr>');
                                let rowData = '<td>' + role.RoleName + '</td>' +
                                    '<td>' + role.Description + '</td>'
                                rowHtml.append(rowData);
                                $('tbody.detail').append(rowHtml);
                            })

                        })
                    })
            }, 300);


        })
    }



    //Hàm thay đổi vị trí của tháng và ngày để gửi lên server đúng định dạng
    //CretedBy: PDXuan(21/06/2019)
    swapDateMonth = (date) => {
        let result;
        let arr = date.split("/");
        result = `${arr[1]}/${arr[0]}/${arr[2]}`;
        return result;
    }

    //Hàm lấy role trong list tag
    //CreatedBy: PDXuan(21/06/2019)

    getListRole = () => {
        let arrRole = [];
        let arrTag = $('.tag-label');
        $.each(arrTag, function (index, tag) {
            if (tag.innerText === "Nhân viên bán hàng") {
                arrRole.push(1);
            } else if (tag.innerText === "Thu ngân") {
                arrRole.push(2);
            }
            else if (tag.innerText === "Quản lý hàng hóa") {
                arrRole.push(3);
            }
            else if (tag.innerText === "Quản lý quỹ tiền gửi") {
                arrRole.push(4);
            }
            else if (tag.innerText === "Quản lý cửa hàng") {
                arrRole.push(5);
            }
            else if (tag.innerText === "Quản lý khuyến mại") {
                arrRole.push(6);
            }
            else if (tag.innerText === "Mua hàng") {
                arrRole.push(7);
            }
            else if (tag.innerText === "Quản lý chi phí") {
                arrRole.push(8);
            }
            else if (tag.innerText === "Quản lý kho") {
                arrRole.push(9);
            }
            else if (tag.innerText === "Quản lý kết quả kinh doanh") {
                arrRole.push(10);
            }
            else if (tag.innerText === "Kế toán") {
                arrRole.push(11);
            }
            else if (tag.innerText === "Quản lý chuỗi") {
                arrRole.push(12);
            }
            else if (tag.innerText === "Quản lý quỹ tiền mặt") {
                arrRole.push(13);
            }
            else if (tag.innerText === "Quản lý hệ thống") {
                arrRole.push(14);
            }
        })
        return arrRole;
    }


    //Hàm tạo đối tượng filter để lấy danh sách theo filter

    getFilterObject = () => {
        let pageSize = $('#pageSize :selected').text();
        let pageNumber = $('input#pageNumber').val();   
        let workingStatus = $('#workingStatusFilter :selected').text();
        let employeeName = $('#employee-name input[name=employeeName]').val();
        let gender = $("#filterGender :selected").text();
        let employeeCode = $("#employee-code input[name=employeeCode]").val();
        let mobile = $("input[name = mobileFilter]").val();
        let birthDate = $("input#datepickerFilter").val();
        let symbol = $(".filt-compare-value").text();
        let pageCounter = $(".pageCounter").text();
        let _gender = 2;
        let _workingStatus = 0;
        let BirthDate = this.swapDateMonth(birthDate);
        if (gender == "Nam") {
            _gender = 1;
        } else if (gender == "Nữ") {
            _gender = 0;
        } else if(gender == "Tất cả"){
            _gender = 2;
        }

        if (symbol == "≥") {
            symbol = ">="
        } else if (symbol == "≤") {
            symbol = "<="
        }

        if (pageNumber * 1 > pageCounter * 1) {
            pageNumber = 1;
        }

        if (workingStatus == "Chính thức") {
            _workingStatus = 1;
        } else if (workingStatus == "Thử việc") {
            _workingStatus = 2;
        } else if (workingStatus == "Nghỉ việc") {
            _workingStatus = 3;
        } else if (workingStatus = "Tất cả") {
            _workingStatus = 0;
        }
        console.log(BirthDate)

        let filterObject = {
            PageNumber: pageNumber*1,
            PageSize: pageSize*1,
            FilterGender: _gender,
            FilterWorkingStatus: _workingStatus,
            FilterEmployeeCode: employeeCode,
            FilterEmployeeName: employeeName,
            FilterEmployeeMobile: mobile,
            FilterBirthDate: birthDate ? BirthDate : "",
            FilterCompareSymbol: birthDate ? symbol : ""
        }

        return filterObject;
    }


    //Hàm tạo ra đối tượng tạm để lưu các giá trị từ tab thông tin cơ bản
    //CreatedBy : PDXuan(21/06/2019)
    tempEmployee = () => {
        let employeeCode = $('input[dataField=employeeCode]').val();
        let employeeName = $('input[dataField=employeeName]').val();
        let employeeMobile = $('input[dataField=empoyeeMobile]').val();
        let alowUseSoftWare = $('input[dataField=allowUseSoftWare]').hasClass("active") ? true : false;
        let password = $('input[dataField=password]').val();
        let identityCard = $('input[dataField=identityCard]').val();
        let identityCarDateProvider = $('input[dataField=identityCardDateProvider]').val();
        let identityCardProvider = $('input[dataField=identityCardDateProvider]').val();
        let GenderDisplay = $('div.radio-choice[dataField=employeeGender] .radio-box .active').next().text();
        let acessType = $('div.radio-choice[dataField=acessType] .radio-box .active').next().text();
        let maritalStatusDisplay = $('div.radio-choice[dataField=maritalStatus] .radio-box .active').next().text();
        let employeeBirthday = $('input[dataField=birthday]').val();
        let WorkingStateDisplay = $('input[dataField=workingStatus]').val();
        let Phone = $('input[dataField=Phone]').val();
        let Email = $('input[dataField=Email]').val();
        let NativeAddress = $('input[dataField=NativeAddress]').val();
        let NativeCountry = $('input[dataField=NativeCountry]').val();
        let NativeProvince = $('input[dataField=NativeProvince]').val();
        let NativeDistrict = $('input[dataField=NativeDistrict]').val();
        let NativeVillage = $('input[dataField=NativeVillage]').val();
        let CurrentAddress = $('input[dataField=CurrentAddress]').val();
        let CurrentCountry = $('input[dataField=CurrentCountry]').val();
        let CurrentProvince = $('input[dataField=CurrentProvince]').val();
        let CurrentDistrict = $('input[dataField=CurrentDistrict]').val();
        let CurrentVillage = $('input[dataField=CurrentVillage]').val();
        let OriginalDocumentation = $('input[dataField=OriginalDocumentation]').val();
        let JobtrialDate = this.swapDateMonth($('input[dataField=JobtrialDate]').val());
        let JobOfficicalDate = this.swapDateMonth($('input[dataField=JobOfficicalDate]').val())
        let employeeGender;
        let maritalStatus;
        let AcessType;
        let employeeWorkingState;
        let isAdmin = $('input[dataField=isAmin]').hasClass("active") ? true : false;
        let birthDate = this.swapDateMonth(employeeBirthday);
        let arrRole = this.getListRole();
        let avatarFile = $("#avatar-input").get(0).files; 
        let avatar = null;
        if (avatarFile.length > 0) {
            avatar = avatarFile[0].name;
        }
        if (isAdmin) {
            arrRole = [];
        }

        //Chuyển đổi để lấy giá trị acessType 
        if (acessType == "Truy cập tự do") {
            AcessType = 0;
        } else if (acessType == "Truy cập theo khung giờ") {
            AcessType = 1;
        }


        //Chuyển đổi để lấy giá trị maritalStatus
        if (maritalStatusDisplay == "Độc thân") {
            maritalStatus = 0;
        } else if (maritalStatusDisplay = "Đã kết hôn") {
            maritalStatus = 1;
        }

        //Lấy giá trị của gender
        if (GenderDisplay == "Nam") {
            employeeGender = 1;
        } else if (GenderDisplay == "Nữ") {
            employeeGender = 0;
        }

        //Lấy giá trị của trạng thái làm việc
        if (WorkingStateDisplay == "Chính thức") {
            employeeWorkingState = 1;
        } else if (WorkingStateDisplay == "Thử việc") {
            employeeWorkingState = 2;
        } else if (WorkingStateDisplay == "Nghỉ việc") {
            employeeWorkingState = 3;
        }

        //Tạo đối tượng employee để lưu trữ tạm thời thực thể cần thêm     
        let newEmployee = {
            EmployeeCode: employeeCode,
            EmployeeName: employeeName,
            Mobile: employeeMobile,
            AllowUseSoftWare: alowUseSoftWare,
            Password: password,
            IdentityCard: identityCard,
            IdentityCarDateProvider: identityCarDateProvider,
            IdentityCardProvider: identityCardProvider,
            WorkingStatus: employeeWorkingState,
            BirthDate: birthDate,
            Gender: employeeGender,
            MaritalStatus: maritalStatus,
            Phone: Phone,
            Email: Email,
            Avatar: avatar,
            TypeAcess: AcessType,
            NativeAddress: NativeAddress,
            NativeCountry: NativeCountry,
            NativeProvince: NativeProvince,
            NativeDistrict: NativeDistrict,
            NativeVillage: NativeVillage,
            CurrentCountry: CurrentCountry,
            CurrentProvince: CurrentProvince,
            CurrentDistrict: CurrentDistrict,
            CurrentVillage: CurrentVillage,
            CurrentAddress: CurrentAddress,
            OriginalDocumentation: OriginalDocumentation,
            JobtrialDate: JobtrialDate,
            JobOfficicalDate: JobOfficicalDate,
            RoleIDs: arrRole,
            Admin: isAdmin
        }

        if (employeeCode == '' || employeeName == '' || employeeMobile == '' || $.isNumeric(employeeMobile) == false) {
            err = true;
        }
        if (err == true) {
            this.blurInputHandler('employeeCode');
            this.blurInputHandler('employeeName');
            this.blurInputHandler('employeeMobile');
        }
        return newEmployee;
    }

    //Hàm bắt sự kiện onchange 
    //CreatedBy : PDXuan(20/05/2019)
    onChangeInputDialog = () => {
        $('#dialog input').change(function () {
            changed = true;
    })
    }

    // hàm ẩn loading cho dialog
    //CreatedBy: PDXuan(19/06/2019)
    hideLoading = () => {
        $("#dialog .overlay-loader").hide();
        $(".ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix").show();
        $(".tab-container").css("z-index", "0");
    }

    //Hàm show loading cho dialog
    //CreatedBy: PDXuan(19/06/2019)
    showLoading = () => {
        $("#dialog .overlay-loader").show();
        $(".ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix").hide();
        $(".tab-container").css("z-index", "-1");
    }
    //createdBy : PDXuan(11/5/2019)
    //Các sự kiện ui của trang
    componentUiHandler() {

        //Xử lý các tab
        $('.table-detail.customer-page .tab-container .tab-buttons button').click(function () {
            $('.table-detail.customer-page .tab-container .tab-buttons button').removeClass('active');
            let currentIndex = $(this).index();
            $(this).addClass('active');
            $(".table-detail.customer-page .tab-panel").hide();
            $(".table-detail.customer-page .tab-panel:eq(" + currentIndex + ")").fadeIn(100);
        });

        $('#dialog .tab-container .tab-buttons button').click(function () {
            $('#dialog .tab-container .tab-buttons button').removeClass('active');
            let currentIndex = $(this).index();
            $(this).addClass('active');
            $("#dialog .tab-panel").hide();
            $("#dialog  .tab-panel:eq(" + currentIndex + ")").fadeIn(100);
        });

        // Xử lý dropdown
        $('.icon-drop-down').click(function () {
            $(this).next().toggleClass('active');
            event.stopPropagation();
        })

      

        //$('.list-dropdown-item .xuan-dropdown-item ,.time-choice .time-item').click(function () {
        //    let role = $(this).text();
        //    $(this).parent().prev().prev().val(role);
        //    $(this).parent().removeClass('active');
        //})
        $(document).on( 'click','.list-dropdown-item .xuan-dropdown-item ,.time-choice .time-item', function () {
            let role = $(this).text();
            $(this).parent().prev().prev().val(role);
            $(this).parent().removeClass('active');
        })
        $(document).click(function () {
            $('.list-dropdown-item ').removeClass('active');
            $('.time-choice').removeClass('active');
        });

        //Xử lấy item của list để tạo tag
        $(document).on("mousedown", '.role-tag-picker .list-dropdown-item .xuan-dropdown-item', function() {
            let role = $(this).text();
            let taghtml = '<span class="tag-label">' + role + '<span class="delete-tag"></span></span>'
            $(this).parent().prev().prev().prepend(taghtml);
            $(this).remove();
        });
       
        //Xử lý dropdown auto hover
        $('.role-tag-picker input.dropdown-input').focusin(function () {
            if ($('.role-tag-picker .list-dropdown-item .xuan-dropdown-item').length == 0) {
                $('.role-tag-picker .list-dropdown-item').removeClass("active");
            } else {
            }
            $(".role-tag-picker .list-dropdown-item").scrollTop(0);
            $(this).parent().next().next().addClass('active').find(".xuan-dropdown-item").eq(0).addClass("hover-background");
        })
        $(' .role-tag-picker input.dropdown-input').blur(function () {
            $(this).parent().next().next().removeClass('active');
        })

        //Xử lý keydown
        $(".role-tag-picker input.dropdown-input").keydown(function (event) {
            if (event.which == 40) {
                let elementSelected = $(this).parent().next().next().find(".hover-background").next();
                if (elementSelected.hasClass("xuan-dropdown-item")) {
                    $(".hover-background").removeClass("hover-background");
                    elementSelected.addClass("hover-background");
                }
              
            }

            if (event.which == 38) {
                let elementSelected = $(this).parent().next().next().find(".hover-background").prev();
                if (elementSelected.hasClass("xuan-dropdown-item")) {
                    $(".hover-background").removeClass("hover-background");
                    elementSelected.addClass("hover-background");
                }
               
            }

            if (event.which == 13) {
                $('.role-tag-picker .list-dropdown-item .xuan-dropdown-item.hover-background').trigger("mousedown");
                $(this).parent().next().next().addClass('active').find(".xuan-dropdown-item").eq(0).addClass("hover-background");
                $(".role-tag-picker .list-dropdown-item").scrollTop(0);
            }

          
            if ($('.role-tag-picker .list-dropdown-item .xuan-dropdown-item').length == 0) {
                console.log($('.role-tag-picker .list-dropdown-item .xuan-dropdown-item').length);
                $('.role-tag-picker .list-dropdown-item').removeClass("active");
            } else {
                let scrollTop = $(".role-tag-picker .list-dropdown-item .hover-background").offset().top - 260;
                let heightTableData = $(".role-tag-picker .list-dropdown-item").height();
                if (scrollTop > heightTableData) {
                    $(".role-tag-picker .list-dropdown-item").scrollTop($(".role-tag-picker .list-dropdown-item").scrollTop() + heightTableData);
                } else if (scrollTop < 0) {
                    $(".role-tag-picker .list-dropdown-item").scrollTop($(".role-tag-picker .list-dropdown-item").scrollTop() - heightTableData + 26);
                }
            }
        });

       
        
        //radio select event
        $('.radio-box-icon').click(function () {
            let parent = $(this).parent().parent().addClass('clear-radio');
            parent.children().children().removeClass('active');
            $(this).toggleClass('active');
        })

        //time toggle 
        $('.time-picker-icon').click(function () {
            $(this).next().addClass('active');
            event.stopPropagation();
        })

        // acess to show time picker
        $('.radio-box-icon.free-acess').click(function () {
            console.log('a');
            $('.row-time-acess').removeClass('active')
        })
        $('.radio-box-icon.folow-time-slot').click(function () {
            console.log('a');
            $('.row-time-acess').addClass('active')
        })
        //checkbox active
        $('.checkbox-icon').click(function () {
            $(this).toggleClass('active');
        })


        //Xử lý checkbox Vai trò quản trị viên
        $('div.admin-role .checkbox-component input.checkbox-icon').click(function () {
            $('.role-pickder').toggle();
        });


        //Xử lý cho phép làm việc với phần mềm checkbox
        $('div.access-checkbox .checkbox-component input.checkbox-icon').click(function () {
            $('.password-toggle-access').toggle();
            $('.tab-four').toggle();         
        });

        //remove tag from list tag
        $(document).on('click', '.tag-label .delete-tag', function () {
            
            var tagContent = '<div class="xuan-dropdown-item">' + $(this).parent().text() + '</div>'
            $('.list-dropdown-item').append(tagContent);
            $(this).parent().remove();
        })
        //show tags list when input focus
        $('#tags').click(function () {
            event.stopPropagation();
            $(this).next().next().addClass('active');
        })

        //display current time 
        let today = new Date();
        $('.date-picker-input').val(today.formatddMMyyyy());

        //Hàm xử lý chức năng chuột phải
        let $contextMenu = $(".right-click-popup");
        $("body").on("contextmenu", "table.employee-table tbody tr", function (e) {
            e.preventDefault();
            $(this).parent().children('tr').not(this).removeClass('row-selected');
            $(this).addClass('row-selected');
            $('.checkbox-icon').removeClass('active');
            $(this).children().children().addClass('active');
            $contextMenu.css({
                display: "block",
                left: e.pageX,
                top: e.pageY
            });
            return false;
        });
        $('html').click(function () {
            $contextMenu.hide();
        });

        //resize table cho table
        $("#employee-code, #employee-name,#employee-gender,#employee-birthdate,#employee-code,#employee-phone-number,#employee-woking-state").resizable(
            {
                handles: "e",
            }
        );       
        //resiz cho div master và detail
        $(".table-master").resizable({

        }); 


        //Hàm xử lý thời gian truy cập
        $(document).on('click', '.store .drop-down .list-dropdown-item .xuan-dropdown-item', function () {
            if ($(this).text() == "Nghỉ việc") {
                $('button.time-access-tab').hide();
            } else {
                $('button.time-access-tab').show();
            }
        })
        //Xử lý check box
        $(document).on('focus', 'button.checkbox-icon', function () {

            $(this).parent().parent().addClass('hover-color');
        })

        $(document).on('focusout', 'button.checkbox-icon', function () {
            $(this).parent().parent().removeClass('hover-color');
        }) 
        //xử lý hiển thị datepicker
        $('.date-icon-picker').click(function () {
            $(this).next().datepicker("show");
        })
        $('.date-picker-input').datepicker({
            dateFormat: "dd/mm/yy",
            duration: "fast"
        })    
        // Xử lý show password 
        $(".eye-show-pass").click(function () {
            $(this).toggleClass("hide");
            if ($(this).hasClass("hide")) {
                $("input[dataField = password]").prop("type", "password");
            } else {
                $("input[dataField = password]").prop("type", "text");

            }
        });
    }
}
var employeeJS = new Employee();
var AddEmployeeSubDialog = new Dialog("#subdialog", "Chọn vai trò", 716, 700, buttonRoleChoiceDialog, this);
