import { Component, OnInit, ViewChild } from '@angular/core';
import { AlbumService } from '../../services/album/album.service';
import { AlbumList } from '../../model/albumList';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
import { FormComentComponent } from '../form-coment/form-coment.component';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-list-album',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatTabsModule, FormComentComponent],
  templateUrl: './list-album.component.html',
  providers: [DatePipe],
  styleUrls: ['./list-album.component.css']
})
export class ListAlbumComponent implements OnInit {
  displayedColumns: string[] = ['Cubierta','Album',  'Lanzamiento', 'Género', 'Disquera','Acciones'];
  

  dataSource = new MatTableDataSource<AlbumList>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedAlbum: AlbumList | null = null; 
  constructor(private albumService: AlbumService, private datePipe: DatePipe , private route:Router) {} 

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.error('Error al obtener álbumes:', error);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  
  formatReleaseDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }

  showAlbum(id: number): void {
    const card = document.querySelector(".card");
    card?.classList.toggle("flipped");
    const album = this.dataSource.data.find((item) => item.id === id);
    if (album) {
      this.selectedAlbum = album; 
      console.log('Álbum seleccionado:', this.selectedAlbum);
    } else {
      console.error('Álbum no encontrado con ID:', id);
    }
  }

  goComments(id:number){
      this.route.navigate(['comments/',id])
  }


 

}
