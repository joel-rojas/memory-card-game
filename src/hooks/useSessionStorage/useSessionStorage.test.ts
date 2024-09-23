import { renderHook, act } from "@testing-library/react";
import useSessionStorage from "./useSessionStorage";

describe("useSessionStorage", () => {
  const mockSStKey = "appState";
  let mockSStValue = { gameStatus: "new", gameProgress: "idle" };

  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should initialize with the value from sessionStorage if it exists", async () => {
    const mockExistingValue = { ...mockSStValue, gameStatus: "reset" };

    sessionStorage.setItem(mockSStKey, JSON.stringify(mockExistingValue));

    const { result } = renderHook(() =>
      useSessionStorage(mockSStKey, mockSStValue)
    );

    expect(result.current[0]).toStrictEqual(mockExistingValue);
  });

  it("should initialize with the initial value if sessionStorage is empty", () => {
    const { result } = renderHook(() =>
      useSessionStorage(mockSStKey, mockSStValue)
    );

    expect(result.current[0]).toBe(mockSStValue);
  });

  it("should update sessionStorage when the value changes", () => {
    const { result } = renderHook(() =>
      useSessionStorage(mockSStKey, mockSStValue)
    );

    act(() => {
      result.current[1]({ ...mockSStValue, gameStatus: "reset" });
    });

    expect(sessionStorage.getItem(mockSStKey)).toBe(
      JSON.stringify({ ...mockSStValue, gameStatus: "reset" })
    );
  });

  it("should handle object initial values correctly", () => {
    const anotherMockSStValue = { a: true, b: false };
    const { result } = renderHook(() =>
      useSessionStorage(mockSStKey, anotherMockSStValue)
    );

    expect(result.current[0]).toEqual(anotherMockSStValue);
  });

  it("should handle array initial values correctly", () => {
    const anotherMockSStValue = [1, 2, 3];
    const { result } = renderHook(() =>
      useSessionStorage(mockSStKey, anotherMockSStValue)
    );

    expect(result.current[0]).toEqual(anotherMockSStValue);
  });
});
