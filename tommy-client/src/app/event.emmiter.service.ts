import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class EventEmiterService {
    dataStr = new EventEmitter();
    tUser = new EventEmitter();
    name = new EventEmitter();
    user = new EventEmitter();
    phone = new EventEmitter();
    str: string;
    phoneSubject: Subject<string>= new Subject();

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

    sendPhone(userphone: any){
      this.phone.emit(userphone);
    }
}
