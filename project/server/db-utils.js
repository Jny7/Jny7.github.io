// Mock a database
const fs = require('fs');

// Store the user's information
var userInfo = {}

// Store the word definition
var words = {}

const userFilename = 'user.json';
const wordDefinitions = 'words.json';

loadData();

module.exports = {
    checkUserPassword: function(username, password){
        if(!(username in userInfo)) return false;
        return userInfo[username].password == password;
    },
    saveUserPassword: function(username, password){
        userInfo[username] = {"password": password};
        saveData();
    },
    savePersonalInfo: function(username, name, email, signature){
        userInfo[username]['name'] = name;
        userInfo[username]['email'] = email;
        userInfo[username]['signature'] = signature;
        saveData();
    },
    checkUserExist: function(username){
        return username in userInfo;
    },
    getUserInfo:function(username){
        return {
            'name': userInfo[username]['name'],
            'email': userInfo[username]['email'],
            'signature': userInfo[username]['signature']
        };
    },
    getDefinition: function(word){
        if(!(word in words)){
            return {}
        }
        return words[word]
    },
    saveWord: function(username, word){
        if(!("words" in userInfo[username])){
            userInfo[username]["words"] = [];
        }
        if(!userInfo[username]["words"].includes(word) &&
            word in words){
            userInfo[username]["words"].push(word);
            saveData();
        }
    },
    getWords: function(){
        let wordList = [];
        for(var key in words){
            wordList.push(key);
        }
        return wordList;
    },
    getSavedWords: function(username){
        let wordList = userInfo[username]["words"];
        return wordList;
    }
}

// save the data to the file
function saveData(){
    var content = JSON.stringify(userInfo, null, 2);
    fs.writeFile(userFilename, content, (err, data)=> {
    });
}

// load the data from the file
function loadData(){
    fs.readFile(userFilename, (err, data) => {
        if(!err){
            userInfo = JSON.parse(data);
        }
    });
    fs.readFile(wordDefinitions, (err, data) => {
        if(!err){
            words = JSON.parse(data);
        }
    });
}
