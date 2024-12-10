import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ListAlbumComponent } from '../list-album/list-album.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlbumService } from '../../services/album/album.service';
import { Album } from '../../model/album';

@Component({
  selector: 'app-form-album',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardTitle,
    MatOption,
    MatSelectModule,
    ListAlbumComponent,
  ],
  templateUrl: './form-album.component.html',
  styleUrls: ['./form-album.component.css'],
})
export class FormAlbumComponent {
  isAlbumAdded = false;
  today: string = new Date().toISOString().split('T')[0];
  albumForm: FormGroup;
  baseUrl = 'https://mi-servidor.com/images/';

  genres = [
    { label: 'Classical', value: 'Classical' },
    { label: 'Salsa', value: 'Salsa' },
    { label: 'Rock', value: 'Rock' },
    { label: 'Folk', value: 'Folk' },
  ];

  labels = ['Sony Music', 'EMI', 'Discos Fuentes', 'Elektra', 'Fania Records'];

  constructor(private fb: FormBuilder, private albumService: AlbumService) {
    this.albumForm = this.fb.group({
     
      name: ['', Validators.required],
      cover: ['', Validators.required],
      releaseDate: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      recordLabel: ['', Validators.required],
    });
  }

  crear(): void {
    console.log('Submit');

    if (this.albumForm.valid) {
      const album: Album = this.albumForm.value;
      const date = new Date(album.releaseDate);
      album.releaseDate = date.toISOString();

      console.table(album);

      this.albumService.createAlbum(album).subscribe(
        (response) => {
          this.albumForm.reset();
          console.log('Álbum creado con éxito:', response);
          
        },
        (error) => {
          console.error('Error al crear álbum:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
