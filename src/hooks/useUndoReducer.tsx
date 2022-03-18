import { useReducer } from "react";

interface UndoState {
  past: any;
  present: any;
  future: any;
}

const useUndoReducer = (reducer: any, initialState: any) => {
  const undoState: UndoState = {
    past: [],
    present: initialState,
    future: [],
  };

  const undoReducer = (state: any, action: any) => {
    const newPresent = reducer(state.present, action);

    if (action.type === useUndoReducer.types.undo) {
      const [newPresent, ...past] = state.past;
      return {
        past,
        present: newPresent,
        future: [state.present, ...state.future],
      };
    }
    if (action.type === useUndoReducer.types.redo) {
      const [newPresent, ...future] = state.future;
      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future,
      };
    }
    if (action.type === useUndoReducer.types.reset) {
      return {
        past: [],
        present: initialState,
        future: [],
      };
    }
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    };
  };

  return useReducer(undoReducer, undoState);
};

useUndoReducer.types = {
  undo: "UNDO",
  redo: "REDO",
  reset: "RESETSTAGE"
};

export default useUndoReducer;
