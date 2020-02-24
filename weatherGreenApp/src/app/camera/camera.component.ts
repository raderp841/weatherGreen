import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit, AfterViewInit {
    video;
    c1;
    c2;
    ctx1;
    ctx2;
    theStream;
    theImageCapture;
    supportedConstraints;
    isVideo = true;

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
        this.doLoad();
        this.chooseImage();
    }

    ngAfterViewInit() {

    }

    doLoad() {
        this.video = document.getElementById('video');
        this.c1 = document.getElementById('c1');
        this.ctx1 = this.c1.getContext('2d');
        this.c2 = document.getElementById('c2');
        this.ctx2 = this.c2.getContext('2d');
        this.supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
        console.log(this.supportedConstraints);
        var constraints: MediaStreamConstraints  = {
  
            //width: { ideal: 4096 },
            //height: { ideal: 2160 },
            //video: true,
            //audio: false
        } 
        navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
            
            this.theStream = stream;
            console.log(stream.getVideoTracks()[0].getCapabilities());
            this.video.srcObject = stream;
            this.video.play();
        }).catch(err => console.log(err));

        let self = this;
        self.timerCallback();
    }

    timerCallback() {
        this.computeFrame();
        let self = this;
        setTimeout(function () {
            self.timerCallback();
        }, 0);
    }

    computeFrame() {
        this.ctx1.drawImage(this.video, 0, 0, this.c1.width, this.c1.height);
        let frame = this.ctx1.getImageData(0, 0, this.c1.width, this.c1.height);
        let l = frame.data.length / 4;

        for (let i = 0; i < l; i++) {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            if (r > -50 && r < 125 && g > 90 && g < 210 && b > 85 && b < 165)
            //if (r > -2500 && r < 200 && g > 50 && g < 255 && b > 0 && b < 110)

                frame.data[i * 4 + 3] = 0;
        }
        this.ctx2.putImageData(frame, 0, 0);
        return;
    }

    chooseImage() {
        let image: string = this.imageService.getImage();
        if (image == 'weather') {
            this.setBackgroundImage('weather-img');
        }
        else if (image == 'dino') {
            this.setBackgroundImage('dino-img');
        }
        else if (image == 'unicorn') {
            this.setBackgroundImage('unicorn-img');
        }
    }

    setBackgroundImage(className: string) {
        this.c2.classList.add(className);
    }


}


//     let processor = {
//    timerCallback: function () {
//        if (this.video.paused || this.video.ended) {
//            return;
//        }
//        this.computeFrame();
//        let self = this;
//        setTimeout(function () {
//            self.timerCallback();
//        }, 0);
//    },

//    doLoad: function () {
//        this.video = document.getElementById("video");
//        this.c1 = document.getElementById("c1");
//        this.ctx1 = this.c1.getContext("2d");
//        this.c2 = document.getElementById("c2");
//        this.ctx2 = this.c2.getContext("2d");
//        let self = this;
//        this.video.addEventListener("play", function () {
//            self.width = self.video.videoWidth / 2;
//            self.height = self.video.videoHeight / 2;
//            self.timerCallback();
//        }, false);
//    },

//    computeFrame: function () {
//        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
//        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
//        let l = frame.data.length / 4;

//        for (let i = 0; i < l; i++) {
//            let r = frame.data[i * 4 + 0];
//            let g = frame.data[i * 4 + 1];
//            let b = frame.data[i * 4 + 2];
//            if (g > 100 && r > 100 && b < 43)
//                frame.data[i * 4 + 3] = 0;
//        }
//        this.ctx2.putImageData(frame, 0, 0);
//        return;
//    }
//};


//processor.doLoad();

