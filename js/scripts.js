"use strict";

// wrap logic in anonymous function
(function(){

    //=======================================================
    //----====== GET JSON || GET JSON || GET JSON ======-----
    //=======================================================

    var games = $.getJSON({
        url:"db/jackpots.json",
        async:false,
        method:"POST"
    });
    games = games.responseJSON;

    //=======================================================
    //----====== UPDATE JACKPOT || UPDATE JACKPOT ======-----
    //=======================================================

    //-------------- update dom element -----------------
    function updateGameJackPotView(gameData){
        let gameHtmlClass = gameData.className;
        let amount = gameData.jackPotGame.money.amount;
        if($("."+gameHtmlClass ).length == 0) return;
        if( $("."+gameHtmlClass + " > .jackPot").length ==  0 ){
            createJackPotView(gameData);
        }else{
            $("."+gameHtmlClass + " > .jackPot").text(amount);
        }
    }

    //-------------- create dom element -----------------
    function createJackPotView(gameData){
        let jackPot_wrap = $("<div>",{class:"jackPot",text:gameData.jackPotGame.money.amount});
        let gameHtmlClass = gameData.className;
        $("."+gameHtmlClass).append(jackPot_wrap);
    }

    //-------------- update jackpot amount -----------------
    function updateJackPot(gameData){
        try{
            gameData.jackPotGame.money.amount = (Number(gameData.jackPotGame.money.amount) + 0.01).toFixed(2);
            updateGameJackPotView(gameData);
        }catch(e){
            e.handleMassege = "update jackpot amount";
           catchExaption(e);
        }
    }

    //------------- trigger update jackpot -----------------
    setInterval(function(){

        if(!Array.isArray(games)){
            catchExaption({handleMassege: "wrong game json"});
            return;
        }

        for(let i = 0 , length = games.length; i < length ; i++){
            let gameData = games[i];
            switch(gameData.jackPotGame.jackpotName){
                case "HAB 12 Zodiacs" :
                    // robin good
                    gameData.className = "robin";
                    updateJackPot(gameData);
                    break;
                case "HAB 5 Lucky Lions" :
                    // gorila
                    gameData.className = "gorila";
                    updateJackPot(gameData);
                    break;
                case "HAB 5 MARIACHIS" :
                    // cosmos
                    gameData.className = "cosmos";
                    updateJackPot(gameData);
                    break;
                case "HAB Wizards Want War" :
                    // zeppelin
                    gameData.className = "zeppelin";
                    updateJackPot(gameData);
                    break;
            }
        }
    },1000)


    //================================================================
    //----====== CATCH ERROR || CATCH ERROR || CATCH ERROR ======-----
    //================================================================

    function catchExaption(err){
        // send to log
        console.log(err)
    }

})()

