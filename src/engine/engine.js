"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
require("rxjs/add/operator/map");
const interface_1 = require("../tree/interface");
const null_1 = require("../tree/null");
const static_1 = require("../tree/static");
const collection_1 = require("./collection");
const schematic_1 = require("./schematic");
class UnknownUrlSourceProtocol extends core_1.BaseException {
    constructor(url) { super(`Unknown Protocol on url "${url}".`); }
}
exports.UnknownUrlSourceProtocol = UnknownUrlSourceProtocol;
class UnknownCollectionException extends core_1.BaseException {
    constructor(name) { super(`Unknown collection "${name}".`); }
}
exports.UnknownCollectionException = UnknownCollectionException;
class UnknownSchematicException extends core_1.BaseException {
    constructor(name, collection) {
        super(`Schematic "${name}" not found in collection "${collection.name}".`);
    }
}
exports.UnknownSchematicException = UnknownSchematicException;
class SchematicEngineConflictingException extends core_1.BaseException {
    constructor() { super(`A schematic was called from a different engine as its parent.`); }
}
exports.SchematicEngineConflictingException = SchematicEngineConflictingException;
class SchematicEngine {
    constructor(_host) {
        this._host = _host;
        this._collectionCache = new Map();
        this._schematicCache = new Map();
    }
    get defaultMergeStrategy() { return this._host.defaultMergeStrategy || interface_1.MergeStrategy.Default; }
    createCollection(name) {
        let collection = this._collectionCache.get(name);
        if (collection) {
            return collection;
        }
        const description = this._host.createCollectionDescription(name);
        if (!description) {
            throw new UnknownCollectionException(name);
        }
        collection = new collection_1.CollectionImpl(description, this);
        this._collectionCache.set(name, collection);
        this._schematicCache.set(name, new Map());
        return collection;
    }
    createContext(schematic, parent) {
        // Check for inconsistencies.
        if (parent && parent.engine && parent.engine !== this) {
            throw new SchematicEngineConflictingException();
        }
        return {
            debug: parent && parent.debug || false,
            engine: this,
            logger: (parent && parent.logger && parent.logger.createChild(schematic.description.name))
                || new core_1.NullLogger(),
            schematic,
            strategy: (parent && parent.strategy !== undefined)
                ? parent.strategy : this.defaultMergeStrategy,
        };
    }
    createSchematic(name, collection) {
        const collectionImpl = this._collectionCache.get(collection.description.name);
        const schematicMap = this._schematicCache.get(collection.description.name);
        if (!collectionImpl || !schematicMap || collectionImpl !== collection) {
            // This is weird, maybe the collection was created by another engine?
            throw new UnknownCollectionException(collection.description.name);
        }
        let schematic = schematicMap.get(name);
        if (schematic) {
            return schematic;
        }
        const description = this._host.createSchematicDescription(name, collection.description);
        if (!description) {
            throw new UnknownSchematicException(name, collection.description);
        }
        const factory = this._host.getSchematicRuleFactory(description, collection.description);
        schematic = new schematic_1.SchematicImpl(description, factory, collection, this);
        schematicMap.set(name, schematic);
        return schematic;
    }
    transformOptions(schematic, options) {
        return this._host.transformOptions(schematic.description, options);
    }
    createSourceFromUrl(url, context) {
        switch (url.protocol) {
            case 'null:': return () => new null_1.NullTree();
            case 'empty:': return () => static_1.empty();
            default:
                const hostSource = this._host.createSourceFromUrl(url, context);
                if (!hostSource) {
                    throw new UnknownUrlSourceProtocol(url.toString());
                }
                return hostSource;
        }
    }
}
exports.SchematicEngine = SchematicEngine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9oYW5zbC9Tb3VyY2VzL2hhbnNsL2RldmtpdC8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL2VuZ2luZS9lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FBaUU7QUFFakUsaUNBQStCO0FBRS9CLGlEQUFrRDtBQUNsRCx1Q0FBd0M7QUFDeEMsMkNBQXVDO0FBQ3ZDLDZDQUE4QztBQVE5QywyQ0FBNEM7QUFHNUMsOEJBQXNDLFNBQVEsb0JBQWE7SUFDekQsWUFBWSxHQUFXLElBQUksS0FBSyxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN6RTtBQUZELDREQUVDO0FBRUQsZ0NBQXdDLFNBQVEsb0JBQWE7SUFDM0QsWUFBWSxJQUFZLElBQUksS0FBSyxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN0RTtBQUZELGdFQUVDO0FBQ0QsK0JBQXVDLFNBQVEsb0JBQWE7SUFDMUQsWUFBWSxJQUFZLEVBQUUsVUFBcUM7UUFDN0QsS0FBSyxDQUFDLGNBQWMsSUFBSSw4QkFBOEIsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUNGO0FBSkQsOERBSUM7QUFFRCx5Q0FBaUQsU0FBUSxvQkFBYTtJQUNwRSxnQkFBZ0IsS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzFGO0FBRkQsa0ZBRUM7QUFHRDtJQU9FLFlBQW9CLEtBQTBDO1FBQTFDLFVBQUssR0FBTCxLQUFLLENBQXFDO1FBSnRELHFCQUFnQixHQUFHLElBQUksR0FBRyxFQUFtRCxDQUFDO1FBQzlFLG9CQUFlLEdBQ25CLElBQUksR0FBRyxFQUErRCxDQUFDO0lBRzNFLENBQUM7SUFFRCxJQUFJLG9CQUFvQixLQUFLLE1BQU0sQ0FBQyxJ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Q0FDRjtBQW5HRCwwQ0FtR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBOdWxsTG9nZ2VyIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkRlc2NyaXB0aW9uLCBUeXBlZFNjaGVtYXRpY0NvbnRleHQgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgeyBVcmwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgTWVyZ2VTdHJhdGVneSB9IGZyb20gJy4uL3RyZWUvaW50ZXJmYWNlJztcbmltcG9ydCB7IE51bGxUcmVlIH0gZnJvbSAnLi4vdHJlZS9udWxsJztcbmltcG9ydCB7IGVtcHR5IH0gZnJvbSAnLi4vdHJlZS9zdGF0aWMnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkltcGwgfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbixcbiAgRW5naW5lLFxuICBFbmdpbmVIb3N0LFxuICBTY2hlbWF0aWMsXG4gIFNvdXJjZSxcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2NoZW1hdGljSW1wbCB9IGZyb20gJy4vc2NoZW1hdGljJztcblxuXG5leHBvcnQgY2xhc3MgVW5rbm93blVybFNvdXJjZVByb3RvY29sIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7IHN1cGVyKGBVbmtub3duIFByb3RvY29sIG9uIHVybCBcIiR7dXJsfVwiLmApOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbmtub3duQ29sbGVjdGlvbkV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHsgc3VwZXIoYFVua25vd24gY29sbGVjdGlvbiBcIiR7bmFtZX1cIi5gKTsgfVxufVxuZXhwb3J0IGNsYXNzIFVua25vd25TY2hlbWF0aWNFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uRGVzY3JpcHRpb248e30+KSB7XG4gICAgc3VwZXIoYFNjaGVtYXRpYyBcIiR7bmFtZX1cIiBub3QgZm91bmQgaW4gY29sbGVjdGlvbiBcIiR7Y29sbGVjdGlvbi5uYW1lfVwiLmApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTY2hlbWF0aWNFbmdpbmVDb25mbGljdGluZ0V4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoYEEgc2NoZW1hdGljIHdhcyBjYWxsZWQgZnJvbSBhIGRpZmZlcmVudCBlbmdpbmUgYXMgaXRzIHBhcmVudC5gKTsgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBTY2hlbWF0aWNFbmdpbmU8Q29sbGVjdGlvblQgZXh0ZW5kcyBvYmplY3QsIFNjaGVtYXRpY1QgZXh0ZW5kcyBvYmplY3Q+XG4gICAgaW1wbGVtZW50cyBFbmdpbmU8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcblxuICBwcml2YXRlIF9jb2xsZWN0aW9uQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgQ29sbGVjdGlvbkltcGw8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+PigpO1xuICBwcml2YXRlIF9zY2hlbWF0aWNDYWNoZVxuICAgID0gbmV3IE1hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIFNjaGVtYXRpY0ltcGw8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+Pj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ob3N0OiBFbmdpbmVIb3N0PENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPikge1xuICB9XG5cbiAgZ2V0IGRlZmF1bHRNZXJnZVN0cmF0ZWd5KCkgeyByZXR1cm4gdGhpcy5faG9zdC5kZWZhdWx0TWVyZ2VTdHJhdGVneSB8fCBNZXJnZVN0cmF0ZWd5LkRlZmF1bHQ7IH1cblxuICBjcmVhdGVDb2xsZWN0aW9uKG5hbWU6IHN0cmluZyk6IENvbGxlY3Rpb248Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcbiAgICBsZXQgY29sbGVjdGlvbiA9IHRoaXMuX2NvbGxlY3Rpb25DYWNoZS5nZXQobmFtZSk7XG4gICAgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH1cblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGhpcy5faG9zdC5jcmVhdGVDb2xsZWN0aW9uRGVzY3JpcHRpb24obmFtZSk7XG4gICAgaWYgKCFkZXNjcmlwdGlvbikge1xuICAgICAgdGhyb3cgbmV3IFVua25vd25Db2xsZWN0aW9uRXhjZXB0aW9uKG5hbWUpO1xuICAgIH1cblxuICAgIGNvbGxlY3Rpb24gPSBuZXcgQ29sbGVjdGlvbkltcGw8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+KGRlc2NyaXB0aW9uLCB0aGlzKTtcbiAgICB0aGlzLl9jb2xsZWN0aW9uQ2FjaGUuc2V0KG5hbWUsIGNvbGxlY3Rpb24pO1xuICAgIHRoaXMuX3NjaGVtYXRpY0NhY2hlLnNldChuYW1lLCBuZXcgTWFwKCkpO1xuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cblxuICBjcmVhdGVDb250ZXh0KFxuICAgIHNjaGVtYXRpYzogU2NoZW1hdGljPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPixcbiAgICBwYXJlbnQ/OiBQYXJ0aWFsPFR5cGVkU2NoZW1hdGljQ29udGV4dDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4+LFxuICApOiBUeXBlZFNjaGVtYXRpY0NvbnRleHQ8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcbiAgICAvLyBDaGVjayBmb3IgaW5jb25zaXN0ZW5jaWVzLlxuICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LmVuZ2luZSAmJiBwYXJlbnQuZW5naW5lICE9PSB0aGlzKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljRW5naW5lQ29uZmxpY3RpbmdFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGVidWc6IHBhcmVudCAmJiBwYXJlbnQuZGVidWcgfHwgZmFsc2UsXG4gICAgICBlbmdpbmU6IHRoaXMsXG4gICAgICBsb2dnZXI6IChwYXJlbnQgJiYgcGFyZW50LmxvZ2dlciAmJiBwYXJlbnQubG9nZ2VyLmNyZWF0ZUNoaWxkKHNjaGVtYXRpYy5kZXNjcmlwdGlvbi5uYW1lKSlcbiAgICAgICAgICAgICAgfHwgbmV3IE51bGxMb2dnZXIoKSxcbiAgICAgIHNjaGVtYXRpYyxcbiAgICAgIHN0cmF0ZWd5OiAocGFyZW50ICYmIHBhcmVudC5zdHJhdGVneSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICA/IHBhcmVudC5zdHJhdGVneSA6IHRoaXMuZGVmYXVsdE1lcmdlU3RyYXRlZ3ksXG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZVNjaGVtYXRpYyhcbiAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb248Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+KTogU2NoZW1hdGljPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPiB7XG4gICAgY29uc3QgY29sbGVjdGlvbkltcGwgPSB0aGlzLl9jb2xsZWN0aW9uQ2FjaGUuZ2V0KGNvbGxlY3Rpb24uZGVzY3JpcHRpb24ubmFtZSk7XG4gICAgY29uc3Qgc2NoZW1hdGljTWFwID0gdGhpcy5fc2NoZW1hdGljQ2FjaGUuZ2V0KGNvbGxlY3Rpb24uZGVzY3JpcHRpb24ubmFtZSk7XG4gICAgaWYgKCFjb2xsZWN0aW9uSW1wbCB8fCAhc2NoZW1hdGljTWFwIHx8IGNvbGxlY3Rpb25JbXBsICE9PSBjb2xsZWN0aW9uKSB7XG4gICAgICAvLyBUaGlzIGlzIHdlaXJkLCBtYXliZSB0aGUgY29sbGVjdGlvbiB3YXMgY3JlYXRlZCBieSBhbm90aGVyIGVuZ2luZT9cbiAgICAgIHRocm93IG5ldyBVbmtub3duQ29sbGVjdGlvbkV4Y2VwdGlvbihjb2xsZWN0aW9uLmRlc2NyaXB0aW9uLm5hbWUpO1xuICAgIH1cblxuICAgIGxldCBzY2hlbWF0aWMgPSBzY2hlbWF0aWNNYXAuZ2V0KG5hbWUpO1xuICAgIGlmIChzY2hlbWF0aWMpIHtcbiAgICAgIHJldHVybiBzY2hlbWF0aWM7XG4gICAgfVxuXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB0aGlzLl9ob3N0LmNyZWF0ZVNjaGVtYXRpY0Rlc2NyaXB0aW9uKG5hbWUsIGNvbGxlY3Rpb24uZGVzY3JpcHRpb24pO1xuICAgIGlmICghZGVzY3JpcHRpb24pIHtcbiAgICAgIHRocm93IG5ldyBVbmtub3duU2NoZW1hdGljRXhjZXB0aW9uKG5hbWUsIGNvbGxlY3Rpb24uZGVzY3JpcHRpb24pO1xuICAgIH1cblxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLl9ob3N0LmdldFNjaGVtYXRpY1J1bGVGYWN0b3J5KGRlc2NyaXB0aW9uLCBjb2xsZWN0aW9uLmRlc2NyaXB0aW9uKTtcbiAgICBzY2hlbWF0aWMgPSBuZXcgU2NoZW1hdGljSW1wbDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4oZGVzY3JpcHRpb24sIGZhY3RvcnksIGNvbGxlY3Rpb24sIHRoaXMpO1xuXG4gICAgc2NoZW1hdGljTWFwLnNldChuYW1lLCBzY2hlbWF0aWMpO1xuXG4gICAgcmV0dXJuIHNjaGVtYXRpYztcbiAgfVxuXG4gIHRyYW5zZm9ybU9wdGlvbnM8T3B0aW9uVCBleHRlbmRzIG9iamVjdCwgUmVzdWx0VCBleHRlbmRzIG9iamVjdD4oXG4gICAgICBzY2hlbWF0aWM6IFNjaGVtYXRpYzxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sIG9wdGlvbnM6IE9wdGlvblQpOiBSZXN1bHRUIHtcbiAgICByZXR1cm4gdGhpcy5faG9zdC50cmFuc2Zvcm1PcHRpb25zPE9wdGlvblQsIFJlc3VsdFQ+KFxuICAgICAgc2NoZW1hdGljLmRlc2NyaXB0aW9uLFxuICAgICAgb3B0aW9ucyxcbiAgICApO1xuICB9XG5cbiAgY3JlYXRlU291cmNlRnJvbVVybCh1cmw6IFVybCwgY29udGV4dDogVHlwZWRTY2hlbWF0aWNDb250ZXh0PENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPik6IFNvdXJjZSB7XG4gICAgc3dpdGNoICh1cmwucHJvdG9jb2wpIHtcbiAgICAgIGNhc2UgJ251bGw6JzogcmV0dXJuICgpID0+IG5ldyBOdWxsVHJlZSgpO1xuICAgICAgY2FzZSAnZW1wdHk6JzogcmV0dXJuICgpID0+IGVtcHR5KCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zdCBob3N0U291cmNlID0gdGhpcy5faG9zdC5jcmVhdGVTb3VyY2VGcm9tVXJsKHVybCwgY29udGV4dCk7XG4gICAgICAgIGlmICghaG9zdFNvdXJjZSkge1xuICAgICAgICAgIHRocm93IG5ldyBVbmtub3duVXJsU291cmNlUHJvdG9jb2wodXJsLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhvc3RTb3VyY2U7XG4gICAgfVxuICB9XG59XG4iXX0=