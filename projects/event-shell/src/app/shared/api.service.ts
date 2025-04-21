import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'//[APIService],
})
export class APIService {

  constructor() { }

  // No parameter
  getData(): string {
    // debugger
    return 'No parameter method called';
  }

  // One parameter
  getDataWithOneParam(param1: string): string {
    return `One parameter received: ${param1}`;
  }

  // Two parameters
  getDataWithTwoParams(param1: string, param2: number): string {
    return `Two parameters received: ${param1}, ${param2}`;
  }

}
