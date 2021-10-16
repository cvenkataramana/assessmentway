import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  submitData(data):Observable<any>
  {
    
    return this.http.post('storeData',data);
  }

  getData()
  {
    return this.http.get('getData');
  }
}
