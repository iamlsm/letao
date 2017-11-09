//关闭进度环
NProgress.configure({ showSpinner: false });

$(document).ajaxStart(function () {
  NProgress.start();
});

$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500);
});

// 检测是否是登陆页
if(location.href.indexOf('login.html') == -1){
  $.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    success:function(data){
      // console.log(data);
      if(data.error==400){
        location.href = "login.html";
      }
      
    }
  })

}

$('.btn_menu').on('click',function(){
  $('.lt-slide').toggleClass('now');
  $('.lt-main').toggleClass('now');
})

$('.child').prev().on('click',function(){
  $(this).next().slideToggle();
})

$('.btn_layout').on("click",function(){
  $(".modal").modal();
  })
  $('.btn_confirm').on('click',function(){
    // console.log('hhh');
    $.ajax({
      url:'/employee/employeeLogout',
      success:function(data){
        if(data.success){
          location.href="login.html";
  
        }
      }
    })
})


