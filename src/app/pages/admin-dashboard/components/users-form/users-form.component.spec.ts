import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFormComponent } from './users-form.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('UsersFormComponent', () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;

    let form = new FormGroup({
      firstName: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true }),
      gender: new FormControl('', { nonNullable: true }),
      job: new FormControl('', { nonNullable: true }),
      date: new FormControl('', { nonNullable: true }),
      archived: new FormControl(false, { nonNullable: true }),
    });
    fixture.componentRef.setInput('form', form);
    // e.g. setInput('myInput', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
