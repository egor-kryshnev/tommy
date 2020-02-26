import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  oncli(){

  }

  onReturn(){
    this.router.navigateByUrl('', { relativeTo: this.route });
  }

  onNetwork(){
    this.router.navigateByUrl('services', { relativeTo: this.route });
  }

}
