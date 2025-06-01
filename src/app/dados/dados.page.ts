import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  standalone: false,
  selector: 'app-dados',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.page.scss'],
})
export class DadosPage implements OnInit {

  novoEmail: string = '';
  emails: any[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getEmails().subscribe(res => {
      this.emails = res;
      console.log('📨 E-mails registrados:', this.emails);
    });
  }

  salvarEmail() {
    if (this.novoEmail) {
      this.firestoreService.addEmail(this.novoEmail).then(() => {
        this.novoEmail = '';
      });
    }
  }

  deletarEmail(emailId: string) {
    this.firestoreService.deleteEmail(emailId);
  }
}
