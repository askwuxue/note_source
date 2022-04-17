import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular 应用是模块化的，它拥有自己的模块化系统，称作 NgModule。每个 Angular 应用都至少有一个 NgModule 类，也就是根模块，在app.module.ts文件中，这个根模块就可以启动你的应用。
@NgModule({
  // declarations（可声明对象表） —— 那些属于本 NgModule 的组件、指令、管道
  declarations: [AppComponent],
  // exports（导出表） —— 那些能在其它模块的组件模板中使用的可声明对象的子集。
  // imports（导入表） —— 导入其他模块
  imports: [BrowserModule, AppRoutingModule],
  // providers —— 依赖注入
  providers: [],
  // bootstrap —— 设置根组件
  bootstrap: [AppComponent],
})
export class AppModule {}
