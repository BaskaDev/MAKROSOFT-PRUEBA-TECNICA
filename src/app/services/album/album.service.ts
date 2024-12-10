import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Album } from '../../model/album';
import { AlbumList } from '../../model/albumList';



@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  //END POINT DEL API , EN ESTE CASO SE PUEDE USAR EL END POINT OTORGADO POR LA EMPRESA
  //O SE PUEDE USAR EL ENDPOINT DEL BACKEND EN SPRING BOOT DESARROLLADO PARA ESTA PRUEBA TECNICA
  private apiUrl = 'https://backvynils-q6yc.onrender.com/albums'; 

  constructor(private http: HttpClient) { }

  //TODO: METODO PARA CREAR UN NUEVO ALBUM
  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.apiUrl, album);
  }

  //TODO: METODO PARA TRAER LA LISTA DEL SERVIDOR
  getAlbums(): Observable<AlbumList[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //TODO: METODO PARA TRAER UN ALBUM POR SU ID
  getAlbumById(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/${id}`);
  }

  //TODO: METODO PARA ACTUALIZAR LA INFORMACION DE UN ALBUM
  updateAlbum(id: string, album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}/${id}`, album);
  }

  //TODO: MERODO PARA BORRAR UN ALBUM POR SU ID
  deleteAlbum(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 

 
}
