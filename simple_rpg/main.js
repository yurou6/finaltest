let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
const gridLength = 200;
//初始化
$(function(){
    //0-可走,1-障礙,2-終點,3-敵人
    mapArray = [
        [0,2,3,6],
        [0,0,0,0],
        [4,1,5,7]
    ];
        //繪製畫布
        ctx = $("#myCanvas")[0].getContext("2d");
        //指定圖片物件
        imgMain = new Image();
        imgMain.src = "simple_rpg/images/spriteSheet.png";
        currentImgMain = {
            "x":0,
            "y":0 
        };
        imgMain.onload = function(){
            //x,y
            // ctx.drawImage(imgMain,currentImgMain.x,currentImgMain.y);
            // ctx.drawImage(imgMain,0,0,200,200);
            ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
        };
        imgpirate = new Image();
        imgpirate.src = "simple_rpg/images/pirate.jpg";
        imgabroad = new Image();
        imgabroad.src = "simple_rpg/images/ab.jpg";
        imgpirate.onload = function(){
            imgabroad.onload = function(){
                for(var x in mapArray){
                    for(var y in mapArray[x]){
                        //繪製障礙物
                        if(mapArray[x][y]==1){
                            ctx.drawImage(imgpirate,135,53,430,540,y*gridLength,x*gridLength,gridLength,gridLength);
                        }
                        //繪製敵人
                        else if(mapArray[x][y]==2){
                            ctx.drawImage(imgabroad,0,224,224,224,y*gridLength,x*gridLength,gridLength,gridLength);
                        }
                        else if(mapArray[x][y]==3){
                            ctx.drawImage(imgabroad,672,0,224,224,y*gridLength,x*gridLength,gridLength,gridLength);
                        }
                        else if(mapArray[x][y]==4){
                            ctx.drawImage(imgabroad,224,224,224,224,y*gridLength,x*gridLength,gridLength,gridLength);
                        }
                        else if(mapArray[x][y]==5){
                            ctx.drawImage(imgabroad,448,448,224,224,y*gridLength,x*gridLength,gridLength,gridLength);
                        }
                        else if(mapArray[x][y]==6){
                            ctx.drawImage(imgpirate,1010,72,400,530,y*gridLength,x*gridLength,gridLength,gridLength);
                        }
                    }
                }
            }
        }
});

$(document).on("keydown",function(event){
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = { 
        "x":-1,
        "y":-1
    };
    targetBlock = { 
        "x":-1,
        "y":-1
    };
    event.preventDefault();
    console.log(event);
    switch(event.key){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y- gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }
    if(targetImg.x<=600 && targetImg.x>=0 && targetImg.y<=400 && targetImg.y>=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }
    else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    ctx.clearRect(currentImgMain.x,currentImgMain.y, gridLength, gridLength);
    
    if(targetBlock.x!=-1 && targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: // 一般道路
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: // 有海盜
                $("#talkBox").text("Defeat the pirates打敗海盜");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 2: 
                $("#talkBox").text("Greece希臘");
                break;
            case 3:
                $("#talkBox").text("Roma羅馬");
                break;
            case 4: // 終點
                $("#talkBox").text("London倫敦");
                break;
            case 5: 
                $("#talkBox").text("Paris巴黎");
                break;
            case 6: // 有海盜
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                $("#talkBox").text("Defeat the pirates打敗海盜");
                break;
            case 7:
                $("#talkBox").text("come home回家");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
        }
    }
    else{
        $("#talkBox").text("邊界");
    }
    //重新繪製主角
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
});