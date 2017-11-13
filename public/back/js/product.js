$(function(){
    var currentPage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
                $('tbody').html(template('listTmp',data));
    
                // 分页渲染
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

    $('.btn-add').on('click', function(){
        $('#add_modal').modal();
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
                $('.dropdown-menu').html(template('addTmp',data));
            }
        })
    })

    $('.dropdown-menu').on('click','a',function(){
        $('.dropdown-text').text($(this).text());
        $('#brandId').val($(this).data('id'));
        $form.data('bootstrapValidator').updateStatus('brandId','VALID');
    })

    $('#uploadFile').fileupload({
        dataType:'json',
        done:function(e,data){
           if($('.img_box').find('img').length >= 3){
            return false;
           }
            $('.img_box').append('<img data-name="'+data.result.picName+'" data-src="'+data.result.picAddr+'" src="'+data.result.picAddr+'" width="100" height="100" alt="">');

          if($('.img_box').find("img").length==3){
            $form.data('bootstrapValidator').updateStatus('productLogo','VALID');
          }else{
            $form.data("bootstrapValidator").updateStatus('productLogo', "INVALID");
          }

          $('.img_box').find('img').off().on('dblclick', function(){
              $(this).remove();
              if($('.img_box').find("img").length==3){
                $form.data('bootstrapValidator').updateStatus('productLogo','VALID');
              }else{
                $form.data("bootstrapValidator").updateStatus('productLogo', "INVALID");
              }
          })
        }
    })

    var $form = $('form');
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级分类'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'请输入商品名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入商品描述'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入商品价格'
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请输入商品库存'
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'请输入正确的数字'
                    }
                    
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:'请输入商品尺码'
                    },
                    regexp:{
                            regexp:/^\d{2}-\d{2}$/,
                            message:'请输入正确的尺码(比如：30-50)'
                        }
                    
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入商品原价'
                    }
                }
            },
            productLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传三张图片'
                    }
                }
            }
        }
    })

    $form.on('success.form.bv',function(e){
        e.preventDefault();
        var data = $form.serialize();
        var $img = $('.img_box img');
        data+="&picName1=" + $img[0].dataset.name+"&picAddr1="+$img[0].dataset.src;
        data+="&picName2=" + $img[1].dataset.name+"&picAddr2="+$img[1].dataset.src;
        data+="&picName3=" + $img[2].dataset.name+"&picAddr3="+$img[2].dataset.src;
        $.ajax({
            url:'/product/addProduct',
            type:'post',
            data:data,
            success:function(data){
                if(data.success){
                    $('#add_modal').modal('hide');
                    currentPage = 1;
                    render();
                }
               $form[0].reset();
               $form.data('bootstrapValidator').resetForm();
               $('brandId').val('');
               $('.img_box img').remove();
               $('#productLogo').val('');
            }
        })
    })
    
})