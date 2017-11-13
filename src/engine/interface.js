"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9oYW5zbC9Tb3VyY2VzL2hhbnNsL2RldmtpdC8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL2VuZ2luZS9pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IExvZ2dlckFwaSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgVXJsIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IEZpbGVFbnRyeSwgTWVyZ2VTdHJhdGVneSwgVHJlZSB9IGZyb20gJy4uL3RyZWUvaW50ZXJmYWNlJztcblxuXG4vKipcbiAqIFRoZSBkZXNjcmlwdGlvbiAobWV0YWRhdGEpIG9mIGEgY29sbGVjdGlvbi4gVGhpcyB0eXBlIGNvbnRhaW5zIGV2ZXJ5IGluZm9ybWF0aW9uIHRoZSBlbmdpbmVcbiAqIG5lZWRzIHRvIHJ1bi4gVGhlIENvbGxlY3Rpb25NZXRhZGF0YVQgdHlwZSBwYXJhbWV0ZXIgY29udGFpbnMgYWRkaXRpb25hbCBtZXRhZGF0YSB0aGF0IHlvdVxuICogd2FudCB0byBzdG9yZSB3aGlsZSByZW1haW5pbmcgdHlwZS1zYWZlLlxuICovXG5leHBvcnQgdHlwZSBDb2xsZWN0aW9uRGVzY3JpcHRpb248Q29sbGVjdGlvbk1ldGFkYXRhVCBleHRlbmRzIG9iamVjdD4gPSBDb2xsZWN0aW9uTWV0YWRhdGFUICYge1xuICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFRoZSBkZXNjcmlwdGlvbiAobWV0YWRhdGEpIG9mIGEgc2NoZW1hdGljLiBUaGlzIHR5cGUgY29udGFpbnMgZXZlcnkgaW5mb3JtYXRpb24gdGhlIGVuZ2luZVxuICogbmVlZHMgdG8gcnVuLiBUaGUgU2NoZW1hdGljTWV0YWRhdGFUIGFuZCBDb2xsZWN0aW9uTWV0YWRhdGFUIHR5cGUgcGFyYW1ldGVycyBjb250YWluIGFkZGl0aW9uYWxcbiAqIG1ldGFkYXRhIHRoYXQgeW91IHdhbnQgdG8gc3RvcmUgd2hpbGUgcmVtYWluaW5nIHR5cGUtc2FmZS5cbiAqL1xuZXhwb3J0IHR5cGUgU2NoZW1hdGljRGVzY3JpcHRpb248Q29sbGVjdGlvbk1ldGFkYXRhVCBleHRlbmRzIG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNjaGVtYXRpY01ldGFkYXRhVCBleHRlbmRzIG9iamVjdD4gPSBTY2hlbWF0aWNNZXRhZGF0YVQgJiB7XG4gIHJlYWRvbmx5IGNvbGxlY3Rpb246IENvbGxlY3Rpb25EZXNjcmlwdGlvbjxDb2xsZWN0aW9uTWV0YWRhdGFUPjtcbiAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xufTtcblxuXG4vKipcbiAqIFRoZSBIb3N0IGZvciB0aGUgRW5naW5lLiBTcGVjaWZpY2FsbHksIHRoZSBwaWVjZSBvZiB0aGUgdG9vbGluZyByZXNwb25zaWJsZSBmb3IgcmVzb2x2aW5nXG4gKiBjb2xsZWN0aW9ucyBhbmQgc2NoZW1hdGljcyBkZXNjcmlwdGlvbnMuIFRoZSBTY2hlbWF0aWNNZXRhZGF0YVQgYW5kIENvbGxlY3Rpb25NZXRhZGF0YVQgdHlwZVxuICogcGFyYW1ldGVycyBjb250YWluIGFkZGl0aW9uYWwgbWV0YWRhdGEgdGhhdCB5b3Ugd2FudCB0byBzdG9yZSB3aGlsZSByZW1haW5pbmcgdHlwZS1zYWZlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZ2luZUhvc3Q8Q29sbGVjdGlvbk1ldGFkYXRhVCBleHRlbmRzIG9iamVjdCwgU2NoZW1hdGljTWV0YWRhdGFUIGV4dGVuZHMgb2JqZWN0PiB7XG4gIGNyZWF0ZUNvbGxlY3Rpb25EZXNjcmlwdGlvbihuYW1lOiBzdHJpbmcpOiBDb2xsZWN0aW9uRGVzY3JpcHRpb248Q29sbGVjdGlvbk1ldGFkYXRhVD47XG4gIGNyZWF0ZVNjaGVtYXRpY0Rlc2NyaXB0aW9uKFxuICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbkRlc2NyaXB0aW9uPENvbGxlY3Rpb25NZXRhZGF0YVQ+KTpcbiAgICAgICAgU2NoZW1hdGljRGVzY3JpcHRpb248Q29sbGVjdGlvbk1ldGFkYXRhVCwgU2NoZW1hdGljTWV0YWRhdGFUPjtcbiAgZ2V0U2NoZW1hdGljUnVsZUZhY3Rvcnk8T3B0aW9uVCBleHRlbmRzIG9iamVjdD4oXG4gICAgICBzY2hlbWF0aWM6IFNjaGVtYXRpY0Rlc2NyaXB0aW9uPENvbGxlY3Rpb25NZXRhZGF0YVQsIFNjaGVtYXRpY01ldGFkYXRhVD4sXG4gICAgICBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uRGVzY3JpcHRpb248Q29sbGVjdGlvbk1ldGFkYXRhVD4pOiBSdWxlRmFjdG9yeTxPcHRpb25UPjtcbiAgY3JlYXRlU291cmNlRnJvbVVybChcbiAgICB1cmw6IFVybCxcbiAgICBjb250ZXh0OiBUeXBlZFNjaGVtYXRpY0NvbnRleHQ8Q29sbGVjdGlvbk1ldGFkYXRhVCwgU2NoZW1hdGljTWV0YWRhdGFUPixcbiAgKTogU291cmNlIHwgbnVsbDtcbiAgdHJhbnNmb3JtT3B0aW9uczxPcHRpb25UIGV4dGVuZHMgb2JqZWN0LCBSZXN1bHRUIGV4dGVuZHMgb2JqZWN0PihcbiAgICBzY2hlbWF0aWM6IFNjaGVtYXRpY0Rlc2NyaXB0aW9uPENvbGxlY3Rpb25NZXRhZGF0YVQsIFNjaGVtYXRpY01ldGFkYXRhVD4sXG4gICAgb3B0aW9uczogT3B0aW9uVCxcbiAgKTogUmVzdWx0VDtcblxuXG4gIHJlYWRvbmx5IGRlZmF1bHRNZXJnZVN0cmF0ZWd5PzogTWVyZ2VTdHJhdGVneTtcbn1cblxuXG4vKipcbiAqIFRoZSByb290IEVuZ2luZSBmb3IgY3JlYXRpbmcgYW5kIHJ1bm5pbmcgc2NoZW1hdGljcyBhbmQgY29sbGVjdGlvbnMuIEV2ZXJ5dGhpbmcgcmVsYXRlZCB0b1xuICogYSBzY2hlbWF0aWMgZXhlY3V0aW9uIHN0YXJ0cyBmcm9tIHRoaXMgaW50ZXJmYWNlLlxuICpcbiAqIENvbGxlY3Rpb25NZXRhZGF0YVQgaXMsIGJ5IGRlZmF1bHQsIGEgZ2VuZXJpYyBDb2xsZWN0aW9uIG1ldGFkYXRhIHR5cGUuIFRoaXMgaXMgdXNlZCB0aHJvdWdob3V0XG4gKiB0aGUgZW5naW5lIHR5cGluZ3Mgc28gdGhhdCB5b3UgY2FuIHVzZSBhIHR5cGUgdGhhdCdzIG1lcmdlZCBpbnRvIGRlc2NyaXB0aW9ucywgd2hpbGUgYmVpbmdcbiAqIHR5cGUtc2FmZS5cbiAqXG4gKiBTY2hlbWF0aWNNZXRhZGF0YVQgaXMgYSB0eXBlIHRoYXQgY29udGFpbnMgYWRkaXRpb25hbCB0eXBpbmcgZm9yIHRoZSBTY2hlbWF0aWMgRGVzY3JpcHRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5naW5lPENvbGxlY3Rpb25NZXRhZGF0YVQgZXh0ZW5kcyBvYmplY3QsIFNjaGVtYXRpY01ldGFkYXRhVCBleHRlbmRzIG9iamVjdD4ge1xuICBjcmVhdGVDb2xsZWN0aW9uKG5hbWU6IHN0cmluZyk6IENvbGxlY3Rpb248Q29sbGVjdGlvbk1ldGFkYXRhVCwgU2NoZW1hdGljTWV0YWRhdGFUPjtcbiAgY3JlYXRlQ29udGV4dChcbiAgICBzY2hlbWF0aWM6IFNjaGVtYXRpYzxDb2xsZWN0aW9uTWV0YWRhdGFULCBTY2hlbWF0aWNNZXRhZGF0YVQ+LFxuICAgIHBhcmVudD86IFBhcnRpYWw8VHlwZWRTY2hlbWF0aWNDb250ZXh0PENvbGxlY3Rpb25NZXRhZGF0YVQsIFNjaGVtYXRpY01ldGFkYXRhVD4+LFxuICApOiBUeXBlZFNjaGVtYXRpY0NvbnRleHQ8Q29sbGVjdGlvbk1ldGFkYXRhVCwgU2NoZW1hdGljTWV0YWRhdGFUPjtcbiAgY3JlYXRlU2NoZW1hdGljKFxuICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbjxDb2xsZWN0aW9uTWV0YWRhdGFULCBTY2hlbWF0aWNNZXRhZGF0YVQ+LFxuICApOiBTY2hlbWF0aWM8Q29sbGVjdGlvbk1ldGFkYXRhVCwgU2NoZW1hdGljTWV0YWRhdGFUPjtcbiAgY3JlYXRlU291cmNlRnJvbVVybChcbiAgICB1cmw6IFVybCxcbiAgICBjb250ZXh0OiBUeXBlZFNjaGVtYXRpY0NvbnRleHQ8Q29sbGVjdGlvbk1ldGFkYXRhVCwgU2NoZW1hdGljTWV0YWRhdGFUPixcbiAgKTogU291cmNlO1xuICB0cmFuc2Zvcm1PcHRpb25zPE9wdGlvblQgZXh0ZW5kcyBvYmplY3QsIFJlc3VsdFQgZXh0ZW5kcyBvYmplY3Q+KFxuICAgICAgc2NoZW1hdGljOiBTY2hlbWF0aWM8Q29sbGVjdGlvbk1ldGFkYXRhVCwgU2NoZW1hdGljTWV0YWRhdGFUPixcbiAgICAgIG9wdGlvbnM6IE9wdGlvblQsXG4gICk6IFJlc3VsdFQ7XG5cbiAgcmVhZG9ubHkgZGVmYXVsdE1lcmdlU3RyYXRlZ3k6IE1lcmdlU3RyYXRlZ3k7XG59XG5cblxuLyoqXG4gKiBBIENvbGxlY3Rpb24gYXMgY3JlYXRlZCBieSB0aGUgRW5naW5lLiBUaGlzIHNob3VsZCBiZSB1c2VkIGJ5IHRoZSB0b29sIHRvIGNyZWF0ZSBzY2hlbWF0aWNzLFxuICogb3IgYnkgcnVsZXMgdG8gY3JlYXRlIG90aGVyIHNjaGVtYXRpY3MgYXMgd2VsbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb2xsZWN0aW9uPENvbGxlY3Rpb25NZXRhZGF0YVQgZXh0ZW5kcyBvYmplY3QsIFNjaGVtYXRpY01ldGFkYXRhVCBleHRlbmRzIG9iamVjdD4ge1xuICByZWFkb25seSBkZXNjcmlwdGlvbjogQ29sbGVjdGlvbkRlc2NyaXB0aW9uPENvbGxlY3Rpb25NZXRhZGF0YVQ+O1xuXG4gIGNyZWF0ZVNjaGVtYXRpYyhuYW1lOiBzdHJpbmcpOiBTY2hlbWF0aWM8Q29sbGVjdGlvbk1ldGFkYXRhVCwgU2NoZW1hdGljTWV0YWRhdGFUPjtcbn1cblxuXG4vKipcbiAqIEEgU2NoZW1hdGljIGFzIGNyZWF0ZWQgYnkgdGhlIEVuZ2luZS4gVGhpcyBzaG91bGQgYmUgdXNlZCBieSB0aGUgdG9vbCB0byBleGVjdXRlIHRoZSBtYWluXG4gKiBzY2hlbWF0aWNzLCBvciBieSBydWxlcyB0byBleGVjdXRlIG90aGVyIHNjaGVtYXRpY3MgYXMgd2VsbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTY2hlbWF0aWM8Q29sbGVjdGlvbk1ldGFkYXRhVCBleHRlbmRzIG9iamVjdCwgU2NoZW1hdGljTWV0YWRhdGFUIGV4dGVuZHMgb2JqZWN0PiB7XG4gIHJlYWRvbmx5IGRlc2NyaXB0aW9uOiBTY2hlbWF0aWNEZXNjcmlwdGlvbjxDb2xsZWN0aW9uTWV0YWRhdGFULCBTY2hlbWF0aWNNZXRhZGF0YVQ+O1xuICByZWFkb25seSBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uPENvbGxlY3Rpb25NZXRhZGF0YVQsIFNjaGVtYXRpY01ldGFkYXRhVD47XG5cbiAgY2FsbDxPcHRpb25UIGV4dGVuZHMgb2JqZWN0PihcbiAgICBvcHRpb25zOiBPcHRpb25ULFxuICAgIGhvc3Q6IE9ic2VydmFibGU8VHJlZT4sXG4gICAgcGFyZW50Q29udGV4dD86IFBhcnRpYWw8VHlwZWRTY2hlbWF0aWNDb250ZXh0PENvbGxlY3Rpb25NZXRhZGF0YVQsIFNjaGVtYXRpY01ldGFkYXRhVD4+LFxuICApOiBPYnNlcnZhYmxlPFRyZWU+O1xufVxuXG5cbi8qKlxuICogQSBTY2hlbWF0aWNDb250ZXh0LiBDb250YWlucyBpbmZvcm1hdGlvbiBuZWNlc3NhcnkgZm9yIFNjaGVtYXRpY3MgdG8gZXhlY3V0ZSBzb21lIHJ1bGVzLCBmb3JcbiAqIGV4YW1wbGUgd2hlbiB1c2luZyBhbm90aGVyIHNjaGVtYXRpY3MsIGFzIHdlIG5lZWQgdGhlIGVuZ2luZSBhbmQgY29sbGVjdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUeXBlZFNjaGVtYXRpY0NvbnRleHQ8Q29sbGVjdGlvbk1ldGFkYXRhVCBleHRlbmRzIG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNjaGVtYXRpY01ldGFkYXRhVCBleHRlbmRzIG9iamVjdD4ge1xuICByZWFkb25seSBkZWJ1ZzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgZW5naW5lOiBFbmdpbmU8Q29sbGVjdGlvbk1ldGFkYXRhVCwgU2NoZW1hdGljTWV0YWRhdGFUPjtcbiAgcmVhZG9ubHkgbG9nZ2VyOiBMb2dnZXJBcGk7XG4gIHJlYWRvbmx5IHNjaGVtYXRpYzogU2NoZW1hdGljPENvbGxlY3Rpb25NZXRhZGF0YVQsIFNjaGVtYXRpY01ldGFkYXRhVD47XG4gIHJlYWRvbmx5IHN0cmF0ZWd5OiBNZXJnZVN0cmF0ZWd5O1xufVxuXG5cbi8qKlxuICogVGhpcyBpcyB1c2VkIGJ5IHRoZSBTY2hlbWF0aWNzIGltcGxlbWVudGF0aW9ucyBpbiBvcmRlciB0byBhdm9pZCBuZWVkaW5nIHRvIGhhdmUgdHlwaW5nIGZyb21cbiAqIHRoZSB0b29saW5nLiBTY2hlbWF0aWNzIGFyZSBub3Qgc3BlY2lmaWMgdG8gYSB0b29sLlxuICovXG5leHBvcnQgdHlwZSBTY2hlbWF0aWNDb250ZXh0ID0gVHlwZWRTY2hlbWF0aWNDb250ZXh0PHt9LCB7fT47XG5cblxuLyoqXG4gKiBBIHJ1bGUgZmFjdG9yeSwgd2hpY2ggaXMgbm9ybWFsbHkgdGhlIHdheSBzY2hlbWF0aWNzIGFyZSBpbXBsZW1lbnRlZC4gUmV0dXJuZWQgYnkgdGhlIHRvb2xpbmdcbiAqIGFmdGVyIGxvYWRpbmcgYSBzY2hlbWF0aWMgZGVzY3JpcHRpb24uXG4gKi9cbmV4cG9ydCB0eXBlIFJ1bGVGYWN0b3J5PFQgZXh0ZW5kcyBvYmplY3Q+ID0gKG9wdGlvbnM6IFQpID0+IFJ1bGU7XG5cblxuLyoqXG4gKiBBIEZpbGVPcGVyYXRvciBhcHBsaWVzIGNoYW5nZXMgc3luY2hyb25vdXNseSB0byBhIEZpbGVFbnRyeS4gQW4gYXN5bmMgb3BlcmF0b3IgcmV0dXJuc1xuICogYXN5bmNocm9ub3VzbHkuIFdlIHNlcGFyYXRlIHRoZW0gc28gdGhhdCB0aGUgdHlwZSBzeXN0ZW0gY2FuIGNhdGNoIGVhcmx5IGVycm9ycy5cbiAqL1xuZXhwb3J0IHR5cGUgRmlsZU9wZXJhdG9yID0gKGVudHJ5OiBGaWxlRW50cnkpID0+IEZpbGVFbnRyeSB8IG51bGw7XG5leHBvcnQgdHlwZSBBc3luY0ZpbGVPcGVyYXRvciA9ICh0cmVlOiBGaWxlRW50cnkpID0+IE9ic2VydmFibGU8RmlsZUVudHJ5IHwgbnVsbD47XG5cblxuLyoqXG4gKiBBIHNvdXJjZSBpcyBhIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEgVHJlZSBmcm9tIGEgc3BlY2lmaWMgY29udGV4dC4gQSBydWxlIHRyYW5zZm9ybXMgYSB0cmVlXG4gKiBpbnRvIGFub3RoZXIgdHJlZSBmcm9tIGEgc3BlY2lmaWMgY29udGV4dC4gSW4gYm90aCBjYXNlcywgYW4gT2JzZXJ2YWJsZSBjYW4gYmUgcmV0dXJuZWQgaWZcbiAqIHRoZSBzb3VyY2Ugb3IgdGhlIHJ1bGUgYXJlIGFzeW5jaHJvbm91cy4gT25seSB0aGUgbGFzdCBUcmVlIGdlbmVyYXRlZCBpbiB0aGUgb2JzZXJ2YWJsZSB3aWxsXG4gKiBiZSB1c2VkIHRob3VnaC5cbiAqXG4gKiBXZSBvYmZ1c2NhdGUgdGhlIGNvbnRleHQgb2YgU291cmNlIGFuZCBSdWxlIGJlY2F1c2UgdGhlIHNjaGVtYXRpYyBpbXBsZW1lbnRhdGlvbiBzaG91bGQgbm90XG4gKiBrbm93IHdoaWNoIHR5cGVzIGlzIHRoZSBzY2hlbWF0aWMgb3IgY29sbGVjdGlvbiBtZXRhZGF0YSwgYXMgdGhleSBhcmUgYm90aCB0b29saW5nIHNwZWNpZmljLlxuICovXG5leHBvcnQgdHlwZSBTb3VyY2UgPSAoY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4gVHJlZSB8IE9ic2VydmFibGU8VHJlZT47XG5leHBvcnQgdHlwZSBSdWxlID0gKHRyZWU6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IFRyZWUgfCBPYnNlcnZhYmxlPFRyZWU+IHwgdm9pZDtcbiJdfQ==