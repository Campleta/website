import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
 
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { ModalComponent } from './modal/modal.component';
 
@NgModule({
    imports:      [ 
        CommonModule 
    ],
    declarations: [ 
        SpinnerComponent, 
        AlertComponent, 
        ModalComponent
    ],
    entryComponents: [
        ModalComponent
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