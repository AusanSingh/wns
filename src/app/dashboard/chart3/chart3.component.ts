import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.scss']
})
export class Chart3Component implements OnInit {
  salaryRange: FormGroup;
  chart: any;
  constructor(
    private fb: FormBuilder,
    private authServise: AuthService
  ) {
    this.salaryRange = this.fb.group({
      salaryRange: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.chartRender();
  }




  chartRender() {
    this.chart = new Chart('demo', {
      type: 'bar',
      data: {},
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
  updateChart(label: any, sData: any) {
    const chartData = {
      labels: label,
      datasets: [{
        label: 'Employee Salary',
        data: sData,
        backgroundColor: 'rgb(255, 99, 132, .3)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      }]
    };

    this.chart.chart.data = chartData;
    this.chart.update();
  }

  getData(salaryRange) {
    this.authServise.getRequest('http://dummy.restapiexample.com/api/v1/employees')
      .subscribe((rData => {
        const _label: any = [];
        const _data: any = [];
        rData.forEach((element: any) => {
          if (Number(element.employee_salary) <= Number(salaryRange)) {
            _label.push(element.employee_name);
            _data.push(element.employee_salary);
          }
        });
        this.updateChart(_label, _data);
      }));
  }
  filter(data) {
    console.log(data)
    this.getData(data.salaryRange);
  }

}
