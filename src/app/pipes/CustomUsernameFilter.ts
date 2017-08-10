import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customUsernameFilter'
})
@Injectable()
export class CustomUsernameFilter implements PipeTransform {

  transform(users: any[], args: String): any {
    if (!users)
        return users;
    if(!args)
      return users;
    
    return users.filter(user => user.username.toString().toLowerCase().indexOf(args.toString().toLowerCase()) > -1);
  }
}