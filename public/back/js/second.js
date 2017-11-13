$(function(){
    var currentPage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                // console.log(data);
                $('tbody').html(template('listTmp',data));

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,    //版本
                    currentPage:currentPage,    //当前页数
                    totalPages:Math.ceil(data.total/pageSize),    //所有数据可以显示的页数
                    onPageClicked:function(e,originalEvent,type,page){
                        currentPage = page;
                        render();
                    }
                })
            }

        })
    }
    render();

    $('.btn-add').on('click',function(){
        $('#add_modal').modal();
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:100
            },
            success:function(data){
                console.log(data);
                $('.dropdown-menu').html(template('addTmp',data));
            }
        })
    })
   $('.dropdown-menu').on('click','a',function(){
       $('.dropdown-text').text($(this).text());
       $('#categoryId').val($(this).data('id'));
   })

   $('#uploadFile').fileupload({
         dataType: 'json',
         done: function (e, data) {
            // console.log('图片上传完成拉');
            // console.log(data);
            $('.img_box img').attr('src',data.result.picAddr);
            $('#brandLogo').val(data.result.picAddr);
        }
   })



    //表单校验
    $form = $('form');
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            }, 
            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入二级分类的名称'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传图片'
                    }
                }
            }
          }
    })


    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            url:'/category/addSecondCategory',
            type:'post',
            data:$form.serialize(),
            success:function(data){
                $('#add_modal').modal('hide');
                currentPage = 1;
                render();

                $form[0].reset();
                $form.data('bootstrapValidator').resetForm();
                $('.dropdown-text').text('请输入一级分类');
                $('.img_box img').attr('src','../images/none.png')
                $('#categoryId').val('');
                $('#brandLogo').val('');
            }
        })

    })
})