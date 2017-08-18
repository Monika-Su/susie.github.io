/**
 * Created by Edel on 2017/8/9.
 */
$().ready(() => {
    let func = location.hash.length > 1 ? location.hash.substr(1) : 'total';
    function compare(property){
        return function(a,b){
            var value1 = a[property].toLowerCase();
            var value2 = b[property].toLowerCase();
            if(value1>value2){
                //console.log(value1,value2);
                return -1;
            }
            if(value1<value2){
                return 1;
            }
        }
    };
    function common(a){
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
                let list=index;
                str += '<tr>';
                for (i in list) {
                    if (list.hasOwnProperty(i)) {
                        if (typeof list[i]!== 'object') {
                            if((i==="Reference_URL")||(i==="Geo_Locale_URL")||(i==="Radar")){
                                str += `<td class="th_${i}"><a href="${list[i]}">${list[i]}</a></td>`;
                            }
                            else{
                                str += `<td class="th_${i}">${list[i]}</td>`;
                            }
                        }
                        else {
                            for (j in list[i]) {
                                if (list[i].hasOwnProperty(j)) {
                                    str += `<td class="th_${i}">${list[i][j]}</td>`;

                                }
                            }
                        }

                    }
                }
                str += '</tr>';
                //console.log(map[p]);
                // for(m in list){
                //     if (list.hasOwnProperty(m)) {
                //         if (typeof list[m] !== 'object') {
                //            // console.log(m);
                //             if (m === "Total_Words") {
                //               // list.Total_Words=map[p].Total_Words;
                //                 str += `<td class="th_${m}">${map[p].Total_Words}</td>`;
                //             }
                //            else if (m === "Words_to_Translate") {
                //                // list.Words_to_Translate=map[p].Words_to_Translate;
                //                 str += `<td class="th_${m}">${map[p].Words_to_Translate}</td>`;
                //             }
                //            else if (m === "Words_to_Edit") {
                //                 //list.Words_to_Edit=map[p].Words_to_Edit;
                //                 str += `<td class="th_${m}">${map[p].Words_to_Edit}</td>`;
                //             }
                //             else{
                //                 str += `<td class="th_${m}"></td>`;
                //             }
                //         }
                //         else {
                //             for (k in list[m]) {
                //                 if (list[m].hasOwnProperty(k)) {
                //                     str += `<td class="th_${m}"></td>`;
                //
                //                 }
                //             }
                //         }
                //     }
                // }

             });
            str+=`<tr class="th_total">
                       <td class="th_Category"></td>
                       <td class="th_Radar"></td>
                       <td class="th_Page_Name"></td>
                       <td class="th_Reference_URL"></td>
                       <td class="th_Geo_Locale_URL"></td>
                       <td class="th_Notes"></td>
                       <td class="th_WS_ID"></td>
                       <td class="th_WS_Task"></td>
                       <td class="th_Words_to_Translate">${map[p].Words_to_Translate}</td>
                       <td class="th_Words_to_Edit">${map[p].Words_to_Edit}</td>
                       <td class="th_Total_Words">${map[p].Total_Words}</td>
                       <td class="th_Assignee"></td>
                       <td class="th_Fresh_Eye"></td>
                       <td class="th_CD_Review"></td>
                       <td class="th_Type"></td>
                       <td class="th_Over_due_date"></td>
                       <td class="th_Writer_ISV"></td>
                       <td class="th_Writer_ISV"></td>
                       <td class="th_CD_ISV"></td>
                       <td class="th_CD_ISV"></td>
                       <td class="th_CD_ISV"></td>
                       <td class="th_Art_CD_ISV"></td>
                       <td class="th_Art_CD_ISV"></td>
                       <td class="th_XF_ISV"></td>
                       <td class="th_XF_ISV"></td>
                       <td class="th_Graphic"></td>
                       <td class="th_Graphic"></td>
                      </tr>`;
        });
        $("#res_table").append(str);
    }
    $("#nav>ul li").click(function(e){
        var current=e.target;
        $(current).addClass("active");
        $(current).siblings().removeClass("active");
    });
    $("#sideIcon").click(function(){
       var textIcon=$("#sideIcon").text();
        if(textIcon=="<"){
            $("#sideIcon").text(">");
        }
        else{
            $("#sideIcon").text("<");
        }
    });
    function hide(){
            let show=$(":checked");
            let no=$("input:checkbox").not("input:checked");
            //console.log(no);
                $.each(show,function(i,index){
                    let id=$(index).attr("id");
                    let cat=id.substr(4);
                    $(`.th_${cat}`).show();
                });
                $.each(no,function (i,index) {
                    let id=$(index).attr("id");
                    let cat=id.substr(4);
                    $(`.th_${cat}`).hide();
                });
    }
    $.getJSON('./conf/HKEN.json', hkdata => {
        let HKEN = hkdata.HKEN;
        common(HKEN);
        $("#hk_en").click(function () {
            if ($("#res_table").html() !== '') {
                $("#res_table").html('');
            }
            common(HKEN);
            hide();
        });

    });
    $.getJSON('./conf/CN.json',data=>{
        let CN=data.CN;
        $("#cn").click(function(){
            if($("#res_table").html()!==''){
                $("#res_table").html('');
            }
            common(CN);
            hide();

        })
    })
    $.getJSON('./conf/HK.json',data=>{
        let HK=data.HK;
        $("#hk").click(function(){
            if($("#res_table").html()!==''){
                $("#res_table").html('');
            }
            common(HK);
            hide();
        })
    })
    $.getJSON('./conf/TW.json',data=> {
        var TW=data.TW;
        $("#tw").click(function () {
            if ($("#res_table").html() !== '') {
                $("#res_table").html('');
            }
            common(TW);
            hide();
        })
    })
    $.getJSON('./conf/MO.json',data=> {
        var MO=data.MO;
        $("#mo").click(function () {
            if ($("#res_table").html() !== '') {
                $("#res_table").html('');
            }
            common(MO);
            hide();
        })
    })
    $.getJSON('./conf/function.json', data => {
            //console.log(data);
            if (data && data['total'] && data[func]) {
                let str = '';
                data['total'].map(item => {
                    str += `<li>
                               <span>${item}</span>
                               <input id="ckb_${item}" type="checkbox" ${data[func].indexOf(item) === -1 ? '' : 'checked="checked"'} />
                               </li>`;
                    if (data[func].indexOf(item) === -1) {
                        $(`.th_${item}`).hide()
                    }
                });
                $("#check_list").append(str);
                $("input[type='checkbox']").click((e) => {
                    let obj = e.target;
                    let cat = obj.id.substr(4);
                    if (obj.checked) {
                        $(obj).attr('checked',"checked");
                        $(`.th_${cat}`).show();
                    } else {
                        $(obj).removeAttr('checked',"checked");
                        $(`.th_${cat}`).hide();
                    }
                })
            }
    });
});
