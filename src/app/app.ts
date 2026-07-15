import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BalnearioList } from '../features/balneario/pages/balneario-list/balneario-list';
import { Login } from '../features/auth/login/pages/login/login';
import { Footer } from "../shared/components/footer/footer";
import { Navbar } from "../shared/components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BalnearioList, Login, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'balnearFrontend';
}
