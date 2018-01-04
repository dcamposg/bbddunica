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
  
    transform(items: any[], id: string, name: string, email: string, telephone: string, cif: number, coordinator: string, opendate: string){
        if (items && items.length){
            return items.filter(item =>{
                if (id && item.code && item.code!=id){
                    return false;
                }
                if (name && item.franchisename && item.franchisename.toLowerCase().indexOf(name.toLowerCase()) === -1){
                    return false;
                }
                if (email && item.emailfirst && item.emailfirst.toLowerCase().indexOf(email.toLowerCase()) === -1){
                    return false;
                }
                if (telephone && item.telephonefirst && item.telephonefirst.toLowerCase().indexOf(telephone.toLowerCase()) === -1){
                    return false;
                }				
				if (cif && item.nifcif && (item.nifcif+'').indexOf(cif+'') === -1){
                    return false;
                }
				if (coordinator && item.coordinatorkids && item.coordinatorkids.toLowerCase().indexOf(coordinator.toLowerCase()) === -1){
                    return false;
                }
				if (opendate && item.opendate && item.opendate.toLowerCase().indexOf(opendate.toLowerCase()) === -1){
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
