function injectedFunction() {
    let element;

    if(document.querySelector(".css-1da2g7c") !== null){
        element = document.querySelectorAll(".css-1da2g7c p span span");  
    } else {
        element = document.querySelectorAll(".rc-FormPartsQuestion p span span");
    }
    
    let text="";
    for (var i = 0;element[i]; i++) {
        text += element[i].innerHTML + "\n";
      } 
      
    const safeInput = text + "\n this is a exam, I emphasize that only send the question number and the text of the correct answer";
    let oti = "";
    //console.log(safeInput);
    const data = {
      "id":null,
      "botId":"default",
      "contextId":443,
      "messages":[{"id":"qz0d4dqhc2","role":"assistant","content":"Hi! How can I help you?","who":"AI: ","timestamp":1691417661261}],
      "newMessage":safeInput,
      "stream":false
    };
    const payload = JSON.stringify(data);
    const headers = {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/110.0",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/json",
      "Origin": "https://www.chatgptdownload.org",
      "Referer": "https://www.chatgptdownload.org/"
    };
    const url = "https://www.chatgptdownload.org/wp-json/mwai-ui/v1/chats/submit";
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: payload
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(response_text => {
        const json_strings = response_text.trim().split('\n');
        const last_json_string = json_strings[json_strings.length - 1];
        const response_json = JSON.parse(last_json_string);
        oti = response_json['reply'];
        console.log(oti);
      for (var i = 0;element[i]; i++) {
        if (oti.toLowerCase().includes(element[i].innerHTML.toLowerCase())) {
          element[i].style = "border-style: solid;border-color: #0d7a0d;";
        }
      }       
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target : {tabId : tab.id},
    func : injectedFunction,
  });
});