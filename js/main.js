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
var hasbind_d = false;
var hasbind_e = false;
var hasbind_f = false;
var hasbind_g = false;
var hasbind_h = false;
var hasbind_help = false;
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
  if ($(this).attr('data-mod') == "a") {  //一
    searchlock = true;
    $('.a').show();
	$('.b').hide();
    $('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('.f').hide();
	$('.g').hide();
	$('.h').hide();
	$('.help').hide();
	$('.articlebox').hide();
    if (!hasbind_a) {
      bindarrow_a();
      hasbind_a = true;
    }
  
  }else if ($(this).attr('data-mod') == "b"){  //二
    searchlock = true;
    $('.a').hide();
	$('.b').show();
    $('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('.f').hide();
	$('.g').hide();
	$('.h').hide();
	$('.help').hide();
	$('.articlebox').hide();
    if (!hasbind_b) {
      bindarrow_b();
      hasbind_b = true;
    }
	}else if ($(this).attr('data-mod') == "c"){  //三
	  searchlock = true;
    $('.a').hide();
	$('.b').hide();
    $('.c').show();
	$('.d').hide();
	$('.e').hide();
	$('.f').hide();
	$('.g').hide();
	$('.h').hide();
	$('.help').hide();
	$('.articlebox').hide();
    if (!hasbind_c) {
      bindarrow_c();
      hasbind_c = true;
    }
  }else if ($(this).attr('data-mod') == "d"){  //四
	  searchlock = true;
    $('.a').hide();
	$('.b').hide();
    $('.c').hide();
	$('.d').show();
	$('.e').hide();
	$('.f').hide();
	$('.g').hide();
	$('.h').hide();
	$('.help').hide();
	$('.articlebox').hide();
    if (!hasbind_d) {
      bindarrow_d();
      hasbind_d = true;
    }
  }else if ($(this).attr('data-mod') == "e"){  //五
	  searchlock = true;
    $('.a').hide();
	$('.b').hide();
    $('.c').hide();
	$('.d').hide();
	$('.e').show();
	$('.f').hide();
	$('.g').hide();
	$('.h').hide();
	$('.help').hide();
	$('.articlebox').hide();
    if (!hasbind_e) {
      bindarrow_e();
      hasbind_e = true;
    }
  }else if ($(this).attr('data-mod') == "f"){  //六
	  searchlock = true;
    $('.a').hide();
	$('.b').hide();
    $('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('.f').show();
	$('.g').hide();
	$('.h').hide();
	$('.help').hide();
	$('.articlebox').hide();
    if (!hasbind_f) {
      bindarrow_f();
      hasbind_f = true;
    }
  }else if ($(this).attr('data-mod') == "g"){  //七
	  searchlock = true;
    $('.a').hide();
	$('.b').hide();
    $('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('.f').hide();
	$('.g').show();
	$('.h').hide();
	$('.help').hide();
	$('.articlebox').hide();
    if (!hasbind_g) {
      bindarrow_g();
      hasbind_g = true;
    }
  }else if ($(this).attr('data-mod') == "h"){  //八
	  searchlock = true;
    $('.a').hide();
	$('.b').hide();
    $('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('.f').hide();
	$('.g').hide();
	$('.h').show();
	$('.help').hide();
	$('.articlebox').hide();
    if (!hasbind_h) {
      bindarrow_h();
      hasbind_h = true;
    }
  }else if ($(this).attr('data-mod') == "help"){  //导引
	  searchlock = true;
    $('.a').hide();
	$('.b').hide();
    $('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('.f').hide();
	$('.g').hide();
	$('.h').hide();
	$('.help').show();
	$('.articlebox').hide();
    if (!hasbind_help) {
      bindarrow_help();
      hasbind_help = true;
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
function bindarrow_d() {
  $('.d').children().children().children().children('.arrow').click(function() {
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
function bindarrow_e() {
  $('.e').children().children().children().children('.arrow').click(function() {
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
function bindarrow_f() {
  $('.f').children().children().children().children('.arrow').click(function() {
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
function bindarrow_g() {
  $('.g').children().children().children().children('.arrow').click(function() {
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
function bindarrow_h() {
  $('.h').children().children().children().children('.arrow').click(function() {
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
function bindarrow_help() {
  $('.help').children().children().children().children('.arrow').click(function() {
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
    $(".a").animate({scrollTop:0},350);
    $(".b").animate({scrollTop:0},350);
    $(".c").animate({scrollTop:0},350);
	$(".d").animate({scrollTop:0},350);
	$(".e").animate({scrollTop:0},350);
	$(".f").animate({scrollTop:0},350);
	$(".g").animate({scrollTop:0},350);
	$(".h").animate({scrollTop:0},350);
	$(".i").animate({scrollTop:0},350);
	$(".help").animate({scrollTop:0},350);
  }
)
}
bindtotop2();
