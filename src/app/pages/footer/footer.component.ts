import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  supportList: {
    label: string,
    linkText: string,
    linkHref: string,
  }[] = [];

  ngOnInit(): void {
    this.supportList.push({
      label: 'E-mail',
      linkHref: 'mailto:suporte.sistemas@teste.com.br',
      linkText: 'suporte.sistemas@teste.com.br',
    });
    this.supportList.push({
      label: 'Fale Conosco',
      linkHref: 'http://www.teste.com.br/fale-conosco',
      linkText: 'http://www.teste.com.br/fale-conosco',
    });
  }

}
