const FormEditableMixin = base => class extends base {
  constructor(arg, ...superArgs) {
    super(arg, ...superArgs);

    this.state = {
      isEditing: false,
      isEditingId: null
    };
  }

  toggleIsEditingState(toggleValue, toggleId) {
    if (toggleValue === undefined) {
      toggleValue = !this.state.isEditing;
    }
    if (toggleId === undefined) {
      toggleId = null;
    }
    this.setState({
      isEditing: false,
      isEditingId: null
    }, () => {
      this.setState({
        isEditing: toggleValue,
        isEditingId: toggleId
      });
    });
  }
};
export default FormEditableMixin;
