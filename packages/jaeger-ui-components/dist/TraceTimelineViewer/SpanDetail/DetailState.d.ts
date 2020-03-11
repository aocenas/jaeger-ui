import { Log } from '../../types/trace';
/**
 * Which items of a {@link SpanDetail} component are expanded.
 */
export default class DetailState {
    isTagsOpen: boolean;
    isProcessOpen: boolean;
    logs: {
        isOpen: boolean;
        openedItems: Set<Log>;
    };
    isWarningsOpen: boolean;
    isReferencesOpen: boolean;
    constructor(oldState?: DetailState);
    toggleTags(): DetailState;
    toggleProcess(): DetailState;
    toggleReferences(): DetailState;
    toggleWarnings(): DetailState;
    toggleLogs(): DetailState;
    toggleLogItem(logItem: Log): DetailState;
}
