const express = require("express");
const apiRouter = express.Router();
const path = require("path");
const fs = require("fs");

// const friendsObjs = require(__dirname + "/../data/friends.json");
var app = express();


function freindCompare(data){
  var friendData = JSON.parse(data);

  var retFriendData = "";

     for(var fd in friendData){

         console.log("friendObj name = " + friendData[fd]);

         retFriendData += friendData[fd].name;
     }  
     return retFriendData;

}

//FUNCTION TO READ THE JSON DATA
function readFromFile(cb){
  //READ THE friends.json DATA
  fs.readFile(__dirname + "/../data/friends.json","utf-8", function(err, data){
    //IF ERROR THROW ERROR
    if(err) throw err;    

    //PARSE THE DATA SO THAT IT IS JSON FORMAT
    var friendData = JSON.parse(data);    

    //RETURN THE DATA TO THE CALLBACK FUNCTION
    return cb(friendData);

  }); 

}


apiRouter.get("/api/friends", function(req, res) {
	
  //CALL readFromFile FUNCTION TO READ THE JSON DATA 
  readFromFile(function(data){
    //RETURN THE DATA TO THE GET REQEUST
    res.json(data);

  });

   
});

apiRouter.post("/api/friends", function(req, res) {
  var newFriendArray = [];
  var fileJSONData;
  // newFriend.name = req.body.name;
  // newFriend.photo = req.body.photo;
  // newFriend.scores = req.body.scores;

  console.log("req.body.name" + req.body.name);

  var newFriend = {
        name : "",
        photo : "",
        scores : []
  }    


      

   readFromFile(function(data){
    //RETURN THE DATA TO THE GET REQEUST
    

      console.log("fileJSONData length = " + data.length);

   /* newFriend.name = req.body.name;
    newFriend.photo = req.body.photo;
    newFriend.scores = req.body.scores;  

    newFriendArray.push(newFriend);*/

      for(var fd in data){
        newFriend.name = data[fd].name;
        newFriend.photo = data[fd].photo;
        newFriend.scores = data[fd].scores;
         console.log("Name = " + newFriend.scores);
        newFriendArray.push(newFriend);
      } 



       newFriend.name = req.body.name;
    newFriend.photo = req.body.photo;
    newFriend.scores = req.body.scores;  

    newFriendArray.push(newFriend);

    console.log(newFriendArray);
     fs.writeFile(__dirname + "/../data/friends.json", JSON.stringify(newFriendArray,null,2) ,'utf-8')
  });

   

/*var addNewFriend =(newFriendArray);*/
 
  console.log("addNewFriend = " + JSON.stringify(newFriendArray));

 // fs.writeFile(__dirname + "/../data/friends.json", JSON.parse(newFriendArray) ,'utf-8')

        
    
  


  

  // var friendsObjs = fs.readFileSync(__dirname + "/../data/friends.js","utf-8")
  
 /* console.log ("newFriend = " + JSON.stringify(newFriend, null, 2));
  var newFriendInfoObj = JSON.stringify(newFriend, null, 2) + "\n";
  // newFriendArray.push(JSON.stringify(req.body, null, 2))
  // var friendJSON = JSON.stringify(newFriend);
  	// fs.writeFileSync(__dirname + "/../data/friends.json", JSON.stringify(req.body, null, 2) , 'utf-8');
  fs.appendFile(__dirname + "/../data/friends.json",newFriendInfoObj,'utf-8',function (err) {
  	if (err) throw err;

	  console.log('Saved!');
  });
*/
  // characters.push(newcharacter);

  // res.json(newcharacter);
});

module.exports = apiRouter;