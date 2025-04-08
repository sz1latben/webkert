export interface MobilCsomag {
    id: number;
    nev: string;
    leiras: string;
    adatMennyisegGb: number;
    perc: number;
    sms: number;
    havidij: number;
  }
  
  export interface Rendeles {
    id: number;
    ugyfelId: number;
    csomagId: number;
    datum: Date;
    allapot: 'Feldolgozás alatt' | 'Fizetve' | 'Elutasítva';
  }
  
  export interface Ugyfel {
    id: number;
    nev: string;
    email: string;
    cim: string;
    telefonszam: string;
  }
  
  export interface Szolgaltato {
    id: number;
    nev: string;
    logoUrl: string;
    elerhetoseg: string;
  }
  