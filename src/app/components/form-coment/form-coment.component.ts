import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ListAlbumComponent } from '../list-album/list-album.component';
import { Album } from '../../model/album';
import { AlbumService } from '../../services/album/album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommentService } from '../../services/comment/comment.service';
import { Comment, CommentL } from '../../model/Comment';
import { CollectorL } from '../../model/collector';
import { CollectorService } from '../../services/collector/collector.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-form-coment',
  standalone: true,
  imports: [ ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
],
  templateUrl: './form-coment.component.html',
  styleUrl: './form-coment.component.css'
})
export class FormComentComponent implements OnInit {
  comments: CommentL[] = [];
  collectorNames: string[] = [];
  displayedColumns: string[] = ['Comentario', 'Calificacion', 'Coleccionista']; 
  commentForm: FormGroup;
  dataSource = new MatTableDataSource<CommentL>([]);
  
  id:string ="";
 
  constructor( private collectorService:CollectorService,private commentService:CommentService,  private route: ActivatedRoute ,private fb:FormBuilder , private albumService:AlbumService , private router: Router){

    this.commentForm = this.fb.group({
      description: ['', Validators.required], 
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      collector: this.fb.group({
        id: [null, Validators.required], 
      }),
    });
    
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const albumId = params.get('id'); 
  

      if(albumId != null ){
        this.id = albumId;
      }
      if (albumId) {
        this.commentService.getComments(albumId).subscribe((data) => {
          
          this.dataSource.data = data;
        
          console.table(data);


        });
      }
    });

    
  }

  generateUser() {
    const randomId = Math.floor(Math.random() * 1000);
    const randomName = `User${randomId}`; 
    return randomName;
      
     
    }
  
  
  

  addComment(): void {

   
    if (this.commentForm.valid) {

      const comment: Comment = this.commentForm.value
      console.log('Nuevo comentario:', comment);
      this.commentService.createComment(this.id, comment).subscribe(
        (response) => {
          console.log('Comentario creado:', response);
          this.commentForm.reset();
          this.refreshComments();
          
        },
        (error) => {
          console.error('Error al crear el comentario:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
 
    }
    goBack(){
      this.router.navigate([''])
    }


    
    
    refreshComments(): void {
      if (this.id) {
     
        this.commentService.getComments(this.id).subscribe((data) => {
          this.dataSource.data = data;
        });
      }
    }
  }

  


