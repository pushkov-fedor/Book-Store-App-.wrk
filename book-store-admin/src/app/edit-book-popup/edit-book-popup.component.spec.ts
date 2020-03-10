import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookPopupComponent } from './edit-book-popup.component';

describe('EditBookPopupComponent', () => {
  let component: EditBookPopupComponent;
  let fixture: ComponentFixture<EditBookPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
