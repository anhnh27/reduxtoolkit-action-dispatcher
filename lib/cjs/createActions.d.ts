export declare type ActionCreator = {
    name: string;
    type: string;
    actionCreator: (payload: any) => {
        type: string;
        payload: any;
    } | Object;
};
export declare type MapDispatchToAC = {
    [key: string]: ActionCreator;
};
export declare type ActionWrapper = {
    type: string;
    actionCreator?: ActionCreator;
};
declare const createActions: (key: string, mapDispatchToAC: MapDispatchToAC) => ActionWrapper[];
export default createActions;
