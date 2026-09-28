import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly PUBLIC_KEY="yJj5nywpi1BseoQVp";
  private readonly TEMPLATE_ID="template_vjt3nrr";
  private readonly SERVICE_ID="service_sw1qach";
  
  
  sendEmail(templateParams: Record<string,any>){
    return emailjs.send(
      this.SERVICE_ID,
      this.TEMPLATE_ID,
      templateParams,
      this.PUBLIC_KEY
    )
  };
}
