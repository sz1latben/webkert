import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MobilCsomag } from '../../models/model';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';



@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  form!: FormGroup;

  csomagok: MobilCsomag[] = [
    { id: 1, nev: 'Alap', leiras: '', adatMennyisegGb: 2, perc: 100, sms: 50, havidij: 2990 },
    { id: 2, nev: 'Prémium', leiras: '', adatMennyisegGb: 10, perc: 9999, sms: 200, havidij: 6990 },
    { id: 3, nev: 'Szuper', leiras: '', adatMennyisegGb: 20, perc: 9999, sms: 9999, havidij: 9990 },
    { id: 4, nev: 'Alap + Extra', leiras: '', adatMennyisegGb: 5, perc: 100, sms: 100, havidij: 3990 },
    { id: 5, nev: 'Családi', leiras: '', adatMennyisegGb: 15, perc: 9999, sms: 300, havidij: 7990 },
    { id: 6, nev: 'Diák', leiras: '', adatMennyisegGb: 8, perc: 100, sms: 100, havidij: 3990 }
  ];

  vegosszeg: number | null = null;
  constructor(private fb: FormBuilder, private auth: AuthService, private firestoreService: FirestoreService) {
    this.form = this.fb.group({
      cim: ['', Validators.required],
      csomagId: [null, Validators.required],
      feltetelek: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  frissitVegosszeg() {
    const csomagId = this.form.get('csomagId')?.value;
    const csomag = this.csomagok.find(c => c.id === csomagId);
    this.vegosszeg = csomag ? csomag.havidij : null;
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const uid = this.auth.getUid();
    const csomagId = this.form.get('csomagId')?.value;
    const cim = this.form.get('cim')?.value;

    if (!uid) {
      alert('Be kell jelentkezni a rendeléshez.');
      return;
    }

    try {
      await this.firestoreService.ujRendeles({ uid, csomagId, cim });
      alert('✅ A rendelés sikeresen elmentve!');
      this.form.reset();
      this.vegosszeg = null;
    } catch (err) {
      console.error(err);
      alert('❌ Hiba történt a mentés során.');
    }
  }
}
