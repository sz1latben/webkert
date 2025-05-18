import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageService } from '../../services/package.service';
import { MobilCsomag } from '../../models/model';
import { PackageItemComponent } from '../package-item/package-item.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule, PackageItemComponent],
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {
  csomagok: MobilCsomag[] = [];

  constructor(private auth: AuthService, private router: Router, private packageService: PackageService) {}

  ngOnInit(): void {
    this.packageService.getCsomagok().subscribe((data: MobilCsomag[]) => {
      this.csomagok = data;
    });
  }

  csomagMegrendelve(csomag: MobilCsomag): void {
    alert(`Megrendelve: ${csomag.nev} (${csomag.havidij} Ft/hó)`);
  }
  
}
