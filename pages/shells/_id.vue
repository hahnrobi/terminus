<template>
  <div>
    {{this.state}}
    <v-stepper v-model="step" v-if="step < 3">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          Generating token
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">
          Connector initializing
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">
          Remote authenticating
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" height="200px" v-if="!error">
            <v-progress-circular indeterminate></v-progress-circular>
            Generating token...
          </v-card>
          <v-card class="mb-12" v-if="error">
            {{ errorMessage }}
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <div v-if="step == 4">
      <client-only>
        <TerminalComponent
          ref="terminalRef"
          dataIn="connectorDataIncoming"
          :state="state"
          @dataOut="sendTerminalData"
          @resized="sendTerminalSize"
        ></TerminalComponent>
      </client-only>
    </div>
  </div>
</template>

<script>
import {TerminalState} from '../../models/terminalState'
import { mapGetters } from 'vuex'
export default {
  name: 'ShellInteractPage',
  layout: 'terminal',
  components: {
    TerminalComponent: () => {
      if (process.client) {
        return import('../../components/TerminalComponent.vue')
      }
    },
  },
  computed: {
    state() {
      return this.$store.getters.getCurrentTerminal;
    }
  },
  data() {
    return {
      step: 0,
      error: false,
      errorMessage: '',
      connectToken: '',
      terminalSocket: null,
      connectorDataIncoming: [],
      restart: 0
    }
  },
  methods: {
    step1: function () {
      this.step = 1
      this.terminalSocket = {}
      console.log(this.$terminal)
      this.$axios
        .post('/shell/connect-token', { shellId: this.$route.params.id })
        .then((res) => {
          this.connectToken = res.data
          this.step2()
        })
        .catch((error) => {
          this.error = true
          this.errorMessage = error
        })
    },
    step2: function () {
      this.step = 2
      console.log('step2')

      this.$store.commit("UPDATE_TERMINAL_STATE", {id: this.$route.params.id, param: 'initializing', value: false});
      this.$store.commit("UPDATE_TERMINAL_STATE", {id: this.$route.params.id, param: 'connecting', value: true});

      this.terminalSocket = this.$terminal.initNewConnection()
      console.log('Sending connection token:', this.connectToken)
      this.terminalSocket.on('connect-token-successful', () => {
        this.step3()
      })
      this.terminalSocket.emit('connect-token', this.connectToken)
    },
    step3: function () {
      this.step = 3
      this.$store.commit("UPDATE_TERMINAL_STATE", {id: this.$route.params.id, param: 'connecting', value: false});
      this.terminalSocket.on('ready', () => this.step4())
      this.terminalSocket.emit('start', { cols: 40, rows: 24 }) //CHANGE THIS TO TERMIAL SIZE ONCE IT'S DONE
    },
    step4: function () {
      this.step = 4
      this.terminalSocket.on('data', (data) => {
        this.$refs.terminalRef.setData(data)
        this.connectorDataIncoming = data
        console.log(this.connectorDataIncoming)
      })
    },
    sendTerminalData(data) {
      console.log('SENDING DATA')
      this.terminalSocket.emit('data', data)
    },
    sendTerminalSize(size) {
      this.terminalSocket.emit('resize', size);
    },
  },
  mounted: function mounted() {
    this.$store.commit("ADD_TERMINAL", new TerminalState(this.$route.params.id));
    this.$store.commit("UPDATE_TERMINAL_STATE", {id: this.$route.params.id, param: 'initializing', value: true});
    this.$store.commit("SET_CURRENT_TERMINAL", this.$route.params.id);
    this.step1()
  },
  watch: {
    'state.restarting'(val) {
      if(val) {
        this.restart++;
        this.$store.commit("UPDATE_TERMINAL_STATE", {id: this.$route.params.id, param: 'restarting', value: false});
        this.$store.commit("REMOVE_TERMINAL", this.$route.params.id);
        this.step1();
      }
    }
  }
}
</script>

<style>
</style>