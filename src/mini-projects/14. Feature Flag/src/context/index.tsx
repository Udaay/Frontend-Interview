import React, { useContext, useReducer } from "react";
export interface IFlag {
  isReact?: boolean;
  isVite?: boolean;
}

export interface IFlagAction {
  type: string;
  payload: boolean;
}

export interface IFlagReducer {
  state: IFlag;
  dispatch: React.Dispatch<IFlagAction>;
}

const initialFlag: IFlag = {
  isReact: true,
  isVite: false,
};

const FeatureFlag = React.createContext<IFlagReducer>({
  state: initialFlag,
  dispatch: () => null,
});

const flagReducer = (state: IFlag, action: IFlagAction) => {
  switch (action.type) {
    case "isVite":
      return { ...state, isVite: action.payload };
    case "isReact":
      return { ...state, isReact: action.payload };
    default:
      return state;
  }
};

export const FlagProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(flagReducer, initialFlag);
  const value = { state, dispatch };
  return <FeatureFlag.Provider value={value}>{children}</FeatureFlag.Provider>;
};

export const useFlag = () => {
  const context = useContext(FeatureFlag);
  if (context === undefined) {
    throw new Error("useFlag can be used under FeatureFlag Provider");
  }
  return context;
};
