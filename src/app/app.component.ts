import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tommy';

  messages: any[] = [];
  openChat: boolean = false;

  constructor(@Inject(DOCUMENT) document, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // document.getElementById('Chat').style.display = "none";
  }

  onHome(){
    this.router.navigateByUrl('', { relativeTo: this.route });
  }
  onOpenChat() {
    if(!this.openChat){
      document.getElementById('Chat').style.display = "flex";
    } else {
      document.getElementById('Chat').style.display = "none";
    }
    this.openChat = !this.openChat;
  }
}
