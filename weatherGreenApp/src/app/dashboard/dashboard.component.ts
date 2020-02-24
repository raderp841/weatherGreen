import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private router: Router, private imageService: ImageService) { }

    ngOnInit(): void {
    }
    onCamera(type: string) {
        this.imageService.setImage(type);
        this.router.navigate(['./camera', type]);
    }
}
