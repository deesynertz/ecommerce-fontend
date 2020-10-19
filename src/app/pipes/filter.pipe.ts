import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, sName: string): any {
    if (value === ""){
      return value;
    }
    const productArray: any[]=[];
    for (let i=0; i<= value.length; i++){
      let productName:string=value[i].productTitle;
      if (productName.startsWith(sName)){
        productArray.push(value[i]);
      }
    }
    return productArray;
  }

}
