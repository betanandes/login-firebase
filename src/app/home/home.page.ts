import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = '';
  senha: string = '';
  logado: boolean = false;

  constructor(
    private auth: Auth,
    private toastController: ToastController
  ) {
    // Verifica se o usuário está logado ao abrir a tela
    onAuthStateChanged(this.auth, (user) => {
      this.logado = !!user;
      this.email = user?.email ?? '';
    });
  }

  async login() {
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.senha);
      this.logado = true;
      this.toast('Login realizado com sucesso!');
    } catch (error: any) {
      this.toast('Erro ao fazer login: ' + error.message);
    }
  }

  async register() {
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.senha);
      this.logado = true;
      this.toast('Cadastro realizado com sucesso!');
    } catch (error: any) {
      this.toast('Erro ao cadastrar: ' + error.message);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.logado = false;
      this.email = '';
      this.senha = '';
      this.toast('Logout feito com sucesso!');
    } catch (error: any) {
      this.toast('Erro ao sair: ' + error.message);
    }
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'medium'
    });
    toast.present();
  }
}
