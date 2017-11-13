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
const exception_1 = require("../exception/exception");
const action_1 = require("./action");
const entry_1 = require("./entry");
const interface_1 = require("./interface");
const recorder_1 = require("./recorder");
class VirtualDirEntry {
    constructor(_tree, _path = core_1.normalize('/')) {
        this._tree = _tree;
        this._path = _path;
        this._subdirs = new Map();
    }
    _createDir(name) {
        return new VirtualDirEntry(this._tree, core_1.join(this._path, name));
    }
    get parent() {
        return this._path == '/' ? null : this._tree.getDir(core_1.dirname(this._path));
    }
    get path() { return this._path; }
    get subdirs() {
        return this._tree.files
            .filter(path => path.startsWith(this._path) && core_1.dirname(path) != this._path)
            .map(path => core_1.basename(path));
    }
    get subfiles() {
        return this._tree.files
            .filter(path => path.startsWith(this._path) && core_1.dirname(path) == this._path)
            .map(path => core_1.basename(path));
    }
    dir(name) {
        let maybe = this._subdirs.get(name);
        if (!maybe) {
            this._subdirs.set(name, maybe = this._createDir(name));
        }
        return maybe;
    }
    file(name) {
        return this._tree.get(core_1.join(this._path, name));
    }
}
exports.VirtualDirEntry = VirtualDirEntry;
/**
 * The root class of most trees.
 */
class VirtualTree {
    constructor() {
        this._actions = new action_1.ActionList();
        this._cacheMap = new Map();
        this._root = new VirtualDirEntry(this);
        this._tree = new Map();
    }
    /**
     * Normalize the path. Made available to subclasses to overload.
     * @param path The path to normalize.
     * @returns {string} A path that is resolved and normalized.
     */
    _normalizePath(path) {
        return core_1.normalize('/' + path);
    }
    get tree() { return this._tree; }
    get staging() { return this._cacheMap; }
    /**
     * A list of file names contained by this Tree.
     * @returns {[string]} File paths.
     */
    get files() {
        return [...new Set([...this.tree.keys(), ...this._cacheMap.keys()]).values()];
    }
    get root() { return this._root; }
    get(path) {
        const normalizedPath = this._normalizePath(path);
        return this._cacheMap.get(normalizedPath) || this.tree.get(normalizedPath) || null;
    }
    has(path) {
        return this.get(path) != null;
    }
    set(entry) {
        return this._cacheMap.set(entry.path, entry);
    }
    exists(path) {
        return this.has(path);
    }
    read(path) {
        const entry = this.get(path);
        return entry ? entry.content : null;
    }
    getDir(path) {
        let dir = this.root;
        core_1.split(this._normalizePath(path)).slice(1).forEach(fragment => {
            dir = dir.dir(fragment);
        });
        return dir;
    }
    beginUpdate(path) {
        const entry = this.get(path);
        if (!entry) {
            throw new exception_1.FileDoesNotExistException(path);
        }
        return new recorder_1.UpdateRecorderBase(entry);
    }
    commitUpdate(record) {
        if (record instanceof recorder_1.UpdateRecorderBase) {
            const path = record.path;
            const entry = this.get(path);
            if (!entry) {
                throw new exception_1.ContentHasMutatedException(path);
            }
            else {
                const newContent = record.apply(entry.content);
                this.overwrite(path, newContent);
            }
        }
        else {
            throw new exception_1.InvalidUpdateRecordException();
        }
    }
    overwrite(path, content) {
        const normalizedTo = this._normalizePath(path);
        if (typeof content == 'string') {
            content = new Buffer(content, 'utf-8');
        }
        const maybeEntry = this.get(normalizedTo);
        if (maybeEntry && maybeEntry.content.equals(content)) {
            return;
        }
        this._overwrite(normalizedTo, content);
    }
    create(path, content) {
        const normalizedTo = this._normalizePath(path);
        if (typeof content == 'string') {
            content = new Buffer(content);
        }
        this._create(normalizedTo, content);
    }
    rename(path, to) {
        const normalizedPath = this._normalizePath(path);
        const normalizedTo = this._normalizePath(to);
        if (normalizedPath === normalizedTo) {
            // Nothing to do.
            return;
        }
        this._rename(normalizedPath, normalizedTo);
    }
    delete(path) {
        this._delete(this._normalizePath(path));
    }
    _overwrite(path, content, action) {
        if (!this.has(path)) {
            throw new exception_1.FileDoesNotExistException(path);
        }
        // Update the action buffer.
        if (action) {
            this._actions.push(action);
        }
        else {
            this._actions.overwrite(path, content);
        }
        this.set(new entry_1.SimpleFileEntry(path, content));
    }
    _create(path, content, action) {
        if (this._cacheMap.has(path)) {
            throw new exception_1.FileAlreadyExistException(path);
        }
        if (action) {
            this._actions.push(action);
        }
        else {
            this._actions.create(path, content);
        }
        this.set(new entry_1.SimpleFileEntry(path, content));
    }
    _rename(path, to, action, force = false) {
        const entry = this.get(path);
        if (!entry) {
            throw new exception_1.FileDoesNotExistException(path);
        }
        if (this._cacheMap.has(to) && !force) {
            throw new exception_1.FileAlreadyExistException(to);
        }
        if (action) {
            this._actions.push(action);
        }
        else {
            this._actions.rename(path, to);
        }
        this.set(new entry_1.SimpleFileEntry(to, entry.content));
        this._cacheMap.delete(path);
    }
    _delete(path, action) {
        if (!this.has(path)) {
            throw new exception_1.FileDoesNotExistException(path);
        }
        if (action) {
            this._actions.push(action);
        }
        else {
            this._actions.delete(path);
        }
        this._cacheMap.delete(path);
    }
    apply(action, strategy) {
        if (this._actions.has(action)) {
            return;
        }
        switch (action.kind) {
            case 'o':
                // Update the action buffer.
                this._overwrite(action.path, action.content, action);
                break;
            case 'c':
                if (this._cacheMap.has(action.path)) {
                    switch (strategy) {
                        case interface_1.MergeStrategy.Error: throw new exception_1.MergeConflictException(action.path);
                        case interface_1.MergeStrategy.Overwrite:
                            this._overwrite(action.path, action.content, action);
                            break;
                    }
                }
                else {
                    this._create(action.path, action.content, action);
                }
                break;
            case 'r':
                const force = (strategy & interface_1.MergeStrategy.AllowOverwriteConflict) != 0;
                this._rename(action.path, action.to, action, force);
                break;
            case 'd':
                this._delete(action.path, action);
                break;
            default: throw new action_1.UnknownActionException(action);
        }
    }
    // Returns an ordered list of Action to get this host.
    get actions() {
        return [...this._actions];
    }
    /**
     * Allow subclasses to copy to a tree their own properties.
     * @return {Tree}
     * @private
     */
    _copyTo(tree) {
        tree._tree = new Map(this.tree);
        this._actions.forEach(action => tree._actions.push(action));
        [...this._cacheMap.entries()].forEach(([path, entry]) => {
            tree._cacheMap.set(path, entry);
        });
    }
    branch() {
        const newTree = new VirtualTree();
        this._copyTo(newTree);
        return newTree;
    }
    // Creates a new host from 2 hosts.
    merge(other, strategy = interface_1.MergeStrategy.Default) {
        other.actions.forEach(action => this.apply(action, strategy));
    }
    optimize() {
        // This destroys the history. Hope you know what you're doing.
        this._actions.optimize();
    }
    static branch(tree) {
        return tree.branch();
    }
    static merge(tree, other, strategy = interface_1.MergeStrategy.Default) {
        const newTree = tree.branch();
        newTree.merge(other, strategy);
        return newTree;
    }
    static optimize(tree) {
        const newTree = tree.branch();
        newTree.optimize();
        return newTree;
    }
}
exports.VirtualTree = VirtualTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvaGFuc2wvU291cmNlcy9oYW5zbC9kZXZraXQvIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3NyYy90cmVlL3ZpcnR1YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FROEI7QUFDOUIsc0RBTWdDO0FBQ2hDLHFDQUFzRTtBQUN0RSxtQ0FBMEM7QUFDMUMsMkNBQXVGO0FBQ3ZGLHlDQUFnRDtBQUdoRDtJQUdFLFlBQXNCLEtBQWtCLEVBQVksUUFBYyxnQkFBUyxDQUFDLEdBQUcsQ0FBQztRQUExRCxVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQVksVUFBSyxHQUFMLEtBQUssQ0FBdUI7UUFGdEUsYUFBUSxHQUFHLElBQUksR0FBRyxFQUEwQixDQUFDO0lBRTRCLENBQUM7SUFFMUUsVUFBVSxDQUFDLElBQWtCO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFdBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFDRCxJQUFJLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakMsSUFBSSxPQUFPO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSzthQUNYLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksY0FBTyxD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OUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFVO1FBQ3RCLE1BQU0sQ0FBRSxJQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQVUsRUFBRSxLQUFXLEVBQUUsV0FBMEIseUJBQWEsQ0FBQyxPQUFPO1FBQ25GLE1BQU0sT0FBTyxHQUFJLElBQW9CLENBQUMsTUFBTSxFQUFpQixDQUFDO1FBQzlELE9BQU8sQ0FBQyxLQUFLLENBQUUsS0FBcUIsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQVU7UUFDeEIsTUFBTSxPQUFPLEdBQUksSUFBb0IsQ0FBQyxNQUFNLEVBQWlCLENBQUM7UUFDOUQsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRW5CLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBaFFELGtDQWdRQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIFBhdGgsXG4gIFBhdGhGcmFnbWVudCxcbiAgYmFzZW5hbWUsXG4gIGRpcm5hbWUsXG4gIGpvaW4sXG4gIG5vcm1hbGl6ZSxcbiAgc3BsaXQsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7XG4gIENvbnRlbnRIYXNNdXRhdGVkRXhjZXB0aW9uLFxuICBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uLFxuICBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uLFxuICBJbnZhbGlkVXBkYXRlUmVjb3JkRXhjZXB0aW9uLFxuICBNZXJnZUNvbmZsaWN0RXhjZXB0aW9uLFxufSBmcm9tICcuLi9leGNlcHRpb24vZXhjZXB0aW9uJztcbmltcG9ydCB7IEFjdGlvbiwgQWN0aW9uTGlzdCwgVW5rbm93bkFjdGlvbkV4Y2VwdGlvbiB9IGZyb20gJy4vYWN0aW9uJztcbmltcG9ydCB7IFNpbXBsZUZpbGVFbnRyeSB9IGZyb20gJy4vZW50cnknO1xuaW1wb3J0IHsgRGlyRW50cnksIEZpbGVFbnRyeSwgTWVyZ2VTdHJhdGVneSwgVHJlZSwgVXBkYXRlUmVjb3JkZXIgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBVcGRhdGVSZWNvcmRlckJhc2UgfSBmcm9tICcuL3JlY29yZGVyJztcblxuXG5leHBvcnQgY2xhc3MgVmlydHVhbERpckVudHJ5IGltcGxlbWVudHMgRGlyRW50cnkge1xuICBwcm90ZWN0ZWQgX3N1YmRpcnMgPSBuZXcgTWFwPFBhdGhGcmFnbWVudCwgRGlyRW50cnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF90cmVlOiBWaXJ0dWFsVHJlZSwgcHJvdGVjdGVkIF9wYXRoOiBQYXRoID0gbm9ybWFsaXplKCcvJykpIHt9XG5cbiAgcHJvdGVjdGVkIF9jcmVhdGVEaXIobmFtZTogUGF0aEZyYWdtZW50KTogRGlyRW50cnkge1xuICAgIHJldHVybiBuZXcgVmlydHVhbERpckVudHJ5KHRoaXMuX3RyZWUsIGpvaW4odGhpcy5fcGF0aCwgbmFtZSkpO1xuICB9XG5cbiAgZ2V0IHBhcmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGF0aCA9PSAnLycgPyBudWxsIDogdGhpcy5fdHJlZS5nZXREaXIoZGlybmFtZSh0aGlzLl9wYXRoKSk7XG4gIH1cbiAgZ2V0IHBhdGgoKSB7IHJldHVybiB0aGlzLl9wYXRoOyB9XG4gIGdldCBzdWJkaXJzKCkge1xuICAgIHJldHVybiB0aGlzLl90cmVlLmZpbGVzXG4gICAgICAgICAgICAgICAuZmlsdGVyKHBhdGggPT4gcGF0aC5zdGFydHNXaXRoKHRoaXMuX3BhdGgpICYmIGRpcm5hbWUocGF0aCkgIT0gdGhpcy5fcGF0aClcbiAgICAgICAgICAgICAgIC5tYXAocGF0aCA9PiBiYXNlbmFtZShwYXRoKSk7XG4gIH1cbiAgZ2V0IHN1YmZpbGVzKCkge1xuICAgIHJldHVybiB0aGlzLl90cmVlLmZpbGVzXG4gICAgICAgICAgICAgICAuZmlsdGVyKHBhdGggPT4gcGF0aC5zdGFydHNXaXRoKHRoaXMuX3BhdGgpICYmIGRpcm5hbWUocGF0aCkgPT0gdGhpcy5fcGF0aClcbiAgICAgICAgICAgICAgIC5tYXAocGF0aCA9PiBiYXNlbmFtZShwYXRoKSk7XG4gIH1cblxuICBkaXIobmFtZTogUGF0aEZyYWdtZW50KSB7XG4gICAgbGV0IG1heWJlID0gdGhpcy5fc3ViZGlycy5nZXQobmFtZSk7XG4gICAgaWYgKCFtYXliZSkge1xuICAgICAgdGhpcy5fc3ViZGlycy5zZXQobmFtZSwgbWF5YmUgPSB0aGlzLl9jcmVhdGVEaXIobmFtZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXliZTtcbiAgfVxuICBmaWxlKG5hbWU6IFBhdGhGcmFnbWVudCkge1xuICAgIHJldHVybiB0aGlzLl90cmVlLmdldChqb2luKHRoaXMuX3BhdGgsIG5hbWUpKTtcbiAgfVxufVxuXG5cbi8qKlxuICogVGhlIHJvb3QgY2xhc3Mgb2YgbW9zdCB0cmVlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFZpcnR1YWxUcmVlIGltcGxlbWVudHMgVHJlZSB7XG4gIHByb3RlY3RlZCBfYWN0aW9ucyA9IG5ldyBBY3Rpb25MaXN0KCk7XG4gIHByb3RlY3RlZCBfY2FjaGVNYXAgPSBuZXcgTWFwPFBhdGgsIEZpbGVFbnRyeT4oKTtcbiAgcHJvdGVjdGVkIF9yb290ID0gbmV3IFZpcnR1YWxEaXJFbnRyeSh0aGlzKTtcbiAgcHJvdGVjdGVkIF90cmVlID0gbmV3IE1hcDxQYXRoLCBGaWxlRW50cnk+KCk7XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSB0aGUgcGF0aC4gTWFkZSBhdmFpbGFibGUgdG8gc3ViY2xhc3NlcyB0byBvdmVybG9hZC5cbiAgICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gbm9ybWFsaXplLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIHBhdGggdGhhdCBpcyByZXNvbHZlZCBhbmQgbm9ybWFsaXplZC5cbiAgICovXG4gIHByb3RlY3RlZCBfbm9ybWFsaXplUGF0aChwYXRoOiBzdHJpbmcpOiBQYXRoIHtcbiAgICByZXR1cm4gbm9ybWFsaXplKCcvJyArIHBhdGgpO1xuICB9XG4gIHByb3RlY3RlZCBnZXQgdHJlZSgpOiBSZWFkb25seU1hcDxQYXRoLCBGaWxlRW50cnk+IHsgcmV0dXJuIHRoaXMuX3RyZWU7IH1cbiAgZ2V0IHN0YWdpbmcoKTogUmVhZG9ubHlNYXA8UGF0aCwgRmlsZUVudHJ5PiB7IHJldHVybiB0aGlzLl9jYWNoZU1hcDsgfVxuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgZmlsZSBuYW1lcyBjb250YWluZWQgYnkgdGhpcyBUcmVlLlxuICAgKiBAcmV0dXJucyB7W3N0cmluZ119IEZpbGUgcGF0aHMuXG4gICAqL1xuICBnZXQgZmlsZXMoKTogUGF0aFtdIHtcbiAgICByZXR1cm4gWy4uLm5ldyBTZXQ8UGF0aD4oWy4uLnRoaXMudHJlZS5rZXlzKCksIC4uLnRoaXMuX2NhY2hlTWFwLmtleXMoKV0pLnZhbHVlcygpXTtcbiAgfVxuXG4gIGdldCByb290KCk6IERpckVudHJ5IHsgcmV0dXJuIHRoaXMuX3Jvb3Q7IH1cblxuICBnZXQocGF0aDogc3RyaW5nKTogRmlsZUVudHJ5IHwgbnVsbCB7XG4gICAgY29uc3Qgbm9ybWFsaXplZFBhdGggPSB0aGlzLl9ub3JtYWxpemVQYXRoKHBhdGgpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlTWFwLmdldChub3JtYWxpemVkUGF0aCkgfHwgdGhpcy50cmVlLmdldChub3JtYWxpemVkUGF0aCkgfHwgbnVsbDtcbiAgfVxuICBoYXMocGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHBhdGgpICE9IG51bGw7XG4gIH1cbiAgc2V0KGVudHJ5OiBGaWxlRW50cnkpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVNYXAuc2V0KGVudHJ5LnBhdGgsIGVudHJ5KTtcbiAgfVxuXG4gIGV4aXN0cyhwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oYXMocGF0aCk7XG4gIH1cblxuICByZWFkKHBhdGg6IHN0cmluZyk6IEJ1ZmZlciB8IG51bGwge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXQocGF0aCk7XG5cbiAgICByZXR1cm4gZW50cnkgPyBlbnRyeS5jb250ZW50IDogbnVsbDtcbiAgfVxuXG4gIGdldERpcihwYXRoOiBzdHJpbmcpOiBEaXJFbnRyeSB7XG4gICAgbGV0IGRpcjogRGlyRW50cnkgPSB0aGlzLnJvb3Q7XG4gICAgc3BsaXQodGhpcy5fbm9ybWFsaXplUGF0aChwYXRoKSkuc2xpY2UoMSkuZm9yRWFjaChmcmFnbWVudCA9PiB7XG4gICAgICBkaXIgPSBkaXIuZGlyKGZyYWdtZW50KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkaXI7XG4gIH1cblxuICBiZWdpblVwZGF0ZShwYXRoOiBzdHJpbmcpOiBVcGRhdGVSZWNvcmRlciB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldChwYXRoKTtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbihwYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVwZGF0ZVJlY29yZGVyQmFzZShlbnRyeSk7XG4gIH1cblxuICBjb21taXRVcGRhdGUocmVjb3JkOiBVcGRhdGVSZWNvcmRlcikge1xuICAgIGlmIChyZWNvcmQgaW5zdGFuY2VvZiBVcGRhdGVSZWNvcmRlckJhc2UpIHtcbiAgICAgIGNvbnN0IHBhdGggPSByZWNvcmQucGF0aDtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXQocGF0aCk7XG4gICAgICBpZiAoIWVudHJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBDb250ZW50SGFzTXV0YXRlZEV4Y2VwdGlvbihwYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSByZWNvcmQuYXBwbHkoZW50cnkuY29udGVudCk7XG4gICAgICAgIHRoaXMub3ZlcndyaXRlKHBhdGgsIG5ld0NvbnRlbnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFVwZGF0ZVJlY29yZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJ3cml0ZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IEJ1ZmZlciB8IHN0cmluZykge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRUbyA9IHRoaXMuX25vcm1hbGl6ZVBhdGgocGF0aCk7XG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gbmV3IEJ1ZmZlcihjb250ZW50LCAndXRmLTgnKTtcbiAgICB9XG4gICAgY29uc3QgbWF5YmVFbnRyeSA9IHRoaXMuZ2V0KG5vcm1hbGl6ZWRUbyk7XG4gICAgaWYgKG1heWJlRW50cnkgJiYgbWF5YmVFbnRyeS5jb250ZW50LmVxdWFscyhjb250ZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vdmVyd3JpdGUobm9ybWFsaXplZFRvLCBjb250ZW50KTtcbiAgfVxuICBjcmVhdGUocGF0aDogc3RyaW5nLCBjb250ZW50OiBCdWZmZXIgfCBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBub3JtYWxpemVkVG8gPSB0aGlzLl9ub3JtYWxpemVQYXRoKHBhdGgpO1xuICAgIGlmICh0eXBlb2YgY29udGVudCA9PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IG5ldyBCdWZmZXIoY29udGVudCk7XG4gICAgfVxuICAgIHRoaXMuX2NyZWF0ZShub3JtYWxpemVkVG8sIGNvbnRlbnQpO1xuICB9XG4gIHJlbmFtZShwYXRoOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IHRoaXMuX25vcm1hbGl6ZVBhdGgocGF0aCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFRvID0gdGhpcy5fbm9ybWFsaXplUGF0aCh0byk7XG4gICAgaWYgKG5vcm1hbGl6ZWRQYXRoID09PSBub3JtYWxpemVkVG8pIHtcbiAgICAgIC8vIE5vdGhpbmcgdG8gZG8uXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JlbmFtZShub3JtYWxpemVkUGF0aCwgbm9ybWFsaXplZFRvKTtcbiAgfVxuXG4gIGRlbGV0ZShwYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9kZWxldGUodGhpcy5fbm9ybWFsaXplUGF0aChwYXRoKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX292ZXJ3cml0ZShwYXRoOiBQYXRoLCBjb250ZW50OiBCdWZmZXIsIGFjdGlvbj86IEFjdGlvbikge1xuICAgIGlmICghdGhpcy5oYXMocGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKHBhdGgpO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgdGhlIGFjdGlvbiBidWZmZXIuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgdGhpcy5fYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FjdGlvbnMub3ZlcndyaXRlKHBhdGgsIGNvbnRlbnQpO1xuICAgIH1cbiAgICB0aGlzLnNldChuZXcgU2ltcGxlRmlsZUVudHJ5KHBhdGgsIGNvbnRlbnQpKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2NyZWF0ZShwYXRoOiBQYXRoLCBjb250ZW50OiBCdWZmZXIsIGFjdGlvbj86IEFjdGlvbikge1xuICAgIGlmICh0aGlzLl9jYWNoZU1hcC5oYXMocGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uKHBhdGgpO1xuICAgIH1cblxuICAgIGlmIChhY3Rpb24pIHtcbiAgICAgIHRoaXMuX2FjdGlvbnMucHVzaChhY3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hY3Rpb25zLmNyZWF0ZShwYXRoLCBjb250ZW50KTtcbiAgICB9XG4gICAgdGhpcy5zZXQobmV3IFNpbXBsZUZpbGVFbnRyeShwYXRoLCBjb250ZW50IGFzIEJ1ZmZlcikpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVuYW1lKHBhdGg6IFBhdGgsIHRvOiBQYXRoLCBhY3Rpb24/OiBBY3Rpb24sIGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0KHBhdGgpO1xuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHRocm93IG5ldyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKHBhdGgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY2FjaGVNYXAuaGFzKHRvKSAmJiAhZm9yY2UpIHtcbiAgICAgIHRocm93IG5ldyBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uKHRvKTtcbiAgICB9XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICB0aGlzLl9hY3Rpb25zLnB1c2goYWN0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWN0aW9ucy5yZW5hbWUocGF0aCwgdG8pO1xuICAgIH1cblxuICAgIHRoaXMuc2V0KG5ldyBTaW1wbGVGaWxlRW50cnkodG8sIGVudHJ5LmNvbnRlbnQpKTtcbiAgICB0aGlzLl9jYWNoZU1hcC5kZWxldGUocGF0aCk7XG4gIH1cbiAgcHJvdGVjdGVkIF9kZWxldGUocGF0aDogUGF0aCwgYWN0aW9uPzogQWN0aW9uKSB7XG4gICAgaWYgKCF0aGlzLmhhcyhwYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24ocGF0aCk7XG4gICAgfVxuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgdGhpcy5fYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FjdGlvbnMuZGVsZXRlKHBhdGgpO1xuICAgIH1cbiAgICB0aGlzLl9jYWNoZU1hcC5kZWxldGUocGF0aCk7XG4gIH1cblxuXG4gIGFwcGx5KGFjdGlvbjogQWN0aW9uLCBzdHJhdGVneTogTWVyZ2VTdHJhdGVneSkge1xuICAgIGlmICh0aGlzLl9hY3Rpb25zLmhhcyhhY3Rpb24pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAoYWN0aW9uLmtpbmQpIHtcbiAgICAgIGNhc2UgJ28nOlxuICAgICAgICAvLyBVcGRhdGUgdGhlIGFjdGlvbiBidWZmZXIuXG4gICAgICAgIHRoaXMuX292ZXJ3cml0ZShhY3Rpb24ucGF0aCwgYWN0aW9uLmNvbnRlbnQsIGFjdGlvbik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjJzpcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlTWFwLmhhcyhhY3Rpb24ucGF0aCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKHN0cmF0ZWd5KSB7XG4gICAgICAgICAgICBjYXNlIE1lcmdlU3RyYXRlZ3kuRXJyb3I6IHRocm93IG5ldyBNZXJnZUNvbmZsaWN0RXhjZXB0aW9uKGFjdGlvbi5wYXRoKTtcbiAgICAgICAgICAgIGNhc2UgTWVyZ2VTdHJhdGVneS5PdmVyd3JpdGU6XG4gICAgICAgICAgICAgIHRoaXMuX292ZXJ3cml0ZShhY3Rpb24ucGF0aCwgYWN0aW9uLmNvbnRlbnQsIGFjdGlvbik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9jcmVhdGUoYWN0aW9uLnBhdGgsIGFjdGlvbi5jb250ZW50LCBhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdyJzpcbiAgICAgICAgY29uc3QgZm9yY2UgPSAoc3RyYXRlZ3kgJiBNZXJnZVN0cmF0ZWd5LkFsbG93T3ZlcndyaXRlQ29uZmxpY3QpICE9IDA7XG4gICAgICAgIHRoaXMuX3JlbmFtZShhY3Rpb24ucGF0aCwgYWN0aW9uLnRvLCBhY3Rpb24sIGZvcmNlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2QnOiB0aGlzLl9kZWxldGUoYWN0aW9uLnBhdGgsIGFjdGlvbik7IGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgVW5rbm93bkFjdGlvbkV4Y2VwdGlvbihhY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgYW4gb3JkZXJlZCBsaXN0IG9mIEFjdGlvbiB0byBnZXQgdGhpcyBob3N0LlxuICBnZXQgYWN0aW9ucygpOiBBY3Rpb25bXSB7XG4gICAgcmV0dXJuIFsuLi50aGlzLl9hY3Rpb25zXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvdyBzdWJjbGFzc2VzIHRvIGNvcHkgdG8gYSB0cmVlIHRoZWlyIG93biBwcm9wZXJ0aWVzLlxuICAgKiBAcmV0dXJuIHtUcmVlfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9jb3B5VG88VCBleHRlbmRzIFZpcnR1YWxUcmVlPih0cmVlOiBUKTogdm9pZCB7XG4gICAgdHJlZS5fdHJlZSA9IG5ldyBNYXAodGhpcy50cmVlKTtcbiAgICB0aGlzLl9hY3Rpb25zLmZvckVhY2goYWN0aW9uID0+IHRyZWUuX2FjdGlvbnMucHVzaChhY3Rpb24pKTtcbiAgICBbLi4udGhpcy5fY2FjaGVNYXAuZW50cmllcygpXS5mb3JFYWNoKChbcGF0aCwgZW50cnldKSA9PiB7XG4gICAgICB0cmVlLl9jYWNoZU1hcC5zZXQocGF0aCwgZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgYnJhbmNoKCk6IFRyZWUge1xuICAgIGNvbnN0IG5ld1RyZWUgPSBuZXcgVmlydHVhbFRyZWUoKTtcbiAgICB0aGlzLl9jb3B5VG8obmV3VHJlZSk7XG5cbiAgICByZXR1cm4gbmV3VHJlZTtcbiAgfVxuXG4gIC8vIENyZWF0ZXMgYSBuZXcgaG9zdCBmcm9tIDIgaG9zdHMuXG4gIG1lcmdlKG90aGVyOiBUcmVlLCBzdHJhdGVneTogTWVyZ2VTdHJhdGVneSA9IE1lcmdlU3RyYXRlZ3kuRGVmYXVsdCkge1xuICAgIG90aGVyLmFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4gdGhpcy5hcHBseShhY3Rpb24sIHN0cmF0ZWd5KSk7XG4gIH1cblxuICBvcHRpbWl6ZSgpIHtcbiAgICAvLyBUaGlzIGRlc3Ryb3lzIHRoZSBoaXN0b3J5LiBIb3BlIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nLlxuICAgIHRoaXMuX2FjdGlvbnMub3B0aW1pemUoKTtcbiAgfVxuXG4gIHN0YXRpYyBicmFuY2godHJlZTogVHJlZSkge1xuICAgIHJldHVybiAodHJlZSBhcyBWaXJ0dWFsVHJlZSkuYnJhbmNoKCk7XG4gIH1cblxuICBzdGF0aWMgbWVyZ2UodHJlZTogVHJlZSwgb3RoZXI6IFRyZWUsIHN0cmF0ZWd5OiBNZXJnZVN0cmF0ZWd5ID0gTWVyZ2VTdHJhdGVneS5EZWZhdWx0KTogVHJlZSB7XG4gICAgY29uc3QgbmV3VHJlZSA9ICh0cmVlIGFzIFZpcnR1YWxUcmVlKS5icmFuY2goKSBhcyBWaXJ0dWFsVHJlZTtcbiAgICBuZXdUcmVlLm1lcmdlKChvdGhlciBhcyBWaXJ0dWFsVHJlZSksIHN0cmF0ZWd5KTtcblxuICAgIHJldHVybiBuZXdUcmVlO1xuICB9XG5cbiAgc3RhdGljIG9wdGltaXplKHRyZWU6IFRyZWUpIHtcbiAgICBjb25zdCBuZXdUcmVlID0gKHRyZWUgYXMgVmlydHVhbFRyZWUpLmJyYW5jaCgpIGFzIFZpcnR1YWxUcmVlO1xuICAgIG5ld1RyZWUub3B0aW1pemUoKTtcblxuICAgIHJldHVybiBuZXdUcmVlO1xuICB9XG59XG4iXX0=