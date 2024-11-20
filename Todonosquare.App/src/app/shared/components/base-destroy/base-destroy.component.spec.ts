import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDestroyComponent } from './base-destroy.component';

describe('BaseDestroyComponent', () => {
  let component: BaseDestroyComponent;
  let fixture: ComponentFixture<BaseDestroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDestroyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDestroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
