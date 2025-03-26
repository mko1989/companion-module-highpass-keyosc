// upgrades.js
module.exports = [
  // Initial version - leave empty since this is first version
  function (context, props) {
    return {
      updatedConfig: props.config,
      updatedActions: props.actions,
      updatedFeedbacks: props.feedbacks
    }
  }
]