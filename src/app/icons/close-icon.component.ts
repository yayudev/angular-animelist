import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "icon-close",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    template: `
        <svg
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    `,
})
export class CloseIconComponent {}
