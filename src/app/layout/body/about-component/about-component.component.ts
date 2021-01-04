import { Component, OnInit } from '@angular/core';
import { CopyrightEnforcementService } from 'src/app/services/copyright-enforcement.service';

@Component({
  selector: 'app-about-component',
  templateUrl: './about-component.component.html',
  styleUrls: ['./about-component.component.css']
})
export class AboutComponentComponent implements OnInit {
  copyrightEnforements: {"_id": String, "title":String, "description": String}[] = []

  constructor(public copyrightService: CopyrightEnforcementService) { }

  ngOnInit(): void {
    this.copyrightService.getCopyrightEnforcements().subscribe(documents => {
      this.copyrightEnforements = documents
    })
  }

}
