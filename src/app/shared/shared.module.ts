import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { DirectivesModule } from './../directives/directives.module';
import { ModalModule } from 'ngx-bootstrap';
 
@NgModule({
    imports:      [ 
        CommonModule,
        ModalModule.forRoot()
    ],
    declarations: [  ],
    exports: [ 
        CommonModule, 
        FormsModule,
        ModalModule
    ],
})
export class SharedModule { }