﻿//CreatedBy: NNLam (28/4/2019)
$(document).ready(function () {
    // Load toolbar cho trang:
    var sideBarJs = new SideBarJS();
    sideBarJs.loadSideBarHtml();
})
class SideBarJS {
    constructor() {
    }
    //load sideBar cho trang
    loadSideBarHtml() {
        var toolbarHtml = '<div class="left-menu">'
            + '<ul>'
            + '<li class="sidebar-menu menu-overview">'
            + '<div>'
            + '<div class="icon-menu icon-menu-overview " ></div >'
            +'<div class="text-menu">'
            +'Tổng quan'
             +'</div>'
                +'</div >'
            +'</li >'
            +'<li class="sidebar-menu menu-buy">'
                +'<div>'
                    +'<div class="icon-menu icon-menu-buy"></div>'
                    +'<div class="text-menu">'
                        +'Mua hàng'
                            +'</div>'
                +'</div>'
            +'</li>'
            +'<li class="sidebar-menu menu-inventory">'
                +'<div>'
                    +'<div class="icon-menu icon-menu-inventory"></div>'
                    +'<div class="text-menu">'
                        +'Kho'
                            +'</div>'
                +'</div>'
            +'</li>'
            +'<li class="sidebar-menu menu-cash">'
                +'<div>'
                    +'<div class="icon-menu icon-menu-cash"></div>'
            +'<div class="text-menu">'
            +'Quỹ tiền'
            +'</div>'
            +'</div>'
            +'</li>'
            +'<li class="sidebar-menu menu-cost">'
            +'<div>'
            +'<div class="icon-menu icon-menu-cost"></div>'
            +'<div class="text-menu">'
            +'Chi phí'
            +'</div>'
            +'</div>'
            +'</li>'
            +'<li class="sidebar-menu menu-promotion">'
            +'<div>'
            +'<div class="icon-menu icon-menu-promotion"></div>'
            +'<div class="text-menu">'
            +'Khuyến mại'
            +'</div>'
            +'</div>'
            +'</li>'
            +'<li class="sidebar-menu menu-dictionary">'
            +'<div>'
            +'<div class="icon-menu icon-menu-dictionary"></div>'
            +'<div class="text-menu">'
            +'Danh mục'
            +'</div>'
            +'</div>'
            +'</li>'
            +'<li class="sidebar-menu menu-report">'
            +'<div>'
            +'<div class="icon-menu icon-menu-report"></div>'
            +'<div class="text-menu">'
            +'Báo cáo'
            +'</div>'
            +'</div>'
            +'</li>'
            +'<li class="sidebar-menu menu-setting">'
            +'<div>'
            +'<div class="icon-menu icon-menu-setting"></div>'
            +'<div class="text-menu">'
            +'Thiết lập'
            +'</div>'
            +'</div>'
            +'</li>'
            +'<li class="sidebar-menu menu-product">'
            +'<div>'
            +'<div class="icon-menu icon-menu-product"></div>'
            +'<div class="text-menu">'
            +'Sản phẩm'
            +'</div>'
            +'</div>'
            +'</li>'
            +'</ul >'
            +'</div > '
            ;
        $('div.misa-sidebar').append(toolbarHtml);
    }
}
