import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApigetService, model1 } from '../apiget.service';


@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit {


  networks: model1[];
  constructor(private router: Router, private route: ActivatedRoute, public aPIgetService:  ApigetService) { }

  ngOnInit(){
    this.networks = this.aPIgetService.getNetworks();
  }

  onReturn(){
    this.router.navigateByUrl('', { relativeTo: this.route });
  }

  onSelectedNetwork(id: string){
    // this.network
    this.router.navigate(['/services', id], {relativeTo: this.route});
  }

  public getID(id: string){

  }

}
