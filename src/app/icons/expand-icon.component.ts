import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "icon-expand",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    template: `
        <svg
            class="block h-6 w-6 text-gray-400 group-focus-within:text-gray-500 group-hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
            />
        </svg>
    `,
})
export class ExpandIconComponent {}
