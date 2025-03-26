const { Regex } = require('@companion-module/base')

const configFields = [
    {
        id: 'important-line',
        type: 'static-text',
        label: 'Getting started with KeyOSC',
        value: `KeyOSC provides an OSC API to control and monitor Keynote on macOS devices.<br/>
        You'll need to install the KeyOSC companion app on your Mac - follow your installation instructions for setup details.`,
        width: 12,
    },
    {
        id: 'important-line',
        type: 'static-text',
        label: 'Setting up multiple Keynote machines?',
        value: `Each machine will need its own instance of KeyOSC, and you'll need to configure unique local ports to get feedback from multiple machines.`,
        width: 12,
    },
    {
        type: 'textinput',
        id: 'remotehost',
        label: 'Remote IP',
        width: 8,
        regex: Regex.IP,
        default: '127.0.0.1',
    },
    {
        type: 'textinput',
        id: 'remoteport',
        label: 'Remote port',
        width: 4,
        regex: Regex.PORT,
        default: 8111,
    },
    {
        id: 'important-line',
        type: 'static-text',
        label: '',
        value: `The IP address and port of your Mac running Keynote with KeyOSC.<br/>
        Default remote port: <b>53000</b> - this can be changed in the KeyOSC app settings.`,
        width: 12,
    },
    {
        type: 'textinput',
        id: 'localport',
        label: 'Local port',
        width: 8,
        regex: Regex.PORT,
        default: 8222,
    },
    {
        id: 'important-line',
        type: 'static-text',
        label: '',
        value: `This is the port that this module will use to listen for OSC feedback messages from KeyOSC<br/>
        Default local port: <b>53001</b> - this can be changed in the KeyOSC app settings.`,
        width: 12,
    },
]

module.exports = configFields