"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CollectionImpl {
    constructor(_description, _engine) {
        this._description = _description;
        this._engine = _engine;
    }
    get description() { return this._description; }
    get name() { return this.description.name || '<unknown>'; }
    createSchematic(name) {
        return this._engine.createSchematic(name, this);
    }
}
exports.CollectionImpl = CollectionImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvaGFuc2wvU291cmNlcy9oYW5zbC9kZXZraXQvIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3NyYy9lbmdpbmUvY29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdBO0lBRUUsWUFBb0IsWUFBZ0QsRUFDaEQsT0FBaUQ7UUFEakQsaUJBQVksR0FBWixZQUFZLENBQW9DO1FBQ2hELFlBQU8sR0FBUCxPQUFPLENBQTBDO0lBQ3JFLENBQUM7SUFFRCxJQUFJLFdBQVcsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDL0MsSUFBSSxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFFM0QsZUFBZSxDQUFDLElBQVk7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0Y7QUFaRCx3Q0FZQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IFNjaGVtYXRpY0VuZ2luZSB9IGZyb20gJy4vZW5naW5lJztcbmltcG9ydCB7IENvbGxlY3Rpb24sIENvbGxlY3Rpb25EZXNjcmlwdGlvbiwgU2NoZW1hdGljIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uSW1wbDxDb2xsZWN0aW9uVCBleHRlbmRzIG9iamVjdCwgU2NoZW1hdGljVCBleHRlbmRzIG9iamVjdD5cbiAgICBpbXBsZW1lbnRzIENvbGxlY3Rpb248Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGVzY3JpcHRpb246IENvbGxlY3Rpb25EZXNjcmlwdGlvbjxDb2xsZWN0aW9uVD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX2VuZ2luZTogU2NoZW1hdGljRW5naW5lPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPikge1xuICB9XG5cbiAgZ2V0IGRlc2NyaXB0aW9uKCkgeyByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247IH1cbiAgZ2V0IG5hbWUoKSB7IHJldHVybiB0aGlzLmRlc2NyaXB0aW9uLm5hbWUgfHwgJzx1bmtub3duPic7IH1cblxuICBjcmVhdGVTY2hlbWF0aWMobmFtZTogc3RyaW5nKTogU2NoZW1hdGljPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZ2luZS5jcmVhdGVTY2hlbWF0aWMobmFtZSwgdGhpcyk7XG4gIH1cbn1cbiJdfQ==