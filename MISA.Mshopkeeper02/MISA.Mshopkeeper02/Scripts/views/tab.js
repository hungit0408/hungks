 //Hàm xử lý hiển thị tab
 //CreateedBy: PDXuan(2/5/2019)
$(document).ready(function () {
    $('.tab-container .tab-buttons button').click(function () {
        $('.tab-container .tab-buttons button').removeClass('active');
        var currentIndex = $(this).index();
        $(this).addClass('active');
        $(".tab-panel").hide();
        $(".tab-panel:eq(" + currentIndex + ")").fadeIn(100);
    });
})