$(function(){
    var $form = $('form');
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields:{
              username:{
                  validators:{
                      notEmpty:{
                          message:"用户名不能为空"
                      },
                      callback:{
                          message:'用户名不存在！'
                      }
                  }
              },
              password:{
                  validators:{
                      notEmpty:{
                          message:"密码不能为空"
                      },
                      stringLength:{
                          min:6,
                          max:12,
                          message:"密码长度是6-12位"
                      },
                      callback:{
                          message:"密码错误"
                      }
                  }
              }

          }
    })
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            type:"post",
            success:function(data){
                console.log(data);
                if(data.error==1000){
                    $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if(data.error==1001){
                    $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
                if(data.success==true){
                    location.href="index.html";
                }
            }
        })

    })
    $('[type="reset"]').on('click',function(){
        $form.data('bootstrapValidator').resetForm();
    })
})