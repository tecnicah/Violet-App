import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import * as signalR from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  url_api = `${environment.API_URL}`;
  url_images = `${environment.images_path}`;
  chat_test:any;
  padingios: boolean = false;
  headers = new HttpHeaders();
  private receivedMessageObject:any = '';
  private sharedObj = new Subject<any>();

  private url_chat: any = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.images_path}` + 'chatsocket')   // mapping to the chathub as in startup.cs
    .withAutomaticReconnect()
    .build();


     
  loader: boolean = false;

  constructor(private http: HttpClient) {
    this.headers.append('Access-Control-Allow-Origin' , '*');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headers.append('Accept','application/json');
    this.headers.append('content-type','application/json');
    this.url_chat.onclose(async () => {
      await this.start();
    });
    this.url_chat.on("ReceiveOne", (user) => { this.mapReceivedMessage( this.chat_test ); });
    this.start();        
  }
​
  // Strart the connection
  public async start() {
    try {
      console.log("connectedppppppppppp");
      await this.url_chat.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }
​
  /*private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
  }*/

  private mapReceivedMessage( chat_model:any ): void {
    console.log('El Chat =====> ', chat_model);
    this.sharedObj.next(this.receivedMessageObject);
  }

  public retrieveMappedObject(): Observable<any> {
    return this.sharedObj.asObservable();
  }

  /* Arriba estan los servicios del chat */

  service_general_post_with_url(url, parametros): Observable<any> {
    return this.http.post(this.url_api + url, parametros, { headers: this.headers });
  }

  service_general_post_with_urlnoapi(url, parametros): Observable<any> {
    return this.http.post(this.url_images + url, parametros, { headers: this.headers });
  }

  public service_general_put(url, parametros): Observable<any> {
    return this.http.put(this.url_api + url, parametros, { headers: this.headers });
  }

  public service_general_putnoapi(url, parametros): Observable<any> {
    return this.http.put(this.url_images + url, parametros, { headers: this.headers });
  }

  public service_general_get(url): Observable<any> {
    return this.http.get(this.url_api + url, { headers: this.headers });
  }

  public service_general_get_noapi(url): Observable<any> {
    return this.http.get(this.url_images + url, { headers: this.headers });
  }

  public service_general_delete(url:string):Observable<any> {
    return this.http.delete(this.url_api + url, { headers: this.headers });
  }

  public service_general_deleteno_api(url:string):Observable<any> {
    return this.http.delete(this.url_images + url, { headers: this.headers });
  }

  public service_general_delete_with_url(url): Observable<any> {
    return this.http.delete(this.url_api + url, { headers: this.headers });
  }

  /* Catalogos */
  public getCatalogueFrom(catalogo_selected, params: string = ''): any {
    const query = this.http.get(this.url_api + 'Catalogue/' + catalogo_selected + params, { headers: this.headers }),
      query_on = new Promise((resolve) => {
        query.subscribe((response) => {
          resolve(response);
        }, (error) => {
          resolve(error);
        });
      });
    return query_on.then((result: any) => {
      if (result.success) return result.result;
      else return 'Error al pedir el catalogo.';
    });
  }

  public footerHidden: boolean = false;
  onScroll(event) {
    if (event.detail.deltaY > 0 && this.footerHidden) return;
    if (event.detail.deltaY < 0 && !this.footerHidden) return;
    if (event.detail.deltaY > 0) {
      console.log("scrolling down, hiding footer...");
      this.footerHidden = true;
    } else {
      console.log("scrolling up, revealing footer...");
      this.footerHidden = false;
    };
  }
    
}
