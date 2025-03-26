module.exports = async function (self) {
    self.setVariableDefinitions([
        // Presentations information
        { variableId: 'presentations', name: 'JSON array of all the presentations currently open' },
        { variableId: 'presentationsCount', name: 'Total number of presentations open' },
        
        // Current presentation information
        { variableId: 'presentationName', name: 'Presentation filename' },
        { variableId: 'slideCount', name: 'Total slide count' },
        { variableId: 'currentSlide', name: 'Current slide number' },
        { variableId: 'slidesRemaining', name: 'Number of slides left in slide show' },
        { variableId: 'state', name: 'Presentation state (Playing/Stopped)' },
        
        // Additional information that might be available in status
        { variableId: 'playing', name: 'Is presentation playing (1/0)' },
        { variableId: 'document', name: 'Current document name' },
        { variableId: 'keynoteStatus', name: 'Complete JSON status from KeyOSC' },
        
        // Presentation browser variables
        { variableId: 'totalPresentations', name: 'Total number of presentations available' },
        { variableId: 'selectedIndex', name: 'Selected presentation index (1-based)' },
        { variableId: 'selectedPresentation', name: 'Name of the selected presentation' }
    ])
}