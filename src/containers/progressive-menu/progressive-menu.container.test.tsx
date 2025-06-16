import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

import ProgressiveMenu from "./progressive-menu.container";
import type { MCGameMainMenuContentKeys } from "@/config";

describe("ProgressiveMenu Component", () => {
  const mockRenderMenu = vi.fn();
  const mockOnUpcomingMenu = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the menu when currentMenu is provided", () => {
    mockRenderMenu.mockReturnValue(<div>Menu Content</div>);
    render(
      <ProgressiveMenu
        renderMenu={mockRenderMenu}
        currentMenu={"gameLevelMenu" as MCGameMainMenuContentKeys}
        onUpcomingMenu={mockOnUpcomingMenu}
      />
    );
    expect(screen.getByText("Menu Content")).toBeInTheDocument();
  });

  it("should call onUpcomingMenu when nextMenu is called", () => {
    mockRenderMenu.mockImplementation((_, nextMenu) => {
      nextMenu("settingsMenu" as MCGameMainMenuContentKeys);
      return <div>Menu Content</div>;
    });
    render(
      <ProgressiveMenu
        renderMenu={mockRenderMenu}
        currentMenu={"gameLevelMenu" as MCGameMainMenuContentKeys}
        onUpcomingMenu={mockOnUpcomingMenu}
      />
    );
    expect(mockOnUpcomingMenu).toHaveBeenCalledWith(
      "settingsMenu" as MCGameMainMenuContentKeys
    );
  });

  it("should not render anything when currentMenu is not provided", () => {
    render(
      <ProgressiveMenu
        renderMenu={mockRenderMenu}
        currentMenu={null as any}
        onUpcomingMenu={mockOnUpcomingMenu}
      />
    );
    const container = screen.queryByRole("presentation");
    expect(container).toBeNull();
  });
});
