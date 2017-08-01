import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customLastnameFilter'
})
@Injectable()
export class CustomLastnameFilter implements PipeTransform {

  transform(users: any[], args: String): any {
    if (!users)
        return users;
    if(!args)
      return users;
    
    return users.filter(user => user.lastname.toString().toLowerCase().indexOf(args.toString().toLowerCase()) > -1);
  }
}