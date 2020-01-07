import {Component, OnInit} from '@angular/core';
import {RegisterModel} from '../model/register-model';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  users: Observable<RegisterModel>;
  email: string;
  closeResult: string;

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  editUser(content: any, email: string) {
    this.email = email;
    console.log(this.email)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteUser(email: string) {
    this.apiService.deleteUser(email)
      .subscribe(data => {
        window.alert(data.message);
      });
  }

}
