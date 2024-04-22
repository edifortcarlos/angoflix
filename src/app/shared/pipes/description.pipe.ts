import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'description',
    standalone: true
})
export class DescriptionPipe implements PipeTransform {
    transform(value: string, size: number): any {
        if (value.length <= size) {
            return value;
        }
        return `${value.substring(0, size)}...`;
    }
}