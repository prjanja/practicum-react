import { orderReducer } from "./order-details";
import { orderConstants } from "../action-types";

describe("Order details reducer", () => {
  it("should return the initial state", () => {
    expect(orderReducer(undefined, { type: undefined })).toEqual({});
  });

  it("should handle ORDER_FULFILLED", () => {
    const order = {
      number: 123,
    };
    expect(
      orderReducer({}, { type: orderConstants.ORDER_FULFILLED, payload: order })
    ).toEqual(order);
  });
});
