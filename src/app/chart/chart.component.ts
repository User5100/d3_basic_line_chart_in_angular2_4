import { Component, OnInit, OnChanges,
         AfterViewInit, Input, ElementRef, ViewChild, NgZone } from '@angular/core';
const d3 = require('d3');
import * as moment from 'moment';

@Component({
  selector: 'app-chart',
  template: `
  <div #container></div>
  `,
  styles: [``]
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() data: Array<any> = [];
  @ViewChild('container') element: ElementRef;
  private host;
  private svg;
  private margin;
  width: any;
  height: any;
  private xScale;
  private yScale;
  private xAxis;
  private yAxis;
  private htmlElement: HTMLElement;
  t: any;
  update: any;


  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.margin = { top: 20, right: 20, left: 100, bottom: 20 };
    this.width = 600;
    this.height = 150;

    this.t = d3.transition()
               .duration(10);
  }

  ngAfterViewInit(){
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.htmlElement);

  }

  ngOnChanges() {

    if(!this.data || this.data.length === 0 || !this.host) return;

    var parseTime = d3.timeParse('%Y-%m-%dT00:00:00Z');

    this.data.forEach((d: any) => {

      d.date = parseTime(d.date);
      d.total = +d.total;
    });

    if(!this.svg) {
      this.setup();
    }

    this.buildSVG();

    this.drawXAxis();
    this.drawYAxis();
    this.populate();

  }

  setup() {

    this.svg = this.host
                   .append('svg')
                     .attr('width', this.width + this.margin.left + this.margin.right)
                     .attr('height', this.height + this.margin.top + this.margin.bottom)
                     .call(this.responsivefy)
                   .append('g')
                     .attr('transform', `translate(${this.margin.left},
                                                   ${this.margin.top})`);

  }

  buildSVG() {

    this.svg.html('')

    this.xScale = d3.scaleTime()
                   .domain([d3.min(this.data, d => d.date),
                             d3.max(this.data, d => d.date)])
                   .range([0, this.width]);

    this.yScale = d3.scaleLinear()
                 .domain([d3.min(this.data, d => d.total), d3.max(this.data, d => d.total)])
                 .range([this.height, 0]);

    this.svg.append('g')
            .attr('transform', `translate(0, ${this.height})`)
            .call(d3.axisBottom(this.xScale).ticks(6));

    this.svg.append('g')
     .call(d3.axisLeft(this.yScale));

    var line = d3.line()
                 .x(d => this.xScale(d.date))
                 .y(d => this.yScale(d.total))
                 .curve(d3.curveCatmullRom.alpha(0.5));

    this.update = this.svg.selectAll('.line')
                          .data(this.data);
    this.update
        .enter()
        .append('path')
        .attr('class', 'line')
        .transition(this.t)
        .attr('d', d => line(this.data))
        .style('stroke', '#1565C0')
        .style('stroke-width', 2)
        .style('fill', 'none');

  }

  responsivefy(svg) {

      var container = d3.select(svg.node().parentNode);
      let margin = { top: 20, right: 20, left: 100, bottom: 20 };
      var width = parseInt(svg.style('width'));
      var height = parseInt(svg.style('height'));
      var aspect = width / height;

      svg.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
         .attr('preserveAspectRatio', 'xMinYMid')
         .call(resize);

      d3.select(window).on('resize.' + container.attr('id'), resize);

      function resize() {
        var targetWidth = parseInt(container.style('width'));

        svg.attr('width', targetWidth);
        svg.attr('height', Math.round(targetWidth/aspect));
      }
  }

  drawXAxis() {


  }

  drawYAxis() {


  }

  populate() {


  }
}
