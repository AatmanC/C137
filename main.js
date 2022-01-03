video = "";
status1 = "";
objects = [];

function setup(){
    canvas = createCanvas(350, 300);
    canvas.center();
}

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function start(){
    object = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("model loaded");
    status1 = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function draw(){
    image(video, 0, 0, 350, 300);
    if(status1 != "" && objects.length >= 0){
        object.detect(video, gotResult);
        document.getElementById("number_of_objects").innerHTML = "Number of obejcts: "+ objects.length;
        document.getElementById("status").innerHTML = "Status: Objects Detected";

        fill("#063196");
        for(i = 0; i < objects.length; i++){
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#063196")
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results
}