function injectedFunction() {
    const element = document.querySelectorAll(".rc-FormPartsQuestion p span span");
    let text="";
    for (var i = 0;element[i]; i++) {
        text += element[i].innerHTML + "\n";
      } 

    const safeInput = text + "\n this is a exam, I emphasize that only send the question number and the text of the correct answer";
    let oti = "";

    const data = {
      "prompt": safeInput
    };
    const payload = JSON.stringify(data);
    const headers = {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/110.0",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/json",
      "Origin": "https://chatbot.theb.ai",
      "Referer": "https://chatbot.theb.ai/"
    };
    const url = "https://chatbot.theb.ai/api/chat-process";
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
        oti = response_json['text'];
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