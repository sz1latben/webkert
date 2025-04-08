import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MobilCsomag } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private csomagok: MobilCsomag[] = [
    {
      id: 1,
      nev: 'Alap csomag',
      leiras: '2 GB adat, 50 perc, 50 SMS',
      adatMennyisegGb: 2,
      perc: 50,
      sms: 50,
      havidij: 2990
    },
    {
      id: 2,
      nev: 'Prémium csomag',
      leiras: '10 GB adat, korlátlan hívás, 200 SMS',
      adatMennyisegGb: 10,
      perc: 9999,
      sms: 200,
      havidij: 6990
    },
    {
      id: 3,
      nev: 'Szuper csomag',
      leiras: '20 GB adat, korlátlan hívás, korlátlan SMS',
      adatMennyisegGb: 20,
      perc: 9999,
      sms: 9999,
      havidij: 9990
    },
    {
      id: 4,
      nev: 'Alap csomag + Extra',
      leiras: '5 GB adat, 100 perc, 100 SMS',
      adatMennyisegGb: 5,
      perc: 100,
      sms: 100,
      havidij: 3990
    },
    {
      id: 5,
      nev: 'Családi csomag',
      leiras: '15 GB adat, korlátlan hívás, 300 SMS',
      adatMennyisegGb: 15,
      perc: 9999,
      sms: 300,
      havidij: 7990
    },
    {
      id: 6,
      nev: 'Diák csomag',
      leiras: '8 GB adat, 100 perc, 100 SMS',
      adatMennyisegGb: 8,
      perc: 100,
      sms: 100,
      havidij: 4990
    }
  ];

  getCsomagok(): Observable<MobilCsomag[]> {
    return of(this.csomagok);
  }
}
