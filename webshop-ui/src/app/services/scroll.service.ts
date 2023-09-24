import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private scrollPosition: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.scrollPosition = window.scrollY;
  }

  getScrollPosition() {
    return this.scrollPosition;
  }
}
