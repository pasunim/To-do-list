module.exports = [
"[project]/app/firestore.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"003c1bc341f973b9d51199fcece057931c45dbd372":"getTasks","40405f70d4fa09b1b0945e08112efdc0a3522cb35d":"addTask","40d195fb6da63000c5d47d8c4f7d1aa92b1820437c":"deleteTask","6030d2b9aff62072872767d763bcc2a44288af3ce4":"updateTask"},"",""] */ __turbopack_context__.s([
    "addTask",
    ()=>addTask,
    "deleteTask",
    ()=>deleteTask,
    "getTasks",
    ()=>getTasks,
    "updateTask",
    ()=>updateTask
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'firebase/firestore'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/lib/firebase'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function addTask(text) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("User not logged in");
    }
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            uid: user.uid,
            text: text,
            completed: false,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Failed to add task");
    }
}
async function getTasks() {
    const user = auth.currentUser;
    if (!user) {
        return [];
    }
    const q = query(collection(db, "tasks"), where("uid", "==", user.uid), orderBy("createdAt", "desc"));
    try {
        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map((doc1)=>{
            const data = doc1.data();
            return {
                id: doc1.id,
                text: data.text,
                completed: data.completed,
                createdAt: data.createdAt
            };
        });
        return tasks;
    } catch (e) {
        console.error("Error getting documents: ", e);
        throw new Error("Failed to get tasks");
    }
}
async function updateTask(id, completed) {
    const taskDoc = doc(db, "tasks", id);
    try {
        await updateDoc(taskDoc, {
            completed
        });
    } catch (e) {
        console.error("Error updating document: ", e);
        throw new Error("Failed to update task");
    }
}
async function deleteTask(id) {
    const taskDoc = doc(db, "tasks", id);
    try {
        await deleteDoc(taskDoc);
    } catch (e) {
        console.error("Error deleting document: ", e);
        throw new Error("Failed to delete task");
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    addTask,
    getTasks,
    updateTask,
    deleteTask
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addTask, "40405f70d4fa09b1b0945e08112efdc0a3522cb35d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTasks, "003c1bc341f973b9d51199fcece057931c45dbd372", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTask, "6030d2b9aff62072872767d763bcc2a44288af3ce4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTask, "40d195fb6da63000c5d47d8c4f7d1aa92b1820437c", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/firestore.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$firestore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/firestore.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/firestore.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "003c1bc341f973b9d51199fcece057931c45dbd372",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$firestore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTasks"],
    "40405f70d4fa09b1b0945e08112efdc0a3522cb35d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$firestore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addTask"],
    "40d195fb6da63000c5d47d8c4f7d1aa92b1820437c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$firestore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTask"],
    "6030d2b9aff62072872767d763bcc2a44288af3ce4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$firestore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTask"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$firestore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/firestore.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$firestore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/firestore.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_7e2bc611._.js.map