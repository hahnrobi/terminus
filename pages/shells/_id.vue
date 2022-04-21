<template>
  <div>
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
          @dataOut="sendTerminalData"
          @resized="sendTerminalSize"
        ></TerminalComponent>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShellInteractPage',
  components: {
    TerminalComponent: () => {
      if (process.client) {
        return import('../../components/TerminalComponent.vue')
      }
    },
  },
  data() {
    return {
      step: 0,
      error: false,
      errorMessage: '',
      connectToken: '',
      terminalSocket: null,
      connectorDataIncoming: [],
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
      this.terminalSocket = this.$terminal.initNewConnection()
      console.log('Sending connection token:', this.connectToken)
      this.terminalSocket.on('connect-token-successful', () => {
        this.step3()
      })
      this.terminalSocket.emit('connect-token', this.connectToken)
    },
    step3: function () {
      this.step = 3
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
    this.step1()
  },
}
</script>

<style>
</style>