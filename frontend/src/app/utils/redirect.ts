import {Router} from '@angular/router';
import {CustomerService} from '../customer.service';

export function Redirect(res: any, router: Router, customerService: CustomerService, currentEmail: string) {
  let path;
  if (res.profile === 'owner') {
    path = '/owner';
  } else if (res.profile === 'admin') {
    path = '/admin';
  } else if (res.profile) {
    path = '/user-reservations';
  }
  customerService.setCurrentEmail(currentEmail);
  customerService.setCurrentProfile(res.profile);
  router.navigateByUrl(path);
  window.location.reload();
}
