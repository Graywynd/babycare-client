import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customFirstnameFilter'
})
@Injectable()
export class CustomFirstnameFilter implements PipeTransform {

  transform(users: any[], args: String): any {
    if (!users)
        return users;
    if(!args)
      return users;
    
    return users.filter(user => user.firstname.toString().toLowerCase().indexOf(args.toString().toLowerCase()) > -1);
  }
}