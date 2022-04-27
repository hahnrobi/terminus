<template>
<div class="box">
    <div id="terminal-container" ref="terminal_container">
    </div>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { themes } from '~/assets/terminal-themes';
declare global {
  interface Navigator {
      msSaveBlob?: (blob: any, defaultName?: string) => boolean
      msSaveOrOpenBlob?: (blob: any, defaultName?: string) => boolean
  }
}
export default Vue.extend({
	name: "TerminalComponent",
	data() {
		return {
			term: new Terminal(),
    		fitAddon: new FitAddon()
		}
	},
	props: ['dataIn'],
	mounted() {
        this.term.options.cursorBlink = true;
        this.term.options.fontFamily = "'Fira Code', monospace";
        this.term.options.fontWeight = "500";
		this.term.open(<HTMLElement>this.$refs.terminal_container);
		this.term.loadAddon(this.fitAddon);
        this.term.focus();
        this.fitAddon.fit();
        window.addEventListener('resize', () => {
            this.fitAddon.fit()
            //console.log({ cols: this.term.cols, rows: this.term.rows });
            this.$emit("resized", { cols: this.term.cols, rows: this.term.rows })
        });
		this.term.onData((data) => {
            console.log("Term: ", data);
			this.$emit('dataOut', data);
        });
	},
	methods: {
		setData(data: string | Uint8Array) {
			this.term.write(data);
		}
	},
})
</script>
<style lang="scss">
#terminal-container {
    display: block;
    height: 100%;
    width: 100%;
}
.xterm {
    position: relative;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}

.xterm.focus,
.xterm:focus {
    outline: none;
}

.xterm .xterm-helpers {
    position: absolute;
    top: 0;
    /**
     * The z-index of the helpers must be higher than the canvases in order for
     * IMEs to appear on top.
     */
    z-index: 5;
}

.xterm .xterm-helper-textarea {
    padding: 0;
    border: 0;
    margin: 0;
    /* Move textarea out of the screen to the far left, so that the cursor is not visible */
    position: absolute;
    opacity: 0;
    left: -9999em;
    top: 0;
    width: 0;
    height: 0;
    z-index: -5;
    /** Prevent wrapping so the IME appears against the textarea at the correct position */
    white-space: nowrap;
    overflow: hidden;
    resize: none;
}

.xterm .composition-view {
    /* TODO: Composition position got messed up somewhere */
    background: #000;
    color: #FFF;
    display: none;
    position: absolute;
    white-space: nowrap;
    z-index: 1;
}

.xterm .composition-view.active {
    display: block;
}

.xterm .xterm-viewport {
    /* On OS X this is required in order for the scroll bar to appear fully opaque */
    background-color: #000;
    overflow-y: scroll;
    cursor: default;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
}

.xterm .xterm-screen {
    position: relative;
}

.xterm .xterm-screen canvas {
    position: absolute;
    left: 0;
    top: 0;
}

.xterm .xterm-scroll-area {
    visibility: hidden;
}

.xterm-char-measure-element {
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: -9999em;
    line-height: normal;
}

.xterm {
    cursor: text;
}

.xterm.enable-mouse-events {
    /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
    cursor: default;
}

.xterm.xterm-cursor-pointer,
.xterm .xterm-cursor-pointer {
    cursor: pointer;
}

.xterm.column-select.focus {
    /* Column selection mode */
    cursor: crosshair;
}

.xterm .xterm-accessibility,
.xterm .xterm-message {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    color: transparent;
}

.xterm .live-region {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

.xterm-dim {
    opacity: 0.5;
}

.xterm-underline {
    text-decoration: underline;
}

.xterm-strikethrough {
    text-decoration: line-through;
}

</style>