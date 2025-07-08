<script>
import { Line } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'

export default {
  extends: Line,
  props: ['height', 'width', 'paymentData'],
  computed: {
    dataChart: function() {
      return this.paymentData;
    }
  },
  watch: {
    paymentData: function() {
      this.renderLineChart();
    }
  },
  methods:{
    renderLineChart()
    {
        const brandInfo = getStyle('--white') || '#63c2de'
        const datasets2 = [
          {
            label: '',
            backgroundColor: brandInfo,
            borderColor: 'rgba(255,255,255,.8)',
            data: this.dataChart
          }
        ]

        this.renderChart(
          {
            labels: ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август'],
            datasets: datasets2
          },
          {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  gridLines: {
                    color: 'rgba(255,255,255,.1)',
                    zeroLineColor: 'transparent'
                  },
                  ticks: {
                    fontSize: 2,
                    fontColor: 'transparent'
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: false,
                    min: Math.min.apply(Math, datasets2[0].data) - 5,
                    max: Math.max.apply(Math, datasets2[0].data) + 5
                  }
                }
              ]
            },
            elements: {
              line: {
                borderWidth: 1
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4
              }
            }
          }
        )
    }
  },
  mounted () {
    this.renderLineChart();
  }
}
</script>
