import React from "react";
import { useGameContext } from "@contexts";
import useGameSetup from "@hooks/useGameSetup";

const Card = React.lazy(() => import("@components/card"));

export default function Play() {
  const { state } = useGameContext();
  useGameSetup();
  return (
    <div>
      <h1>Play</h1>
      <React.Suspense fallback={<p>Loading</p>}>
        {state.cardDeck.map((card) => {
          return (
            <div key={card.uid}>
              <Card src={card.id} />
            </div>
          );
        })}
      </React.Suspense>
    </div>
  );
}
