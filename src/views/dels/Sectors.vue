<template>
  <div class="animated fadeIn">
      <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Участок</strong> 
          </div>

          <b-form>
              <ValidationObserver v-slot="{ valid }">
                <ValidationProvider name="---" rules="required" v-slot="{ errors }">
                <b-form-group label="Город" label-for="basicName">
                  <select v-model="sectorCity" class="custom-select" @change="getSectors()">
                    <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                  </select>
                  <div><p>{{ errors[0] }}</p></div>
                </b-form-group>
                </ValidationProvider>
                <ValidationProvider name="---" rules="required" v-slot="{ errors }">
                <b-form-group label="Название" label-for="basicName">
                  <b-form-input id="basicName" type="text"  v-model="sectorName"></b-form-input>
                  <div><p>{{ errors[0] }}</p></div>
                </b-form-group>
                </ValidationProvider>
                
                <div slot="footer" style="text-align: right">
                  <b-button  size="md" variant="primary" :disabled="!valid" v-on:click="saveSector()"><i class="fa fa-save"></i> Сохранить</b-button>&nbsp;&nbsp;
                  <b-button  size="md" variant="secondary" v-on:click="clean()"><i class="fa fa-paint-brush"></i>Очистить</b-button>
                </div>
            </ValidationObserver>
          </b-form>
        </b-card>
        
      </b-col>
    </b-row>

    <div class="row">
      <b-col cols="12" xl="12">
        <transition name="slide">
          <b-card>
            <br>
              <table class="table table-striped table-hover">
                <tbody>
                    <tr>
                    <th>Но.</th>
                    <th>Город</th>
                    <th>Участок</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item, counter) in sectors" :key=item.sectorId>
                    <th scope="row">{{++counter}}</th>
                    <td>{{item.city}}</td>
                    <td>{{item.sector}}</td>
                    <td>
                      <b-button  size="sm" variant="warning" v-on:click="editSector(item)"><i class="fa fa-edit"></i>Изменить</b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
          </b-card>
        </transition>
      </b-col>
    </div>

  </div>
</template>

<script>
import HelperService from '../../services/helperservice';
import cities from '../Cities';

export default {
    name: 'sectors',
    components: {
    },
    data () {
        return {  
           cityList: cities,
           sectorId: '',
           sectorName: '',
           sectorCity: '',
           sectors: [],
        }
    },
    created(){
    },
    methods: { 
        editSector(item)
        {
           this.sectorId = item.sectorId;
           this.sectorName = item.sector;
           this.sectorCity = item.city;
        },
        getSectors()
        {
            HelperService.listSectors(this.$store.getters.getCurrentUser, this.sectorCity).then((response)=>{
                this.sectors = response;
            });
        },
        clean()
        {
           this.sectorId = '';
           this.sectorName = '';
           this.sectorCity = '';
        },
        saveSector()
        {
            HelperService.saveSector(this.$store.getters.getCurrentUser, this.sectorId, this.sectorName, this.sectorCity).then((response)=>{
                this.getSectors();
                this.clean();
              }).catch(error=>{
                console.log(error);
              });
        },
    }
};


</script>

<style scoped>

.jumbotron{
   margin-top: 20px;
}

p {
    color: brown;
}

@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';

</style>