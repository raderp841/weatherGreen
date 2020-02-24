import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

    image: string;

    constructor() { }

    setImage(image: string) {
        this.image = image;
    }

    getImage() {
        return this.image.slice();
    }

}
