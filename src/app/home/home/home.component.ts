import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { orderDto } from 'src/app/model/orderDto';
import { Conversation } from 'src/app/model/conversation';

import { SocketService } from 'src/app/services/socket.service';
import { ChatService } from 'src/app/services/chatservice';
import { ConversationComponent } from '../chat/conversation/conversation.component';
import { AuthService } from 'src/app/services/auth-service.service';
import { shopService } from 'src/app/services/shopservice.service';
import { shopDto } from 'src/app/model/shopDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: UserProfile;
  isCollapsed = false;
  listAll : any;
  lsOrder:orderDto[]=[];
  idShop: string;
  isShopOrder = false;
  isConversation = false;
  Conversation: Conversation;
  lstShopConversation : Conversation;
  lstShop: shopDto;
    // show = false;
  Content: string;
  flagProduct = false;
  flagOrder = false;
    // callingInfo = { name: '', content: '', type: '' };
    // receiverId: string;
    // showModal = false;
    // phoneNumber: string;
  @ViewChild(ConversationComponent) conversationComponent: ConversationComponent;
    // @ViewChild(SearchComponent) searchComponent: SearchComponent;

  constructor(private auth: AuthService, public chatService: ChatService,private socketService: SocketService, private route: ActivatedRoute, private router: Router, private shopservice: shopService) {
    this.chatService.changeDataListShop().subscribe(res => {
      this.lstShop=res;
    });
   }

  ngOnInit(): void {
     this.getAllList();
     this.getIdShop(this.idShop);
     this.chatService.getConversation();
     this.getConversationShop()
     this.p_getChat();
  }
  getAllList(){
    this.shopservice.getList().subscribe(res=>{
      this.listAll = res;
    })
  }
  getIdShop(idShop: string){
    this.flagProduct = false;
    this.flagOrder = true;
    this.idShop = idShop;
    this.isConversation = false;
  }
  private p_getChat(){
    this.socketService.listen('chat').subscribe(data=>{
    })
  }

  public orderFlag() {
    if (this.flagOrder === false) {
      this.flagProduct = !this.flagProduct;
      this.flagOrder = true;
      this.isConversation = false;
    }
    this.isConversation = false;
  }

  public productFlag() {
    if (this.flagProduct === false) {
      this.flagOrder = !this.flagOrder;
      this.flagProduct = true;
      this.isConversation = false;
    }
    this.isConversation = false;
  }

  showChat(): void{
    this.flagOrder= false;
    this.isConversation = true;
    this.flagProduct= false;
    this.getConversationShop();
  }
  getConversationShop(){
    this.chatService.getConversationShop(this.idShop).subscribe(res => {
        this.lstShopConversation= res;
        console.log("lstConversation",this.lstShopConversation)
    });
  }
  
}

