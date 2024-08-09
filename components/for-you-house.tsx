"use client";
import React from "react";
import Image from "next/image";
import { Carousel, Card } from "@/components/ui/card-carousel";


export function ForYouHouse() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));
    return (
        <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                   Case che potrebbero interessarti
                </h2>
                <p className="text-sm md:text-xl md  text-muted-foreground">
                    Basato sui tuoi interessi
                </p>
            </div>
        </div>
        <Carousel items={cards} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <div
            key={"dummy-content"}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
            <Image
                src="https://pwm.im-cdn.it/image/1542217967/m-c.jpg"
                alt="Macbook mockup from Aceternity UI"
                height="500"
                width="500"
                className="h-full w-full mx-auto object-contain"
                unoptimized
            />
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mt-4">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                    Splendida villa a schiera
                </span>{" "}
                Splendida villa a schiera in zona tranquilla e residenziale, a pochi passi dal centro di Dronero. La villa è composta da ingresso su ampio soggiorno, cucina abitabile, tre camere da letto, due bagni, taverna, lavanderia, cantina, box auto e giardino privato. La villa è in ottime condizioni, con finiture di pregio e impianti a norma. La villa è dotata di riscaldamento autonomo e climatizzazione. La villa è libera su tre lati e gode di una splendida vista panoramica sulle montagne circostanti. La villa è ideale per chi cerca una soluzione indipendente, in zona tranquilla e residenziale, a pochi passi dal centro di Dronero.{" "}
            </p>
        </div>
    );
};

const data = [
    {
        category: "Dronero",
        title: "Villa a schiera via Centallo 35, Dronero",
        src: "https://pwm.im-cdn.it/image/1542217967/m-c.jpg",
        content: <DummyContent />,
    },
    {
        category: "Dronero",
        title: "Bilocale via Trieste 20, Centro, Dronero",
        src: "https://pwm.im-cdn.it/image/907729963/m-c.jpg",
        content: <DummyContent />,
    },
    {
        category: "Dronero",
        title: "Terratetto unifamiliare via Picco Chiotti 34, Centro, Dronero",
        src: "https://pwm.im-cdn.it/image/1377674811/m-c.jpg",
        content: <DummyContent />,
    },

    {
        category: "Dronero",
        title: "Trilocale via Visaisa 19, Centro, Dronero",
        src: "https://pwm.im-cdn.it/image/1329325568/m-c.jpg",
        content: <DummyContent />,
    },
    {
        category: "Dronero",
        title: "Cascina, da ristrutturare, 260 m², Dronero",
        src: "https://pwm.im-cdn.it/image/1426714547/m-c.jpg",
        content: <DummyContent />,
    },
];