import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Component, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { UserService } from './user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,MatIcon,QRCodeModule,DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit{

  constructor(
    private router:Router,
    private service :UserService,
    private datepipe : DatePipe, 
    private authservice : AuthService,
    )
    { }
  ngOnInit(): void {
    this.UserProfile();
    this.activeTickets();
  }
  Profile :any = {};
  actTickets : any[] = [];
  expTickets : any[] = [];
  Instances : any[] = [];
  SingleTicket :any = {};
  QRVisible : boolean = false;
  Userid :string = "";
  QrData :string = "";
  ExitFromAccountVisible :boolean = true;

  BackFromTicket(){
    this.QRVisible = false;
    this.ExitFromAccountVisible = true;
    this.Instances = [];
  }

  viewTicket(tkt: any){
    this.QRVisible = true;
    this.SingleTicket = tkt;
    this.ExitFromAccountVisible = false;
    this.service.TicketInstances(tkt.id).subscribe(
      (resp)=>{
        this.Instances = resp;
      },
      (error)=>{
      }
     )
  }

  

  UserProfile(){
     this.service.GetMyProfile().subscribe(
      (resp)=>{
        this.Profile = resp;
      },
      (error)=>{
        console.log(error);
      }
     )
  }


 activeTickets(){
  this.service.GetActiveTickets().subscribe(
   (resp)=>{
    this.actTickets  = resp;
    console.log(resp);
   },
   (error)=>{
     console.log(error);
   }
  )
}
expiredTickets(){
  this.service.GetExpiredTickets().subscribe(
   (resp)=>{
    this.expTickets  = resp;
   },
   (error)=>{
     console.log(error);
   }
  )
}
ticketSwitch : boolean = true;

switchToActive(){
  this.ticketSwitch = true;
}
switchToExpired(){
  this.ticketSwitch = false;
  if(this.expTickets != null){
    this.expiredTickets();
  }
}

  ExitFromAccount(){
    const token = localStorage.getItem('token');
    const CreatorToken = localStorage.getItem('CreatorToken');
    if(token || CreatorToken){
      localStorage.removeItem('token');
      localStorage.removeItem('CreatorToken');
      this.router.navigate(['/Login']);
    }
  }
  



  modalvisible :boolean = false;
  Showmodal(){
    this.modalvisible = true;
  }
  hidemodal(){
    this.modalvisible = false;
  }
}
