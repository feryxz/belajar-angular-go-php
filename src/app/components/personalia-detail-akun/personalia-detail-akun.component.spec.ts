import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaliaDetailAkunComponent } from './personalia-detail-akun.component';

describe('PersonaliaDetailAkunComponent', () => {
  let component: PersonaliaDetailAkunComponent;
  let fixture: ComponentFixture<PersonaliaDetailAkunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaliaDetailAkunComponent]
    });
    fixture = TestBed.createComponent(PersonaliaDetailAkunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
