import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-templates',
  templateUrl: './edit-templates.component.html',
  styleUrls: ['./edit-templates.component.css']
})
export class EditTemplatesComponent implements OnInit {
  public trIds:String[] = ["tr-0"];
  public templateName: String;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.templateName = params['template'];
      });
  }
  addNewRowToTable(){
    let len = this.trIds.length;
    this.trIds.push(`tr-${len}`);
  }
  removeRowFromTable() {
    this.trIds.pop();
  }

}


