import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaliaAddModalComponent } from './personalia-add-modal.component';

describe('PersonaliaAddModalComponent', () => {
  let component: PersonaliaAddModalComponent;
  let fixture: ComponentFixture<PersonaliaAddModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaliaAddModalComponent]
    });
    fixture = TestBed.createComponent(PersonaliaAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
