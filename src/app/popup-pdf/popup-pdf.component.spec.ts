import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPdfComponent } from './popup-pdf.component';

describe('PopupPdfComponent', () => {
  let component: PopupPdfComponent;
  let fixture: ComponentFixture<PopupPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
