import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaliaEditModalComponent } from './personalia-edit-modal.component';

describe('PersonaliaEditModalComponent', () => {
  let component: PersonaliaEditModalComponent;
  let fixture: ComponentFixture<PersonaliaEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaliaEditModalComponent]
    });
    fixture = TestBed.createComponent(PersonaliaEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
