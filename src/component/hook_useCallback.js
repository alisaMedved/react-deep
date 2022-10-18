const prevState = {
    callback: null,
    deps: null,
}
export function useCallback(callback, deps) {
if (!prevState.deps || !deps) {
    prevState.callback = callback;
    prevState.deps = deps;
    return callback;
}

if (shallowEqual(deps, prevState.deps)) {
    return prevState.callback;
}
    prevState.callback = callback;
    prevState.deps = deps;
    return callback;
}