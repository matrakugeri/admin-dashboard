import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UsersStore } from '../../../core/services/users.store';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { UserFilters } from '../models/user.model';

const routerMock = {
  navigate: jasmine.createSpy('navigate'),
};

const activatedRouteMock = {
  queryParams: of({ start: '0', limit: '10' }),
  snapshot: { queryParams: { start: '0', limit: '10' } },
};

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: UsersStore, useValue: {} },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should test onPageChange, so it navigates to the new query params based on page input change', () => {
    const page = 2;
    component.onPageChange(page);
    expect(routerMock.navigate).toHaveBeenCalledWith([''], {
      queryParams: {
        start: page,
        limit: 10,
      },
    });
  });

  it('should test onSearchByKeyword, so it navigates to correct path based on user keyword input change', () => {
    const keyword = 'test-keyword';
    component.onSearchByKeyword(keyword);
    expect(routerMock.navigate).toHaveBeenCalledWith([''], {
      queryParams: {
        start: 0,
        limit: 10,
        keyword,
      },
    });
  });

  it('should test onTableFiltersSearch, so it navigates to correct path based on user input change', () => {
    const filters = {
      firstName: 'Jane',
      job: 'Engineer',
      lastName: null,
      gender: null,
      date: null,
      archived: null,
    };
    component.onTableFiltersSearch(filters);
    expect(routerMock.navigate).toHaveBeenCalledWith([''], {
      queryParams: {
        ...filters,
        start: 0,
        limit: 10,
      },
    });
  });

  it('should test onClear, so it navigates to correct path based on user input change', () => {
    const initialParams = {
      keyword: 'test',
    } as UserFilters;
    component.onClear(initialParams);
    expect(routerMock.navigate).toHaveBeenCalledWith([''], {
      queryParams: {},
    });
  });

  it('should mark form as touched and return without closing the dialog if the form is invalid', () => {
    // Set the form to an invalid state
    component.form.controls.firstName.setValue('');
    component.form.controls.lastName.setValue('Doe');
    component.form.controls.gender.setValue('Male');
    component.form.controls.job.setValue('Developer');
    component.form.controls.date.setValue('2023-01-01');

    // Make sure the dialog is open before the test
    component.isVisible.set(true);

    component.onSave();

    // Make sure the form is marked as touched
    expect(component.form.controls.firstName.touched).toBe(true);
    expect(component.form.controls.lastName.touched).toBe(true);

    expect(component.isVisible()).toBe(true);
  });

  // it('should close the dialog if the form is valid in create mode', () => {
  //   // Set the component to 'create' mode
  //   component.mode.set('create');

  //   // Set the form to a valid state
  //   component.form.controls.firstName.setValue('John');
  //   component.form.controls.lastName.setValue('Doe');
  //   component.form.controls.gender.setValue('Male');
  //   component.form.controls.job.setValue('Developer');
  //   component.form.controls.date.setValue('2023-01-01');
  //   component.form.controls.archived.setValue(false);

  //   // Make sure the dialog is open before the test
  //   component.isVisible.set(true);

  //   component.onSave();

  //   // Make sure that the dialog is closed
  //   expect(component.isVisible()).toBe(false);
  // });

  it('should return without closing the dialog if in edit mode but currentUserId is null', () => {
    // Set the component to 'edit' mode but with a null user ID
    component.mode.set('edit');
    component.currentUserId.set(null);

    // Set the form to a valid state
    component.form.controls.firstName.setValue('Jane');
    component.form.controls.lastName.setValue('Smith');
    component.form.controls.gender.setValue('Female');
    component.form.controls.job.setValue('Designer');
    component.form.controls.date.setValue('2023-02-02');
    component.form.controls.archived.setValue(true);

    // Make sure the dialog is open before the test
    component.isVisible.set(true);

    component.onSave();

    // Make sure that the dialog is still open because the method returned early
    expect(component.isVisible()).toBe(true);
  });
});
