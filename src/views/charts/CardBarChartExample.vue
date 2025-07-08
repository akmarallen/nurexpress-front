<script>
import { Bar } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

export default {
  extends: Bar,
  props: ['height', 'deliveryData'],
  computed: {
    dataChart: function() {
      return this.deliveryData;
    }
  },
  watch: {
    deliveryData: function() {
      this.renderBarChart();
    }
  },
  methods:{
    renderBarChart()
    {
      this.renderChart(
            {
              labels: ['Сен', 'Окт', 'Ноя', 'Дек', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг'],
              datasets: [
                {
                  label: '',
                  backgroundColor: 'rgba(255,255,255,.8)',
                  borderColor: 'transparent',
                  data: this.dataChart
                }
              ]
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
                xAxes: [{
                  display: true,
                  categoryPercentage: 1,
                  barPercentage: 0.5,
                  ticks: {
                    fontSize: 10,
                    fontColor: 'black'
                  }
                },],
                yAxes: [{
                  display: true
                }]
              }
            }
          )
    },
  },
  mounted() {
    this.renderBarChart();
  }
}
</script>
