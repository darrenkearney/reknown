function mapLogic(){
    if (this.leftKey.isDown){
        player.x -= 5;
    }else if(this.rightKey.isDown){
        player.x += 5;
    }
    
    if(this.upKey.isDown){
        player.y -= 5;
    }else if(this.downKey.isDown){
        player.y += 5;
    }
}