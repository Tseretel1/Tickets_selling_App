import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { RegistrationComponent } from './Registration_Login/registration.component';
import { FullTicketComponent } from './tickets/full-ticket/full-ticket.component';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { authGuard, CreatorGuard, UserGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'Tickets', component: TicketsComponent },
  { path: 'Login', component: RegistrationComponent },
  { path: 'FullTicket/:id', component: FullTicketComponent},
  { path: 'EventCreator', component:EventCreatorComponent,canActivate:[CreatorGuard]},
  { path: '', redirectTo: '/Tickets', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/Tickets' } 
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule { }
