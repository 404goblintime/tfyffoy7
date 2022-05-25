sound = ""
leftWristX = ""
leftWristY = ""
rightWristX = ""
rightWristY = ""
ScoreLeftWrist = 0

function setup() {
    canvas = createCanvas(700, 700);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet is initialized!');
}

function draw() {
    image(video, 0, 0, 700, 700);

    fill("chartreuse");
    stroke("chartreuse");
    if (ScoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals / 500;
        sound.setVolume(volume)
    }else {
        sound.setVolume(0)
    }
    

}

function preload() {
    sound = loadSound("mrloverman.mp3");
}

function play() {
    sound.play();
    sound.setVolume(0.2);
    sound.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of left wrist:" + ScoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("left Wrist X = " + leftWristX + "left Wrist Y = " + leftWristY);
        console.log("right Wrist X = " + rightWristX + "right Wrist Y = " + rightWristY);

    }
}