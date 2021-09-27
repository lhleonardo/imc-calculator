import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return this.height && this.weight && this.height > 0 && this.weight > 0;
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);

    const msgClassificacao = this.getImcClassification(imc);

    this.showMessage(`IMC = ${imc.toFixed(2)} - ${msgClassificacao}`);
  }

  private getImcClassification(imc: number): string {
    if (imc < 18.5) return 'Magreza';
    if (imc >= 18.5 && imc <= 24.9) return 'Normal';

    if (imc >= 25 && imc <= 29.9) return 'Sobrepeso';

    if (imc >= 30 && imc <= 39.9) return 'Obesidade';

    if (imc > 40) return 'Obesidade Grave';

    return 'Não classificado';
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create({
      message: msg,
      color: 'dark',
      buttons: [
        {
          icon: 'close',
        },
      ],
    });
    toast.present();
  }
}
