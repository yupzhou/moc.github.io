// 导入样式
$('.input-group').on('focus', '.form-control', function () {
  $(this).closest('.input-group, .form-group').addClass('focus');
}).on('blur', '.form-control', function () {
  $(this).closest('.input-group, .form-group').removeClass('focus');
});
$("select").select2({dropdownCssClass: 'dropdown-inverse'});
var hasbind_a = false;
var hasbind_b = false;
var hasbind_c = false;
var search_mode = 'a'; //搜索方式
//首页下拉菜单
$('#searchmode').change(function(event) {
  search_mode = this.value;
});

//导航栏
$(".searchmethod").click(function() {
  if (($(this).attr('data-mod') == search_mode) && ($('.dicindex').css("visibility") == "visible")) {
    return;
  }
  $('.searchmethod').removeClass('active');
  // console.log(search_mode);
  $(this).addClass('active');
  if ($(this).attr('data-mod') == "a") {  //附錄
    searchlock = true;
    $('.a').show();
	$('.b').hide();
    $('.c').hide();
	$('.articlebox').hide();
    if (!hasbind_a) {
      bindarrow_a();
      hasbind_a = true;
    }
  
  }else if ($(this).attr('data-mod') == "b"){  //方言·音调
    searchlock = true;
    $('.a').hide();
	$('.b').show();
    $('.c').hide();
	$('.articlebox').hide();
    if (!hasbind_b) {
      bindarrow_b();
      hasbind_b = true;
    }
	}else if ($(this).attr('data-mod') == "c"){  //關於
	  searchlock = true;
    $('.a').hide();
	$('.b').hide();
    $('.c').show();
	$('.articlebox').hide();
    if (!hasbind_c) {
      bindarrow_c();
      hasbind_c = true;
    }
  }
  
})
//----------------------------------------------------------------------------------//
//注册后两页箭头
function bindarrow_a() {
  $('.a').children().children().children().children('.arrow').click(function() {
    console.log($(this).hasClass('arrow-open'));
    if ($(this).hasClass('arrow-open')) {
      $(this).removeClass('arrow-open');
      $(this).parent().next().hide();
    }else {
      $(this).addClass('arrow-open');
      $(this).parent().next().show();
    }
  })
}
function bindarrow_b() {
  $('.b').children().children().children().children('.arrow').click(function() {
    console.log($(this).hasClass('arrow-open'));
    if ($(this).hasClass('arrow-open')) {
      $(this).removeClass('arrow-open');
      $(this).parent().next().hide();
    }else {
      $(this).addClass('arrow-open');
      $(this).parent().next().show();
    }
  })
}
function bindarrow_c() {
  $('.c').children().children().children().children('.arrow').click(function() {
    console.log($(this).hasClass('arrow-open'));
    if ($(this).hasClass('arrow-open')) {
      $(this).removeClass('arrow-open');
      $(this).parent().next().hide();
    }else {
      $(this).addClass('arrow-open');
      $(this).parent().next().show();
    }
  })
}

// 生成返回顶部2
function bindtotop2() {
  $('.backtotop').click(function() {
    $(".articlebox").animate({scrollTop:0},350);
    $(".otherbox").animate({scrollTop:0},350);
    $(".diabox").animate({scrollTop:0},350);
    $(".helpbox").animate({scrollTop:0},350);
  }
)
}
bindtotop2();
