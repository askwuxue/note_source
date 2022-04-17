import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
// AppComponent 本来就是一个普通的typescript类，但是上面的组件元数据装饰器告诉Angular，
// AppComponent是一个组件，需要把一些元数据加到这个类上，Angular就会把AppComponent当组件来处理
export class AppComponent {
  title = 'angular';
}
