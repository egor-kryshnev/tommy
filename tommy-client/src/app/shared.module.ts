import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardsloaderComponent } from './cardsloader/cardsloader.component';
import { SearchBarComponent } from './search-bar/search-bar.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CardsloaderComponent,
        SearchBarComponent
    ],
    exports: [
        CardsloaderComponent,
        SearchBarComponent

    ]
})
export class SharedModule { }