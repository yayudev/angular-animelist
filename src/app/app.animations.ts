import { animate, style, transition, trigger } from "@angular/animations";

export const fadeInAnimation = trigger("fadeIn", [
    transition(":enter", [
        style({ opacity: 0 }),
        animate("300ms", style({ opacity: 1 })),
    ]),
    transition(":leave", [
        style({ opacity: 1 }),
        animate("300ms", style({ opacity: 0 })),
    ]),
]);

export const slideInOutAnimation = trigger("slideInOut", [
    transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("300ms", style({ transform: "translateX(0)" })),
    ]),
    transition(":leave", [
        style({ transform: "translateX(0)" }),
        animate("300ms", style({ transform: "translateX(-100%)" })),
    ]),
]);
