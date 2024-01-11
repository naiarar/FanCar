import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { of, Subject } from 'rxjs';
import { MockAuthService } from './auth/mock.authservice';


describe('AppComponent', () => {
  let component: AppComponent;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComponent, { provide: AuthService, useClass: MockAuthService }],
    });

    component = TestBed.inject(AppComponent);
    authService = TestBed.inject(AuthService);
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });


  it('should be isLogged true when AuthService isLogged is true', () => {
    expect(component.isLogged).toBe(true);
  });

  it('should set isLogged to false when AuthService call logout', () => {
    authService.logout()

    expect(component.isLogged).toBe(false);
  });

});
