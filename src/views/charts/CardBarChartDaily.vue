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
              labels: ['30', '29', '28', '27', '26', '25', '24','23', '22', '21', '20', '19', '18', '17','16', '15', '14', '13', '12', '11', '10','9', '8', '7', '6', '5', '4', '3','2','1'],
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
