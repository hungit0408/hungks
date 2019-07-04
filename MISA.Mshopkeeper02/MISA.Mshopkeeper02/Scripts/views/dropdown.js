//CreatedBy NNLam
/* mở dropdown */
function myDropdown(name) {
    document.getElementById(name).classList.toggle("show");
}


// đóng dropdown khi chọn xong hoặc kích chuột ra ngoài
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//thay đổi text hiển thị trên input khi chọn seclect
function changeValue(selectId, inputId) {
    var sel = document.getElementById(selectId);
    var input = document.getElementById(inputId);
    input.value = sel.options[sel.selectedIndex].text;
}

$(document).ready(function () {

})
