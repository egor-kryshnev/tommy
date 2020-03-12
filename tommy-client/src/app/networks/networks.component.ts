import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApigetService, model1 } from '../apiget.service';
import { PostReqService } from '../post-req.service'


@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit {


  networks: model1[];
  constructor(private router: Router, private route: ActivatedRoute, public aPIgetService:  ApigetService, public postReqService: PostReqService) { }

  ngOnInit(){
    this.networks = this.aPIgetService.getNetworks();
  }

  onReturn(){
    this.router.navigateByUrl('', { relativeTo: this.route });
  }

  onSelectedNetwork(id: string){
    // this.network
    this.postReqService.networkId = id;
    this.router.navigate(['/services', id], {relativeTo: this.route});

  }

  public getID(id: string){

  }

}
