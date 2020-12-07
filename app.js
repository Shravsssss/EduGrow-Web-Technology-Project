var express=require("express"); 
var bodyParser=require("body-parser"); 

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true}); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express() 


app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

function  caesar_fun(str, amount) {
    // Wrap the amount
    amount = 3;
    if (amount < 0) {
      return caesarShift(str, amount + 26);
    }
  
    // Make an output variable
    var output = "";
  
    // Go through each character
    for (var i = 0; i < str.length; i++) {
      // Get the character we'll be appending
      var c = str[i];
  
      // If it's a letter...
      if (c.match(/[a-z]/i)) {
        // Get its code
        var code = str.charCodeAt(i);
  
        // Uppercase letters
        if (code >= 65 && code <= 90) {
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
        }
  
        // Lowercase letters
        else if (code >= 97 && code <= 122) {
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
      }
  
      // Append
      output += c;
    }
  
    // All done!
    return output;
  };

app.post('/sign_up', function(req,res){ 
	var name = req.body.name; 
	var email =req.body.email; 
	var pass = caesar_fun(req.body.password, 3); 
	var phone =req.body.phone; 

	var data = { 
		"name": name, 
		"email":email, 
		"password":pass, 
		"phone":phone 
	} 
db.collection('details').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	return res.redirect('home.html'); 
}) 

app.post('/login', function(req,res){ 
	var username = req.body.name;
    var pass = caesar_fun(req.body.password, 3); 
    //console.log(pass);
    db.collection('details').findOne({name:username},function(err, result){ 
        var flag;
        if (err) return res.redirect('error.html');
        //console.log(comp);
        if (result != null) {
            var comp = (result.password == pass);
        }
        
        console.log(result); 
        if (result == null) {
            flag = 0;
        }
        
        else if(comp == false) {
            console.log("hi");
            flag = 0;
        }
        else {
            flag = 1;
        } 
        //console.log("flag: " + flag); 
        if (flag) {
            return res.redirect('home.html');
        }
        else {
            return res.redirect('error.html');
        }  		
    }); 
    	
    
	 
}) 

app.get('/home', function(req, res) {
    return res.redirect('home.html');
})

app.get('/chat', function(req, res) {
    return res.redirect('chat.html');
})

//science
app.get('/science1', function(req, res) {
    return res.redirect('science1.html');
})

app.get('/universe', function(req, res) {
    return res.redirect('universe.html');
})

app.get('/festival', function(req, res) {
    return res.redirect('festival.html');
})

app.get('/quiz_sc1', function(req, res) {
    return res.redirect('quiz_sc1.html');
})

app.get('/flash_sc1', function(req, res) {
    return res.redirect('flash_sc1.html');
})

app.get('/science2', function(req, res) {
    return res.redirect('science2.html');
})

app.get('/plant', function(req, res) {
    return res.redirect('plant.html');
})

app.get('/early', function(req, res) {
    return res.redirect('early.html');
})

app.get('/quiz_sc2', function(req, res) {
    return res.redirect('quiz_sc1.html'); 
})

app.get('/flash_sc2', function(req, res) {
    return res.redirect('flash_sc2.html'); 
})

//math

app.get('/math1', function(req, res) {
    return res.redirect('math1.html');
})

app.get('/add', function(req, res) {
    return res.redirect('addition.html');
})

app.get('/sub', function(req, res) {
    return res.redirect('subtract.html');
})

app.get('/quiz_ma1', function(req, res) {
    return res.redirect('quiz_ma1.html');
})

app.get('/flash_ma1', function(req, res) {
    return res.redirect('flash_ma1.html');
})

app.get('/math2', function(req, res) {
    return res.redirect('math2.html');
})

app.get('/tens1s', function(req, res) {
    return res.redirect('tens1s.html');
})

app.get('/givetake', function(req, res) {
    return res.redirect('givetake.html');
})

app.get('/quiz_ma2', function(req, res) {
    return res.redirect('quiz_ma1.html'); 
})

app.get('/flash_ma2', function(req, res) {
    return res.redirect('flash_ma2.html'); 
})

//english
app.get('/english1', function(req, res) {
    return res.redirect('english1.html');
})

app.get('/adj', function(req, res) {
    return res.redirect('adj.html');
})

app.get('/article', function(req, res) {
    return res.redirect('arti.html');
})

app.get('/quiz_eng1', function(req, res) {
    return res.redirect('quiz_eng1.html');
})

app.get('/flash_eng1', function(req, res) {
    return res.redirect('flash_eng1.html');
})

app.get('/english2', function(req, res) {
    return res.redirect('english2.html');
})

app.get('/verb', function(req, res) {
    return res.redirect('verb.html');
})

app.get('/noun', function(req, res) {
    return res.redirect('noun.html');
})

app.get('/quiz_eng2', function(req, res) {
    return res.redirect('quiz_eng1.html'); 
})

app.get('/flash_eng2', function(req, res) {
    return res.redirect('flash_eng2.html'); 
})

app.get('/covid', function(req, res) {
    return res.redirect('covid.html'); 
})



app.get('/',function(req,res){
    return res.redirect('index.html'); 
    }).listen(8080) 
      
      
    console.log("server listening at port localhost:8080"); 


