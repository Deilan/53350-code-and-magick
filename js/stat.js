'use strict';

(function () {
  window.renderStatistics = function (ctx, names, times) {
    var scores = getScores(names, times);
    var headingText = 'Ура вы победили!\nСписок результатов:';
    var cloudOptions = {
      initialX: 100,
      initialY: 10,
      height: 270,
      width: 420,
      color: 'white',
      shadow: {
        offsetX: 10,
        offsetY: 10,
        color: 'rgba(0, 0, 0, 0.7)'
      }
    };

    var fontOptions = {
      family: 'PT Mono',
      size: '16px',
      color: 'black'
    };

    var headingOptions = {
      fontFamily: fontOptions.family,
      fontSize: fontOptions.size,
      textColor: fontOptions.color,
      textAlign: 'center',
      getX: function () {
        return cloudOptions.initialX + cloudOptions.width / 2;
      },
      getY: function (textLineNumber) {
        var lineHeight = this.getLineHeight();
        return cloudOptions.initialY + lineHeight + textLineNumber * lineHeight;
      },
      getLineHeight: function () {
        return parseInt(this.fontSize, 10) * 1.5;
      }
    };

    var chartOptions = {
      fontFamily: fontOptions.family,
      fontSize: fontOptions.size,
      textColor: fontOptions.color,
      textAlign: 'left',
      initialX: cloudOptions.initialX + 50,
      initialY: cloudOptions.initialY + 80,
      maxBarHeight: 150,
      barWidth: 40,
      spacing: 50,
      nameSpacing: 20,
      timeSpacing: 10,
      getBarColor: function (score) {
        return score.name === 'Вы' ?
          'rgba(255, 0, 0, 1)' :
          'rgba(0, 0, 0, ' + Math.random() + ')';
      }
    };

    renderCloud(ctx, cloudOptions);
    renderHeading(ctx, headingText, headingOptions);
    renderChart(ctx, scores, chartOptions);
  };

  function renderCloud(ctx, options) {
    if (options.shadow) {
      ctx.fillStyle = options.shadow.color;
      ctx.fillRect(options.initialX + options.shadow.offsetX, options.initialY + options.shadow.offsetY, options.width, options.height);
    }

    ctx.fillStyle = options.color;
    ctx.fillRect(options.initialX, options.initialY, options.width, options.height);
  }

  function renderHeading(ctx, text, options) {
    var textLines = text.split('\n');
    ctx.font = options.fontFamily + ' ' + options.fontSize;
    ctx.fillStyle = options.textColor;
    ctx.textAlign = options.textAlign;
    for (var i = 0; i < textLines.length; i++) {
      ctx.fillText(textLines[i], options.getX(i), options.getY(i));
    }
  }

  function renderChart(ctx, scores, options) {
    ctx.font = options.fontFamily + ' ' + options.fontSize;
    ctx.textAlign = options.textAlign;

    var maxScore = getMax(scores, function (a, b) {
      return a.time > b.time;
    });
    for (var i = 0; i < scores.length; i++) {
      var score = scores[i];
      var barHeight = options.maxBarHeight * score.time / maxScore.time;
      var x = options.initialX + i * (options.spacing + options.barWidth);
      var y = options.initialY + options.maxBarHeight - barHeight;

      ctx.fillStyle = options.getBarColor(score);
      ctx.fillRect(x, y, options.barWidth, barHeight);

      ctx.fillStyle = options.textColor;
      ctx.fillText(score.name, x, options.initialY + options.maxBarHeight + options.nameSpacing);
      ctx.fillText(Math.round(score.time), x, y - options.timeSpacing);
    }
  }

  function getScores(names, times) {
    var scores = [];
    for (var i = 0; i < names.length && i < times.length; i++) {
      scores[i] = {
        name: names[i],
        time: times[i]
      };
    }
    sort(scores, function (a, b) {
      return a.time < b.time;
    });
    return scores;
  }

  function getMax(arr, compareFunc) {
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (compareFunc(arr[i], max)) {
        max = arr[i];
      }
    }
    return max;
  }

  function sort(arr, compareFunc) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (compareFunc(arr[j], arr[i])) {
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
  }
})();
