
function findButton(icon)
{
    //toast("截图中...");
    var img = captureScreen();
    while(!img)
    {
        sleep(100);
        img = captureScreen();
    }
    var points = images.findImage(img,icon);
    return points;
}

function main(){
    var next_sub = images.read("next_sub.jpg");
    var point = findButton(next_sub);
    sleep(100);
    if(point){
        log("下一步");
        log(point.x+139, point.y+53)
        click(point.x+139, point.y+53);
        //log("click error")
        //click(1678,920)
        next_sub.recycle();
    }
    sleep(1000);
    var pass_back = images.read("pass_sub.jpg");
    sleep(100)
    var point = findButton(pass_back)
    if(point){
        log("开始闯关");
        log(point.x,point.y)
        click(point.x+139, point.y+53);
        pass_back.recycle();
    }
    toast("页面加载")
    sleep(12000)
    var skip = images.read("skip_sub.jpg");
    var skip_enter = images.read("skip_enter.jpg");
    var click_screen_next_sub = images.read("click_screen_next_sub.jpg");
    var team_resurrection_back = images.read("defeat_back_sub.jpg");
    for(var i =0;i<100;i++){

        var point = findButton(skip_enter);
        if(point){
            log("skip enter");
            click(point.x+139, point.y+50);
        }
        var point = findButton(skip);
        if(point){
            log("skip");
            click(point.x+139, point.y+50);
        }

        //胜利
        var point = findButton(click_screen_next_sub)
        if(point){
            log("点击屏幕继续");
            click(point.x+139, point.y+50);
            var back_sub = images.read("back_sub.jpg");
            sleep(1000)
            var point = findButton(back_sub)
            if(point){
              log("胜利返回");
              click(point.x+139, point.y+50);
              back_sub.recycle()
            }
            click_screen_next_sub.recycle();
            break;
        }

        //失败
        var point = findButton(team_resurrection_back)
        if(point){
            log("失败");
            click(point.x+139, point.y+50);
            var defeat_back_sub = images.read("defeat_back_sub.jpg");
            sleep(1000)
            var point = findButton(defeat_back_sub)
            if(point){
              log("失败返回");
              click(point.x+139, point.y+50);
              defeat_back_sub.recycle();
            }
            team_resurrection_back.recycle();
            break;
        }
      log(i);
      //toast(i);
      sleep(1000);
    }
    skip.recycle();
    skip_enter.recycle();
    toast("一次结束，马上进入下一次");
    sleep(200)
}

auto();
log("检查截图功能");
if(!requestScreenCapture()){
  toast("请求截图失败");
  log("请求截图失败");
  exit();
} 
else {
  //toast("截图功能检查成功");
  log("截图功能检查成功");
}

alert("需开启软件无障碍服务、音量上键可中止脚本,刷金币中按音量键会终止脚本");
alert("进入王者荣耀——万象天工——冒险模式——挑战——停留在下一步");
alert("可分别选择左边的，陨落的废都，稷下的学院，灭国战场，堕落的祸源分别刷");
alert("刷完这些大约能获得1W金币，中途可能会有需要休息退出，可以重新开始刷，音量上键停止脚本即可");
alert("马上开始，请按照上面提示打开王者荣耀");

for(var i =1;i<11;i++){
    //toast("进入王者荣耀——万象天工——冒险模式——挑战——停留在下一步");
    sleep(10000);
    toast("第 "+i+"/10 次")
    log("第 "+i+"/10 次")
}
//sleep(20000);
//main();
for(var i =0;i<50;i++){
    sleep(1000);
    main();
    log("第  "+i+" 次");
}

threads.start(function(){
    //在子线程中调用observeKey()从而使按键事件处理在子线程执行
    events.observeKey();
    events.on("key_down", function(keyCode, events){
        //音量键关闭脚本
        if(keyCode == keys.volume_down){
           ClickClose();
           exit();
        }
    });
});
events.on("exit", function(){
    toast("脚本已结束");
});