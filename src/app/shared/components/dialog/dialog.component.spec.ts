import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;

    // Mock title of the dialog
    let title = 'Create User';
    fixture.componentRef.setInput('title', title);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
