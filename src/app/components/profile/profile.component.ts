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
}
