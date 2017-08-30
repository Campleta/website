import { Injectable } from '@angular/core';
import { SpinnerComponent } from './../directives/spinner/spinner.component';

@Injectable()
export class SpinnerService {

  private spinnerCache = new Set<SpinnerComponent>();

  constructor() { }

  show(spinnerName: string): void {
    this.spinnerCache.forEach(spinner => {
      if(spinner.name === spinnerName) {
        spinner.show = true;
      }
    });
  }

  hide(spinnerName: string): void {
    this.spinnerCache.forEach(spinner => {
      if(spinner.name === spinnerName) {
        spinner.show = false;
      }
    })
  }

  isShowing(spinnerName: string): boolean | undefined {
    let showing = undefined;
    this.spinnerCache.forEach(spinner => {
      if(spinner.name === spinnerName) {
        showing = spinner.show;
      }
    });
    return showing;
  }

  _register(spinner: SpinnerComponent): void {
    this.spinnerCache.add(spinner);
  }

  _unregister(spinnerToRemove: SpinnerComponent): void {
    this.spinnerCache.forEach(spinner => {
      if(spinner === spinnerToRemove) {
        this.spinnerCache.delete(spinner);
      }
    });
  }

}
