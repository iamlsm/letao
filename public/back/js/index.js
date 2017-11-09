$(function(){
      //初始化echarts实例
      var myChart = echarts.init(document.querySelector('.pic-left'));
     //指定图标的配置和数据
     var option = {
        title:{
            text:'2017年注册人数'
        },
        tooltip:{},
        legend:{
            data:['人数']
        },
        xAxis:{
            data:["1月","2月","3月","4月","5月","6月"]
        },
        yAxis:{

        },
        series:[{
            name:'人数',
            type:'bar',
            data:[1200,2000,1000,1600,4000,2400]
        }]
    };
  

    //使用制定的配置项和数据显示图表
    myChart.setOption(option);


    var myChart = echarts.init(document.querySelector('.pic-right'));
    option = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','安踏','李宁','百伦']
        },
        series : [
            {
                name: name,
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'安踏'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'百伦'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    
    myChart.setOption(option);



    
})