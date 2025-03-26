const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const osc = require('osc')
const actions = require('./actions')
const variables = require('./variables')
const feedbacks = require('./feedbacks')
const presets = require('./presets')
const configFields = require('./config')

class KeyOSCInstance extends InstanceBase {
    constructor(internal) {
        super(internal)

        this.clientReady = false
        this.updateVariables = this.updateVariables.bind(this)
        this.sendCommand = this.sendCommand.bind(this)
        
        // Initialize presentation state
        this.presentationList = []
        this.selectedIndex = 0
        this.oscClient = null
        this.oscServer = null
    }

    async init(config) {
        this.config = config
        this.updateStatus(InstanceStatus.Connecting)

        this.initActions()
        this.initVariables()
        this.initFeedbacks()
        this.initPresets()

        this.setupOSCClient()
        await this.setupOSCServer()
    }

    async configUpdated(config) {
        this.config = config

        // Update OSC connections if needed
        if (this.oscClient) {
            this.oscClient.close()
        }
        
        if (this.oscServer) {
            this.oscServer.close()
        }
        
        this.setupOSCClient()
        await this.setupOSCServer()
    }

    setupOSCClient() {
        this.updateStatus(InstanceStatus.Connecting)
        this.log('debug', `Setting up OSC client to send to ${this.config.remotehost}:${this.config.remoteport}`)
        
        try {
            this.oscClient = new osc.UDPPort({
                localAddress: '0.0.0.0',
                localPort: 0, // Use random available port for sending
                remoteAddress: this.config.remotehost,
                remotePort: this.config.remoteport
            })
            
            this.oscClient.on('error', (err) => {
                this.log('error', `OSC client error: ${err.message}`)
                this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
            })
            
            this.oscClient.on('ready', () => {
                this.log('info', 'OSC client ready')
                this.clientReady = true
                this.updateStatus(InstanceStatus.Ok)
            })
            
            this.oscClient.open()
        } catch (error) {
            this.log('error', `Error creating OSC client: ${error}`)
            this.updateStatus(InstanceStatus.ConnectionFailure, error.message)
        }
    }

    async setupOSCServer() {
        try {
            this.log('debug', `Setting up OSC server to listen on port ${this.config.localport}`)
            
            this.oscServer = new osc.UDPPort({
                localAddress: '0.0.0.0',
                localPort: this.config.localport
            })
            
            this.oscServer.on('message', (oscMsg) => {
                this.updateVariables(oscMsg)
            })
            
            this.oscServer.on('error', (err) => {
                this.log('error', `OSC server error: ${err.message}`)
                this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
            })
            
            this.oscServer.on('ready', () => {
                this.log('info', `OSC server started on port ${this.config.localport}`)
                this.updateStatus(InstanceStatus.Ok)
            })
            
            this.oscServer.open()
        } catch (e) {
            this.updateStatus(InstanceStatus.ConnectionFailure, e.message)
            this.log('error', `Failed to start OSC server: ${e.message}`)
        }
    }

    // The info object provides information about this instance to Companion user
    getConfigFields() {
        return configFields
    }

    initVariables() {
        variables(this)
    }

    // Presentation list management methods
    updatePresentationList(presentations) {
        this.presentationList = presentations
        this.selectedIndex = Math.min(this.selectedIndex, presentations.length - 1)
        if (this.selectedIndex < 0 && presentations.length > 0) {
            this.selectedIndex = 0
        }
        
        this.updatePresentationVariables()
    }

    updatePresentationVariables() {
        const updates = {
            'totalPresentations': this.presentationList.length,
            'selectedIndex': this.presentationList.length > 0 ? this.selectedIndex + 1 : 0,
            'selectedPresentation': this.presentationList.length > 0 ? 
                this.presentationList[this.selectedIndex].name : 'No presentations'
        }
        
        this.setVariableValues(updates)
    }

    nextPresentation() {
        if (this.presentationList.length === 0) return
        
        this.selectedIndex = (this.selectedIndex + 1) % this.presentationList.length
        this.updatePresentationVariables()
    }

    previousPresentation() {
        if (this.presentationList.length === 0) return
        
        this.selectedIndex = (this.selectedIndex - 1 + this.presentationList.length) % this.presentationList.length
        this.updatePresentationVariables()
    }

    getSelectedPresentation() {
        if (this.presentationList.length === 0 || this.selectedIndex < 0 || 
            this.selectedIndex >= this.presentationList.length) {
            return null
        }
        
        return this.presentationList[this.selectedIndex]
    }

    updateVariables(data) {
        // First log the raw data to see what's coming in
        this.log('debug', `Received OSC message: ${data.address} with args: ${JSON.stringify(data.args)}`)
        
        // Update variables based on incoming OSC data
        if (data && data.address) {
            switch (data.address) {
                case '/keyosc/keynote_document/value':
                    if (data.args && data.args.length > 0) {
                        // Value is directly in args[0], not in args[0].value
                        this.setVariableValues({ 'presentationName': data.args[0] })
                    }
                    break
                case '/keyosc/keynote_current_slide/value':
                    if (data.args && data.args.length > 0) {
                        // FIXED: No longer adding 1 as KeyOSC now returns the actual slide number
                        const slideNumber = parseInt(data.args[0])
                        this.setVariableValues({ 'currentSlide': slideNumber })
                    }
                    break
                case '/keyosc/keynote_total_slides/value':
                    if (data.args && data.args.length > 0) {
                        this.setVariableValues({ 'slideCount': parseInt(data.args[0]) })
                    }
                    break
                case '/keyosc/keynote_playing/value':
                    if (data.args && data.args.length > 0) {
                        this.setVariableValues({ 'state': data.args[0] === "1" ? 'Playing' : 'Stopped' })
                    }
                    break
                case '/keyosc/keynote_status/value':
                    if (data.args && data.args.length > 0) {
                        try {
                            const status = JSON.parse(data.args[0])
                            // Update multiple variables from status object
                            const updates = {}
                            
                            if (status.document) updates.presentationName = status.document
                            
                            // FIXED: No longer adding 1 to currentSlide
                            if (status.currentSlide !== undefined) {
                                updates.currentSlide = status.currentSlide
                            }
                            
                            if (status.totalSlides) updates.slideCount = status.totalSlides
                            
                            // ADDED: Calculate remaining slides
                            if (status.currentSlide !== undefined && status.totalSlides) {
                                const remaining = Math.max(0, status.totalSlides - status.currentSlide)
                                updates.slidesRemaining = remaining
                            }
                            
                            if (status.playing !== undefined) {
                                updates.state = status.playing ? 'Playing' : 'Stopped'
                                updates.playing = status.playing ? '1' : '0'
                            }
                            
                            // Store complete status
                            updates.keynoteStatus = data.args[0]
                            
                            this.setVariableValues(updates)
                            
                            // Log the error if there is one
                            if (status.error) {
                                this.log('warn', `KeyOSC reported error: ${status.error}`)
                            }
                        } catch (e) {
                            this.log('error', `Failed to parse status JSON: ${e.message}, raw value: ${data.args[0]}`)
                        }
                    }
                    break
                case '/keyosc/presentations':
                    if (data.args && data.args.length > 0) {
                        try {
                            // The JSON is directly in args[0], not in args[0].value
                            const presentations = JSON.parse(data.args[0])
                            this.log('debug', `Parsed presentations: ${JSON.stringify(presentations)}`)
                            
                            this.setVariableValues({ 
                                'presentations': JSON.stringify(presentations),
                                'presentationsCount': presentations.length
                            })
                            
                            // Process the presentation list for browser
                            this.updatePresentationList(presentations)
                        } catch (e) {
                            this.log('error', `Failed to parse presentations JSON: ${e.message}, raw value: ${data.args[0]}`)
                        }
                    }
                    break;
                default:
                    // Log any other messages for debugging
                    this.log('debug', `Unhandled OSC address: ${data.address}`)
                    break
            }
        }
    }

    initActions() {
        this.setActionDefinitions(actions(this))
    }

    initFeedbacks() {
        this.setFeedbackDefinitions(feedbacks(this))
    }

    initPresets() {
        this.setPresetDefinitions(presets(this))
    }

    sendCommand(path, args = []) {
        if (this.oscClient) {
            try {
                // Format arguments according to OSC specs
                const formattedArgs = args.map(arg => {
                    return {
                        type: typeof arg === 'number' ? 'f' : 's',
                        value: arg
                    }
                })
                
                this.oscClient.send({
                    address: path,
                    args: formattedArgs.length > 0 ? formattedArgs : undefined
                })
                
                this.log('debug', `Sent OSC command: ${path} with args: ${JSON.stringify(args)}`)
            } catch (error) {
                this.log('error', `Error sending OSC command: ${error}`)
            }
        } else {
            this.log('debug', 'OSC client not initialized')
        }
    }

    async destroy() {
        if (this.oscClient) {
            this.oscClient.close()
            this.oscClient = null
        }
        
        if (this.oscServer) {
            this.oscServer.close()
            this.oscServer = null
        }
    }
}

runEntrypoint(KeyOSCInstance, [])