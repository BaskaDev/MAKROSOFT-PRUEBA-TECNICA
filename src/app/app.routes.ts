import { Routes } from '@angular/router';
import { FormAlbumComponent } from './components/form-album/form-album.component';
import { FormComentComponent } from './components/form-coment/form-coment.component';

export const routes: Routes = [
    {
        path:'',
        component:FormAlbumComponent
    },{
        path:'comments/:id',
        component:FormComentComponent
    }
];
