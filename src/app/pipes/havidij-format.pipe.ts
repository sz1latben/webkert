import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'havidijFormat'
})
export class HavidijFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
