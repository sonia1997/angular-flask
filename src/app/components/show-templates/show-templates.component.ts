import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-show-templates',
  templateUrl: './show-templates.component.html',
  styleUrls: ['./show-templates.component.css']
})

export class ShowTemplatesComponent implements OnInit {
	public template_data: object[] = [];

  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit() {this.getTemplates();}
   
  editTemplate(templateName) {
    this.router.navigate(
     [
      'edit',
      templateName
     ]
    );
  }
  getTemplates(): void {
		this.http.get('http://127.0.0.1:5000/templates').subscribe(data => {this.template_data.push(data);});
		console.log(this.template_data);
	}
  
  //Yet to be implemented
deleteRow(index){
	console.log(index);
	this.template_data.splice(index, 1);
	
		//console.log(this.template_data[0][0]);
		//console.log(this.template_data[0][1]);
		
        /*for(let i=0; i<=this.template_data.length; i++){
            if (this.template_data[0][i] === templatename) {
				console.log("if");
				console.log(i);
                this.template_data.splice(i, 1);
            }
        }*/
    }

/*	
importFromDesktop(){
	
	document.getElementById('filebutton').addEventListener('click', this.openDialog);
}

openDialog() 
{
    document.getElementById('fileid').click();
	var fileupload = document.getElementById("fileid");
	
	var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];
	console.log(fileName);
	var n=fileName.endsWith('.json');
	if (n)
	{
		console.log("yes");
	}
	else
	{
		console.log("no");
	}
}*/

uploadFile($event) {
	var filename=$event.target.files[0]['name'];
    console.log($event.target.files[0]); // outputs the first file
	var end=filename.endsWith('.json');
	//console.log(typeof filename);
	
	let fileReader = new FileReader();
	
    fileReader.onload = (e) => {
    console.log(fileReader.result);
	if(end)
	{
		console.log("yes");
		//reader.onload = function(e) {}
		var texte=fileReader.result;
		console.log(texte);
		//JSON.stringify($event.target.files[0]);
		
		return this.http.post('http://localhost:5000/import', JSON.stringify(texte), httpOptions).subscribe(out => {console.log(out);});	
}
	else
	{
		alert("Upload a .json file");
	}};fileReader.readAsText($event.target.files[0]);
}	
}