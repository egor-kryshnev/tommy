import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class EventEmiterService {
    dataStr = new EventEmitter();
    tUser = new EventEmitter();
    str: string;
    name = new EventEmitter();
    user = new EventEmitter();

    constructor() {}

    sendMsg(data: string) {
      this.dataStr.emit(data);
    }

    sendUser(user: any) {
        this.user.emit(user);
    }

    sendTuser(data: string){
      this.tUser.emit(data);
    }
}
