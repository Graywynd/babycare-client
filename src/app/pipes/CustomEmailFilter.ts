import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customEmailFilter'
})
@Injectable()
export class CustomEmailFilter implements PipeTransform {

  transform(users: any[], args: String): any {
    if (!users)
        return users;
    if(!args)
      return users;
    
    return users.filter(user => user.email.toString().toLowerCase().indexOf(args.toString().toLowerCase()) > -1);
  }
}