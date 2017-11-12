$(function(){
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        success:function(data){
            console.log(data);
            $('.lt_content_l .mui-scroll').html(template('leftTmp',data));

            renderSecond(data.rows[0].id);
        }
    })

    function renderSecond(id){
        $.ajax({
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(data){
                console.log(data);
                $('.lt_content_r .mui-scroll').html(template('rightTmp',data));
            }

        })
    }

    $('.lt_content_l').on('click','li',function(){
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).data('id');
        renderSecond(id);

        // 滚动到顶部
        var temp = mui('.mui-scroll-wrapper').scroll()[1];
        temp.scrollTo(0,0,500);
    })

    
})