import { feedReducer, initialState } from "./feed-info";
import { wsConstants } from "../action-types";

describe("Feed reducer", () => {
  it("should return the initial state", () => {
    expect(feedReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      feedReducer(initialState, {
        type: wsConstants.WS_GET_MESSAGE,
        payload: {
          orders: [],
          total: 100,
          totalToday: 1,
        },
      })
    ).toEqual({ ...initialState, total: 100, totalToday: 1 });
  });
});
