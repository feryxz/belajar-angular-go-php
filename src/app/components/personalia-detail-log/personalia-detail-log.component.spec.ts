import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaliaDetailLogComponent } from './personalia-detail-log.component';

describe('PersonaliaDetailLogComponent', () => {
  let component: PersonaliaDetailLogComponent;
  let fixture: ComponentFixture<PersonaliaDetailLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaliaDetailLogComponent]
    });
    fixture = TestBed.createComponent(PersonaliaDetailLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
