module.exports = function (self) {
    return {
        // Basic slide control
        next: {
            name: 'Next',
            description: 'Go to next slide/build',
            options: [],
            callback: async () => {
                self.sendCommand('/keyosc/next')
            },
        },
        previous: {
            name: 'Previous',
            description: 'Go to previous slide/build',
            options: [],
            callback: async () => {
                self.sendCommand('/keyosc/previous')
            },
        },
        goto: {
            name: 'Go To Slide',
            description: 'Go to specific slide number',
            options: [
                {
                    type: 'textinput',
                    label: 'Slide Number',
                    id: 'slide',
                    default: '1',
                    regex: '/^\\d+$/',
                },
            ],
            callback: async (action) => {
                self.sendCommand('/keyosc/goto', [parseInt(action.options.slide)])
            },
        },

        // Presentation control
        start: {
            name: 'Start Slideshow',
            description: 'Start the slideshow from current slide',
            options: [],
            callback: async () => {
                self.sendCommand('/keyosc/start')
            },
        },
        startFromBeginning: {
            name: 'Start From Beginning',
            description: 'Start the slideshow from the first slide',
            options: [],
            callback: async () => {
                self.sendCommand('/keyosc/start-from-beginning')
            },
        },
        stop: {
            name: 'Stop Slideshow',
            description: 'Exit the slideshow',
            options: [],
            callback: async () => {
                self.sendCommand('/keyosc/stop')
            },
        },

        // Presentation file management
        open: {
            name: 'Open Presentation',
            description: 'Open a presentation by path',
            options: [
                {
                    type: 'textinput',
                    label: 'File Path',
                    id: 'path',
                    default: '',
                },
            ],
            callback: async (action) => {
                self.sendCommand('/keyosc/open', [action.options.path])
            },
        },
        openBase64: {
            name: 'Open Presentation (Base64 Path)',
            description: 'Open a presentation using a base64-encoded path',
            options: [
                {
                    type: 'textinput',
                    label: 'Base64 Path',
                    id: 'path',
                    default: '',
                },
            ],
            callback: async (action) => {
                self.sendCommand('/keyosc/open-base64', [action.options.path])
            },
        },
        close: {
            name: 'Close Presentation',
            description: 'Close the current presentation',
            options: [],
            callback: async () => {
                self.sendCommand('/keyosc/close')
            },
        },

        // File system operations
        list: {
            name: 'List Presentations',
            description: 'List presentations in a specific directory',
            options: [
                {
                    type: 'textinput',
                    label: 'Directory Path (optional)',
                    id: 'path',
                    default: '',
                },
            ],
            callback: async (action) => {
                if (action.options.path) {
                    self.sendCommand('/keyosc/list', [action.options.path])
                } else {
                    self.sendCommand('/keyosc/list')
                }
            },
        },
        setPath: {
            name: 'Set Presentations Path',
            description: 'Set the default path for presentations',
            options: [
                {
                    type: 'textinput',
                    label: 'Directory Path',
                    id: 'path',
                    default: '',
                },
            ],
            callback: async (action) => {
                self.sendCommand('/keyosc/set-path', [action.options.path])
            },
        },

        // Status
        status: {
            name: 'Request Status',
            description: 'Request current Keynote status update',
            options: [],
            callback: async () => {
                self.sendCommand('/keyosc/status')
            },
        },
        // Add these actions to your actions.js file:
        refreshList: {
            name: 'Refresh Presentations List',
            description: 'Get updated list of presentations from folder',
            options: [
                {
                    type: 'textinput',
                    label: 'Folder Path (optional)',
                    id: 'path',
                    default: '',
                },
            ],
            callback: async (action) => {
                if (action.options.path) {
                    self.sendCommand('/keyosc/list', [action.options.path])
                } else {
                    self.sendCommand('/keyosc/list')
                }
            },
        },
        nextPresentation: {
            name: 'Next Presentation',
            description: 'Select the next presentation in the list',
            options: [],
            callback: async () => {
                self.nextPresentation()
            },
        },
        previousPresentation: {
            name: 'Previous Presentation',
            description: 'Select the previous presentation in the list',
            options: [],
            callback: async () => {
                self.previousPresentation()
            },
        },
        openSelectedPresentation: {
            name: 'Open Selected Presentation',
            description: 'Open the currently selected presentation',
            options: [],
            callback: async () => {
                const selected = self.getSelectedPresentation()
                if (selected) {
                    self.sendCommand('/keyosc/open', [selected.path])
                }
            },
        },
        openAndStartSelectedPresentation: {
            name: 'Open & Start Selected Presentation',
            description: 'Open the selected presentation and start it',
            options: [],
            callback: async () => {
                const selected = self.getSelectedPresentation()
                if (selected) {
                    self.sendCommand('/keyosc/open', [selected.path])
                    // Add a slight delay before starting
                    setTimeout(() => {
                        self.sendCommand('/keyosc/start-from-beginning')
                    }, 1000)
                }
            },
        },
    }
}