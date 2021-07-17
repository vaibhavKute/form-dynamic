import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  data: any;
  productForm: any;
  // modeEditForm: boolean;
  // currentIndex: number;
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('dataSource')!);
    console.log(this.data);
  }

  deleteRow(d:any){
    const index = this.data.indexOf(d);
    this.data.splice(index, 1);
    // console.log("test")
    localStorage.clear();
  }

  editProduct(data:any) {
    console.log(this.data);
    this.route.navigate(['/register']);
  }
}
