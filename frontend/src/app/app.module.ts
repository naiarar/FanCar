import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
      BrowserModule,
      AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      // Implemente aqui a lógica para obter o token do usuário autenticado
      return localStorage.getItem('access_token');
    },
    whitelistedDomains: ['localhost:8000'],
    blacklistedRoutes: ['localhost:8000']
  }
}
