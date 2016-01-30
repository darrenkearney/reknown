var mapPointX = 0;
var mapPointY = 0;
var maxMapPointX = 5;
var maxMapPointY = 5;
//
//var mapPoints = [
//    [{
//        "x": 150,
//        "y": 150
//    },{
//        "x": 450,
//        "y": 150
//    }],
//    [{
//        "x": 150,
//        "y": 450
//    },{
//        "x": 450,
//        "y": 450
//    }],
//    [{
//        "x": 150,
//        "y": 150
//    },{
//        "x": 450,
//        "y": 150
//    }],
//    [{
//        "x": 150,
//        "y": 450
//    },{
//        "x": 450,
//        "y": 450
//    }],
//    [{
//        "x": 150,
//        "y": 150
//    },{
//        "x": 450,
//        "y": 150
//    }],
//    [{
//        "x": 150,
//        "y": 450
//    },{
//        "x": 450,
//        "y": 450
//    }]
//];

function mapLogic(){
//    if (this.leftKey.justDown && mapPointX > 0){
//        mapPoints[--mapPointX][mapPointY];
//    }else if(this.rightKey.justDown && mapPointX < maxMapPointX){
//        mapPoints[++mapPointX][mapPointY];
//    }else if(this.upKey.justDown && mapPointY < maxMapPointY){
//        mapPoints[mapPointX][++mapPointY];
//    }else if(this.downKey.justDown && mapPointY > 0){
//        mapPoints[mapPointX][--mapPointY];
//    }
//    
//    console.log("mapPointX: " +mapPointX);
//    console.log("mapPointY: " +mapPointY);
}

function mapLogic2(){
    var minMapWidth = 100;
    var minMapHeight = 200;
    var enemySpeedX = 5;
    var enemySpeedY = 5
    if (this.leftKey.isDown){
        if(player.x > game.width - minMapWidth){
            player.x = game.width - minMapWidth;
        }else if(player.x > minMapWidth){
            player.x -= 5;   
        }else{
            player.x = minMapWidth;
        }
    }else if(this.rightKey.isDown){
        if(player.x < minMapWidth){
            player.x = minMapWidth;   
        }else if(player.x < game.width - minMapWidth){
            player.x += 5;
        }else{
            player.x = game.width - minMapWidth;
        }
    }
    
    if(this.upKey.isDown){
        if(player.y > game.height - minMapHeight){
            player.y = game.height - minMapHeight;
        }else if(player.y > minMapHeight){
            player.y -= enemySpeedY;   
        }else{
            player.y = minMapHeight;
        }
    }else if(this.downKey.isDown){
        if(player.y < minMapHeight){
            player.y = minMapHeight;   
        }else if(player.y < game.height - minMapHeight){
            player.y += enemySpeedY;
        }else{
            player.y = game.height - minMapHeight;
        }
    }
    
    if(player.x > enemy.x){
        enemy.x += enemySpeedX;
    }else{
        enemy.x -= enemySpeedX;
    }
    
    if(player.y > enemy.y){
        enemy.y += enemySpeedY;
    }else{
        enemy.y -= enemySpeedY;
    }
    
    if((player.x - (enemySpeedX * 2)) < enemy.x && enemy.x < (player.x + (enemySpeedX * 2))  && (player.y - (enemySpeedY * 2))  < enemy.y && enemy.y < (player.y + (enemySpeedY * 2))){
        view = "LOADBATTLE";
    }
}