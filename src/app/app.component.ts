import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tommy';

  messages: any[] = [];
  openChat: boolean = false;

  constructor(@Inject(DOCUMENT) document) {}
  
  ngOnInit() {
    // document.getElementById('Chat').style.display = "none";
  }

  // sendMessage(event: any, userName: string, avatar: string, reply: boolean) {
  sendMessage(event: any, userName: string, reply: boolean) {
    // const files = !event.files ? [] : event.files.map((file) => {
    //   return {
    //     url: file.src,
    //     type: file.type,
    //     icon: 'file-text-outline',
    //   };
    // });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: reply,
      // type: files.length ? 'file' : 'text',
      type: 'text',
      // files: files,
      user: {
        name: userName
        // avatar: avatar,
      },
    });
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
