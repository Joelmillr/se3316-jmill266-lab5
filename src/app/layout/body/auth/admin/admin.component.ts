import { Component, OnInit } from '@angular/core';
import { CopyrightEnforcementService } from 'src/app/services/copyright-enforcement.service';
import { AdminService } from './admin.service';
import { User } from './users/users.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = []
  active: boolean = false;
  admin: boolean = false;
  changeActive: boolean = false;
  newUserActive: boolean = false;
  deactivate:boolean = false;
  giveAdmin:boolean = false;
  newDescription:String = ""
  docTitle:String = ""
  docDesc:String = ""
  createDocument: boolean = false
  changePriviledges: boolean = false;

  updateDocument: boolean = false

  copyrightEnforements: {"_id": String, "title":String, "description": String}[] = []

  constructor(public adminService: AdminService, public copyrightService: CopyrightEnforcementService) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(users => {
      this.users = users
    })
    this.copyrightService.getCopyrightEnforcements().subscribe(documents => {
      this.copyrightEnforements = documents
    })
  }

  onUpdateDocument(){
    this.updateDocument = true;
  }

  onNewDocumentDescription(documentID: String){
    this.copyrightService.updateCopyrightEnforcement(this.newDescription, documentID).subscribe(message => {
      this.ngOnInit()
    })
  }

  onHideUpdateDocument(){
    this.updateDocument = false;
  }

  onCreateDocument(){
    this.createDocument = true
  }

  onCreateNewDocument(){
    this.copyrightService.createCopyrightEnforcement(this.docTitle, this.docDesc).subscribe(message => {
      this.ngOnInit()
    })
  }

  onHideCreateDocument(){
    this.createDocument = false
  }

  onChangeUserActive(){
    this.changeActive = true
  }

  onHideUserActive(){
    this.changeActive = false
  }

  onNewActive(userID: String){
    // userID and deactivate
    if(this.deactivate){
      this.adminService.deactivateUser(userID).subscribe(message => {
        console.log(message)
        this.ngOnInit()
      })
    }else{
      this.adminService.activateUser(userID).subscribe(message => {
        console.log(message)
        this.ngOnInit()
      })
    }
  }

  onChangePriviledges(){
    this.changePriviledges = true
  }

  onHideUserAdmin(){
    this.changePriviledges = false
  }

  onNewAdmin(userID: String){
    if(this.giveAdmin){
      this.adminService.giveUserAdmin(userID).subscribe(message =>{
        console.log(message)
        this.ngOnInit()
      })
    }
  }
}
