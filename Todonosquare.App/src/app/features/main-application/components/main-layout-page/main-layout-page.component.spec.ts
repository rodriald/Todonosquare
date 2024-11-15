import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutPageComponent } from './main-layout-page.component';

describe('MainLayoutPageComponent', () => {
  let component: MainLayoutPageComponent;
  let fixture: ComponentFixture<MainLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
