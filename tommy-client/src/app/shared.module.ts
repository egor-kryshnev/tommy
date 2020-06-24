import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardsloaderComponent } from './cardsloader/cardsloader.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CardsloaderComponent
    ],
    exports: [
        CardsloaderComponent
    ]
})
export class SharedModule { }