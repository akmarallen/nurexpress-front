<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['studyData'],
  computed: {
    dataChart: function() {
      return this.studyData;
    }
  },
  watch: {
    studyData: function() {
      this.renderingChart();
    }
  },
   methods:{
    renderingChart()
      {
        this.renderChart({
          labels: ['Оплата', 'Инкасса', 'в Кассе'],
          datasets: [
            {
              backgroundColor: [
                '#41B883',
                '#E46651',
                '#00D8FF'
              ],
              data: this.dataChart
            }
          ]
        }, {responsive: true, maintainAspectRatio: true})
      }
  },
  mounted () {
    this.renderingChart();
  }
}
</script>
