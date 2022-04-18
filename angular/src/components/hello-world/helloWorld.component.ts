import { Component } from '@angular/core';

@Component({
  selector: 'hello-world',
  // templateUrl: './app.component.html',
  template: `
    <h2>Hello World</h2>
    <p>This is my first component!</p>
  `,
  // styleUrls: ['./app.component.css'],
})
// AppComponent 本来就是一个普通的typescript类，但是上面的组件元数据装饰器告诉Angular，
// AppComponent是一个组件，需要把一些元数据加到这个类上，Angular就会把AppComponent当组件来处理
export class HelloComponent {
  // title = 'angular';
}
