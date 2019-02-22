import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private _http : HttpClient) { }

  post(item:any, url:string){
    return this._http.post<any>(url,item);
  }

  get(url:string){ 
    return this._http.get<any>(url);
  }

  put(item:any , url:string){
    return this._http.put<any>(url,item);
  }
  
  delete(url:string){
    return this._http.delete<any>(url);
  }


}



