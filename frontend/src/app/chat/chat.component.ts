import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width:600px; margin:20px auto;">
      <h2>💬 Чат: {{roomName}}</h2>
      <div style="height:400px; border:1px solid #ccc; overflow-y:auto; padding:10px; background:#f9f9f9; border-radius:8px; margin-bottom:10px;">
        <div *ngFor="let msg of messages" style="margin:10px 0; padding:8px; background:white; border-radius:8px; box-shadow:0 1px 2px rgba(0,0,0,0.1);">
          📨 {{msg}}
        </div>
        <div *ngIf="messages.length === 0" style="text-align:center; color:#999; padding:50px;">
          Нет сообщений. Напишите первое!
        </div>
      </div>
      <div style="display:flex; gap:10px;">
        <input 
          [(ngModel)]="input" 
          (keyup.enter)="send()" 
          style="flex:1; padding:12px; border:1px solid #ccc; border-radius:8px;" 
          placeholder="Введите сообщение...">
        <button 
          (click)="send()" 
          style="padding:12px 24px; background:#007bff; color:white; border:none; border-radius:8px; cursor:pointer;">
          Отправить
        </button>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit, OnDestroy {
  roomName = '';
  messages: string[] = [];
  input = '';
  private ws: WebSocket | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.roomName = this.route.snapshot.params['room'];
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(`ws://checkcheckcheck.duckdns.org/ws/chat/${this.roomName}/`);
    this.ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this.messages.push(data.message);
    };
    this.ws.onerror = (e) => console.error('WebSocket error', e);
    this.ws.onclose = () => console.log('WebSocket closed');
  }

  send() {
    if (this.input.trim() && this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ message: this.input }));
      this.input = '';
    }
  }

  ngOnDestroy() {
    this.ws?.close();
  }
}