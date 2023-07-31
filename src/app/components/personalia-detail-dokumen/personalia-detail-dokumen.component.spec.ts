import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaliaDetailDokumenComponent } from './personalia-detail-dokumen.component';

describe('PersonaliaDetailDokumenComponent', () => {
  let component: PersonaliaDetailDokumenComponent;
  let fixture: ComponentFixture<PersonaliaDetailDokumenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaliaDetailDokumenComponent]
    });
    fixture = TestBed.createComponent(PersonaliaDetailDokumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
