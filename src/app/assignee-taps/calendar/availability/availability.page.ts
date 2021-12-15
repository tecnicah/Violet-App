import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalendarDayViewBeforeRenderEvent, CalendarEvent, CalendarEventTimesChangedEvent, CalendarModule, CalendarMonthViewBeforeRenderEvent, CalendarView, CalendarViewPeriod, CalendarWeekViewBeforeRenderEvent, DateAdapter } from 'angular-calendar';
import { startOfDay, endOfDay, isSameDay, isSameMonth, addHours, parseISO } from 'date-fns';
import { Subject } from 'rxjs';
import { GeneralService } from 'src/app/general/general.service';
import { CalendarDaysPage } from '../calendar-days/calendar-days.page';
import { ConfirmationCalendarPage } from '../confirmation-calendar/confirmation-calendar.page';
import * as moment from 'moment';
import RRule from 'rrule';


const colors: any = {
  uno: {
    primary: '#ff9500',
  },
  dos: {
    primary: '#ffd300',
  },
  tres: {
    primary: '#4435a6',
  },
  green: {
    primary: '#c7fff6',
  },
  red: {
    primary: '#ffe0e0',
  },
};

@Component({
  selector: 'app-availability',
  templateUrl: './availability.page.html',
  styleUrls: ['./availability.page.scss'],
})
export class AvailabilityPage {


  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  constructor(private cdr: ChangeDetectorRef, public _services: GeneralService, public modalCtrl: ModalController, public router: Router) { }

  user: any;
  public dataGet = [];
  public eventos_changeMounth = [];
  //****************************************************************//
  //****************************************************************//
  /*
  ngOnInit() {
    this.dataGet = [];
    let eventos = [];
    this.user = JSON.parse(localStorage.getItem('userData'));
    this._services.service_general_get('Calendar/GetAvailability/' + this.user.id).subscribe((data => {
      if (data.success) {
        console.log(data);
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var daysNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        data.result.forEach(E => {
          E.dia_letra = new Date(E.date).getDay();
          E.mes_letra = new Date(E.date).getMonth()
          E.dia_numero = new Date(E.date).getDate()
          E.dia_laboral = daysNames[E.dia_letra] + ' ' + monthNames[E.mes_letra] + ' ' + E.dia_numero;
        });
        this.dataGet = data.result;
        this.refresh.next();
        for (let i = 0; i < this.dataGet.length; i++) {
          if (this.dataGet[i].date != null) {

            var element = document.querySelector(`[aria-label="${this.dataGet[i].dia_laboral}"]`);
            if (element != null) {
              if (this.dataGet[i].available) {
                element.className += " enabled";
              } else {
                element.className += " disabled";
              }
            }
          }
        }
        console.log(this.dataGet);
        this._services.service_general_get('MyDashboard/GetCalendar/' + this.user.id).subscribe((data: any) => {
          if (data.success) {
            eventos = data.map.value;
            this.eventos_changeMounth = eventos;
            this.filtrar_eventos(eventos);
          }
        });
      }
    }));
    this.colorBtn('month');
    this.get_catalogos();
  }
  */
  ionViewWillEnter() {
    let eventos: any;
    this.user = JSON.parse(localStorage.getItem('userData'));
    this._services.service_general_get('MyDashboard/GetCalendar/' + this.user.id).subscribe((data: any) => {
      if (data.success) {
        eventos = data.map.value;
        let new_format = [];
        let days_available = [];
        console.log("Estos son los eventos: ", eventos);
          days_available = eventos.scheduleUser.filter(E => {
            if (E.title == "Available") {
              return true;
            }
          })

          for (let i = 0; i < days_available.length; i++) {
            days_available[i].frecuencia = days_available[i].rrule.byweekday.split('[');
            days_available[i].frec_one = days_available[i].frecuencia[1];
          }
          for (let i = 0; i < days_available.length; i++) {
            days_available[i].frecuencia_final = days_available[i].frec_one.split(']');
            days_available[i].frec_two = days_available[i].frecuencia_final[0];
          }
          console.log(days_available);
          
          for (let i = 0; i < days_available.length; i++) {
            if (days_available[i].frec_two == "RRule.MO") {
              //days_available[i].rrule.byweekday = [1];
              days_available[i].rrule.byweekday = [RRule.MO];
              days_available[i].day = 1;
            }
            if (days_available[i].frec_two == "RRule.TU") {
              //days_available[i].rrule.byweekday = [2];
              days_available[i].rrule.byweekday = [RRule.TU];
              days_available[i].day = 2;
            }
            if (days_available[i].frec_two == "RRule.WE") {
              //days_available[i].rrule.byweekday = [3];
              days_available[i].rrule.byweekday = [RRule.WE];
              days_available[i].day = 3;
            }
            if (days_available[i].frec_two == "RRule.TH") {
              //days_available[i].rrule.byweekday = [4];
              days_available[i].rrule.byweekday = [RRule.TH];
              days_available[i].day = 4;
            }
            if (days_available[i].frec_two == "RRule.FR") {
              //days_available[i].rrule.byweekday = [5];
              days_available[i].rrule.byweekday = [RRule.FR];
              days_available[i].day = 5;
            }
            if (days_available[i].frec_two == "RRule.SA") {
              //days_available[i].rrule.byweekday = [0];
              days_available[i].rrule.byweekday = [RRule.SA];
              days_available[i].day = 6;
            }
            if (days_available[i].frec_two == "RRule.SU") {
              //days_available[i].rrule.byweekday = [6];
              days_available[i].rrule.byweekday = [RRule.SU];
              days_available[i].day = 7;
            }
          }
  
          if (days_available.length != 0) {
            
            days_available.forEach(E => {
              let  hora_inicio = E.startTime.split(':');
              let  hora_final =  E.endTime.split(':');
              let  inicio = new Date(E.date);
                   inicio.setHours(Number(hora_inicio[0]), Number(hora_inicio[1]));
              let final = new Date(E.date);
                   final.setHours(Number(hora_final[0]), Number(hora_final[1]))

              new_format.push({
                id:E.id,
                title: E.title,
                color: colors.green,
                start: new Date(),
                hourStart: E.startTime,
                dateStart: inicio,
                dateEnd:final,
                hourEnd:E.endTime,
                available: true,
                day:E.day,
                rrule: {
                  freq: 'RRule.WEEKLY',
                  byweekday: E.rrule.byweekday,
                },
              })
            });
          }

          let days_not_available = [];
          days_not_available = eventos.scheduleUser.filter(E => {
            if (E.title == "No Available") {
              return true;
            }
          })
  
          for (let i = 0; i < days_not_available.length; i++) {
            days_not_available[i].frecuencia = days_not_available[i].rrule.byweekday.split('[');
            days_not_available[i].frec_one = days_not_available[i].frecuencia[1];
          }
          for (let i = 0; i < days_not_available.length; i++) {
            days_not_available[i].frecuencia_final = days_not_available[i].frec_one.split(']');
            days_not_available[i].frec_two = days_not_available[i].frecuencia_final[0];
          }
          console.log("dias disponibles: ", days_not_available);
  
          for (let i = 0; i < days_not_available.length; i++) {
            if (days_not_available[i].frec_two == "RRule.MO") {
              //days_not_available[i].rrule.byweekday = [1];
              days_not_available[i].rrule.byweekday = [RRule.MO];
              days_not_available[i].day = 1;
            }
            if (days_not_available[i].frec_two == "RRule.TU") {
              //days_not_available[i].rrule.byweekday = [2];
              days_not_available[i].rrule.byweekday = [RRule.TU];
              days_not_available[i].day = 2;
            }
            if (days_not_available[i].frec_two == "RRule.WE") {
              //days_not_available[i].rrule.byweekday = [3];
              days_not_available[i].rrule.byweekday = [RRule.WE];
              days_not_available[i].day = 3;
            }
            if (days_not_available[i].frec_two == "RRule.TH") {
              //days_not_available[i].rrule.byweekday = [4];
              days_not_available[i].rrule.byweekday = [RRule.TH];
              days_not_available[i].day = 4;
            }
            if (days_not_available[i].frec_two == "RRule.FR") {
              //days_not_available[i].rrule.byweekday = [5];
              days_not_available[i].rrule.byweekday = [RRule.FR];
              days_not_available[i].day = 5;
            }
            if (days_not_available[i].frec_two == "RRule.SA") {
              //days_not_available[i].rrule.byweekday = [0];
              days_not_available[i].rrule.byweekday = [RRule.SA];
              days_not_available[i].day = 6;
            }
            if (days_not_available[i].frec_two == "RRule.SU") {
              //days_not_available[i].rrule.byweekday = [6];
              days_not_available[i].rrule.byweekday = [RRule.SU];
              days_not_available[i].day = 7;
            }
          }
          if (days_not_available.length != 0) {
            days_not_available.forEach(E => {
              let hora_inicio = E.startTime.split(':');
              let hora_final =  E.endTime.split(':');
              let inicio = new Date(E.date);
                  inicio.setHours(Number(hora_inicio[0]), Number(hora_inicio[1]));
              let final = new Date(E.date);
                  final.setHours(Number(hora_final[0]), Number(hora_final[1]))

              new_format.push({
                id:E.id,
                title: E.title,
                color: colors.red,
                start: new Date(),
                hourStart: E.startTime,
                hourEnd:E.endTime,
                dateStart: inicio,
                dateEnd:final,
                available: false,
                day:E.day,
                rrule: {
                  freq: 'RRule.WEEKLY',
                  byweekday: E.rrule.byweekday,
                },
              })
            });
          }

          let titulo;
          for (let i = 0; i < new_format.length; i++) {
            titulo = new_format[i].title;
            new_format[i].title = titulo + ' ' + new_format[i].hourStart + ' - ' + new_format[i].hourEnd
          }
          let hora_inicio;
          let hora_final;
          new_format.forEach(E => {
            hora_inicio = E.hourStart.split(':');
            hora_final = E.hourEnd.split(':');
            E.hora_inicio = hora_inicio[0];
            E.minitos_inicio = hora_inicio[1];
            E.hora_final = hora_final[0];
            E.minitos_final = hora_final[1];
          });
          
          this.dataGet = new_format;
          console.log(this.dataGet)
          this.eventos_changeMounth = eventos;
          this.filtrar_eventos(eventos);
      }
    });
    this.colorBtn('month');
    this.get_catalogos();
  }
  //****************************************************************//
  //****************************************************************//
  colorBtn(btn: string) {
    document.getElementById('month').className = "color_button";
    document.getElementById('week').className = "color_button";
    document.getElementById('day').className = "color_button";
    document.getElementById(btn).className = "color_button_active";
  }
  //****************************************************************//
  //****************************************************************//
  filtrar_eventos(eventos) {
    console.log(eventos)
    let data_eventos = eventos.calendar.filter(function (E) {
      if (E.startTime != null && E.startTime != 'string' && E.endTime != null && E.endTime != 'string') {
        return true;
      }
    });
    let a1 = '0800';
    let a2 = '1200';
    let b3 = '1600';
    let c4 = '2000';

    for (let i = 0; i < data_eventos.length; i++) {
      var str = data_eventos[i].startTime;
      if (str != null) {
        data_eventos[i].inicio = str.replace(":", "");
      }
    }
    for (let i = 0; i < data_eventos.length; i++) {
      var str = data_eventos[i].inicio;
      if (str != null) {
        data_eventos[i].inicio = str.replace(":", "");
      }
    }

    let eventos_finales = [];
    for (let i = 0; i < data_eventos.length; i++) {
      if (Number(data_eventos[i].inicio) >= Number(a1)) {
        eventos_finales.push(data_eventos[i]);
      }
    }

    console.log("Eventos filtrados: ", eventos_finales);
    this.data_calendario(eventos_finales);
  }
  //****************************************************************//
  //****************************************************************//
  //DATA DEL CALENDARIO//
  data_calendario(eventos) {
    this.events = [];
    for (let i = 0; i < eventos.length; i++) {
      var str = eventos[i].startTime;
      if (str != null) {
        eventos[i].inicio = str.replace(":", "");
      }
    }
    for (let i = 0; i < eventos.length; i++) {
      var str = eventos[i].inicio;
      if (str != null) {
        eventos[i].inicio = str.replace(":", "");
      }
    }
    console.log("ESTOS SON LOS EVENTOS: ", eventos);
    debugger
    for (let i = 0; i < eventos.length; i++) {
      let  hora_inicio = eventos[i].startTime.split(':');
      let  hora_final =  eventos[i].endTime.split(':');
      let inicio = new Date(eventos[i].date);
          inicio.setHours(Number(hora_inicio[0]), Number(hora_inicio[1]));
          let final = new Date(eventos[i].date);
          final.setHours(Number(hora_final[0]), Number(hora_final[1]))
      let data_evento_prueba = {
        //start: addHours(startOfDay(parseISO(eventos[i].date)), 2),
        //end: addHours(startOfDay(parseISO(eventos[i].date), 2),
        start: inicio,
        end: final,
        title: '',
        color: null,
        sr: '',
        date:eventos[i].date,
        id:eventos[i].id,
        time_start: eventos[i].startTime,
        time_end: eventos[i].endTime,
        //actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      }
      let a1 = '0800';
      let a2 = '1200';
      let b = '1600';
      let c = '2000';
      if (Number(eventos[i].inicio) >= Number(a1) && Number(eventos[i].inicio) <= Number(a2)) {
        data_evento_prueba.color = colors.uno;
      }
      if (Number(eventos[i].inicio) >= Number(a2) && Number(eventos[i].inicio) <= Number(b)) {
        data_evento_prueba.color = colors.dos;
      }
      if (Number(eventos[i].inicio) >= Number(b) && Number(eventos[i].inicio) <= Number(c)) {
        data_evento_prueba.color = colors.tres;
      }


      if (eventos[i].services.length > 0) {
        //+ ' / Time:' + eventos[i].startTime + ' - ' + eventos[i].endTime
        data_evento_prueba.title ='Supplier: ' + eventos[i].suppliername+  ' Assignee: ' + eventos[i].assignee + ' / Partner: ' + eventos[i].name + ' / Client: ' + eventos[i].client + ' / City: ' + eventos[i].city + ' / ' + eventos[i].services[0].category + ' / ' + eventos[i].services[0].serviceNumber;
        data_evento_prueba.sr = eventos[i].serviceRecordId;
        this.events.push(data_evento_prueba);
      }

    };

      
      //for (let i = 0; i < this.recurrencia.length; i++) {
      //  const element = this.recurrencia[i];
      //  this.events.push(element);
      //}

      let aux = [];
      let c = 0;
      
      console.log("ESTOS SON LOS EVENTOS 2222",this.events);
      this.events.forEach((E:any) => {
      
        if(aux.length == 0){
          aux.push(E);
        }else{
          for (let i = 0; i < aux.length; i++) {
            if(E.title == aux[i].title && E.date == aux[i].date){
               c++;
            }
          }
          if(c == 0){
            aux.push(E);
          }
          c=0;
        }
      });

      console.log(this.events);
      console.log(aux);

      this.events.forEach((E:any) => {
        for (let i = 0; i < aux.length; i++) {
          if(E.title == aux[i].title){
            if(aux[i].hora == undefined && aux[i].hora == null){
              aux[i].hora = ' /Time: ' + E.time_start + ' - ' + E.time_end
            }else{
              aux[i].hora = aux[i].hora + '/ Time: ' + E.time_start + ' - ' + E.time_end
            }
           
          }
        }
      });

      aux.forEach(E => {
        E.title = E.title + E.hora
      });

      this.events = [];
      this.events = aux;
      console.log(this.events);
      console.log(aux);

      /*
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].title && this.events[i].title == "Available") {
          this.events[i].color = colors.green;
        }
        if (this.events[i].title && this.events[i].title == "No Available") {
          this.events[i].color = colors.red;
        }
      }
      */
      for (let i = 0; i < this.recurrencia.length; i++) {
        const element = this.recurrencia[i];
        this.events.push(element);
       }
       for (let i = 0; i < this.events.length; i++) {
         if (this.events[i].title && this.events[i].title == "Available") {
           this.events[i].color = colors.green;
         }
         if (this.events[i].title && this.events[i].title == "No Available") {
           this.events[i].color = colors.red;
         }
       }
       console.log(this.events);
   
    this.setIcon();
  }
  //****************************************************************//
  //****************************************************************//
  public setIcon() {
    setTimeout(() => {
      let elementos = document.getElementsByClassName('cal-event');
      for (let i = 0; i < elementos.length; i++) {
        let element: any = elementos[i];
        if (element.style.backgroundColor == 'rgb(255, 211, 0)') {
          console.log('entra');
        }

        if (element.style.backgroundColor == 'rgb(68, 53, 166)') {
          console.log('entra');
        }

        if (element.style.backgroundColor == 'rgb(255, 149, 0)') {
          console.log('entra');
        }
      }
    }, 10);
  }
  //****************************************************************//
  //****************************************************************//
  //CONSULTA INFORMACION DE LOS CATALOGOS//
  public ca_country = [];
  public ca_serviceLine = [];
  public ca_partner = [];
  async get_catalogos() {
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_partner = await this._services.getCatalogueFrom('GetPartner');
  }
  //****************************************************************//
  //****************************************************************//
  //FUNCIONES DEL CALENDARIO//
  public fecha_edit: any;
  async dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): Promise<void> {
    console.log('i');
    console.log('USERDATA: ', this.user);
    console.log('DATE: ', date);
    this.fecha_edit = date;
    console.log('EVENTS: ', events);
    if (this.user.role.id == 3 && events.length == 0) {
      this.modifyCalendar(date, events);
    } else {
      //this.setIcon();
      if (isSameMonth(date, this.viewDate)) {
        if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }
    }

  }

  async modifyCalendar(date, events){
    let data_: {
      header: "Availability Calendar",
      body: "Do you want to modify the availability in the calendar?"
    }
    const modal = await this.modalCtrl.create({
      component: ConfirmationCalendarPage,
      componentProps: data_,
      cssClass: 'modal-general-mensage',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((response) => {
      console.log("response: ", response)
      if (response.data) {
        let information = {
          id: 0,
          day: 0,
          date_selected: date
        }
        if (date.getDay() == 0) { information.day = 7 }
        if (date.getDay() == 1) { information.day = 1 }
        if (date.getDay() == 2) { information.day = 2 }
        if (date.getDay() == 3) { information.day = 3 }
        if (date.getDay() == 4) { information.day = 4 }
        if (date.getDay() == 5) { information.day = 5 }
        if (date.getDay() == 6) { information.day = 6 }

        this.selectDay(information);
      } else {
        this.setIcon();
        if (isSameMonth(date, this.viewDate)) {
          if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
            this.activeDayIsOpen = false;
          } else {
            this.activeDayIsOpen = true;
          }
          this.viewDate = date;
        }
      }
    })
    //this.modalCtrl.dismiss();
    await modal.present();
  }
  //****************************************************************//
  //****************************************************************//
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log('ii')
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
  //****************************************************************//
  //****************************************************************//
  handleEvent(action: string, event): void {
    console.log("4 event", event);
    let evento_data: any;
    evento_data = event;
    if (evento_data.id) {
      this.viewApoitment(evento_data)
    }
    if (evento_data.data) {
      this.updateEvent(event);
      /*
      const dialogRef = this._dialog.open(ConfirmationCalendarComponent, {
        data: {
          header: "Availability Calendar",
          body: "Do you want to modify the availability in the calendar?"
        },
        width: "350px"
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this.selectDay(event);
        }
      })
      */
    }
  }

  viewApoitment(data:any) {
    data.noApo = 0;
    localStorage.setItem('apoiment', JSON.stringify(data));
    this.back();
    this.router.navigateByUrl('assignee-taps/view-appointment');
  }

  async updateEvent(event){
    let data_: {
      header: "Availability Calendar",
      body: "Do you want to modify the availability in the calendar?"
    }
    const modal = await this.modalCtrl.create({
      component: ConfirmationCalendarPage,
      componentProps: data_,
      cssClass: 'modal-general-mensage',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((response) => {
      console.log("response: ", response)
      if (response.data) {
        this.selectDay(event);
      }
    })
    //this.modalCtrl.dismiss();
    await modal.present();
  }
  //****************************************************************//
  //****************************************************************//
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
  //****************************************************************//
  //****************************************************************//
  deleteEvent(eventToDelete: CalendarEvent) {
    console.log("3");
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
  //****************************************************************//
  //****************************************************************//
  setView(view: CalendarView) {
    console.log("2");
    this.view = view;
  }
  //****************************************************************//
  //****************************************************************//
  async selectDay(information) {
    if (information.data) {
      information = information.data;
      information.date = this.fecha_edit;
    }
    console.log("Agregar disponibilidad");
    const modal = await this.modalCtrl.create({
      component: CalendarDaysPage,
      componentProps: information,
      backdropDismiss: true
    });
    modal.onDidDismiss().then(async (data) => {
      console.log(data);
      await this.ionViewWillEnter();
      await this.updateCalendarEvents(this.event_recurrent);
    })
    this.modalCtrl.dismiss();
    await modal.present();
  }
  //****************************************************************//
  //****************************************************************//
  back(){
    this.modalCtrl.dismiss();
  }
  //****************************************************************//
  //****************************************************************//
  closeOpenMonthViewDay() {
    console.log("1");
    this.setIcon();
    this.filtrar_eventos(this.eventos_changeMounth)
    this.activeDayIsOpen = false;
  }
  //****************************************************************//
  //****************************************************************//
  viewPeriod: CalendarViewPeriod;
  recurrencia = [];
  event_recurrent:any;
  updateCalendarEvents(viewRender: | CalendarMonthViewBeforeRenderEvent | CalendarWeekViewBeforeRenderEvent | CalendarDayViewBeforeRenderEvent): void {
    console.log(viewRender);
    this.event_recurrent = viewRender;
    console.log("Entra a hacer la recurrecia"); 
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      setTimeout(() => {
        console.log(this.dataGet);
        this.recurrencia = [];
        
        this.dataGet.forEach((event) => {
          const rule = new RRule({
            ...event.rrule,
            dtstart: moment(viewRender.period.start).startOf('day').toDate(),
            until: moment(viewRender.period.end).endOf('day').toDate(),
            freq: RRule.DAILY,
            interval: 1,
            byweekday: event.rrule.byweekday
          });
          const {
            title,
            color
          } = event;
          
          rule.all().forEach((date) => {
            let fecha = new Date(date);
                fecha.setHours(Number(event.hora_inicio), Number(event.minitos_inicio));
            let fecha_final = new Date(date);
                fecha_final.setHours(Number(event.hora_final), Number(event.minitos_final));
            this.recurrencia.push({
              title,
              color,
              start: new Date(fecha),
              end:  new Date(fecha_final),
              data: event
            });
          });
          console.log("Estos son los eventos recurrentes: ", this.recurrencia);
          this.filtrar_eventos(this.eventos_changeMounth);
        });
      }, 3000);
      
      
      this.cdr.detectChanges();
    }
    else{
      this.viewPeriod = viewRender.period;
      setTimeout(() => {
        console.log(this.dataGet);
        this.recurrencia = [];
        
        this.dataGet.forEach((event) => {
          const rule = new RRule({
            ...event.rrule,
            dtstart: moment(viewRender.period.start).startOf('day').toDate(),
            until: moment(viewRender.period.end).endOf('day').toDate(),
            freq: RRule.DAILY,
            interval: 1,
            byweekday: event.rrule.byweekday
          });
          const {
            title,
            color
          } = event;
          
          rule.all().forEach((date) => {
            let fecha = new Date(date);
                fecha.setHours(Number(event.hora_inicio), Number(event.minitos_inicio));
            let fecha_final = new Date(date);
                fecha_final.setHours(Number(event.hora_final), Number(event.minitos_final));
            this.recurrencia.push({
              title,
              color,
              start: new Date(fecha),
              end:  new Date(fecha_final),
              data: event
            });
          });
          console.log("Estos son los eventos recurrentes: ", this.recurrencia);
          this.filtrar_eventos(this.eventos_changeMounth);
        });
      }, 3000);
      this.cdr.detectChanges();
    }
  }

}
