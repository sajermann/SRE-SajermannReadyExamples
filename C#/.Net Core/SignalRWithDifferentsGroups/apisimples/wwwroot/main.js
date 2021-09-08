"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/streaminghub").build();
var connection1 = new signalR.HubConnectionBuilder().withUrl("/streaminghub").build();


connection.on("ReceiveMessage", function (message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
  connection.invoke("JoinRoom", "WS1");
    var li = document.createElement("li");
    li.textContent = "Conetado ao grupo WS1!";
    document.getElementById("messagesList").appendChild(li);
}).catch(function (err) {
    return console.error(err.toString());
});


connection1.on("ReceiveMessage", function (message) {
  var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  var li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("messagesList1").appendChild(li);
});

connection1.start().then(function () {
  connection1.invoke("JoinRoom", "WS2");
  var li = document.createElement("li");
  li.textContent = "Conetado ao grupo WS2!";
  document.getElementById("messagesList1").appendChild(li);
}).catch(function (err) {
  return console.error(err.toString());
});



document.getElementById("send").addEventListener("click", () => {
  let _data = {
    name: document.querySelector('#message').value,
    isComplete: true
  }

  fetch('/api/todo', {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "nameGroup": document.querySelector("#group").selectedOptions[0].textContent
    }
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch (err => console.log(err));
});