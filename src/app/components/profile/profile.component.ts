import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Timestamp } from '@angular/fire/firestore';
import { MatDividerModule } from '@angular/material/divider';
import { MobilCsomag } from '../../models/model';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;

  rendelesek: {
    csomagId: number;
    cim: string;
    timestamp: Timestamp;
    id: string;
  }[] = [];

  constructor(private fb: FormBuilder, private auth: AuthService, private firestore: FirestoreService) {}

  async ngOnInit() {
    this.form = this.fb.group({
      ujJelszo: ['', [Validators.required, Validators.minLength(6)]],
      ujJelszoUjra: ['', Validators.required]
    });

    const uid = this.auth.getUid();
    if (!uid) return;

    this.firestore.lekerRendelesek(uid).then(rendelesek => {
      this.rendelesek = rendelesek;
    });
  }

  async onJelszoModositas() {
    const { ujJelszo, ujJelszoUjra } = this.form.value;
    if (ujJelszo !== ujJelszoUjra) {
      alert('A két jelszó nem egyezik.');
      return;
    }

    try {
      await this.auth.updatePassword(ujJelszo!);
      alert('Jelszó sikeresen frissítve!');
      this.form.reset();
    } catch (err: any) {
      alert('Hiba: ' + err.message);
    }
  }

  csomagok: MobilCsomag[] = [
    { id: 1, nev: 'Alap', leiras: '', adatMennyisegGb: 2, perc: 100, sms: 50, havidij: 2990 },
    { id: 2, nev: 'Prémium', leiras: '', adatMennyisegGb: 10, perc: 9999, sms: 200, havidij: 6990 },
    { id: 3, nev: 'Szuper', leiras: '', adatMennyisegGb: 20, perc: 9999, sms: 9999, havidij: 9990 },
    { id: 4, nev: 'Alap + Extra', leiras: '', adatMennyisegGb: 5, perc: 100, sms: 100, havidij: 3990 },
    { id: 5, nev: 'Családi', leiras: '', adatMennyisegGb: 15, perc: 9999, sms: 300, havidij: 7990 },
    { id: 6, nev: 'Diák', leiras: '', adatMennyisegGb: 8, perc: 100, sms: 100, havidij: 3990 }
  ];

  getCsomagNev(id: number): string {
      return this.csomagok.find(c => c.id === id)?.nev ?? `#${id}`;
    }

  async torolRendelest(id: string) {
    const mehet = confirm('Biztosan törlöd ezt a rendelést?');
    if (!mehet) return;

    try {
      await this.firestore.torolRendeles(id);
      this.rendelesek = this.rendelesek.filter(r => r.id !== id);
      alert('Rendelés törölve.');
    } catch (err) {
      console.error(err);
      alert('Hiba történt a törlés során.');
    }
  }
}
