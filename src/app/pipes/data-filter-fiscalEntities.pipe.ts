import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilterFiscalEntities'
})
export class DataFilterFiscalEntitiesPipe implements PipeTransform {
  
    transform(items: any[], id: string, name: string, nifcif: string, telephone: string, email: string){
        if (items && items.length){
            return items.filter(item =>{
                if (id && item.id && item.id!=id){
                    return false;
                }
                if (name && item.name && item.name.toLowerCase().indexOf(name.toLowerCase()) === -1){
                    return false;
                }
                if (nifcif && item.nifcif && item.nifcif.toLowerCase().indexOf(nifcif.toLowerCase()) === -1){
                    return false;
                }
                if (telephone && item.telephone && item.telephone.toLowerCase().indexOf(telephone.toLowerCase()) === -1){
                    return false;
                }				
				if (email && item.email && item.email.toLowerCase().indexOf(email.toLowerCase()) === -1){
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
