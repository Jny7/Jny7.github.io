$(() => {
    // Request the word list
    requestWordList();

    $("#search_bar").click(function(){
        // Query the definiont of the word
        const word = $("input[name='search-box']").val();
        if(word.length == 0) return;
        queryWord(word);
    });
    $("#save_word").click(function(){
        // Save this word
        const word = $("input[name='search-box']").val();
        const defs = document.getElementById("definition");
        if(word.length == 0 || defs.children.length == 0) return;
        $.ajax({
            url: "/saveword",
            type:"post",
            data: {"word": word},
            dataType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: 'json',
            success:function(data){
            }
        });
    });
}
);

function home(){
    window.location.href="/";
}

function savedWordsList(){
    $('.searchWords').hide();
    $('.savedWords').show();
    loadSavedWords();
}

// Loads the saved words
function loadSavedWords(){
    $.ajax({
        url: "/savedwords",
        type:"get",
        dataType: 'json',
        success:function(data){
            if(data['status'] == 'success'){
                displayWordList("savedwords", "showWordDefinition", data['savedwords']);
            }
        }
    });
}

// Show the definition of the word
function showWordDefinition(word){
    $('.searchWords').show();
    $('.savedWords').hide();
    queryWord(word);
}

// Query the word
function queryWord(word){
    $("input[name='search-box']").val(word)
    $.ajax({
        url: "/query",
        type:"post",
        data: {"word": word},
        dataType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: 'json',
        success:function(data){ 
            if(data['status'] == 'success'){
                displayDefinition(data['definition']);
            }
        }
    });
}

// Request the word list
function requestWordList(){
    $.ajax({
        url: "/words",
        type:"get",
        dataType: 'json',
        success:function(data){
            if(data['status'] == 'success'){
                displayWordList("words", "queryWord", data['words']);
            }
        }
    });
}

// Display the word list
function displayWordList(tagID, funcName, wordList){
    const words = document.getElementById(tagID);
    while(words.children.length > 0){
        words.removeChild(words.children[0]);
    }
    for(var i = 0; i < wordList.length; i++){
        const a = document.createElement("a");
        a.href = "javascript:" + funcName + "(\"" + wordList[i] + "\")";
        words.appendChild(a);
        const p = document.createElement("p");
        p.innerHTML = wordList[i];
        a.appendChild(p);
    }
}

// Display the definition
function displayDefinition(definition){
    const defs = document.getElementById("definition");
    while(defs.children.length > 0){
        defs.removeChild(defs.children[0]);
    }
    for(var key in definition){
        const p = document.createElement("p");
        p.innerHTML = key;
        defs.appendChild(p);
        const items = definition[key];
        for(var i = 0; i < items.length; i++){
            const p1 = document.createElement("p");
            p1.innerHTML = (i+1) + ". " + items[i];
            p1.classList.add("item");
            defs.appendChild(p1);
        }
    }
}
