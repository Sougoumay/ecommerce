import {Component, OnInit} from '@angular/core';
import {OrderHistoryService} from "../../services/order/order-history.service";
import {OrderHistory} from "../../modeles/order/order-history";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{

 orderHistoryList : OrderHistory[] = [];
 storage : Storage = sessionStorage;
  constructor(private orderHistoryService : OrderHistoryService) {
  }

  ngOnInit() {
    this.getOrderHistory();
  }

  getOrderHistory() {
    const email = sessionStorage.getItem("username");
    if (email!=null) {
      const subEmail = email.substring(1, email.length-1);
      console.log("email " + email)
      console.log("subEmail " + subEmail)
      this.orderHistoryService.getOrderHistory(subEmail).subscribe({
        next : data => {
          this.orderHistoryList = data._embedded.orders;
          console.log(this.orderHistoryList)
        },
        error : err => {
          console.log(err.message)
        }
      })
    }
  }

}
