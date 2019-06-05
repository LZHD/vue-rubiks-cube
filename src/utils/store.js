export const store = {
  debug: true,
  state: {
    currentFace: null
  },
  setCurrentFace (newValue) {
    this.state.currentFace = newValue
  },
  clearCurrentFace () {
    this.state.currentFace = null
  }
}
