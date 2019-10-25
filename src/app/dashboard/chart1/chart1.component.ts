import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {
  chart: any = [];
  constructor(
    private authServise: AuthService
  ) { }

  ngOnInit() {
    this.getData();


  }

  chartRender(label: any, sData: any) {
    this.chart = new Chart('demo', {
      type: 'bar',
      data: {
        labels: label,
        datasets: [{
          label: 'Employee Salary',
          data: sData,
          backgroundColor: 'blue',
          borderColor: '#blue',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  getData() {
    this.authServise.getRequest('http://dummy.restapiexample.com/api/v1/employees')
      .subscribe((rData => {
        const _label: any = [];
        const _data: any = [];
        rData.forEach((element: any) => {
          if (element.employee_salary < 5000) {
            _label.push(element.employee_name);
            _data.push(element.employee_salary);
          }
        });
        this.chartRender(_label, _data);
      }));
  }

}
