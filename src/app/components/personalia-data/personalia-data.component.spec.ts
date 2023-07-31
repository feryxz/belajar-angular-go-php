import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaliaDataComponent } from './personalia-data.component';

describe('PersonaliaDataComponent', () => {
  let component: PersonaliaDataComponent;
  let fixture: ComponentFixture<PersonaliaDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaliaDataComponent]
    });
    fixture = TestBed.createComponent(PersonaliaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
