//シート取得　最終行取得
const active_sheet = SpreadsheetApp.getActiveSheet();
const rows = active_sheet.getLastRow();

const url = ''; //webhook url

function check(e) {

  //配列設定
  var par_array = [0,0];
  var desk_array = [0,0];
  var chair_arry = [0,0];

  //ループ処理
  for(i = 2;i <= rows;i++){

    //物品　日程の範囲設定
    let par_range = active_sheet.getRange('J' + i);
    let par_value = par_range.getValue();

    let desk_range = active_sheet.getRange('N' + i);
    let desk_value = desk_range.getValue();

    let chair_range = active_sheet.getRange('M' + i);
    let chair_value = chair_range.getValue();

    //選択別の配列処理
    if(par_value == '両日'){
      par_array[0] += 1;
      par_array[1] += 1;

      if(desk_value == '1個'){
        desk_array[0] += 1;
        desk_array[1] += 1;
      }else if(desk_value == '2個'){
        desk_array[0] += 2;
        desk_array[1] += 2;
      }

      if(chair_value == '1個'){
        chair_arry[0] += 1;
        chair_arry[1] += 1;
      }else if(chair_value = '2個'){
        chair_arry[0] += 2;
        chair_arry[1] += 2;
      }

    }
    if(par_value == '10月27日（土）'){
      par_array[0] += 1;

      if(desk_value == '1個'){
        desk_array[0] += 1;
      }else if(desk_value == '2個'){
        desk_array[0] += 2;
      }

      if(chair_value == '1個'){
        chair_arry[0] += 1;
      }else if(chair_value = '2個'){
        chair_arry[0] += 2;
      }

    }
    if(par_value == '10月28日（日）'){
      par_array[1] += 1;

      if(desk_value == '1個'){
        desk_array[1] += 1;
      }else if(desk_value == '2個'){
        desk_array[1] += 2;
      }

      if(chair_value == '1個'){
        chair_arry[1] += 1;
      }else if(chair_value = '2個'){
        chair_arry[1] += 2;
      }
    }

  }

  //日時取得
  const date = new Date();
  const formattedDate = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss');

  //メッセージ作成
  const message =
  `=========================
更新日時：${formattedDate}
10月27日/${par_array[0]}人
机/${desk_array[0]}個 椅子/${chair_arry[0]}個
10月28日/${par_array[1]}人
机/${desk_array[1]}個 椅子/${chair_arry[1]}個
=========================
  `;

  const headers = {
      'Content-Type': 'application/json',
  };

  const payload = {
    text: message,
  };

  //メッセージオプション設定
  const options = {
    headers,
    method: 'post',
    payload: JSON.stringify(payload),
  };

  //送信
  UrlFetchApp.fetch(url, options);
}
