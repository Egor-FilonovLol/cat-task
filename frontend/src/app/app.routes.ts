// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CatsComponent } from './cats/cats.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cats', component: CatsComponent, canActivate: [AuthGuard] },
  { path: 'chat/:room', component: ChatComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/cats', pathMatch: 'full' },
  { path: '**', redirectTo: '/cats' }
];