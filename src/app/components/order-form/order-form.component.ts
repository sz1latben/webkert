import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MobilCsomag } from '../../models/model';

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
    MatButtonModule
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nev: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cim: [''],
      csomagId: [null, Validators.required],
      feltetelek: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      // Megjelöli a mezőket hibásnak, ha nem érvényes
      this.form.markAllAsTouched();
      return;
    }
  
    console.log('Rendelés elküldve:', this.form.value);
    alert('Köszönjük! Rendelését rögzítettük.');
    this.form.reset();
  }
}
