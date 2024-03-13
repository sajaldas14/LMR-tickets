import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasteralertComponent } from './toasteralert.component';

describe('ToasteralertComponent', () => {
  let component: ToasteralertComponent;
  let fixture: ComponentFixture<ToasteralertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToasteralertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToasteralertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
