import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
  standalone: true
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], pagesize:number , page:number): any {
      return [ ...value.slice( pagesize*(page) , pagesize*(page+1)  )];
  }

  
}
