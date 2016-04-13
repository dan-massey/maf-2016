var data = [
  {
    "date": "2008-01-01",
    "loansCount": 13,
    "loansSum": 8000,
    "partnersCount": 1,
  },
  {
    "date": "2009-01-01",
    "loansCount": 88,
    "loansSum": 106500,
    "partnersCount": 1,
  },
  {
    "date": "2010-01-01",
    "loansCount": 284,
    "loansSum": 484959,
    "partnersCount": 3,
  },
  {
    "date": "2011-01-01",
    "loansCount": 583,
    "loansSum": 920403.60,
    "partnersCount": 5,
  },
  {
    "date": "2012-01-01",
    "loansCount": 1488,
    "loansSum": 1708063.60,
    "partnersCount": 12,
  },
  {
    "date": "2013-01-01",
    "loansCount": 2655,
    "loansSum": 2755160.70,
    "partnersCount": 17,
  },
  {
    "date": "2014-01-01",
    "loansCount": 3918,
    "loansSum": 3774867.20,
    "partnersCount": 31,
  },
  {
    "date": "2015-01-01",
    "loansCount": 5379,
    "loansSum": 5035716.20,
    "partnersCount": 53,
  },
];


// Set up variables
var width = document.getElementById('partners-count-chart').offsetWidth - 32;
var height = 300;

var tabletWidth = 600;

var partnersCountChart = d3.select('#partners-count-chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height);
var partnersCountFigure = d3.select('#partners-count-figure');
var partnersCountDetail = d3.select('#partners-count-detail');

var loansCountChart = d3.select('#loans-count-chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height);
var loansCountFigure = d3.select('#loans-count-figure');
var loansCountDetail = d3.select('#loans-count-detail');

var loansSumChart = d3.select('#loans-sum-chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height);
var loansSumFigure = d3.select('#loans-sum-figure');
var loansSumDetail = d3.select('#loans-sum-detail');

var padding = { top: 30, right: 30, bottom: 30, left: 50 };

var dateFormat = d3.time.format("%Y-%m-%d");

// Scale
var loansCount = {
  min: d3.min(data, function(d) { return +d.loansCount;} ),
  max: d3.max(data, function(d) { return +d.loansCount;} ),
  previousYear: data[data.length - 2]['loansCount'],
  currentYear: data[data.length - 1]['loansCount'],
};

var loansSum = {
  min: d3.min(data, function(d) { return +d.loansSum;} ),
  max: d3.max(data, function(d) { return +d.loansSum;} ),
  previousYear: data[data.length - 2]['loansSum'],
  currentYear: data[data.length - 1]['loansSum'],
};

var partnersCount = {
  min: d3.min(data, function(d) { return +d.partnersCount;} ),
  max: d3.max(data, function(d) { return +d.partnersCount;} ),
  previousYear: data[data.length - 2]['partnersCount'],
  currentYear: data[data.length - 1]['partnersCount'],
};

var date = {
  min: d3.min(data, function(d) { return dateFormat.parse(d.date);} ),
  max: d3.max(data, function(d) { return dateFormat.parse(d.date);} )
}

loansCount.scale = d3.scale.linear()
                        .domain([loansCount.min, loansCount.max])
                        .range([height - padding.top, padding.bottom]);
loansSum.scale = d3.scale.linear()
                          .domain([loansSum.min, loansSum.max])
                          .range([height - padding.top, padding.bottom]);
partnersCount.scale = d3.scale.linear()
                          .domain([partnersCount.min, partnersCount.max])
                          .range([height - padding.top, padding.bottom]);
date.scale = d3.time.scale()
                .domain([date.min, date.max])
                .range([padding.left, width - padding.right - 50]);

var yTicks = 3;
var xTicks = 3;
if (width > tabletWidth) {
  yTicks = 5;
  xTicks = 8;
}
loansCount.yAxis = d3.svg.axis()
                        .scale(loansCount.scale)
                        .orient('left')
                        .ticks(yTicks)
                        .tickSize(0)
                        .tickFormat(d3.format('s'));
loansSum.yAxis = d3.svg.axis()
                      .scale(loansSum.scale)
                      .orient('left')
                      .ticks(yTicks)
                      .tickSize(0)
                      .tickFormat(d3.format('s'));
partnersCount.yAxis = d3.svg.axis()
                          .scale(partnersCount.scale)
                          .orient('left')
                          .tickSize(0)
                          .ticks(yTicks);
date.xAxis = d3.svg.axis()
                  .scale(date.scale)
                  .orient('bottom')
                  .ticks(xTicks)
                  .tickSize(0)
                  .tickFormat(d3.time.format('%Y'));

// Draw
partnersCountChart.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function(d) {
          return date.scale(dateFormat.parse(d.date));
        })
        .attr('y', function(d, i) {
          return partnersCount.scale(d.partnersCount) - padding.bottom;
        })
        .attr('height', function(d) {
          return height - partnersCount.scale(d.partnersCount);
        })
        .attr('value', function(d) {
          return d.partnersCount;
        });
partnersCountChart.append('g')
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding.left + ",0)")
        .call(partnersCount.yAxis)
      .selectAll('text')
        .attr('transform', 'translate(-5, 0)');
partnersCountChart.append('g')
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding.bottom) + ")")
        .call(date.xAxis)
      .selectAll('text')
        .attr('transform', 'translate(15, 5)');
partnersCountFigure.html(partnersCount.max);
partnersCountDetail.html((partnersCount.currentYear - partnersCount.previousYear) + ' compared to 2014.')

loansCountChart.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function(d) {
          return date.scale(dateFormat.parse(d.date));
        })
        .attr('y', function(d, i) {
          return loansCount.scale(d.loansCount) - padding.bottom;
        })
        .attr('height', function(d) {
          return height - loansCount.scale(d.loansCount);
        })
        .attr('value', function(d) {
          return d.loansCount;
        });
loansCountChart.append('g')
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding.left + ",0)")
        .call(loansCount.yAxis)
      .selectAll('text')
        .attr('transform', 'translate(-5, 0)');
loansCountChart.append('g')
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding.bottom) + ")")
        .call(date.xAxis)
      .selectAll('text')
        .attr('transform', 'translate(15, 5)');
loansCountFigure.html(loansCount.max);
loansCountDetail.html((loansCount.currentYear - loansCount.previousYear) + ' compared to 2014.')

loansSumChart.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function(d) {
          return date.scale(dateFormat.parse(d.date));
        })
        .attr('y', function(d, i) {
          return loansSum.scale(d.loansSum) - padding.bottom;
        })
        .attr('height', function(d) {
          return height - loansSum.scale(d.loansSum);
        })
        .attr('value', function(d) {
          return d.loansSum;
        });
loansSumChart.append('g')
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding.left + ",0)")
        .call(loansSum.yAxis)
      .selectAll('text')
        .attr('transform', 'translate(-5, 0)');
loansSumChart.append('g')
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding.bottom) + ")")
        .call(date.xAxis)
      .selectAll('text')
        .attr('transform', 'translate(15, 5)');
loansSumFigure.html('$' + (d3.round(loansSum.max / 1000000, 2)) + ' million');
loansSumDetail.html((d3.round((loansSum.currentYear - loansSum.previousYear) / 1000000, 2)) + ' million compared to 2014.')
