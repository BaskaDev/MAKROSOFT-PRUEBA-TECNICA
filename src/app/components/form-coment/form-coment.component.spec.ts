import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComentComponent } from './form-coment.component';

describe('FormComentComponent', () => {
  let component: FormComentComponent;
  let fixture: ComponentFixture<FormComentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormComentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
