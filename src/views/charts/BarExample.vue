<script>
import { Bar } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

export default {
  extends: Bar,
  props: ['students'],
  computed: {
    dataChart: function() {
      return this.students;
    }
  },
  watch: {
    students: function() {
      this.renderingChart();
    }
  },
  methods:{
    renderingChart(){
      
      this.renderChart(
      {
        labels: ['Чуй', 'Нарын', 'Талас', 'Иссык-К', 'Ж-Абад', 'Ош', 'Баткен'],
        datasets: [
          {
            label: '',
            backgroundColor: '#f87979',
            data: this.dataChart
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor }
            }
          }
        }
      }
    )
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderingChart();
  }
}
</script>
