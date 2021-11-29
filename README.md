## Install Angular CLI
- ```npm install -g @angular/cli```



## Create App
- ```ng new my-app-name```



## Run App
- ```ng serve```



## Routing

// app-routing.module.ts
```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/frontend/pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

- Visit ```http://localhost:4200/home```







## Add Header 
- Create Header ```ng g c header```

// app.component.html
```js
<app-header></app-header>
<router-outlet></router-outlet>
```


// header.component.html
```js
<header>
    <div class="container">
        <a routerLink="/home">Home</a>
        <a routerLink="/posts">Posts</a>
    </div>
</header>
```








## Fetch Post Data

// posts.component.ts
```js
import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service'; // <--

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent {
 
  posts: any;
  constructor(public http: HttpClient) {
    // Rest API Calling
    this.http.get('your-project.url/wordpress/wp-json/wp/v2/posts').subscribe(data => {
      this.posts = data;
      console.log("DATA:: ", this.posts );
    });
  }
}
```


#### TypeScript Config | Typescript: TS7006: Parameter 'xxx' implicitly has an 'any' type
// tsconfig.json
```js
"compilerOptions": {
    //...
    "noImplicitAny": false,
    //...
  },
```








## Bootstrap

- ```npm install bootstrap --save```
- ```npm install @popperjs/core --save```
- ```npm i node-sass --save```

// angular.json
```js
    "styles": [
      "src/scss/my-styles.scss",
      "./node_modules/bootstrap/dist/css/bootstrap.min.css"
    ],
    "scripts": [
      "./node_modules/@popperjs/core/dist/umd/popper.min.js",
      "./node_modules/bootstrap/dist/js/bootstrap.min.js"
    ]
```


// package.json
```js
  "scripts": {
    // ...
    "sass": "node-sass -w scss/ -o dist/css/ --recursive"
    // ...
  }
```











## Layouts 
- Multiple layouts for different pages

- goto ```src/app/views/frontend/layouts```
- ```ng g c default-layout```

// default-layout.component.html
```js
  <p>Default Layout with header</p>
  <app-header></app-header>
  <router-outlet></router-outlet>
```



- ```ng g c auth-layout```

// auth-layout.component.html
```js
  <p>auth-layout without header!</p>
  <router-outlet></router-outlet>
```




- Remove header from ```app.component.html```
// app.component.html
```js
  <router-outlet></router-outlet>
```




// app-routing.module.ts
```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';


import { AuthLayoutComponent } from './views/frontend/layouts/auth-layout/auth-layout.component';

import { LoginComponent } from './views/frontend/pages/login/login.component';



const routes: Routes = [
    // Default Layout Routes
    {
      path: '',
      component: DefaultLayoutComponent, 
      children: [
        { path: '', component: HomeComponent },
        { path: 'posts', component: PostsComponent },
        { path: "post/:id", component: PostSingleComponent }
      ]
    },
    // Auth Layout Routes
    {
      path: 'login',
      component: AuthLayoutComponent, 
      children: [
        { path: '', component: LoginComponent },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```











# Login
- Create Login component ```ng g c login```

- import ```FormsModule``` in App

#### src/app/app.module.ts
```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms' //<-- Login Form

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { HeaderComponent } from './views/frontend/layouts/header/header.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';
import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from './views/frontend/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './views/frontend/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PostsComponent,
    PostSingleComponent,
    DefaultLayoutComponent,
    AuthLayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- Login Form
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


#### src/app/views/frontend/pages/login/login.html
```js
<section class="login-page">
    <div class="container">
        <p>login works!</p>
            <form>
                <div class="form-group">
                    <label>Username</label>
                    <input
                        [(ngModel)]="loginUserData.username"
                        name="username" 
                        type="text"
                        class="form-control"
                    />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input
                        [(ngModel)]="loginUserData.password"
                        name="password"
                        type="password"
                        class="form-control"
                        />
                </div>
                <div class="form-group mt-4">
                    <button
                        class="btn btn-primary"
                        type="button"
                        (click)="loginUser()"
                        >Login</button>
                </div>
            </form>

    </div>
</section>
```

#### src/app/views/frontend/pages/login/login.component.ts
```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = { // <---
    username: '',
    password: ''
  }
  constructor() { }

  ngOnInit(): void {

  }

  loginUser() {
    console.log( this.loginUserData ) // <---
  }
}
```




- Create login services
- ```ng g s```