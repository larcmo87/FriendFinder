const express = require("express");
const apiRouter = express.Router();
const path = require("path");
const fs = require("fs");

// const friendsObjs = require(__dirname + "/../data/friends.json");
var app = express();


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
  var newFriendArray = [];      //Array to hold friend data for writing to file and friend compare
  // var fileJSONData;
  var totalDifference = 0;      //Var used in friend compare logic
  var surveyReturnValue = 0;    //Var used in friend compare logic
  var surveyFriendToReturn = 0; //Var used in friend compare logic

  //New Freind Object
  var newFriend = {
        name : "",
        photo : "",
        scores : []
  }    

  //Function that reads friends for existing friends.json file and adds new friend entry.
  //Funtcion also does the friend compare logic 
   readFromFile(function(data){
      
      //Loop through the returned data from the friends.json file and append friend
      //data to the newFriendArray. The newFriendArray will be used for the friend
      //compare logic and to rewrite the friends.json file with new and existing 
      //friends data
      for(var fd in data){
        newFriend.name = data[fd].name;        
        newFriend.photo = data[fd].photo;
        newFriend.scores = data[fd].scores;
         
        //Stringify the newFriend object data
        var parseNewFriend = JSON.stringify(newFriend,null,2);

        //Push to the newFriendArray
        newFriendArray.push( JSON.parse(parseNewFriend));
        
      } 

      /*Friend Compare logic*/
      for(var fad = 0; fad < newFriendArray.length; fad++){
        
        totalDifference = 0;  //Set the total difference to 0 on each interation        

        //Loop through the newFriendArray scores array
        for(var i = 0; i < newFriendArray[fad].scores.length; i++){
            
            //Subtract the newFriendsArray score from the req body score 
            //Return the absolute value
            totalDifference += Math.abs(newFriendArray[fad].scores[i] - req.body.scores[i]);
                                        
        }
         
        //If surveyReturnValue is 0 then set its value to the totalDifference value
        //Else if totalDifference is < or = surveyReturnValue update the surveyReturnValue
        //value with the new totalDifference value and set the surveyFriendToReturn to the 
        //array newFriendArray count. This will be the friend that has the least difference 
        //in survey points
        if(surveyReturnValue === 0){
          surveyReturnValue = totalDifference;
        }else if(totalDifference <= surveyReturnValue){
          surveyReturnValue = totalDifference;          
          surveyFriendToReturn = fad;
        }

      }

    //Capture the newly entered friend data into the newFrien object
    newFriend.name = req.body.name;
    newFriend.photo = req.body.photo;
    newFriend.scores = req.body.scores;  

    //Push the newFriend object data to the newFriendArray
    //This will add the newly added friend to the exising 
    //friends in the freinds.json file.
    newFriendArray.push(newFriend);



    // Rewrite the freinds data to the friends.json file
     fs.writeFile(__dirname + "/../data/friends.json", JSON.stringify(newFriendArray,null,2) ,'utf-8')


     //Return the best friend match
     res.json(newFriendArray[surveyFriendToReturn]);
  });

});

module.exports = apiRouter;