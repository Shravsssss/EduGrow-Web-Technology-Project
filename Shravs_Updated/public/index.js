function toggle_chat() {
  var x = document.getElementById("chat");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

function output(input) {
  let product;

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'

  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(prompts, replies, text)) { 
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } 
    else if (text.match(/(universe|solar system|sun|earth|moon|jupyter|saturn|mercury|mars|venus|neptune)/gi)) {
      product = universe[Math.floor(Math.random() * universe.length)];
    }
    else if (text.match(/(plant|rose|tulsi|hibiscus|roses|plants|trees|forest)/gi)) {
      product = "plant";
    }
    else if (text.match(/(festival|diwali|holi|ganesha)/gi)) {
      product = "fest";
    }
    else if (text.match(/(early humans|first wheel|stone age)/gi)) {
      product = "early";
    }
    else if (text.match(/(noun)/gi)) {
      product = "noun";
    }
    else if (text.match(/(adjective)/gi)) {
      product = "adj";
    }
    else if (text.match(/(verb|tense)/gi)) {
      product = "verb";
    }
    else if (text.match(/(article)/gi)) {
      product = "art";
    }
    else if (text.match(/(add|addition|plus)/gi)) {
      product = "add";
    }
    else if (text.match(/(subtract|minus|subtraction)/gi)) {
      product = "sub";
    }
    else if (text.match(/(tens|ones|ten|one)/gi)) {
      product = "tens";
    }
    else if (text.match(/(give and take)/gi)) {
      product = "give";
    }
    else if (text.match(/(science quiz|science test)/gi)) {
      product = "quizs";
    }
    else if (text.match(/(math quiz|mathematics quiz|math test)/gi)) {
      product = "quizm";
    }
    else if (text.match(/(english quiz)/gi)) {
      product = "quize";
    }
    
    
  else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
    }
    if (replyFound) {
      // Stop outer loop when reply is found instead of interating through the entire array
      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  if (product == "universe") {
    botText.innerText = ("Here you go :), Click this to go to the chapter")
    var result = botText.innerText.link("/universe");
    //document.getElementById("bot").innerHTML = result;
    botText.innerHTML = `<span>${result}</span>`
    //console.log(result);
    //botText.innerText = "";
  }
  else if (product == "plant") {
    botText.innerText = ("Click this and boom!!")
    var result = botText.innerText.link("/plant");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "fest") {
    botText.innerText = ("Click this and you'll find the chapter!!")
    var result = botText.innerText.link("/festival");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "early") {
    botText.innerText = ("Ahh you like history, click here and boom!!")
    var result = botText.innerText.link("/early");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "noun") {
    botText.innerText = ("click here and boom!!")
    var result = botText.innerText.link("/noun");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "verb") {
    botText.innerText = ("Ahh you wanna learn about verbs, here you go click this")
    var result = botText.innerText.link("/verb");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "art") {
    botText.innerText = ("Articles!! here you go click this")
    var result = botText.innerText.link("/article");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "adj") {
    botText.innerText = ("Okay! here you go click this")
    var result = botText.innerText.link("/adj");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "add") {
    botText.innerText = ("Ohh Addition, come on click this")
    var result = botText.innerText.link("/add");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "sub") {
    botText.innerText = ("Wanna learn some subtraction, come on click this")
    var result = botText.innerText.link("/sub");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "tens") {
    botText.innerText = ("Tens and ones?? Click here")
    var result = botText.innerText.link("/tens1s");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "give") {
    botText.innerText = ("Okay! Click here")
    var result = botText.innerText.link("/givetake");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "quizs") {
    botText.innerText = ("Wanna try science quiz? Click here")
    var result = botText.innerText.link("/quiz_sc1");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "quizm") {
    botText.innerText = ("Wanna try math quiz? Click here")
    var result = botText.innerText.link("/quiz_ma1");
    botText.innerHTML = `<span>${result}</span>` 
  }
  else if (product == "quize") {
    botText.innerText = ("Wanna try english quiz? Click here")
    var result = botText.innerText.link("/quiz_eng1");
    botText.innerHTML = `<span>${result}</span>` 
  }
  // Fake delay to seem "real"
  else{
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product)
  }, 2000
  )
}

}