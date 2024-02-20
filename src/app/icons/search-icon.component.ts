import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "icon-search",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    template: `
        <svg
            class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd"
            />
        </svg>
    `,
})
export class SearchIconComponent {}
