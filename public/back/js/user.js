$(function(){
    var currentpage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            url:'/user/queryUser',
            type:"get",
            data:{
                page:currentpage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
    
                var html = template("userTmp",data);
                $('tbody').html(html);


                // 分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentpage:currentpage,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function(a,b,c,page){
                        currentpage = page;
                        render();
                    }      
                })
               
            }
        })
    }
    render();

    $('tbody').on('click','.btn',function(){
        $('#userModal').modal();
        var id = $(this).parent().data('id');
        var isDelete  = $(this).hasClass('btn-danger')?0:1;
        $('.btn_edit').off().on('click',function(){
            
            $.ajax({
                url:'/user/updateUser',
                type:'post',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(data){
                   if(data.success){
                        $('#userModal').modal('hide');
                        render();
                   }
                }
            })
        })
    })
    
})