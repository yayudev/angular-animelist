import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "icon-menu",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <svg
            class="h-6 w-6 group-focus-within:text-blue-500 group-hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
        </svg>
    `,
})
export class MenuIconComponent {}
