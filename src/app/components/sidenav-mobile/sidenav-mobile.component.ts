import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    input,
    NgZone,
    OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { animate, style, transition, trigger } from "@angular/animations";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { fromEvent } from "rxjs";
import { Store } from "@ngrx/store";
import { selectIsSidenavOpen } from "../../store/app.selectors";
import { setSidenav } from "../../store/app.actions";
import { SidenavItemComponent } from "../sidenav-item/sidenav-item.component";
import { CloseIconComponent } from "../../icons/close-icon.component";

const fadeInAnimation = trigger("fadeIn", [
    transition(":enter", [
        style({ opacity: 0 }),
        animate("300ms", style({ opacity: 1 })),
    ]),
    transition(":leave", [
        style({ opacity: 1 }),
        animate("300ms", style({ opacity: 0 })),
    ]),
]);

const slideInOutAnimation = trigger("slideInOut", [
    transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("300ms", style({ transform: "translateX(0)" })),
    ]),
    transition(":leave", [
        style({ transform: "translateX(0)" }),
        animate("300ms", style({ transform: "translateX(-100%)" })),
    ]),
]);

@Component({
    selector: "sidenav-mobile",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: "./sidenav-mobile.component.html",
    imports: [SidenavItemComponent, CloseIconComponent],
    animations: [fadeInAnimation, slideInOutAnimation],
})
export class SidenavMobileComponent implements OnInit {
    public store = inject(Store);
    public router = inject(Router);
    public zone = inject(NgZone);
    public destroyRef = inject(DestroyRef);

    public items = input<{ route: string; name: string }[]>([]);
    public activeRoute = input<string | undefined>("");

    public isOpen = this.store.selectSignal(selectIsSidenavOpen);

    public ngOnInit() {
        this.zone.runOutsideAngular(() => {
            // Close on resize
            fromEvent(window, "resize")
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.onClose());

            // Close on escape
            fromEvent(document, "keydown")
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((event: Event) => {
                    if (
                        event instanceof KeyboardEvent &&
                        event.key === "Escape"
                    ) {
                        this.onClose();
                    }
                });

            // Close on navigation
            this.router.events
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.onClose());
        });
    }

    public onClose() {
        this.store.dispatch(setSidenav({ open: false }));
    }
}
