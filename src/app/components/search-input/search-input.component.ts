import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    ElementRef,
    EventEmitter,
    inject,
    input,
    NgZone,
    OnInit,
    Output,
    viewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { fromEvent } from "rxjs";
import { injectActiveElement } from "ngxtension/active-element";

import { SearchIconComponent } from "@/icons/search-icon.component";

@Component({
    selector: "search-input",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: "./search-input.component.html",
    imports: [FormsModule, SearchIconComponent],
    styles: [":host { width: 100%; height: 100%;}"],
})
export class SearchInputComponent implements OnInit {
    private readonly destroyRef = inject(DestroyRef);
    private readonly zone = inject(NgZone);

    private readonly activeElement = toSignal(injectActiveElement());
    private readonly inputRef =
        viewChild<ElementRef<HTMLInputElement>>("inputElement");

    public searchValue = input("");

    @Output()
    public readonly change = new EventEmitter<Event>();

    public readonly isInputFocused = computed(
        () => this.activeElement() === this.inputRef()?.nativeElement,
    );

    public ngOnInit(): void {
        this.zone.runOutsideAngular(() => {
            fromEvent(document.body, "keydown")
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((event) =>
                    this.handleKeydown(event as KeyboardEvent),
                );
        });
    }

    private handleKeydown(event: KeyboardEvent): void {
        if (event.key === "Escape") {
            this.inputRef()?.nativeElement.blur();
        }

        const isModifierPressed = event.ctrlKey || event.metaKey;
        const isKeyK = event.key === "K" || event.key === "k";

        if (!this.isInputFocused() && isModifierPressed && isKeyK) {
            this.inputRef()?.nativeElement.focus();
            event.preventDefault();
        }
    }
}
