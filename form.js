function sendToSlack(e) {

    //定数宣言&変数宣言
    const url = ''; //webhook url
    const itemResponses = e.response.getItemResponses();
    let responseString = '';
    let email = e.response.getRespondentEmail();
    const manager = ['','','','','','','']; //毎週の担当者
  
    //フォームの回答を回収
    for (const item of itemResponses) {
      const title = item.getItem().getTitle();
      const response = item.getResponse();
  
      responseString += `*\`${title}\`*\n${response}\n`;
    }
  
    //日時取得
    const date = new Date();
    const day = date.getDay();
    const formattedDate = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss');
  
  
    //メッセージの中身
    const message = `=========================
  :inbox_tray: *申し込みを受け付けました*
  =========================
  ${responseString}
  募集対象：フリーマーケット
  メールアドレス：${email}
  担当者：${manager[day]}
  送信日時: ${formattedDate}
  
  `;
  
    //コンテンツタイプ
    const headers = {
        'Content-Type': 'application/json',
    };
  
    //テキストタイプ
    const payload = {
      text: message,
    };
  
    //実際に送る内用

    const options = {
        headers,
        method: 'post',
        payload: JSON.stringify(payload),
      };
    
    //送信
    UrlFetchApp.fetch(url, options);
    
}