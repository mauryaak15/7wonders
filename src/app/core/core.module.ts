import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FiltersComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        HeaderComponent
    ]
})

export class CoreModule {}
