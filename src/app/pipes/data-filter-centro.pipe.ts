import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilterCentro'
})
export class DataFilterCentroPipe implements PipeTransform {

  /*transform(array: any[], query: string, hidden: string): any { //Se pasa el campo hidden (employee, employee,...) para distinguir los distintos campos de búsqueda
    if (query) {
      return _.filter(array, row => (row.id).toLowerCase().indexOf(query) > -1);
    }
    return array;
  }*/
  
    transform(items: any[], id: string, name: string, cif: number, country: string){
        if (items && items.length){
            return items.filter(item =>{
                if (id && item.id!=id){
                    return false;
                }
                if (name && item.name.toLowerCase().indexOf(name.toLowerCase()) === -1){
                    return false;
                }
				if (cif && (item.cif+'').indexOf(cif+'') === -1){
                    return false;
                }
				if (country && item.country.toLowerCase().indexOf(country.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }

}
