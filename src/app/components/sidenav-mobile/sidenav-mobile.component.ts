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
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { fromEvent } from "rxjs";

import { setSidenav, selectIsSidenavOpen } from "@/store/app";
import { fadeInAnimation, slideInOutAnimation } from "@/app.animations";

import { SidenavItemComponent } from "@/components/sidenav-item/sidenav-item.component";
import { CloseIconComponent } from "@/icons/close-icon.component";

@Component({
    selector: "sidenav-mobile",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: "./sidenav-mobile.component.html",
    imports: [SidenavItemComponent, CloseIconComponent],
    animations: [fadeInAnimation, slideInOutAnimation],
})
export class SidenavMobileComponent implements OnInit {
    public readonly store = inject(Store);
    public readonly router = inject(Router);
    public readonly zone = inject(NgZone);
    public readonly destroyRef = inject(DestroyRef);

    public items = input<{ route: string; name: string }[]>([]);
    public activeRoute = input<string | undefined>("");

    public readonly isOpen = this.store.selectSignal(selectIsSidenavOpen);

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
