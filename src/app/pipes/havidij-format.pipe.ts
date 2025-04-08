import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'havidijFormat',
  standalone: true
})
export class HavidijFormatPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('hu-HU') + ' Ft/hó';
  }
}
