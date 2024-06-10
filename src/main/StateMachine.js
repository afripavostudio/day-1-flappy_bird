export default class StateMachine {
  constructor(state) {
    this.empty = {
      enter: function () {},
      exit: function () {},
      update: function () {},
      draw: function () {},
    };

    this.states = state || {};
    this.currentState = this.empty;
    this.stateName = undefined;
  }

  change(stateName, params) {
    const currentState = this.currentState;

    const state = this.states[stateName];

    if (typeof state === "function") {
      // before the change the state
      this.currentState.exit();

      // change the state
      this.currentState = state();
      this.currentState.enter(params);
      this.stateName = stateName;
    } else {
      this.currentState = currentState;
    }
  }

  update(dt) {
    this.currentState.update(dt);
  }

  draw(ctx) {
    this.currentState.draw(ctx);
  }
}
