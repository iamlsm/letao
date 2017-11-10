$(function(){
   var currentPage = 1;
   var pageSize = 2;
   function render(){
    $.ajax({
        url:"/category/queryTopCategoryPaging",
        data:{
             page:currentPage,
             pageSize:pageSize
        },
        success:function(data){
            console.log(data);
            $('tbody').html(template('listTmp',data));
 
         //分页
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


    //点击添加分类
    $('.btn-add').on('click',function(){
        $('#add_modal').modal();  
    })

    var $form = $("form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'请输入一级分类'
                    }
                }
               
            }
          }
    })
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:$form.serialize(),
            success:function(data){
                $('#add_modal').modal('hide'); 
                currentPage = 1;
                render();

                $form.data('bootstrapValidator').resetForm();
                $form[0].reset();
            }

        })

    })
})