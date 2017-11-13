"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Observable_1 = require("rxjs/Observable");
const static_1 = require("../tree/static");
/**
 * Run a schematic from a separate collection.
 *
 * @param collectionName The name of the collection that contains the schematic to run.
 * @param schematicName The name of the schematic to run.
 * @param options The options to pass as input to the RuleFactory.
 */
function externalSchematic(collectionName, schematicName, options) {
    return (input, context) => {
        const collection = context.engine.createCollection(collectionName);
        const schematic = collection.createSchematic(schematicName);
        return schematic.call(options, Observable_1.Observable.of(static_1.branch(input)), context);
    };
}
exports.externalSchematic = externalSchematic;
/**
 * Run a schematic from the same collection.
 *
 * @param schematicName The name of the schematic to run.
 * @param options The options to pass as input to the RuleFactory.
 */
function schematic(schematicName, options) {
    return (input, context) => {
        const collection = context.schematic.collection;
        const schematic = collection.createSchematic(schematicName);
        return schematic.call(options, Observable_1.Observable.of(static_1.branch(input)), context);
    };
}
exports.schematic = schematic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdGljLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9oYW5zbC9Tb3VyY2VzL2hhbnNsL2RldmtpdC8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL3J1bGVzL3NjaGVtYXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILGdEQUE2QztBQUc3QywyQ0FBd0M7QUFHeEM7Ozs7OztHQU1HO0FBQ0gsMkJBQTBELGNBQXNCLEVBQ3RCLGFBQXFCLEVBQ3JCLE9BQWdCO0lBQ3hFLE1BQU0sQ0FBQyxDQUFDLEtBQVcsRUFBRSxPQUF5QjtRQUM1QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFNUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHVCQUFVLENBQUMsRUFBRSxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFURCw4Q0FTQztBQUdEOzs7OztHQUtHO0FBQ0gsbUJBQWtELGFBQXFCLEVBQUUsT0FBZ0I7SUFDdkYsTUFBTSxDQUFDLENBQUMsS0FBVyxFQUFFLE9BQXlCO1FBQzVDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBQ2hELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFNUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHVCQUFVLENBQUMsRUFBRSxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFQRCw4QkFPQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUnVsZSwgU2NoZW1hdGljQ29udGV4dCB9IGZyb20gJy4uL2VuZ2luZS9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVHJlZSB9IGZyb20gJy4uL3RyZWUvaW50ZXJmYWNlJztcbmltcG9ydCB7IGJyYW5jaCB9IGZyb20gJy4uL3RyZWUvc3RhdGljJztcblxuXG4vKipcbiAqIFJ1biBhIHNjaGVtYXRpYyBmcm9tIGEgc2VwYXJhdGUgY29sbGVjdGlvbi5cbiAqXG4gKiBAcGFyYW0gY29sbGVjdGlvbk5hbWUgVGhlIG5hbWUgb2YgdGhlIGNvbGxlY3Rpb24gdGhhdCBjb250YWlucyB0aGUgc2NoZW1hdGljIHRvIHJ1bi5cbiAqIEBwYXJhbSBzY2hlbWF0aWNOYW1lIFRoZSBuYW1lIG9mIHRoZSBzY2hlbWF0aWMgdG8gcnVuLlxuICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgdG8gcGFzcyBhcyBpbnB1dCB0byB0aGUgUnVsZUZhY3RvcnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRlcm5hbFNjaGVtYXRpYzxPcHRpb25UIGV4dGVuZHMgb2JqZWN0Pihjb2xsZWN0aW9uTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYXRpY05hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBPcHRpb25UKTogUnVsZSB7XG4gIHJldHVybiAoaW5wdXQ6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gY29udGV4dC5lbmdpbmUuY3JlYXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSk7XG4gICAgY29uc3Qgc2NoZW1hdGljID0gY29sbGVjdGlvbi5jcmVhdGVTY2hlbWF0aWMoc2NoZW1hdGljTmFtZSk7XG5cbiAgICByZXR1cm4gc2NoZW1hdGljLmNhbGwob3B0aW9ucywgT2JzZXJ2YWJsZS5vZihicmFuY2goaW5wdXQpKSwgY29udGV4dCk7XG4gIH07XG59XG5cblxuLyoqXG4gKiBSdW4gYSBzY2hlbWF0aWMgZnJvbSB0aGUgc2FtZSBjb2xsZWN0aW9uLlxuICpcbiAqIEBwYXJhbSBzY2hlbWF0aWNOYW1lIFRoZSBuYW1lIG9mIHRoZSBzY2hlbWF0aWMgdG8gcnVuLlxuICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgdG8gcGFzcyBhcyBpbnB1dCB0byB0aGUgUnVsZUZhY3RvcnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2hlbWF0aWM8T3B0aW9uVCBleHRlbmRzIG9iamVjdD4oc2NoZW1hdGljTmFtZTogc3RyaW5nLCBvcHRpb25zOiBPcHRpb25UKTogUnVsZSB7XG4gIHJldHVybiAoaW5wdXQ6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gY29udGV4dC5zY2hlbWF0aWMuY29sbGVjdGlvbjtcbiAgICBjb25zdCBzY2hlbWF0aWMgPSBjb2xsZWN0aW9uLmNyZWF0ZVNjaGVtYXRpYyhzY2hlbWF0aWNOYW1lKTtcblxuICAgIHJldHVybiBzY2hlbWF0aWMuY2FsbChvcHRpb25zLCBPYnNlcnZhYmxlLm9mKGJyYW5jaChpbnB1dCkpLCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==