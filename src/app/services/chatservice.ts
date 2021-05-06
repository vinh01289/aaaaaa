import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {  BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Constant, HandleLocalStore } from '../model/HandleLocalSore';
import {  UserProfile } from '../model/user';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Conversation } from '../model/conversation';
import { shopDto } from '../model/shopDto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  token = localStorage.getItem('accessToken');
  listMessage: Message[] = [];
  listConversation: BehaviorSubject<Conversation[]>;
  listShop: BehaviorSubject<shopDto[]>;
  // shopInfo: shopDto;
  
  // jwtHelper = new JwtHelperService();
  // private currentUser = null;
  changeData(): Observable<any>{
    return this.listConversation.asObservable();
  }
  constructor(private router: Router, private http: HttpClient){
    this.listConversation = new BehaviorSubject<Conversation[]>([]);
    this.listShop= new BehaviorSubject<shopDto[]>([]);
  }
  getToken():  string | null {
    return localStorage.getItem('accessToken');
  }
  getMessage(id: string): Observable<any>{
    return this.http.get(`${environment.apiUrl.chatUrl}api/v1/messages/${id}`);
  }
  getConversation(): void{
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    this.http.get(`${environment.apiUrl.chatUrl}api/v1/conversation?isPublic=true`).subscribe(
      (res: Array<Conversation>) => {
        this.listConversation.next(res);
      }
    );
  }
  changeDataListShop(): Observable<any>{
    return this.listShop.asObservable();
  }
  getListShop(): void{
    this.http.get(`${environment.apiUrl.tShopUrl}api/v1/app-shops/list-by-employee`).subscribe((res: shopDto[]) => {
      this.listShop.next(res);
    });
  }
  sentMessage(content: string, conversationId: string , messageType: number): Observable<any>{
    return new Observable(obs => {
    this.http.post(`${environment.apiUrl.chatUrl}api/v1/messages`, {
      content,
      conversationId,
      messageType
    }, { responseType: 'text'} ).subscribe(res => {
      obs.next(res);
      obs.complete();
    }, er => {
       obs.error('Loi');
       obs.complete();
    });
    }) ;
  }
  getConversationShop(idShop: string): Observable<any>{
    return this.http.get(`${environment.apiUrl.chatUrl}api/v1/conversation/list-shop-conversation/${idShop}?isPublic=true`);
  }
}


