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
const entry_1 = require("./entry");
const virtual_1 = require("./virtual");
class FileSystemDirEntry extends virtual_1.VirtualDirEntry {
    constructor(_host, tree, _systemPath = '', path = core_1.normalize('/')) {
        super(tree, path);
        this._host = _host;
        this._systemPath = _systemPath;
    }
    _createDir(name) {
        return new FileSystemDirEntry(this._host, this._tree, this._host.join(this._systemPath, name), core_1.join(this._path, name));
    }
    get parent() {
        return this._path == '/' ? null : this._tree.getDir(core_1.dirname(this._path));
    }
    get subdirs() {
        const result = new Set();
        try {
            this._host.listDirectory(this._systemPath)
                .filter(name => this._host.isDirectory(this._host.join(this._systemPath, name)))
                .forEach(name => result.add(core_1.fragment(name)));
        }
        catch (e) {
            if (e.code != 'ENOENT' && e.code != 'ENOTDIR') {
                throw e;
            }
        }
        for (const path of this._tree.staging.keys()) {
            if (path.startsWith(this._path) && core_1.dirname(path) != this._path) {
                result.add(core_1.basename(path));
            }
        }
        return [...result];
    }
    get subfiles() {
        const result = new Set();
        try {
            this._host.listDirectory(this._systemPath)
                .filter(name => !this._host.isDirectory(this._host.join(this._systemPath, name)))
                .forEach(name => result.add(core_1.fragment(name)));
        }
        catch (e) {
            if (e.code != 'ENOENT' && e.code != 'ENOTDIR') {
                throw e;
            }
        }
        for (const path of this._tree.staging.keys()) {
            if (path.startsWith(this._path) && core_1.dirname(path) == this._path) {
                result.add(core_1.basename(path));
            }
        }
        return [...result];
    }
    file(name) {
        return this._tree.get(core_1.join(this._path, name));
    }
}
exports.FileSystemDirEntry = FileSystemDirEntry;
class FileSystemTree extends virtual_1.VirtualTree {
    constructor(_host) {
        super();
        this._host = _host;
        this._initialized = false;
        this._root = new FileSystemDirEntry(_host, this);
    }
    get tree() {
        const host = this._host;
        if (!this._initialized) {
            this._initialized = true;
            this._recursiveFileList().forEach(([system, schematic]) => {
                this._tree.set(schematic, new entry_1.LazyFileEntry(schematic, () => host.readFile(system)));
            });
        }
        return this._tree;
    }
    get(path) {
        const normalizedPath = this._normalizePath(path);
        return this._cacheMap.get(normalizedPath) || this.tree.get(normalizedPath) || null;
    }
    _copyTo(tree) {
        if (tree instanceof FileSystemTree) {
            const x = tree;
            x._tree = this._tree;
            x._initialized = this._initialized;
            this._actions.forEach(action => x._actions.push(action));
            [...this._cacheMap.entries()].forEach(([path, entry]) => {
                x._cacheMap.set(path, entry);
            });
        }
        else {
            super._copyTo(tree);
        }
    }
    _recursiveFileList() {
        const host = this._host;
        const list = [];
        function recurse(systemPath, schematicPath) {
            for (const name of host.listDirectory(systemPath)) {
                const systemName = host.join(systemPath, name);
                const normalizedPath = core_1.normalize(schematicPath + '/' + name);
                if (host.isDirectory(normalizedPath)) {
                    recurse(systemName, normalizedPath);
                }
                else {
                    list.push([systemName, normalizedPath]);
                }
            }
        }
        recurse('', '/');
        return list;
    }
}
exports.FileSystemTree = FileSystemTree;
class FileSystemCreateTree extends FileSystemTree {
    constructor(host) {
        super(host);
        this._recursiveFileList().forEach(([system, schematic]) => {
            this.create(schematic, host.readFile(system));
        });
        this._initialized = true;
    }
}
exports.FileSystemCreateTree = FileSystemCreateTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvaGFuc2wvU291cmNlcy9oYW5zbC9kZXZraXQvIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3NyYy90cmVlL2ZpbGVzeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FROEI7QUFDOUIsbUNBQXdDO0FBRXhDLHVDQUF5RDtBQVl6RCx3QkFBZ0MsU0FBUSx5QkFBZTtJQUNyRCxZQUNZLEtBQXlCLEVBQ25DLElBQW9CLEVBQ1YsY0FBYyxFQUFFLEVBQzFCLE9BQWEsZ0JBQVMsQ0FBQyxHQUFHLENBQUM7UUFFM0IsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUxSLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBRXpCLGdCQUFXLEdBQVgsV0FBVyxDQUFLO0lBSTVCLENBQUM7SUFFUyxVQUFVLENBQUMsSUFBa0I7UUFDckMsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQzNCLElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLEtBQXVCLEVBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQ3ZDLFdBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUN2QixDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVCxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBZ0IsQ0FBQztRQUV2QyxJQUFJLENBQUM7WUFDSCxJQUFJLENB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QUM7Z0JBQ3RDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUE3REQsd0NBNkRDO0FBR0QsMEJBQWtDLFNBQVEsY0FBYztJQUN0RCxZQUFZLElBQXdCO1FBQ2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFURCxvREFTQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIFBhdGgsXG4gIFBhdGhGcmFnbWVudCxcbiAgYmFzZW5hbWUsXG4gIGRpcm5hbWUsXG4gIGZyYWdtZW50LFxuICBqb2luLFxuICBub3JtYWxpemUsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IExhenlGaWxlRW50cnkgfSBmcm9tICcuL2VudHJ5JztcbmltcG9ydCB7IERpckVudHJ5LCBGaWxlRW50cnkgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBWaXJ0dWFsRGlyRW50cnksIFZpcnR1YWxUcmVlIH0gZnJvbSAnLi92aXJ0dWFsJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVTeXN0ZW1UcmVlSG9zdCB7XG4gIGxpc3REaXJlY3Rvcnk6IChwYXRoOiBzdHJpbmcpID0+IHN0cmluZ1tdO1xuICBpc0RpcmVjdG9yeTogKHBhdGg6IHN0cmluZykgPT4gYm9vbGVhbjtcbiAgcmVhZEZpbGU6IChwYXRoOiBzdHJpbmcpID0+IEJ1ZmZlcjtcblxuICBqb2luOiAocGF0aDE6IHN0cmluZywgb3RoZXI6IHN0cmluZykgPT4gc3RyaW5nO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBGaWxlU3lzdGVtRGlyRW50cnkgZXh0ZW5kcyBWaXJ0dWFsRGlyRW50cnkge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX2hvc3Q6IEZpbGVTeXN0ZW1UcmVlSG9zdCxcbiAgICB0cmVlOiBGaWxlU3lzdGVtVHJlZSxcbiAgICBwcm90ZWN0ZWQgX3N5c3RlbVBhdGggPSAnJyxcbiAgICBwYXRoOiBQYXRoID0gbm9ybWFsaXplKCcvJyksXG4gICkge1xuICAgIHN1cGVyKHRyZWUsIHBhdGgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jcmVhdGVEaXIobmFtZTogUGF0aEZyYWdtZW50KTogRGlyRW50cnkge1xuICAgIHJldHVybiBuZXcgRmlsZVN5c3RlbURpckVudHJ5KFxuICAgICAgdGhpcy5faG9zdCxcbiAgICAgIHRoaXMuX3RyZWUgYXMgRmlsZVN5c3RlbVRyZWUsXG4gICAgICB0aGlzLl9ob3N0LmpvaW4odGhpcy5fc3lzdGVtUGF0aCwgbmFtZSksXG4gICAgICBqb2luKHRoaXMuX3BhdGgsIG5hbWUpLFxuICAgICk7XG4gIH1cblxuICBnZXQgcGFyZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9wYXRoID09ICcvJyA/IG51bGwgOiB0aGlzLl90cmVlLmdldERpcihkaXJuYW1lKHRoaXMuX3BhdGgpKTtcbiAgfVxuICBnZXQgc3ViZGlycygpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgU2V0PFBhdGhGcmFnbWVudD4oKTtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLl9ob3N0Lmxpc3REaXJlY3RvcnkodGhpcy5fc3lzdGVtUGF0aClcbiAgICAgICAgICAuZmlsdGVyKG5hbWUgPT4gdGhpcy5faG9zdC5pc0RpcmVjdG9yeSh0aGlzLl9ob3N0LmpvaW4odGhpcy5fc3lzdGVtUGF0aCwgbmFtZSkpKVxuICAgICAgICAgIC5mb3JFYWNoKG5hbWUgPT4gcmVzdWx0LmFkZChmcmFnbWVudChuYW1lKSkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLmNvZGUgIT0gJ0VOT0VOVCcgJiYgZS5jb2RlICE9ICdFTk9URElSJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgcGF0aCBvZiB0aGlzLl90cmVlLnN0YWdpbmcua2V5cygpKSB7XG4gICAgICBpZiAocGF0aC5zdGFydHNXaXRoKHRoaXMuX3BhdGgpICYmIGRpcm5hbWUocGF0aCkgIT0gdGhpcy5fcGF0aCkge1xuICAgICAgICByZXN1bHQuYWRkKGJhc2VuYW1lKHBhdGgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gWy4uLnJlc3VsdF07XG4gIH1cbiAgZ2V0IHN1YmZpbGVzKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTZXQ8UGF0aEZyYWdtZW50PigpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2hvc3QubGlzdERpcmVjdG9yeSh0aGlzLl9zeXN0ZW1QYXRoKVxuICAgICAgICAuZmlsdGVyKG5hbWUgPT4gIXRoaXMuX2hvc3QuaXNEaXJlY3RvcnkodGhpcy5faG9zdC5qb2luKHRoaXMuX3N5c3RlbVBhdGgsIG5hbWUpKSlcbiAgICAgICAgLmZvckVhY2gobmFtZSA9PiByZXN1bHQuYWRkKGZyYWdtZW50KG5hbWUpKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUuY29kZSAhPSAnRU5PRU5UJyAmJiBlLmNvZGUgIT0gJ0VOT1RESVInKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHRoaXMuX3RyZWUuc3RhZ2luZy5rZXlzKCkpIHtcbiAgICAgIGlmIChwYXRoLnN0YXJ0c1dpdGgodGhpcy5fcGF0aCkgJiYgZGlybmFtZShwYXRoKSA9PSB0aGlzLl9wYXRoKSB7XG4gICAgICAgIHJlc3VsdC5hZGQoYmFzZW5hbWUocGF0aCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbLi4ucmVzdWx0XTtcbiAgfVxuXG4gIGZpbGUobmFtZTogUGF0aEZyYWdtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyZWUuZ2V0KGpvaW4odGhpcy5fcGF0aCwgbmFtZSkpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEZpbGVTeXN0ZW1UcmVlIGV4dGVuZHMgVmlydHVhbFRyZWUge1xuICBwcm90ZWN0ZWQgX2luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaG9zdDogRmlsZVN5c3RlbVRyZWVIb3N0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9yb290ID0gbmV3IEZpbGVTeXN0ZW1EaXJFbnRyeShfaG9zdCwgdGhpcyk7XG4gIH1cblxuICBnZXQgdHJlZSgpOiBNYXA8UGF0aCwgRmlsZUVudHJ5PiB7XG4gICAgY29uc3QgaG9zdCA9IHRoaXMuX2hvc3Q7XG4gICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fcmVjdXJzaXZlRmlsZUxpc3QoKS5mb3JFYWNoKChbc3lzdGVtLCBzY2hlbWF0aWNdKSA9PiB7XG4gICAgICAgIHRoaXMuX3RyZWUuc2V0KHNjaGVtYXRpYywgbmV3IExhenlGaWxlRW50cnkoc2NoZW1hdGljLCAoKSA9PiBob3N0LnJlYWRGaWxlKHN5c3RlbSkpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl90cmVlO1xuICB9XG5cbiAgZ2V0KHBhdGg6IHN0cmluZyk6IEZpbGVFbnRyeSB8IG51bGwge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQYXRoID0gdGhpcy5fbm9ybWFsaXplUGF0aChwYXRoKTtcblxuICAgIHJldHVybiB0aGlzLl9jYWNoZU1hcC5nZXQobm9ybWFsaXplZFBhdGgpIHx8IHRoaXMudHJlZS5nZXQobm9ybWFsaXplZFBhdGgpIHx8IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvcHlUbzxUIGV4dGVuZHMgVmlydHVhbFRyZWU+KHRyZWU6IFQpOiB2b2lkIHtcbiAgICBpZiAodHJlZSBpbnN0YW5jZW9mIEZpbGVTeXN0ZW1UcmVlKSB7XG4gICAgICBjb25zdCB4ID0gdHJlZSBhcyBGaWxlU3lzdGVtVHJlZTtcbiAgICAgIHguX3RyZWUgPSB0aGlzLl90cmVlO1xuICAgICAgeC5faW5pdGlhbGl6ZWQgPSB0aGlzLl9pbml0aWFsaXplZDtcblxuICAgICAgdGhpcy5fYWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB4Ll9hY3Rpb25zLnB1c2goYWN0aW9uKSk7XG4gICAgICBbLi4udGhpcy5fY2FjaGVNYXAuZW50cmllcygpXS5mb3JFYWNoKChbcGF0aCwgZW50cnldKSA9PiB7XG4gICAgICAgIHguX2NhY2hlTWFwLnNldChwYXRoLCBlbnRyeSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuX2NvcHlUbyh0cmVlKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3JlY3Vyc2l2ZUZpbGVMaXN0KCk6IFsgc3RyaW5nLCBQYXRoIF1bXSB7XG4gICAgY29uc3QgaG9zdCA9IHRoaXMuX2hvc3Q7XG4gICAgY29uc3QgbGlzdDogW3N0cmluZywgUGF0aF1bXSA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcmVjdXJzZShzeXN0ZW1QYXRoOiBzdHJpbmcsIHNjaGVtYXRpY1BhdGg6IHN0cmluZykge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGhvc3QubGlzdERpcmVjdG9yeShzeXN0ZW1QYXRoKSkge1xuICAgICAgICBjb25zdCBzeXN0ZW1OYW1lID0gaG9zdC5qb2luKHN5c3RlbVBhdGgsIG5hbWUpO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IG5vcm1hbGl6ZShzY2hlbWF0aWNQYXRoICsgJy8nICsgbmFtZSk7XG4gICAgICAgIGlmIChob3N0LmlzRGlyZWN0b3J5KG5vcm1hbGl6ZWRQYXRoKSkge1xuICAgICAgICAgIHJlY3Vyc2Uoc3lzdGVtTmFtZSwgbm9ybWFsaXplZFBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpc3QucHVzaChbc3lzdGVtTmFtZSwgbm9ybWFsaXplZFBhdGhdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlY3Vyc2UoJycsICcvJyk7XG5cbiAgICByZXR1cm4gbGlzdDtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBGaWxlU3lzdGVtQ3JlYXRlVHJlZSBleHRlbmRzIEZpbGVTeXN0ZW1UcmVlIHtcbiAgY29uc3RydWN0b3IoaG9zdDogRmlsZVN5c3RlbVRyZWVIb3N0KSB7XG4gICAgc3VwZXIoaG9zdCk7XG5cbiAgICB0aGlzLl9yZWN1cnNpdmVGaWxlTGlzdCgpLmZvckVhY2goKFtzeXN0ZW0sIHNjaGVtYXRpY10pID0+IHtcbiAgICAgIHRoaXMuY3JlYXRlKHNjaGVtYXRpYywgaG9zdC5yZWFkRmlsZShzeXN0ZW0pKTtcbiAgICB9KTtcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==