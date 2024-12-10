import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlbumService } from './album.service';
import { Album } from '../../model/album';
import { AlbumList } from '../../model/albumList';

describe('AlbumService', () => {
  let service: AlbumService;
  let httpMock: HttpTestingController;

  const apiUrl = 'https://backvynils-q6yc.onrender.com/albums';

  // Datos de prueba para los álbumes
  const albumMock: Album = {
    name: 'Album Test',
    cover: 'http://example.com/cover.jpg',
    releaseDate: '2022-01-01',
    description: 'This is a test album.',
    genre: 'Rock',
    recordLabel: 'Test Label',
  };

  const albumsMock: AlbumList[] = [
    { id: 1, name: 'Album 1', cover: 'http://example.com/cover1.jpg', releaseDate: '2020-01-01', description: 'First Album', genre: 'Pop', recordLabel: 'Label 1' },
    { id: 2, name: 'Album 2', cover: 'http://example.com/cover2.jpg', releaseDate: '2021-01-01', description: 'Second Album', genre: 'Jazz', recordLabel: 'Label 2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService]
    });

    service = TestBed.inject(AlbumService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an album', () => {
    service.createAlbum(albumMock).subscribe((response) => {
      expect(response).toEqual(albumMock);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(albumMock);
  });

  it('should get all albums', () => {
    service.getAlbums().subscribe((response) => {
      expect(response).toEqual(albumsMock);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(albumsMock); 
  });

  it('should get album by id', () => {
    const albumId = 1;
    service.getAlbumById(albumId).subscribe((response) => {
      expect(response).toEqual(albumMock);
    });

    const req = httpMock.expectOne(`${apiUrl}/${albumId}`);
    expect(req.request.method).toBe('GET');
    req.flush(albumMock); 
  });

  it('should update an album', () => {
    const updatedAlbum: Album = { ...albumMock, name: 'Updated Album' };

    service.updateAlbum('1', updatedAlbum).subscribe((response) => {
      expect(response).toEqual(updatedAlbum);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedAlbum); 
  });

  it('should delete an album', () => {
    const albumId = '1';

    service.deleteAlbum(albumId).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/${albumId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}); 
  });
});
