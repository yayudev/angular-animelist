import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "icon-minimize",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    template: `
        <svg
            class="block h-6 w-6 text-blue-500 group-focus-within:text-blue-500 group-hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12h-15"
            />
        </svg>
    `,
})
export class MinimizeIconComponent {}
