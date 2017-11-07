import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
 
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { ModalComponent } from './modal/modal.component';
import { AreaModalComponent } from './area-modal/area-modal.component';
import { SharedModule } from './../shared/shared.module';
 
@NgModule({
    imports:      [ 
        CommonModule,
        SharedModule
    ],
    declarations: [ 
        SpinnerComponent, 
        AlertComponent, 
        ModalComponent, AreaModalComponent
    ],
    entryComponents: [
        ModalComponent, AreaModalComponent
    ],
    exports: [ 
        SpinnerComponent,
        AlertComponent,
        ModalComponent,
        CommonModule, 
        FormsModule 
    ]
})
export class DirectivesModule { }