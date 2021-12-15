import {
  Component,
  OnInit
} from '@angular/core';
import {
  GeneralService
} from 'src/app/general/general.service';
import {
  Router
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';


@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.page.html',
  styleUrls: ['./currency-exchange.page.scss'],
})
export class CurrencyExchangePage implements OnInit {

  constructor(public router: Router,
    public service: GeneralService,
    private http: HttpClient) {}

  currencyKey = '42838068e9d2e0905e25ee59a1ef1597';
  currencyExcha: any[] = [];
  dataCurrency;
  currency = undefined;
  currency_one = undefined;
  allValCurrency;
  amountUsd = 1;
  total;

  ngOnInit() {
    this.getCurrencyExch();

  }

  back() {
    let back: any = document.getElementById('back');
    back.play()
    this.router.navigateByUrl(localStorage.getItem('back'));
  }
  getCurrencyExch() {
    let moneda;
    this.dataCurrency = this.http.get(`http://api.currencylayer.com/live?access_key=${this.currencyKey}`).subscribe(resp => {
        moneda = resp;
        for (var key in moneda.quotes) {
          this.currencyExcha.push({
            ['name']: key,
            ['value']: moneda.quotes[key],
            ['symbol']: key.slice(3)
          });
          // console.log('name=' + key + ' value=' + moneda[key]);
        }
        console.log(this.currencyExcha);
        // console.log('index', this.currencyExcha);
      },
      err => console.log('error currecy', err)
    )

  }

  value = 0;
  getValue() {
    if(this.currency_one == undefined || this.currency == undefined){
      return true;
    }
    this.http.get(`https://free.currconv.com/api/v7/convert?q=${this.currency_one}_${this.currency}&compact=ultra&apiKey=3bcae0c2974f2a7d6ecc`).subscribe(res => {
      console.log(res);
      this.allValCurrency = [];
      for (let i = 0; i < this.currencyExcha.length; i++) {
        const element = this.currencyExcha[i];
        if (element.value == this.currency) {
          this.allValCurrency = {
            ['name']: element.name,
            ['value']: element.value,
            ['symbol']: element.symbol
          };
        }
      }
      
      for(var k in res) {
        this.value = res[k];
      }
      console.log(this.value)
      this.total = this.amountUsd * this.value;
    })
  }

  Scroll(event) {
    this.service.onScroll(event);
  }

  getConvert() {
    this.http.get(`https://free.currconv.com/api/v7/convert?q=${this.currency_one}_${this.currency}&compact=ultra&apiKey=3bcae0c2974f2a7d6ecc`).subscribe(res => {
      console.log(res);
      this.allValCurrency = [];
      for (let i = 0; i < this.currencyExcha.length; i++) {
        const element = this.currencyExcha[i];
        if (element.value == this.currency) {
          this.allValCurrency = {
            ['name']: element.name,
            ['value']: element.value,
            ['symbol']: element.symbol
          };
        }
      }
      let value;
      for(var k in res) {
        value = res[k];
      }
      console.log(value)
      this.total = this.amountUsd * value;
    })
  }

}