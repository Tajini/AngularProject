"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MergeStrategy;
(function (MergeStrategy) {
    MergeStrategy[MergeStrategy["AllowOverwriteConflict"] = 2] = "AllowOverwriteConflict";
    MergeStrategy[MergeStrategy["AllowCreationConflict"] = 4] = "AllowCreationConflict";
    MergeStrategy[MergeStrategy["AllowDeleteConflict"] = 8] = "AllowDeleteConflict";
    // Uses the default strategy.
    MergeStrategy[MergeStrategy["Default"] = 0] = "Default";
    // Error out if 2 files have the same path. It is useful to have a different value than
    // Default in this case as the tooling Default might differ.
    MergeStrategy[MergeStrategy["Error"] = 1] = "Error";
    // Only content conflicts are overwritten.
    MergeStrategy[MergeStrategy["ContentOnly"] = 2] = "ContentOnly";
    // Overwrite everything with the latest change.
    MergeStrategy[MergeStrategy["Overwrite"] = 14] = "Overwrite";
})(MergeStrategy = exports.MergeStrategy || (exports.MergeStrategy = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9oYW5zbC9Tb3VyY2VzL2hhbnNsL2RldmtpdC8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL3RyZWUvaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBV0EsSUFBWSxhQW1CWDtBQW5CRCxXQUFZLGFBQWE7SUFDdkIscUZBQWtDLENBQUE7SUFDbEMsbUZBQWtDLENBQUE7SUFDbEMsK0VBQWtDLENBQUE7SUFFbEMsNkJBQTZCO0lBQzdCLHVEQUE2QixDQUFBO0lBRTdCLHVGQUF1RjtJQUN2Riw0REFBNEQ7SUFDNUQsbURBQWtDLENBQUE7SUFFbEMsMENBQTBDO0lBQzFDLCtEQUFnRSxDQUFBO0lBRWhFLCtDQUErQztJQUMvQyw0REFFNkQsQ0FBQTtBQUMvRCxDQUFDLEVBbkJXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBbUJ4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IFBhdGgsIFBhdGhGcmFnbWVudCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vYWN0aW9uJztcblxuXG5leHBvcnQgZW51bSBNZXJnZVN0cmF0ZWd5IHtcbiAgQWxsb3dPdmVyd3JpdGVDb25mbGljdCAgICA9IDEgPDwgMSxcbiAgQWxsb3dDcmVhdGlvbkNvbmZsaWN0ICAgICA9IDEgPDwgMixcbiAgQWxsb3dEZWxldGVDb25mbGljdCAgICAgICA9IDEgPDwgMyxcblxuICAvLyBVc2VzIHRoZSBkZWZhdWx0IHN0cmF0ZWd5LlxuICBEZWZhdWx0ICAgICAgICAgICAgICAgICAgID0gMCxcblxuICAvLyBFcnJvciBvdXQgaWYgMiBmaWxlcyBoYXZlIHRoZSBzYW1lIHBhdGguIEl0IGlzIHVzZWZ1bCB0byBoYXZlIGEgZGlmZmVyZW50IHZhbHVlIHRoYW5cbiAgLy8gRGVmYXVsdCBpbiB0aGlzIGNhc2UgYXMgdGhlIHRvb2xpbmcgRGVmYXVsdCBtaWdodCBkaWZmZXIuXG4gIEVycm9yICAgICAgICAgICAgICAgICAgICAgPSAxIDw8IDAsXG5cbiAgLy8gT25seSBjb250ZW50IGNvbmZsaWN0cyBhcmUgb3ZlcndyaXR0ZW4uXG4gIENvbnRlbnRPbmx5ICAgICAgICAgICAgICAgPSBNZXJnZVN0cmF0ZWd5LkFsbG93T3ZlcndyaXRlQ29uZmxpY3QsXG5cbiAgLy8gT3ZlcndyaXRlIGV2ZXJ5dGhpbmcgd2l0aCB0aGUgbGF0ZXN0IGNoYW5nZS5cbiAgT3ZlcndyaXRlICAgICAgICAgICAgICAgICA9IE1lcmdlU3RyYXRlZ3kuQWxsb3dPdmVyd3JpdGVDb25mbGljdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgTWVyZ2VTdHJhdGVneS5BbGxvd0NyZWF0aW9uQ29uZmxpY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIE1lcmdlU3RyYXRlZ3kuQWxsb3dEZWxldGVDb25mbGljdCxcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVFbnRyeSB7XG4gIHJlYWRvbmx5IHBhdGg6IFBhdGg7XG4gIHJlYWRvbmx5IGNvbnRlbnQ6IEJ1ZmZlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXJFbnRyeSB7XG4gIHJlYWRvbmx5IHBhcmVudDogRGlyRW50cnkgfCBudWxsO1xuICByZWFkb25seSBwYXRoOiBQYXRoO1xuXG4gIHJlYWRvbmx5IHN1YmRpcnM6IFBhdGhGcmFnbWVudFtdO1xuICByZWFkb25seSBzdWJmaWxlczogUGF0aEZyYWdtZW50W107XG5cbiAgZGlyKG5hbWU6IFBhdGhGcmFnbWVudCk6IERpckVudHJ5O1xuICBmaWxlKG5hbWU6IFBhdGhGcmFnbWVudCk6IEZpbGVFbnRyeSB8IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVByZWRpY2F0ZTxUPiB7XG4gIChwYXRoOiBQYXRoLCBlbnRyeT86IFJlYWRvbmx5PEZpbGVFbnRyeT4gfCBudWxsKTogVDtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIFRyZWUge1xuICByZWFkb25seSByb290OiBEaXJFbnRyeTtcblxuICAvLyBSZWFkb25seS5cbiAgcmVhZG9ubHkgZmlsZXM6IHN0cmluZ1tdO1xuICBleGlzdHMocGF0aDogc3RyaW5nKTogYm9vbGVhbjtcblxuICAvLyBDb250ZW50IGFjY2Vzcy5cbiAgcmVhZChwYXRoOiBzdHJpbmcpOiBCdWZmZXIgfCBudWxsO1xuICBnZXQocGF0aDogc3RyaW5nKTogRmlsZUVudHJ5IHwgbnVsbDtcbiAgZ2V0RGlyKHBhdGg6IHN0cmluZyk6IERpckVudHJ5O1xuXG4gIC8vIENoYW5nZSBjb250ZW50IG9mIGhvc3QgZmlsZXMuXG4gIG92ZXJ3cml0ZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IEJ1ZmZlciB8IHN0cmluZyk6IHZvaWQ7XG4gIGJlZ2luVXBkYXRlKHBhdGg6IHN0cmluZyk6IFVwZGF0ZVJlY29yZGVyO1xuICBjb21taXRVcGRhdGUocmVjb3JkOiBVcGRhdGVSZWNvcmRlcik6IHZvaWQ7XG5cbiAgLy8gU3RydWN0dXJhbCBtZXRob2RzLlxuICBjcmVhdGUocGF0aDogc3RyaW5nLCBjb250ZW50OiBCdWZmZXIgfCBzdHJpbmcpOiB2b2lkO1xuICBkZWxldGUocGF0aDogc3RyaW5nKTogdm9pZDtcbiAgcmVuYW1lKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHZvaWQ7XG5cbiAgYXBwbHkoYWN0aW9uOiBBY3Rpb24sIHN0cmF0ZWd5PzogTWVyZ2VTdHJhdGVneSk6IHZvaWQ7XG4gIHJlYWRvbmx5IGFjdGlvbnM6IEFjdGlvbltdO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlUmVjb3JkZXIge1xuICAvLyBUaGVzZSBqdXN0IHJlY29yZCBjaGFuZ2VzLlxuICBpbnNlcnRMZWZ0KGluZGV4OiBudW1iZXIsIGNvbnRlbnQ6IEJ1ZmZlciB8IHN0cmluZyk6IFVwZGF0ZVJlY29yZGVyO1xuICBpbnNlcnRSaWdodChpbmRleDogbnVtYmVyLCBjb250ZW50OiBCdWZmZXIgfCBzdHJpbmcpOiBVcGRhdGVSZWNvcmRlcjtcbiAgcmVtb3ZlKGluZGV4OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogVXBkYXRlUmVjb3JkZXI7XG59XG4iXX0=