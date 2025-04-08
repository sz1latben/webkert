import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobilCsomag } from '../../models/model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HavidijFormatPipe } from '../../pipes/havidij-format.pipe';

@Component({
  selector: 'app-package-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HavidijFormatPipe
  ],
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.scss']
})
export class PackageItemComponent {
  @Input() csomag!: MobilCsomag;

  @Output() megrendelve = new EventEmitter<MobilCsomag>();

  rendel(): void {
    this.megrendelve.emit(this.csomag);
  }
}
