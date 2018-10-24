import React from 'react';
import Highcharts from 'highcharts';
import merge from 'lodash/merge';
import { withTheme } from 'styled-components';
import HighchartsReact from 'highcharts-react-official';

const getDefaultOptions = theme => {
  return {
    time: {
      useUTC: false
    },
    title: null,
    credits: {
      enabled: false
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      line: {
        color: theme.palette.primary.main,
      },
      spline: {
        color: theme.palette.primary.main,
      },
      area: {
        fillOpacity: 0.2,
      },
      areaspline: {
        color: theme.palette.primary.main,
        fillOpacity: 0.2,
      },
    },
  }
};

const ChartBase = ({ highcharts = Highcharts, theme, options = {}, ...props }) => {
  const chartOptions = merge({}, getDefaultOptions(theme), options);

  return <HighchartsReact highcharts={highcharts} options={chartOptions} {...props} />;
};

export default withTheme(ChartBase);
