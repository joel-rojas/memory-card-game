import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import useWindowResize from "./useWindowResize";
import type { MCAppScreenSizes } from "@/config";

const getScreenType = (width: number): MCAppScreenSizes => {
  if (width < 640) {
    return "mobile";
  } else if (width < 1024) {
    return "tablet";
  } else {
    return "desktop";
  }
};

const mockCalculateScreenType = vi.fn(getScreenType);

describe("useWindowResize", () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
    vi.clearAllMocks();
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });

  it("should return initial screen dimensions and type", () => {
    const { result } = renderHook(() => useWindowResize());

    const mockBound = mockCalculateScreenType.mockReturnValueOnce("desktop");

    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
    expect(result.current.type).toBe(mockBound(window.innerWidth));
  });

  it("should update screen dimensions and type on window resize", () => {
    const { result } = renderHook(() => useWindowResize());

    act(() => {
      window.innerWidth = 500;
      window.innerHeight = 800;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(800);
    expect(result.current.type).toBe("mobile");

    act(() => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
    expect(result.current.type).toBe("tablet");

    act(() => {
      window.innerWidth = 1200;
      window.innerHeight = 900;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(1200);
    expect(result.current.height).toBe(900);
    expect(result.current.type).toBe("desktop");
  });
});
