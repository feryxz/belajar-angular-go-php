import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaliaDetailComponent } from './personalia-detail.component';

describe('PersonaliaDetailComponent', () => {
  let component: PersonaliaDetailComponent;
  let fixture: ComponentFixture<PersonaliaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaliaDetailComponent]
    });
    fixture = TestBed.createComponent(PersonaliaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
