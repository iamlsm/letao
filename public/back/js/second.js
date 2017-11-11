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
            console.log('qwert');
        }

   })
})