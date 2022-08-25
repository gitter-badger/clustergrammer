import * as d3 from "d3";
import { clone, merge, set } from "lodash";
import updateTextTriangleOrder from "../matrixLabels/updateTextTriangleOrder";
import { mutateAnimationState } from "../state/reducers/animation/animationSlice";
import { setOrderState } from "../state/reducers/order/orderSlice";
import { setVisualizationState } from "../state/reducers/visualization/visualizationSlice";
import reorderCatArgs from "./reorderCatArgs";
import reorderMatrixArgs from "./reorderMatrixArgs";

export default (function runReorder(
  regl,
  store,
  catArgsManager,
  camerasManager,
  inst_axis,
  ini_new_order
) {
  const dispatch = store.dispatch;
  const new_order = ini_new_order
    .replace("sum", "rank")
    .replace("var", "rankvar");
  if (new_order !== "clust") {
    d3.select("." + inst_axis + "_dendro_slider_svg").style("display", "none");
  }

  dispatch(mutateAnimationState({ run_animation: true }));

  const state = store.getState();
  const newVisualizationState = clone(state.visualization);
  const newOrderState = merge(state.order, {
    new: {
      [inst_axis]: new_order,
    },
  });
  dispatch(setOrderState(newOrderState));
  reorderMatrixArgs(regl, store, camerasManager);
  reorderCatArgs(store, catArgsManager);

  const reorderedState = store.getState();
  // either update the existing draw text_triangles or trash them
  if (
    newVisualizationState.text_triangles.draw[inst_axis] !== false &&
    reorderedState.labels["num_" + inst_axis] <= reorderedState.max_num_text
  ) {
    set(
      newVisualizationState,
      ["text_triangle", "draw", inst_axis],
      updateTextTriangleOrder(store, inst_axis)
    );
  } else {
    set(newVisualizationState, ["text_triangle", "draw", inst_axis], false);
  }
  dispatch(setVisualizationState(newVisualizationState));
});
