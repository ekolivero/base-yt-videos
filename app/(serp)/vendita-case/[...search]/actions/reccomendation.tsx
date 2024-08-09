"use server";

import { streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const LoadingComponent = () => (
  <div className="animate-pulse p-4">Setting filters...</div>
);


export async function streamComponent(propertyListing: any) {
  const result = await streamUI({
    model: openai("gpt-4o"),
    prompt: `Sulla base delle seguenti case ${JSON.stringify(propertyListing)} crea dei filtri per migliorare la ricerca`,
    text: ({ content }) => <div>{content}</div>,
    tools: {
      getFilters: {
        description: "In questo caso ti baserai o sul prezzo o sulla tipologia di casa eg: (appartamento, villa, monolocale, ecc.), o il prezzo minimo e massimo che l'utente vuole spendere",
        parameters: z.object({
          firstFilter: z.string().describe("Il primo filtro, eg: villa"),
          secondFilter: z.string().describe("Il secondo filtro, eg: appartamento"),
        }),
        generate: async function* ({ firstFilter, secondFilter }) {
          yield <LoadingComponent />;
          return <div className="flex gap-4 flex-1 justify-evenly p-4 rounded-lg">
            <Button className="flex-1">{firstFilter}</Button>
            <Button className="flex-1">{secondFilter}</Button>
          </div>
        },
      },
    },
  });

  return result.value;
}
