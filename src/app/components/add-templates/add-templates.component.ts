import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-add-templates',
  templateUrl: './add-templates.component.html',
  styleUrls: ['./add-templates.component.css']
})

export class AddTemplatesComponent implements OnInit {
  public trIds:String[] = ["tr-0"];
  public tId:any[]=[];
  //private userUrl = 'http://localhost:5000'; 
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  
  addNewRowToTable(){
    let len = this.trIds.length;
    this.trIds.push(`tr-${len}`);
  }
  
  removeRowFromTable(index){
	  console.log(index);
      this.trIds.splice(index, 1);
  }
  
  getDataFromTable() {
	  var final_data = new Array();
	  let i=0
	  var dict={}
	  let tempJson = {};
	  tempJson['templatename']=(<HTMLInputElement>document.getElementById('templatename')).value
	  final_data.push(tempJson['templatename']);
	  
	  for(i=0; i<this.trIds.length; ++i)
	  {		  
				  var final_data = new Array();
				  tempJson['field'] = (<HTMLInputElement>document.getElementById('field-tr-'+i)).value;
				  tempJson['type'] = (<HTMLInputElement>document.getElementById('typeid-tr-'+i)).value;
				  tempJson['synonyms'] = (<HTMLInputElement>document.getElementById('synonims-tr-'+i)).value;
	 
				  final_data.push(tempJson['field']);
				  final_data.push(tempJson['type']);
				  final_data.push(tempJson['synonyms']);
				  dict[i]=final_data;
	  }
	dict['templatename']=tempJson['templatename'];
	console.log(dict);
	console.log(JSON.stringify(dict));
	
	return this.http.post('http://localhost:5000/add', JSON.stringify(dict), httpOptions).subscribe(out => {console.log(out);});
  }
}
