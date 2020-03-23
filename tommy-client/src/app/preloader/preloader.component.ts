import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {

  constructor(private rd: Renderer2, private elmRef: ElementRef) { }

  ngOnInit(): void {
    
    setTimeout(() => {
      this.fadeOutLoaderDiv(this.rd, this.elmRef);
    }, 3000);
    setTimeout(() => {
      this.kickLoaderDiv(this.rd, this.elmRef);
    }, 4000);
  }
  
  fadeOutLoaderDiv (rd, elmRef) {
    const secondsCounter = interval(10);
    const howManyTimes = secondsCounter.pipe(take(101));
    howManyTimes.subscribe(x => {
      rd.setStyle(
        elmRef.nativeElement.firstChild,
        'opacity',
        `${((x - 100) * -1) / 100}`
      );
    });
  }

  kickLoaderDiv (rd, elmRef) {
    rd.setStyle(
      elmRef.nativeElement.firstChild,
      'display',
      'none'
    );
  }

}
