import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilterContacto'
})
export class DataFilterContactoPipe implements PipeTransform {

  /*transform(array: any[], query: string, hidden: string): any { //Se pasa el campo hidden (employee, employee,...) para distinguir los distintos campos de búsqueda
    if (query) {
      return _.filter(array, row => (row.id).toLowerCase().indexOf(query) > -1);
    }
    return array;
  }*/
  
    transform(items: any[], id: string, name: string, lastname1: string, lastname2: string, email: string){
        if (items && items.length){
            return items.filter(item =>{
                if (id && item.idinternal && item.idinternal!=id){
                    return false;
                }
                if (name && item.firstname && item.firstname.toLowerCase().indexOf(name.toLowerCase()) === -1){
                    return false;
                }
                if (lastname1 && item.lastname1 && item.lastname1.toLowerCase().indexOf(lastname1.toLowerCase()) === -1){
                    return false;
                }
                if (lastname2 && item.lastname2 && item.lastname2.toLowerCase().indexOf(lastname2.toLowerCase()) === -1){
                    return false;
                }				
				if (email && item.emailoffice && item.emailoffice.toLowerCase().indexOf(email.toLowerCase()) === -1){
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
