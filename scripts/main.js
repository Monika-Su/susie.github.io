/**
 * Created by susie.su on 10/08/2017.
 */
$().ready(() => {
    var str2='';
    $.getJSON('./conf/function.json', (data) => {
        var str='';
        for(let i in data) {
            if(data.hasOwnProperty(i)){
                //console.log(i);
                if(i!=='total'){
                    str=`<li><a href="./detail.html#${i}">${i}</a></li>`;
                    $("#func_list").append(str);
                }
            }
        }
    });
    var cn;
    var hk;
    var hk_en;
    var tw;
    var mo;
    var overview={};
    $("#tab>ul li").click(function(e){
         var current=e.target;
        $(current).addClass("active");
        $(current).siblings().removeClass("active");
       });
    function showdata(a){
        let Date=[];
        let str = '';
        let map={};
        $.each(a,function(i,list) {
            map[list.Category] = map[list.Category] || {
                    Total_Words: 0,
                    Words_to_Edit: 0,
                    Words_to_Translate: 0,
                    data: []
                };
            map[list.Category].data.push(list);
            map[list.Category].Total_Words +=Number(list.Total_Words);
            map[list.Category].Words_to_Edit +=Number(list.Words_to_Edit);
            map[list.Category].Words_to_Translate +=Number(list.Words_to_Translate);
        });
        for(m in map) {
            if (map.hasOwnProperty(m)) {
                Date.push(m)
            }
        }
        Date.sort();
        Date.forEach(p=> {
            map[p].data.forEach(index=>{
                str += `<tr class="th_${index.Writer_ISV.due_day}">
                   <td>${index.Category}</td>
                   <td><a href="${index.Radar}">${index.Radar}</a></td>
                   <td>${index.Assignee}</td>
                   <td><a href="${index.Geo_Locale_URL}">${index.Geo_Locale_URL}</a></td>
                   <td>${index.Total_Words}</td>
                   <td>${index.Writer_ISV.due_day}</td>
                   <td>${index.Over_due_date}</td>
                  `;
                str += '</tr>';
            });
            str+=`<tr class="th_total">
                       <td class="th_Category"></td>
                       <td class="th_Radar"></td>
                        <td class="th_Assignee"></td>
                       <td class="th_Geo_Locale_URL"></td>          
                       <td class="th_Total_Words">${map[p].Total_Words}</td>              
                       <td class="th_Over_due_date"></td>
                       <td class="th_Writer_ISV.due_day"></td>                  
                      </tr>`;

        });
         $("#index_list").html(str);
        $("select").change(function (e) {
            select();
        });
        function select() {
            let currentdate=$("select").find(":selected").val();
            $("#index_list").find("tr").each(function () {
                let content=$(this).attr("class").substr(3);
                if((content==='')||(content==="total")){
                    $(this).hide();
                }
                else {
                    if((content!==currentdate)){
                        $(this).hide();
                    }
                    else{
                        $(this).show();
                    }
                }
                if(currentdate==="Due Date"){
                    $(this).show();
                }
            })
        }
            select()
    }
    $.getJSON('./conf/HKEN.json',function (data_HKEN) {
        hk_en=data_HKEN.HKEN;
        overview.HKEN=(hk_en);
        $("#hk_en").click(function () {
            if($("#index_list").html()!=='') {
                $("#index_list").html('');
                showdata(hk_en);
            }
        });
        $.getJSON('./conf/CN.json',function (data_CN) {
        cn=data_CN.CN;
        overview.CN=cn;
        $("#cn").click(function () {
            if($("#index_list").html()!=='') {
                $("#index_list").html('');
                    showdata(cn);
            }
        });
        $.getJSON('./conf/HK.json',function (data_HK) {
                hk=data_HK.HK;
                overview.HK=hk;
                $("#hk").click(function () {
                    if($("#index_list").html()!=='') {
                        $("#index_list").html('');
                        showdata(hk);
                    }
                });
        $.getJSON('./conf/TW.json',function (data_TW) {
                tw=data_TW.TW;
                  overview.TW=tw;
                  $("#tw").click(function () {
                      if($("#index_list").html()!=='') {
                          $("#index_list").html('');
                          showdata(tw);
                      }
                  });
        $.getJSON('./conf/MO.json',function (data_MO) {
          mo=data_MO.MO;
           overview.MO=mo;
            $("#mo").click(function () {
               if($("#index_list").html()!=='') {
                 $("#index_list").html('');
                  showdata(mo);
               }
            });
            let newData=[];
            $.each(overview,function(i,item){
                  for(j in item) {
                      let itemlist = item[j];
                      newData.push(itemlist);
                      $("#over").click(function () {
                          if ($("#index_list").html() !== '') {
                              $("#index_list").html('');
                              showdata(newData)

                          }
                      });
                  }
                showdata(newData);
             })
        });
        });
        });
        });
    });
 });
/*
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var chart = new Chart(context,{
    type: 'pie',
    data: {
        labels: ["dev", "Blue", "Yellow", "Green", "Purple"],
        datasets: [{
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: 'black'
            }
        },
    }
});
var canvas1 = document.getElementById("canvas1");
var context1 = canvas1.getContext("2d");
var chart1 = new Chart(context1,{
    type: 'pie',
    data: {
        labels: ["dev", "Blue", "Yellow", "Green", "Purple"],

        datasets: [{
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: 'black'
            }
        }
    }
});
var canvas2 = document.getElementById("canvas2");
var context2 = canvas2.getContext("2d");
var chart2 = new Chart(context2,{
    type: 'pie',
    data: {
        labels: ["dev", "Blue", "Yellow", "Green", "Purple"],

        datasets: [{
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: 'black'
            }
        }
    }
});*/
