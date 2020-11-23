import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private scannerEnabled = true;
  private information = 'No se ha detectado información de ningún código. Acerque un código QR para escanear.';

  constructor() { }

  ngOnInit(): void {
  }
/*/
  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = 'Espera recuperando información... ';
  }
  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = 'No se ha detectado información de ningún código. Acerque un código QR para escanear.';
  }

}
/*/

}
