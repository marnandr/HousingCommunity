import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  api = 'http://localhost:3000/';

  constructor() { }
}
