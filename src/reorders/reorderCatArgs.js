import * as _ from "underscore";

export default (function reorderCatArgs(store, catArgsManager) {
  const state = store.getState();
  // can make more efficient by only checking which axis needs to be reordered
  _.each(["row", "col"], function (inst_axis) {
    // update cat position arrays
    for (
      let cat_index = 0;
      cat_index < state.cat_data.cat_num[inst_axis];
      cat_index++
    ) {
      catArgsManager.updateNewCatArrs(store, inst_axis);
      // update the attribute
      catArgsManager.updateCatArgsAttribute(inst_axis, cat_index);
    }
  });
});
