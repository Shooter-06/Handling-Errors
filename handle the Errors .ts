Step 1: Install ngx-toastr

npm install ngx-toastr --save
npm install @angular/animations --save


Then, import the ToastrModule into your Angular module:

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    // ... other imports
    ToastrModule.forRoot() // ToastrModule added
  ],
  //...
})
export class YourModule { }


Step 2: Handle API Request and Error in Component

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http.get('https://api.example.com/data')
      .pipe(
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      )
      .subscribe(data => {
        console.log(data);
        // Handle the data from the API
      });
  }

  private handleError(error: any) {
    console.error('API error: ', error);
    if (error.status === 404) {
      this.toastr.error('Data not found!', 'Error');
    } else {
      this.toastr.error('An error occurred while fetching data.', 'Error');
    }
  }
}


// he fetchData() method is called on component initialization (ngOnInit) and makes a GET request to the API endpoint.
// If an error occurs during the API request, it is caught and processed by the handleError() method, thanks to catchError.
// handleError() logs the error to the console and displays an error message using ngx-toastr.