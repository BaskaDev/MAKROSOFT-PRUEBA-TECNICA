import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, CommentL } from '../../model/Comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://backvynils-q6yc.onrender.com/albums'; 

  constructor(private http: HttpClient) { }

  //TODO: METODO PARA CREAR UN COMENTARIO
  createComment(albumId: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${albumId}/comments`, comment);
  }

  //TODO: METODO PARA TRAER LA LISTA DE COMENTARIOS DE UN ALBUM
  getComments(albumId: string): Observable<CommentL[]> {
    return this.http.get<CommentL[]>(`${this.apiUrl}/${albumId}/comments`);
  }

  //TODO: METODO PARA LEER UN COMENTARIO ESPECIFICO POR SU ID 
  getCommentById(albumId: string, commentId: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${albumId}/comments/${commentId}`);
  }

  //TODO: METODO PARA ACTUALIZAR UN COMENTARIO
  updateComment(albumId: string, commentId: string, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/${albumId}/comments/${commentId}`, comment);
  }

  //TODO: METODO PARA ELIMINAR UN COMENTARIO POR ID
  deleteComment(albumId: string, commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${albumId}/comments/${commentId}`);
  }
}
