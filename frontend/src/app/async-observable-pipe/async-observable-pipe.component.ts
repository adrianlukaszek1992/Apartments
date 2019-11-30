import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-async-observable-pipe',
  template: `<div><code>observable|async</code>:
  Time: {{ time | async }}</div>`,
  styleUrls: ['./async-observable-pipe.component.scss']
})
export class AsyncObservablePipeComponent {
  // time = new Observable(observer => setInterval(() => observer.next(new Date().toString()), 1000));
}
