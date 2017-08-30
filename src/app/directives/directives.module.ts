import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
 
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
 
@NgModule({
    imports:      [ CommonModule ],
    declarations: [ SpinnerComponent, AlertComponent ],
    exports: [ 
        SpinnerComponent,
        AlertComponent,
        CommonModule, 
        FormsModule 
    ]
})
export class DirectivesModule { }