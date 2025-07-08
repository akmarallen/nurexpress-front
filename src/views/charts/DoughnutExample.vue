<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['bookData'],
  computed: {
    dataChart: function() {
      return this.bookData;
    }
  },
  watch: {
    bookData: function() {
      this.renderingChart();
    }
  },
  methods:{
    renderingChart()
      {
        this.renderChart({
          labels: ['Продажа', 'Инкасса', 'в Кассе'],
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
