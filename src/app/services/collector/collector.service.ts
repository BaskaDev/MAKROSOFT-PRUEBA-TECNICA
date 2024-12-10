import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectorL } from '../../model/collector';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  constructor(private http: HttpClient) { }

   api = "backvynils-q6yc.onrender.com/collectors/";

   getColeccionista(id: number): Observable<CollectorL> {
    return this.http.get<CollectorL>(`${this.api}${id}`);
  }

  getColeccionistasByIds(ids: number[]): Observable<CollectorL[]> {
    const idsString = ids.join(',');
    return this.http.get<CollectorL[]>(`${this.api}/collectors?ids=${idsString}`);
  }
  

   
}
