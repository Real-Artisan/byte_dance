import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SpeedTestService } from 'ng-speed-test';
import { Observable, Operator } from 'rxjs';
import { DataService } from './Services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'byte_dance';
  progress = false;
  value:any = '';
  notOnline = false;
  
    constructor(private http: HttpClient, private speedTestService: SpeedTestService) {
     this.speedTestService.isOnline().subscribe((isonline) =>{
      if(!isonline){
        this.notOnline = true;
      }else{
        this.notOnline = false
      }
     });
     this.testSpeed();
    }

    testSpeed() {
      this.progress = true;
      this.value = false
      if(!this.notOnline){
        this.speedTestService.getMbps({
          iterations: 5,
          retryDelay: 1000,
          file: {
            path: 'https://raw.githubusercontent.com/jrquick17/ng-speed-test/02c59e4afde67c35a5ba74014b91d44b33c0b3fe/demo/src/assets/13mb.jpg',
            size: 13848150,
            shouldBustCache: true
          },
        }).subscribe((speed) =>{
          this.progress = false;
          this.value = speed.toFixed(2);
        });
      }
    }

}

